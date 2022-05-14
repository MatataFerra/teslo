import { setupServer } from "msw/node";

import { handlers } from "./handlres";

export const server = setupServer(...handlers);
