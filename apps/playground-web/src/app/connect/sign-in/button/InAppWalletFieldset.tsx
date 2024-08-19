import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import type { InAppWalletAuth } from "thirdweb/wallets";
import type { ConnectPlaygroundOptions } from "./types";

const allInAppWalletLoginMethods: InAppWalletAuth[] = [
  "google",
  "discord",
  "telegram",
  "farcaster",
  "email",
  "passkey",
  "phone",
  "facebook",
  "apple",
];

export function InAppWalletFieldSet(props: {
  connectOptions: ConnectPlaygroundOptions;
  setConnectOptions: React.Dispatch<
    React.SetStateAction<ConnectPlaygroundOptions>
  >;
}) {
  const { connectOptions, setConnectOptions } = props;

  return (
    <div className="rounded-xl border bg-muted">
      <div className="flex gap-2 justify-between items-center p-4">
        <Link
          target="_blank"
          className="flex items-center gap-2 group"
          href="https://portal.thirdweb.com/connect/in-app-wallet/overview"
        >
          <h2 className="font-semibold tracking-tight">In-App Wallet</h2>
          <ExternalLinkIcon className="size-4 text-muted-foreground group-hover:text-foreground mt-[-2px]" />
        </Link>
        <Switch
          checked={connectOptions.enableInAppWallet}
          onCheckedChange={(checked) =>
            setConnectOptions((v) => ({ ...v, enableInAppWallet: checked }))
          }
        />
      </div>

      {connectOptions.enableInAppWallet && (
        <div className="grid grid-cols-3 gap-2 animate-in fade-in-0 duration-500 p-4 pt-0">
          {allInAppWalletLoginMethods.map((method) => {
            const enabled =
              connectOptions.enabledInAppLoginMethods.includes(method);
            return (
              <label
                className={cn(
                  "flex items-center gap-2 rounded-lg py-1.5 cursor-pointer",
                  !enabled && "opacity-50",
                )}
                key={method}
              >
                <Checkbox
                  checked={enabled}
                  onCheckedChange={(checked) => {
                    setConnectOptions((v) => {
                      const newV = { ...v };
                      if (!checked) {
                        newV.enabledInAppLoginMethods =
                          v.enabledInAppLoginMethods.filter(
                            (m) => m !== method,
                          );
                      } else {
                        newV.enabledInAppLoginMethods = [
                          ...v.enabledInAppLoginMethods,
                          method,
                        ];
                      }
                      return newV;
                    });
                  }}
                />
                <span className="text-sm font-medium leading-none capitalize select-none">
                  {method}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
