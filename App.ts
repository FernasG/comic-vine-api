import "reflect-metadata";
import express from "express";
import { LoadersRunner } from "@loaders";
import router from "./src/routes";

(async () => {
    const app = express();
    var cors = require('cors')
    const PORT = process.env.PORT || 3000;

    app.use(express.json());
    app.use(cors())
    app.use(router);

    app.listen(PORT, () => { console.log(`Server running - http://localhost:${PORT}`) });

    await LoadersRunner();
})();