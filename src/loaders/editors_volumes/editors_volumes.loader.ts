import { Editors, Connection, Volumes, EditorsVolumes } from "@database";
import { ComicVineClient } from "@libraries";

export const EditorsVolumesLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['volume_credits'];

    const editors = await connection.getRepository(Editors)
        .createQueryBuilder('editors')
        .select(['id'])
        .stream();

    for await (const { id: editorId } of editors) {
        const apiResponse = await comicVineClient.get<any>({ resource: `person/4040-${editorId}`, field_list: fieldList });

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'EditorsVolumesLoader', message: 'ComicVine request failed', editor_id: editorId });
            continue;
        };

        const { results: { volume_credits: volumes } } = apiResponse;

        if (!volumes) continue;

        for (const { id: volumeId } of volumes) {
            const volume = await connection.getRepository(Volumes).findOneBy({ id: volumeId });

            if (!volume) continue;

            const params = { editor_id: editorId, volume_id: volumeId };

            const editorVolume = await connection.getRepository(EditorsVolumes).findOneBy(params);

            if (editorVolume) continue;

            const insertResult = await connection.getRepository(EditorsVolumes).insert(params);

            if (insertResult) {
                console.info({
                    method: 'EditorsVolumesLoader', message: 'Inserted Editor Volume',
                    editor_id: editorId, volume_id: volumeId
                });
            }
        }
    }
});