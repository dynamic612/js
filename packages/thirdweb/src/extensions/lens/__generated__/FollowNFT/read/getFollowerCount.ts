import { readContract } from "../../../../../transaction/read-contract.js";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";

import { decodeAbiParameters } from "viem";
import type { Hex } from "../../../../../utils/encoding/hex.js";
import type { ThirdwebContract } from "../../../../../contract/contract.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";

export const FN_SELECTOR = "0x7829ae4a" as const;
const FN_INPUTS = [] as const;
const FN_OUTPUTS = [
  {
    type: "uint256",
  },
] as const;

/**
 * Checks if the `getFollowerCount` method is supported by the given contract.
 * @param contract The ThirdwebContract.
 * @returns A promise that resolves to a boolean indicating if the `getFollowerCount` method is supported.
 * @extension LENS
 * @example
 * ```ts
 * import { isGetFollowerCountSupported } from "thirdweb/extensions/lens";
 *
 * const supported = await isGetFollowerCountSupported(contract);
 * ```
 */
export async function isGetFollowerCountSupported(
  contract: ThirdwebContract<any>,
) {
  return detectMethod({
    contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
  });
}

/**
 * Decodes the result of the getFollowerCount function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension LENS
 * @example
 * ```ts
 * import { decodeGetFollowerCountResult } from "thirdweb/extensions/lens";
 * const result = decodeGetFollowerCountResult("...");
 * ```
 */
export function decodeGetFollowerCountResult(result: Hex) {
  return decodeAbiParameters(FN_OUTPUTS, result)[0];
}

/**
 * Calls the "getFollowerCount" function on the contract.
 * @param options - The options for the getFollowerCount function.
 * @returns The parsed result of the function call.
 * @extension LENS
 * @example
 * ```ts
 * import { getFollowerCount } from "thirdweb/extensions/lens";
 *
 * const result = await getFollowerCount({
 *  contract,
 * });
 *
 * ```
 */
export async function getFollowerCount(options: BaseTransactionOptions) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
    params: [],
  });
}
