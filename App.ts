import "reflect-metadata";
import express from "express";
import router from "./src/routes";
import { createClient } from "redis";

(async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    const client = createClient({ url: 'redis://comic-vine-redis:6379' });
    await client.connect();

    client.set('', 12, {  });
    client.disconnect();

    app.use(express.json());
    app.use(router);

    app.listen(PORT, () => { console.log(`Server running - http://localhost:${PORT}`) });
})();