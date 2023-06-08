import { Volumes, Connection } from "@database";
import { ComicVineClient } from "src/libraries";

export const VolumesLoader = (async () => {
	const connection = await Connection();

	if (!connection) return null;

	const comicVineClient = new ComicVineClient();
	const fieldList = ['id', 'name', 'description', 'start_year', 'count_of_issues', 'date_added'];
	let offset = 0;

	while (true) {
		const apiResponse = await comicVineClient.get<any>({ resource: 'volumes', field_list: fieldList, offset });

		if (!apiResponse || apiResponse.error !== 'OK') {
			console.error({ method: 'VolumesLoader', message: 'ComicVine request failed', offset });
			continue;
		};

		const { results: volumes } = apiResponse;

		for (const vol of volumes) {
			const volume = await connection.getRepository(Volumes).findOneBy({ id: vol.id });

			if (volume) continue;

			const insertResult = await connection.getRepository(Volumes).insert(vol);

			if (insertResult) console.info({ method: 'VolumesLoader', message: 'Inserted Volume', volume_id: vol.id });
		}

		offset += 100;

		if (offset > apiResponse.number_of_total_results) break;
	}
});