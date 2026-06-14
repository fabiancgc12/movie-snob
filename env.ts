import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    TMDB_KEY: z.string(),
  },
  client: {},
  runtimeEnv: {
    TMDB_KEY: process.env.TMDB_KEY,
  },
});
