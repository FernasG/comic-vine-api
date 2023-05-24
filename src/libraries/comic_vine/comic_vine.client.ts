import { Axios } from "axios";
import { KeyManager } from "./key_manager";
import { GetParams, RequestConfig } from "./comic_vine.interface";

export class ComicVineClient {
    private readonly endpoint: string = 'https://comicvine.gamespot.com/api';
    private readonly keyManager: KeyManager;
    private axiosClient: Axios;

    constructor() {
        this.axiosClient = new Axios({ baseURL: this.endpoint });
        this.keyManager = new KeyManager();
    }

    public async get<T>(getParams: GetParams): Promise<T | null> {
        const { resource, field_list, offset } = getParams;

        const apiKey = await this.keyManager.getKey(resource);

        if (!apiKey) {
            console.error({ method: 'ComicVineClient.get', message: 'No API Key available.' });
            return null;
        }

        const requestConfig: RequestConfig = { params: { api_key: apiKey, format: 'json', offset: offset ?? 0 } };

        if (field_list && field_list.length > 0) requestConfig.params.field_list = this.setupFieldList(field_list);

        const apiResponse = await this.axiosClient.get(resource, requestConfig)
            .then(async ({ data }) => {
                await this.keyManager.updateKeyCount(apiKey, resource);
                return JSON.parse(data);
            })
            .catch(err => {
                console.error({ method: 'ComicVineClient.get', message: err.message });
                return null;
            });

        if (!apiResponse) return null;

        return apiResponse as T;
    }

    private setupFieldList(fieldList: string[]): string {
        return fieldList.join(',');
    }
}