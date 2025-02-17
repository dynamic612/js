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
 * Represents the parameters for the "installModule" function.
 */
export type InstallModuleParams = WithOverrides<{
  module: AbiParameterToPrimitiveType<{
    name: "_module";
    type: "address";
    internalType: "address";
  }>;
  data: AbiParameterToPrimitiveType<{
    name: "_data";
    type: "bytes";
    internalType: "bytes";
  }>;
}>;

export const FN_SELECTOR = "0x8da798da" as const;
const FN_INPUTS = [
  {
    name: "_module",
    type: "address",
    internalType: "address",
  },
  {
    name: "_data",
    type: "bytes",
    internalType: "bytes",
  },
] as const;
const FN_OUTPUTS = [] as const;

/**
 * Checks if the `installModule` method is supported by the given contract.
 * @param contract The ThirdwebContract.
 * @returns A promise that resolves to a boolean indicating if the `installModule` method is supported.
 * @extension MODULAR
 * @example
 * ```ts
 * import { isInstallModuleSupported } from "thirdweb/extensions/modular";
 *
 * const supported = await isInstallModuleSupported(contract);
 * ```
 */
export async function isInstallModuleSupported(
  contract: ThirdwebContract<any>,
) {
  return detectMethod({
    contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
  });
}

/**
 * Encodes the parameters for the "installModule" function.
 * @param options - The options for the installModule function.
 * @returns The encoded ABI parameters.
 * @extension MODULAR
 * @example
 * ```ts
 * import { encodeInstallModuleParams } "thirdweb/extensions/modular";
 * const result = encodeInstallModuleParams({
 *  module: ...,
 *  data: ...,
 * });
 * ```
 */
export function encodeInstallModuleParams(options: InstallModuleParams) {
  return encodeAbiParameters(FN_INPUTS, [options.module, options.data]);
}

/**
 * Encodes the "installModule" function into a Hex string with its parameters.
 * @param options - The options for the installModule function.
 * @returns The encoded hexadecimal string.
 * @extension MODULAR
 * @example
 * ```ts
 * import { encodeInstallModule } "thirdweb/extensions/modular";
 * const result = encodeInstallModule({
 *  module: ...,
 *  data: ...,
 * });
 * ```
 */
export function encodeInstallModule(options: InstallModuleParams) {
  // we do a "manual" concat here to avoid the overhead of the "concatHex" function
  // we can do this because we know the specific formats of the values
  return (FN_SELECTOR +
    encodeInstallModuleParams(options).slice(
      2,
    )) as `${typeof FN_SELECTOR}${string}`;
}

/**
 * Prepares a transaction to call the "installModule" function on the contract.
 * @param options - The options for the "installModule" function.
 * @returns A prepared transaction object.
 * @extension MODULAR
 * @example
 * ```ts
 * import { installModule } from "thirdweb/extensions/modular";
 *
 * const transaction = installModule({
 *  contract,
 *  module: ...,
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
export function installModule(
  options: BaseTransactionOptions<
    | InstallModuleParams
    | {
        asyncParams: () => Promise<InstallModuleParams>;
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
      return [resolvedOptions.module, resolvedOptions.data] as const;
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
