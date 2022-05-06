import { AsyncValidationOptions, ObjectSchema } from "joi";
import { endpoint } from "../functions/endpoint";
import { HttpError } from "./httpError";

export const createRequestValidate =
  (
    key: "body" | "params" | "query",
    options?: AsyncValidationOptions | undefined,
  ) =>
  (schema: ObjectSchema) =>
    endpoint(async (req, res, next) => {
      try {
        const value = await schema.validateAsync(req[key], options);
        req[key] = value;
        next();
      } catch (err: any) {
        throw new HttpError(400, err.message);
      }
    });
