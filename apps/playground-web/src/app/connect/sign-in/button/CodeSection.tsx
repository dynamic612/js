import { Suspense, lazy, useState } from "react";
import { DynamicHeight } from "../../../../components/ui/DynamicHeight";
import { LoadingDots } from "../../../../components/ui/LoadingDots";
import type { ConnectPlaygroundOptions } from "./types";

const CodeClient = lazy(
  () => import("../../../../components/code/code.client"),
);

function CodeLoading() {
  return (
    <div className="h-[400px] flex items-center justify-center">
      <LoadingDots />
    </div>
  );
}

export function CodeSection(props: {
  connectOptions: ConnectPlaygroundOptions;
}) {
  return (
    <div className="w-full">
      <Suspense fallback={<CodeLoading />}>
        <CodeClient
          code={getCode(props.connectOptions)}
          lang="tsx"
          loader={<CodeLoading />}
        />
      </Suspense>
    </div>
  );
}

function getCode(connectOptions: ConnectPlaygroundOptions) {
  const walletCodes: string[] = [];
  if (connectOptions.enableInAppWallet) {
    walletCodes.push(`inAppWallet({
      auth: {
        options: ${JSON.stringify(connectOptions.enabledInAppLoginMethods)},
      },
    })`);
  }

  for (const wallet of connectOptions.walletIds) {
    walletCodes.push(`createWallet("${wallet}")`);
  }

  const componentCode = `\
<ConnectButton
  client={client}
  theme="${connectOptions.theme}"
  connectModal={{
    size: "${connectOptions.modalSize}",
  }}
  wallets={[
    ${walletCodes.join(", ")}
  ]}
/>`;

  return `\
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "....",
});

function Example() {
  return (
    ${componentCode}
  );
}`;
}
