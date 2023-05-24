import { CacheClient } from "../";
import { GetKeyResult } from "./comic_vine.interface";

export class KeyManager {
    private readonly cacheClient: CacheClient;
    private readonly apiKeys: string[];

    constructor() {
        this.cacheClient = new CacheClient();
        const keys = process.env.COMIC_VINE_API_KEYS;
        this.apiKeys = keys ? keys.split(',') : [];
    }

    public async getKey(resource: string): Promise<string | null> {
        if (!this.apiKeys.length) return null;

        if (!this.cacheClient.isConnected) await this.cacheClient.connect();

        for (const apiKey of this.apiKeys) {
            const cacheKey = `${apiKey}-${resource}`;
            const hasKey = await this.cacheClient.exists(cacheKey);

            if (hasKey) {
                const value = await this.cacheClient.get(cacheKey);

                if (!value) continue;

                const count = parseInt(value);

                if (count < 199) return apiKey;

                continue;
            }

            await this.cacheClient.set(cacheKey, 0);
            return apiKey;
        }

        return null;
    }

    public async updateKeyCount(key: string, resource: string): Promise<void> {
        const cacheKey = `${key}-${resource}`;
        const value = await this.cacheClient.get(cacheKey);

        if (!value) return;

        const count = parseInt(value);
        await this.cacheClient.set(cacheKey, count + 1);

        return;
    }
}