// src/routes.ts
import { Router } from "express";
import { userRoutes } from "./modules/user/routes";

export function routes() {
    const router = Router();

    router.use("/users", userRoutes());

    return router;
}
