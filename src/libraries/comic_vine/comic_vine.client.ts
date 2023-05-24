import { Axios } from "axios";
import { CacheClient } from "../"
import { GetKeyResult, GetParams, RequestConfig } from "./comic_vine.interface";

export class ComicVineClient {
    private readonly cacheClient: CacheClient;
    private readonly endpoint: string = 'https://comicvine.gamespot.com/api';
    private readonly apiKeys: string[];
    private axiosClient: Axios;

    constructor() {
        this.axiosClient = new Axios({ baseURL: this.endpoint });
        this.cacheClient = new CacheClient();

        const keys = process.env.COMIC_VINE_API_KEYS;
        this.apiKeys = keys ? keys.split(',') : [];
    }

    public async get<T>(getParams: GetParams): Promise<T | null> {
        const { resource, field_list, offset } = getParams;

        if (!this.cacheClient.isConnected) await this.cacheClient.connect();

        const apiKeyParams = await this.getKey(resource);

        if (!apiKeyParams) {
            console.error({ method: 'ComicVineClient.get', message: 'No API Key available.' });
            return null;
        }

        const { key: apiKey, cache_key: cacheKey, count } = apiKeyParams;

        const requestConfig: RequestConfig = { params: { api_key: apiKey, format: 'json', offset: offset ?? 0 } };

        if (field_list && field_list.length > 0) requestConfig.params.field_list = this.setupFieldList(field_list);

        const apiResponse = await this.axiosClient.get(resource, requestConfig)
            .then(async ({ data }) => {
                await this.cacheClient.set(cacheKey, count + 1);
                return JSON.parse(data);
            })
            .catch(err => {
                console.error({ method: 'ComicVineClient.get', message: err.message });
                return null;
            });

        if (!apiResponse) return null;

        console.log(await this.cacheClient.get(cacheKey));

        return apiResponse as T;
    }

    private async getKey(resource: string): Promise<GetKeyResult | null> {
        if (!this.apiKeys.length) return null;

        for (const apiKey of this.apiKeys) {
            const cacheKey = `${apiKey}-${resource}`;
            const hasKey = await this.cacheClient.exists(cacheKey);


            if (hasKey) {
                const value = await this.cacheClient.get(cacheKey);

                if (!value) continue;

                const count = parseInt(value);

                if (count < 199) return { key: apiKey, cache_key: cacheKey, count };

                continue;
            }

            await this.cacheClient.set(cacheKey, 0);
            return { key: apiKey, cache_key: cacheKey, count: 0 };
        }

        return null;
    }

    private setupFieldList(fieldList: string[]): string {
        return fieldList.join(',');
    }
}