import { Editors, Connection, Volumes, EditorsVolumes } from "@database";
import { ComicVineClient } from "@libraries";

export const EditorsVolumesLoader = (async () => {
    const connection = await Connection();

    if (!connection) return null;

    const comicVineClient = new ComicVineClient();
    const fieldList = ['people'];

    const volumes = await connection.getRepository(Volumes)
        .createQueryBuilder('volumes')
        .select(['id'])
        .stream();

    for await (const { id: volumeId } of volumes) {
        const apiResponse = await comicVineClient.get<any>({ resource: `volume/4050-${volumeId}`, field_list: fieldList });

        if (!apiResponse || apiResponse.error !== 'OK') {
            console.error({ method: 'EditorsVolumesLoader', message: 'ComicVine request failed', volume_id: volumeId });
            continue;
        };

        const { results: { people: editors } } = apiResponse;

        if (!editors) continue;

        for (const { id: editorId } of editors) {
            const editor = await connection.getRepository(Editors).findOneBy({ id: editorId });

            if (!editor) continue;

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