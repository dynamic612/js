"use client";

import { useState } from "react";
import { APIHeader } from "../../../../components/blocks/APIHeader";
import { LeftSection } from "./LeftSection";
import { RightSection } from "./RightSection";
import type { ConnectPlaygroundOptions } from "./types";

const defaultInAppLoginMethods: ConnectPlaygroundOptions["enabledInAppLoginMethods"] =
  [
    "google",
    "discord",
    "telegram",
    "farcaster",
    "email",
    "facebook",
    "passkey",
    "phone",
  ];

export default function Page() {
  const [connectOptions, setConnectOptions] =
    useState<ConnectPlaygroundOptions>({
      modalSize: "compact",
      theme: "dark",
      enabledInAppLoginMethods: defaultInAppLoginMethods,
      walletIds: [
        "io.metamask",
        "com.coinbase.wallet",
        "me.rainbow",
        "io.rabby",
        "io.zerion.wallet",
      ],
      enableInAppWallet: true,
    });

  return (
    <div className="pb-10">
      <APIHeader
        title="Connect Button"
        description={
          <>
            A fully featured wallet connection component that allows to Connect
            to 350+ external wallets, connect via email, phone number, passkey
            or social logins, Convert any wallet to a ERC4337 smart wallet for
            gasless transactions and provides SIWE (Sign In With Ethereum)
          </>
        }
        docsLink="https://portal.thirdweb.com/connect/sign-in/overview"
        heroLink="/connectors.png"
      />

      <div className="flex flex-col xl:flex-row xl:min-h-[800px] gap-6">
        <div className="grow xl:border-r xl:pr-6">
          <LeftSection
            connectOptions={connectOptions}
            setConnectOptions={setConnectOptions}
          />
        </div>

        <RightSection connectOptions={connectOptions} />
      </div>
    </div>
  );
}
