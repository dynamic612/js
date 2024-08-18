import { beforeAll, describe, expect, it } from "vitest";
import { ANVIL_CHAIN } from "../../../test/src/chains.js";
import { TEST_CLIENT } from "../../../test/src/test-clients.js";
import { TEST_ACCOUNT_A } from "../../../test/src/test-wallets.js";
import { ZERO_ADDRESS } from "../../constants/addresses.js";
import { getContract } from "../../contract/contract.js";
import { sendAndConfirmTransaction } from "../../transaction/actions/send-and-confirm-transaction.js";
import { getInstalledModules } from "../modular/__generated__/ModularCore/read/getInstalledModules.js";
import { claimableERC20Module } from "../modular/write/claimableERC20.js";
import { installPublishedModule } from "../modular/write/installPublishedModule.js";
import { uninstallModuleByProxy } from "../modular/write/uninstallModuleByProxy.js";
import { uninstallPublishedModule } from "../modular/write/uninstallPublishedModule.js";
import { deployModularContract } from "./deploy-modular.js";
import { deployPublishedContract } from "./deploy-published.js";

describe(
  "deployModularCore",
  {
    timeout: 120000,
  },
  () => {
    let address: string;

    beforeAll(async () => {
      address = await deployPublishedContract({
        client: TEST_CLIENT,
        chain: ANVIL_CHAIN,
        account: TEST_ACCOUNT_A,
        contractId: "DemoCore",
        contractParams: [TEST_ACCOUNT_A.address, [], ["0x"]],
        publisher: "0xFD78F7E2dF2B8c3D5bff0413c96f3237500898B3",
      });
    }, 120000);

    it("should deploy a published autofactory modular core contract", async () => {
      expect(address).toBeDefined();
      expect(address.length).toBe(42);

      const installedModules = await getInstalledModules({
        contract: getContract({
          client: TEST_CLIENT,
          chain: ANVIL_CHAIN,
          address,
        }),
      });
      expect(installedModules.length).toBe(0);
    });

    it("should install and uninstall an module by proxy address", async () => {
      const core = getContract({
        client: TEST_CLIENT,
        chain: ANVIL_CHAIN,
        address,
      });

      // install module with published name
      const installTransaction = installPublishedModule({
        contract: core,
        chain: ANVIL_CHAIN,
        client: TEST_CLIENT,
        account: TEST_ACCOUNT_A,
        moduleName: "DemoModuleWithFunctions",
        publisherAddress: "0xFD78F7E2dF2B8c3D5bff0413c96f3237500898B3",
      });
      await sendAndConfirmTransaction({
        transaction: installTransaction,
        account: TEST_ACCOUNT_A,
      });

      // get installed module proxy address
      let installedModules = await getInstalledModules({
        contract: core,
      });
      const moduleAddress = installedModules[0]?.implementation;
      expect(moduleAddress).to.not.equal(ZERO_ADDRESS);

      // uninstall module
      const uninstallTransaction = uninstallModuleByProxy({
        contract: core,
        chain: ANVIL_CHAIN,
        client: TEST_CLIENT,
        moduleProxyAddress: moduleAddress as string,
        moduleData: "0x",
      });
      await sendAndConfirmTransaction({
        transaction: uninstallTransaction,
        account: TEST_ACCOUNT_A,
      });

      installedModules = await getInstalledModules({
        contract: core,
      });

      expect(installedModules.length).toBe(0);
    });

    it("should install and uninstall modules by publish name", async () => {
      const core = getContract({
        client: TEST_CLIENT,
        chain: ANVIL_CHAIN,
        address,
      });

      // install module with published name
      const installTransaction = installPublishedModule({
        contract: core,
        chain: ANVIL_CHAIN,
        client: TEST_CLIENT,
        account: TEST_ACCOUNT_A,
        moduleName: "DemoModuleWithFunctions",
        publisherAddress: "0xFD78F7E2dF2B8c3D5bff0413c96f3237500898B3",
      });
      await sendAndConfirmTransaction({
        transaction: installTransaction,
        account: TEST_ACCOUNT_A,
      });

      let installedModules = await getInstalledModules({
        contract: core,
      });

      expect(installedModules.length).toBe(1);

      // uninstall module
      const uninstallTransaction = uninstallPublishedModule({
        contract: core,
        chain: ANVIL_CHAIN,
        client: TEST_CLIENT,
        moduleName: "DemoModuleWithFunctions",
        publisherAddress: "0xFD78F7E2dF2B8c3D5bff0413c96f3237500898B3",
        moduleData: "0x",
      });
      await sendAndConfirmTransaction({
        transaction: uninstallTransaction,
        account: TEST_ACCOUNT_A,
      });

      installedModules = await getInstalledModules({
        contract: core,
      });

      expect(installedModules.length).toBe(0);
    });

    it("should deploy a modular contract with a module", async () => {
      const address = await deployModularContract({
        chain: ANVIL_CHAIN,
        client: TEST_CLIENT,
        account: TEST_ACCOUNT_A,
        core: "ERC20CoreInitializable", // FIXME use ERC20 core from tw deployer
        publisher: "0x4fA9230f4E8978462cE7Bf8e6b5a2588da5F4264",
        params: {
          name: "TestModularERC20",
          symbol: "TT",
        },
        modules: [
          claimableERC20Module({
            primarySaleRecipient: TEST_ACCOUNT_A.address,
          }),
        ],
      });
      const installedModules = await getInstalledModules({
        contract: getContract({
          client: TEST_CLIENT,
          chain: ANVIL_CHAIN,
          address,
        }),
      });
      expect(installedModules.length).toBe(1);
    });
  },
);
