import { Router, Request, Response } from "express";

import publicR from "./publicR"

const routes = Router();

routes.use("/auth", publicR);


export default routes;