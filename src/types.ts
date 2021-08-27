import { Request, Response} from "express";

import { Redis } from "ioredis";
// import { createUserLoader } from "./utils/createUserLoader";
// import { createUpdootLoader } from "./utils/createUpdootLoader";

export type MyContext = {
  req: Request &  { session: { userId ?: number };

  };
  res: Response;
  redis : Redis; 
};

