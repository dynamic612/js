import type { AbiParameterToPrimitiveType } from "abitype";
import type {
  BaseTransactionOptions,
  WithOverrides,
} from "../../../../../transaction/types.js";
import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { once } from "../../../../../utils/promise/once.js";
import type { ThirdwebContract } from "../../../../../contract/contract.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";

/**
 * Represents the parameters for the "uninstallModule" function.
 */
export type UninstallModuleParams = WithOverrides<{
  moduleContract: AbiParameterToPrimitiveType<{
    name: "moduleContract";
    type: "address";
    internalType: "address";
  }>;
  data: AbiParameterToPrimitiveType<{
    name: "data";
    type: "bytes";
    internalType: "bytes";
  }>;
}>;

export const FN_SELECTOR = "0x70c109cd" as const;
const FN_INPUTS = [
  {
    name: "moduleContract",
    type: "address",
    internalType: "address",
  },
  {
    name: "data",
    type: "bytes",
    internalType: "bytes",
  },
] as const;
const FN_OUTPUTS = [] as const;

/**
 * Checks if the `uninstallModule` method is supported by the given contract.
 * @param contract The ThirdwebContract.
 * @returns A promise that resolves to a boolean indicating if the `uninstallModule` method is supported.
 * @extension MODULAR
 * @example
 * ```ts
 * import { isUninstallModuleSupported } from "thirdweb/extensions/modular";
 *
 * const supported = await isUninstallModuleSupported(contract);
 * ```
 */
export async function isUninstallModuleSupported(
  contract: ThirdwebContract<any>,
) {
  return detectMethod({
    contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
  });
}

/**
 * Encodes the parameters for the "uninstallModule" function.
 * @param options - The options for the uninstallModule function.
 * @returns The encoded ABI parameters.
 * @extension MODULAR
 * @example
 * ```ts
 * import { encodeUninstallModuleParams } "thirdweb/extensions/modular";
 * const result = encodeUninstallModuleParams({
 *  moduleContract: ...,
 *  data: ...,
 * });
 * ```
 */
export function encodeUninstallModuleParams(options: UninstallModuleParams) {
  return encodeAbiParameters(FN_INPUTS, [options.moduleContract, options.data]);
}

/**
 * Encodes the "uninstallModule" function into a Hex string with its parameters.
 * @param options - The options for the uninstallModule function.
 * @returns The encoded hexadecimal string.
 * @extension MODULAR
 * @example
 * ```ts
 * import { encodeUninstallModule } "thirdweb/extensions/modular";
 * const result = encodeUninstallModule({
 *  moduleContract: ...,
 *  data: ...,
 * });
 * ```
 */
export function encodeUninstallModule(options: UninstallModuleParams) {
  // we do a "manual" concat here to avoid the overhead of the "concatHex" function
  // we can do this because we know the specific formats of the values
  return (FN_SELECTOR +
    encodeUninstallModuleParams(options).slice(
      2,
    )) as `${typeof FN_SELECTOR}${string}`;
}

/**
 * Prepares a transaction to call the "uninstallModule" function on the contract.
 * @param options - The options for the "uninstallModule" function.
 * @returns A prepared transaction object.
 * @extension MODULAR
 * @example
 * ```ts
 * import { uninstallModule } from "thirdweb/extensions/modular";
 *
 * const transaction = uninstallModule({
 *  contract,
 *  moduleContract: ...,
 *  data: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function uninstallModule(
  options: BaseTransactionOptions<
    | UninstallModuleParams
    | {
        asyncParams: () => Promise<UninstallModuleParams>;
      }
  >,
) {
  const asyncOptions = once(async () => {
    return "asyncParams" in options ? await options.asyncParams() : options;
  });

  return prepareContractCall({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
    params: async () => {
      const resolvedOptions = await asyncOptions();
      return [resolvedOptions.moduleContract, resolvedOptions.data] as const;
    },
    value: async () => (await asyncOptions()).overrides?.value,
    accessList: async () => (await asyncOptions()).overrides?.accessList,
    gas: async () => (await asyncOptions()).overrides?.gas,
    gasPrice: async () => (await asyncOptions()).overrides?.gasPrice,
    maxFeePerGas: async () => (await asyncOptions()).overrides?.maxFeePerGas,
    maxPriorityFeePerGas: async () =>
      (await asyncOptions()).overrides?.maxPriorityFeePerGas,
    nonce: async () => (await asyncOptions()).overrides?.nonce,
    extraGas: async () => (await asyncOptions()).overrides?.extraGas,
    erc20Value: async () => (await asyncOptions()).overrides?.erc20Value,
  });
}
