import { setTimeout } from "timers/promises";
import { CacheClient } from "../";
import { API_KEY_MAX_REQUEST } from "./comic_vine.interface";

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

        await this.cacheClient.connect();

        const findResult = await this.findKey(resource);

        if (!findResult) {
            console.info({ method: 'KeyManager.getKey', message: 'No Key found, locking until next Key available.' });
            await this.lockGetKey(resource);

            return this.findKey(resource);
        }

        await this.cacheClient.disconnect();

        return findResult;
    }

    public async updateKeyCount(key: string, resource: string): Promise<void> {
        await this.cacheClient.connect();

        const cacheKey = `${key}-${resource}`;
        await this.cacheClient.incr(cacheKey);

        await this.cacheClient.disconnect();

        return;
    }

    private async findKey(resource: string): Promise<string | null> {
        for (const apiKey of this.apiKeys) {
            const cacheKey = `${apiKey}-${resource}`;
            const hasKey = await this.cacheClient.exists(cacheKey);

            if (hasKey) {
                const value = await this.cacheClient.get(cacheKey);

                if (!value) continue;

                const count = parseInt(value);

                if (count < API_KEY_MAX_REQUEST) return apiKey;

                continue;
            }

            await this.cacheClient.set(cacheKey, 0);
            return apiKey;
        }

        return null;
    }

    private async lockGetKey(resource: string) {
        const pattern = `[a-z0-9]*-${resource}`;
        const keys = await this.cacheClient.keys(pattern);

        if (!keys.length) return null;

        const ttls = await Promise.all(keys.map((key) => this.cacheClient.ttl(key)));

        const minTtl = Math.min(...ttls);

        console.info({ method: 'KeyManager.lockGetKey', message: `Lock acquired - TTL: ${minTtl}.` });
        await setTimeout(minTtl * 1000);

        return;
    }
}