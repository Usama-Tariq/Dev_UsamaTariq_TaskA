import { Router, Request, Response } from "express";
import {
  ApiErrorResponse,
  SearchRequestBody,
  SearchSuccessResponse,
} from "../../shared/http";
import { executeSearch } from "../features/search/searchEngine";

const router = Router();

router.post(
  "/search",
  (
    req: Request<
      unknown,
      SearchSuccessResponse | ApiErrorResponse,
      SearchRequestBody
    >,
    res: Response<SearchSuccessResponse | ApiErrorResponse>
  ): void => {
    const { status, payload } = executeSearch(req.body);

    res
      .status(status)
      .json(payload as SearchSuccessResponse | ApiErrorResponse);
  }
);

export default router;
