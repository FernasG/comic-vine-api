import "reflect-metadata";
import express from "express";
import router from "./src/routes";

(async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.json());
    app.use(router);

    app.listen(PORT, () => { console.log(`Server running - http://localhost:${PORT}`) });
})();