import { Axios } from "axios";
import { GetParams, KeysUsageMap, RequestConfig } from "./comic_vine.interface";

export class ComicVineClient {
    private readonly keysUsages: KeysUsageMap = {};
    private readonly endpoint: string = 'https://comicvine.gamespot.com/api';
    private readonly apiKeys: string[];
    private axiosClient: Axios;

    constructor() {
        this.axiosClient = new Axios({ baseURL: this.endpoint });
        const keys = process.env.COMIC_VINE_API_KEYS;
        this.apiKeys = keys ? keys.split(',') : [];
    }

    public async get<T>(getParams: GetParams): Promise<T | null> {
        const { resource, field_list, offset } = getParams;
        const apiKey = this.getKey(resource);

        if (!apiKey) {
            console.error({ method: 'ComicVineClient.get', message: 'No API Key available.' });
            return null;
        }

        const requestConfig: RequestConfig = { params: { api_key: apiKey, format: 'json', offset: offset ?? 0 } };

        if (field_list && field_list.length > 0) requestConfig.params.field_list = this.setupFieldList(field_list);

        const apiResponse = await this.axiosClient.get(resource, requestConfig)
            .then(({ data }) => {
                const keyItem = this.keysUsages[`${apiKey}-${resource}`];
                keyItem.count++;
                return JSON.parse(data);
            })
            .catch(err => {
                console.error({ method: 'ComicVineClient.get', message: err.message });
                return null;
            });

        if (!apiResponse) return null;

        console.log(this.keysUsages);

        return apiResponse as T;
    }

    private getKey(resource: string): string | null {
        if (!this.apiKeys.length) return null;

        for (const key of this.apiKeys) {
            const objectElement = `${key}-${resource}`;

            if (Object.keys(this.keysUsages).includes(objectElement)) {
                const { count } = this.keysUsages[objectElement];

                if (count < 199) return key;

                continue;
            }

            this.keysUsages[objectElement] = { count: 0, first_request: new Date() };
            return key;
        }

        return null;
    }

    private setupFieldList(fieldList: string[]): string {
        return fieldList.join(',');
    }
}