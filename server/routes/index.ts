import { Router } from "express";
import healthRouter from "./health";
import searchRouter from "./search";

const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(searchRouter);

export default apiRouter;
