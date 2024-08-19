import {
  type InAppWalletAuth,
  type WalletId,
  inAppWallet,
} from "thirdweb/wallets";

export type ConnectPlaygroundOptions = {
  modalSize: "compact" | "wide";
  theme: "light" | "dark";
  enabledInAppLoginMethods: InAppWalletAuth[];
  walletIds: WalletId[];
  enableInAppWallet: boolean;
};
