import { Button } from "@/components/ui/button";
import {
  ListIcon,
  MoonStarIcon,
  PaletteIcon,
  RectangleHorizontalIcon,
  RectangleVerticalIcon,
  SunMediumIcon,
  WalletCardsIcon,
} from "lucide-react";
import type React from "react";
import { Separator } from "../../../../components/ui/separator";
import { ToolTipLabel } from "../../../../components/ui/tooltip";
import { AccordionSection } from "./AccordionSection";
import { InAppWalletFieldSet } from "./InAppWalletFieldset";
import { WalletsSection } from "./WalletsSection";
import type { ConnectPlaygroundOptions } from "./types";

export function LeftSection(props: {
  connectOptions: ConnectPlaygroundOptions;
  setConnectOptions: React.Dispatch<
    React.SetStateAction<ConnectPlaygroundOptions>
  >;
}) {
  const { connectOptions, setConnectOptions } = props;
  const { theme, modalSize } = connectOptions;
  const setTheme = (theme: "dark" | "light") =>
    setConnectOptions((v) => ({ ...v, theme }));
  const setModalSize = (modalSize: "compact" | "wide") =>
    setConnectOptions((v) => ({ ...v, modalSize }));

  return (
    <div className="flex flex-col gap-4">
      <AccordionSection
        title="Wallets"
        icon={WalletCardsIcon}
        defaultOpen
        triggerContainerClassName="pt-0"
      >
        <InAppWalletFieldSet {...props} />
        <WalletsSection {...props} />
      </AccordionSection>

      <AccordionSection title="Appearance" icon={PaletteIcon} defaultOpen>
        <div className="flex flex-col gap-3">
          {/* Theme */}
          <section className="flex gap-3 items-center justify-between py-2.5 px-4 bg-muted border rounded-lg">
            <h2 className="text-base"> Theme </h2>
            <div className="flex gap-3">
              <ToolTipLabel label="Dark Theme">
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="p-2 rounded-full !h-full"
                  aria-label="Dark theme"
                >
                  <MoonStarIcon className="size-5" />
                </Button>
              </ToolTipLabel>

              <ToolTipLabel label="Light Theme">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="p-2 rounded-full !h-full"
                  aria-label="Light theme"
                >
                  <SunMediumIcon className="size-5" />
                </Button>
              </ToolTipLabel>
            </div>
          </section>

          {/* Modal Size */}
          <section className="flex gap-3 items-center justify-between py-2.5 px-4 bg-muted border rounded-lg">
            <h2 className="text-base"> Modal Size </h2>
            <div className="flex gap-3">
              <ToolTipLabel label="Compact Size">
                <Button
                  variant={modalSize === "compact" ? "default" : "outline"}
                  onClick={() => setModalSize("compact")}
                  className="p-2 rounded-full !h-full"
                  aria-label="Dark theme"
                >
                  <RectangleVerticalIcon className="size-5" />
                </Button>
              </ToolTipLabel>

              <ToolTipLabel label="Wide Size">
                <Button
                  variant={modalSize === "wide" ? "default" : "outline"}
                  onClick={() => setModalSize("wide")}
                  className="p-2 rounded-full !h-full"
                  aria-label="Light theme"
                >
                  <RectangleHorizontalIcon className="size-5" />
                </Button>
              </ToolTipLabel>
            </div>
          </section>
        </div>
      </AccordionSection>
    </div>
  );
}
