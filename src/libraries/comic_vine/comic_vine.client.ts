import { Axios } from "axios";
import { GetParams, RequestConfig } from "./comic_vine.interface";

export class ComicVineClient {
    private readonly endpoint: string = 'https://comicvine.gamespot.com/api';
    private readonly apiKey: string = process.env.COMIC_VINE_API_KEY as string;
    private axiosClient: Axios;

    constructor() {
        this.axiosClient = new Axios({ baseURL: this.endpoint });
    }

    public async get<T>(getParams: GetParams): Promise<T | null> {
        const { resource, field_list, offset } = getParams;
        const requestConfig: RequestConfig = { params: { api_key: this.apiKey, format: 'json', offset: offset ?? 0 } };

        if (field_list && field_list.length > 0) requestConfig.params.field_list = this.setupFieldList(field_list);

        const apiResponse = await this.axiosClient.get(resource, requestConfig)
            .then(({ data }) => JSON.parse(data))
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