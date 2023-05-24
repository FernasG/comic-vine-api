export interface RequestConfig {
    params: {
        format: string;
        api_key: string;
        offset?: number;
        field_list?: string;
    }
};

export interface GetParams {
    offset?: number;
    resource: string;
    field_list?: string[];
}

export interface GetKeyResult {
    key: string;
    count: number;
    cache_key: string;
}