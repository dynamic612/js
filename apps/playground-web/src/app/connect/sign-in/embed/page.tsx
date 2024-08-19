import { CodeExample } from "@/components/code/code-example";
import { HooksPreview } from "@/components/sign-in/hooks";
import { StyledConnectEmbed } from "@/components/styled-connect-embed";
import { metadataBase } from "@/lib/constants";
import type { Metadata } from "next";
import { APIHeader } from "../../../../components/blocks/APIHeader";

export const metadata: Metadata = {
  metadataBase,
  title: "Sign In, Account Abstraction and SIWE Auth | thirdweb ConnectEmbed",
  description:
    "Let users sign up with their email, phone number, social media accounts or directly with a wallet. Seemlessly integrate account abstraction and SIWE auth.",
};

export default function Page() {
  return (
    <main className="pb-20 container px-0">
      <APIHeader
        title="Sign in"
        description={
          <>
            Create a login experience tailor-made for your app. Add your wallets
            of choice, enable web2 sign-in options and create a modal that fits
            your brand.
          </>
        }
        docsLink="https://portal.thirdweb.com/connect/sign-in/overview"
        heroLink="/connectors.png"
      />

      <EmbedComponent />
    </main>
  );
}

function EmbedComponent() {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
          Embed Component
        </h2>
        <p className="max-w-[700px] text-muted-foreground">
          Inline component to connect to various wallets.
          <br />
          Use this to create your own full screen login page.
        </p>
      </div>

      <CodeExample
        preview={<StyledConnectEmbed />}
        code={`import { createThirdwebClient } from "thirdweb";
import { ConnectEmbed } from "thirdweb/react";

const THIRDWEB_CLIENT = createThirdwebClient({
clientId: "<YOUR_CLIENT_ID>"
});

function App(){
return (
<ConnectEmbed client={THIRDWEB_CLIENT} />
);
};`}
        lang="tsx"
      />
    </>
  );
}

function Hooks() {
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Custom UI
        </h2>
        <p className="max-w-[600px]">
          Build your own connect UI using react hooks.
          <br />
          Wallet state management is all handled for you.
        </p>
      </div>

      <CodeExample
        preview={<HooksPreview />}
        code={`// Using your own UI
        import { useConnect } from "thirdweb/react";
        import { createWallet } from "thirdweb/wallets";

        function App(){
          const { connect } = useConnect();

          return (<>
      <button onClick={() => connect(async () => {
        // 350+ wallets supported with id autocomplete
        const wallet = createWallet("io.metamask");
        await wallet.connect({ client });
        return wallet;
      })}>Connect with Metamask</button>
      </>);
      };`}
        lang="tsx"
      />
    </>
  );
}
