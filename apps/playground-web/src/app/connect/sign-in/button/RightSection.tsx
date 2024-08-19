import React, { useState, useEffect } from "react";
import {
  ConnectButton,
  ConnectEmbed,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { Button } from "../../../../components/ui/button";
import { THIRDWEB_CLIENT } from "../../../../lib/client";
import { cn } from "../../../../lib/utils";
import { CodeSection } from "./CodeSection";
import type { ConnectPlaygroundOptions } from "./types";

export function RightSection(props: {
  connectOptions: ConnectPlaygroundOptions;
}) {
  const [previewTab, setPreviewTab] = useState<"modal" | "button" | "code">(
    "modal",
  );

  // disconnect wallet if showing modal preview
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  useEffect(() => {
    if (wallet && previewTab === "modal") {
      disconnect(wallet);
    }
  }, [wallet, disconnect, previewTab]);

  const wallets = getWallets(props.connectOptions);

  const { connectOptions } = props;
  return (
    <div className="flex flex-col xl:w-[764px] gap-4 shrink-0">
      <TabButtons
        tabs={[
          {
            name: "Modal",
            isActive: previewTab === "modal",
            onClick: () => setPreviewTab("modal"),
          },
          {
            name: "Button",
            isActive: previewTab === "button",
            onClick: () => setPreviewTab("button"),
          },
          {
            name: "Code",
            isActive: previewTab === "code",
            onClick: () => setPreviewTab("code"),
          },
        ]}
      />

      <div
        className={cn(
          "flex justify-center items-center grow rounded-lg relative min-h-[300px]",
          previewTab === "modal" && "scale-75 lg:scale-100",
        )}
      >
        <BackgroundPattern />

        {previewTab === "modal" && (
          <ConnectEmbed
            client={THIRDWEB_CLIENT}
            autoConnect={false}
            modalSize={connectOptions.modalSize}
            theme={connectOptions.theme}
            className="shadow-xl"
            wallets={wallets}
          />
        )}

        {previewTab === "button" && (
          <ConnectButton
            client={THIRDWEB_CLIENT}
            autoConnect={false}
            theme={connectOptions.theme}
            connectModal={{
              size: connectOptions.modalSize,
            }}
            wallets={wallets}
          />
        )}

        {previewTab === "code" && (
          <CodeSection connectOptions={connectOptions} />
        )}
      </div>
    </div>
  );
}

/**
 * @internal
 */
export function getWallets(connectOptions: ConnectPlaygroundOptions) {
  const wallets = [...connectOptions.walletIds.map((id) => createWallet(id))];

  if (connectOptions.enableInAppWallet) {
    wallets.push(
      createWallet("inApp", {
        auth: {
          options: connectOptions.enabledInAppLoginMethods,
        },
      }),
    );
  }

  return wallets;
}

function BackgroundPattern() {
  const color = "hsl(var(--foreground)/15%)";
  return (
    <div
      className="absolute inset-0 z-[-1]"
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
        maskImage:
          "radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 60%)",
      }}
    />
  );
}

function TabButtons(props: {
  tabs: Array<{
    name: string;
    isActive: boolean;
    onClick: () => void;
  }>;
}) {
  return (
    <div>
      <div className="flex justify-center md:justify-start md:inline-flex p-2 rounded-lg gap-1 border bg-muted shadow-md">
        {props.tabs.map((tab) => (
          <Button
            key={tab.name}
            onClick={tab.onClick}
            variant="ghost"
            className={cn(
              "gap-2 px-4 shadow-inner text-base",
              tab.isActive
                ? "text-foreground bg-accent"
                : "text-muted-foreground bg-transparent",
            )}
          >
            {tab.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
