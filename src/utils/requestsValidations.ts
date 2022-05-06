import { createRequestValidate } from "./createRequestValidation";
import { messages } from "./joiErrorMessagesPortuguese";

export const body = createRequestValidate("body", { messages });
export const params = createRequestValidate("params", { messages });
export const query = createRequestValidate("query", { messages });
