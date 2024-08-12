import { describe, expect, it } from "vitest";

import { defineChain } from "../../chains/utils.js";
import { getLatestBlockNumber } from "./getLatestBlockNumber.js";
import { TEST_CLIENT } from "~test/test-clients.js";

describe.runIf(process.env.TW_SECRET_KEY)(
  "chainsaw.getLatestBlockNumber",
  () => {
    it("gets latest block number", async () => {
      const { latestBlockNumber } = await getLatestBlockNumber({
        client: TEST_CLIENT,
        chain: defineChain(1),
      });
      expect(latestBlockNumber).toBeTypeOf("number");
    });
  },
);
