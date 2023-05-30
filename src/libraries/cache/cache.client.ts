import { RedisClientType, createClient } from "redis";
import { HOURS_TO_SECONDS } from "./cache.interface";

export class CacheClient {
    private readonly client: RedisClientType;
    private _isConnected: boolean;

    constructor() {
        const url = process.env.REDIS_URL;
        this.client = createClient({ url });
        this._isConnected = false;
    }

    public get isConnected(): boolean {
        return this._isConnected;
    }

    public async connect() {
        await this.client.connect();
        this._isConnected = true;
    }

    public async disconnect() {
        await this.client.disconnect();
        this._isConnected = false;
    }

    public async set(key: string, value: number | string): Promise<void> {
        this.checkConnection();

        await this.client.set(key, value);
        await this.client.expire(key, HOURS_TO_SECONDS);
    }

    public async incr(key: string): Promise<void> {
        this.checkConnection();

        await this.client.incr(key);
    }

    public async get(key: string): Promise<string | null> {
        this.checkConnection();

        return this.client.get(key);
    }

    public async exists(key: string): Promise<number> {
        this.checkConnection();

        return this.client.exists(key);
    }

    public async ttl(key: string): Promise<number> {
        this.checkConnection();

        return this.client.ttl(key);
    }

    public async keys(pattern: string) {
        this.checkConnection();

        return this.client.keys(pattern);
    }

    private checkConnection(): void {
        if (!this._isConnected) throw new Error('Redis Client not connected, call method `connect()` before.');
    }
}