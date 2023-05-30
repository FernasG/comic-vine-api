import { Axios } from "axios";
import { KeyManager } from "./key_manager";
import { GetParams, RequestConfig } from "./comic_vine.interface";

export class ComicVineClient {
    private readonly endpoint: string = 'https://comicvine.gamespot.com/api';
    private readonly apiKey: string = process.env.COMIC_VINE_API_KEY as string;
    private axiosClient: Axios;
    keyManager: KeyManager;

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
            .then(({ data }) => JSON.parse(data))
            .catch(err => {
                console.error({ method: 'ComicVineClient.get', message: err.message });
                return null;
            });

        await this.keyManager.updateKeyCount(apiKey, resource);

        if (!apiResponse) return null;

        return apiResponse as T;
    }

    private setupFieldList(fieldList: string[]): string {
        return fieldList.join(',');
    }
}