import { Editors, Connection } from "@database";
import { ComicVineClient } from "src/libraries";

export const EditorsLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['id', 'name', 'birth', 'description', 'date_added', 'gender', 'hometown', 'country'];
    let offset = 0;

    while (true) {
        const apiResponse = await comicVineClient.get<any>({ resource: 'people', field_list: fieldList, offset });

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'EditorsLoader', message: 'ComicVine request failed', offset });
            continue;
        };

        const { results: editors } = apiResponse;

        for (const edit of editors) {
            const editor = await connection.getRepository(Editors).findOneBy({ id: edit.id });

            if (editor) continue;

            const insertResult = await connection.getRepository(Editors).insert(edit);

            if (insertResult) console.info({ method: 'EditorsLoader', message: 'Inserted Editor', id: edit.id });
        }

        offset += 100;

        if (offset > apiResponse.number_of_total_results) break;
    }
});