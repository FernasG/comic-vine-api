import { Volumes, Connection } from "@database";
import { ComicVineClient } from "src/libraries";

export const VolumeLoader = (async () => {
  const connection = await Connection();

  if (!connection) return null;

  const comicVineClient = new ComicVineClient();
  const fieldList = ['id', 'name', 'editions_number', 'nickname', 'comic_date', 'description', 'last_edition', 'first_edition']
  let offset = 0;

  while (true) {
    const apiResponse = await comicVineClient.get<any>({ resource: 'characters', field_list: fieldList, offset });

    if (!apiResponse || apiResponse.error !== 'OK') {
      console.error({ method: 'VolumeLoader', message: 'ComicVine request failed', offset });
      continue;
    };

    const { results: volumes } = apiResponse;

    for (const vol of volumes) {
      const volume = await connection.getRepository(Volumes).findOneBy({ id: vol.id });

      if (volume) continue;

      const insertResult = await connection.getRepository(Volumes).insert(vol);

      if (insertResult) console.info({ method: 'VolumeLoader', message: 'Inserted Character', id: vol.id });
    }

    offset += 100;
  }
});