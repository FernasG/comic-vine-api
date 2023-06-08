import { Editors, Connection } from "@database";
import { ComicVineClient } from "src/libraries";

export const EditorLoader = (async () => {
  const connection = await Connection();

  if (!connection) return null;

  const comicVineClient = new ComicVineClient();
  const fieldList = ['id','name','description','comic_date','state','city', 'street']
  let offset = 0;

  while (true) {
    const apiResponse = await comicVineClient.get<any>({ resource: 'characters',field_list: fieldList,offset });

    if (!apiResponse || apiResponse.error !== 'OK') {
      console.error({ method: 'EditorLoader',message: 'ComicVine request failed',offset });
      continue;
    };

    const { results: editors } = apiResponse;

    for (const edit of editors) {
      const editor = await connection.getRepository(Editors).findOneBy({ id: edit.id });

      if (editor) continue;

      const insertResult = await connection.getRepository(Editors).insert(edit);

      if (insertResult) console.info({ method: 'EditorLoader',message: 'Inserted Character',id: edit.id });
    }

    offset += 100;
  }
});