import { CheckIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import type { Chain } from "../../../../../../../chains/types.js";
import type { ThirdwebClient } from "../../../../../../../client/client.js";
import { useCustomTheme } from "../../../../../../core/design-system/CustomThemeProvider.js";
import {
  fontSize,
  iconSize,
  spacing,
} from "../../../../../../core/design-system/index.js";
import { useChainQuery } from "../../../../../../core/hooks/others/useChainQuery.js";
import { ChainName } from "../../../../components/ChainName.js";
import { Spinner } from "../../../../components/Spinner.js";
import { SwitchNetworkButton } from "../../../../components/SwitchNetwork.js";
import { TokenIcon } from "../../../../components/TokenIcon.js";
import { Container } from "../../../../components/basic.js";
import { Button } from "../../../../components/buttons.js";
import { Text } from "../../../../components/text.js";
import { TokenSymbol } from "../../../../components/token/TokenSymbol.js";
import { StyledDiv } from "../../../../design-system/elements.js";
import type { ERC20OrNativeToken } from "../../nativeToken.js";

export function TxHashLink(props: {
  txHash: string;
  chain: Chain;
}) {
  const doneTxChainQuery = useChainQuery(props.chain);

  const explorerLink = doneTxChainQuery.data?.explorers?.[0]?.url;

  if (!explorerLink) {
    return null;
  }

  return (
    <Button
      fullWidth
      variant="outline"
      onClick={() => {
        window.open(`${explorerLink}/tx/${props.txHash}`, "_blank");
      }}
      gap="xs"
    >
      View on Explorer
      <ExternalLinkIcon width={iconSize.sm} height={iconSize.sm} />
    </Button>
  );
}

export function TokenInfo(props: {
  chain: Chain;
  token: ERC20OrNativeToken;
  amount: string;
  client: ThirdwebClient;
  amountSize: keyof typeof fontSize;
  chainNameSize: keyof typeof fontSize;
  iconSize: keyof typeof iconSize;
  align: "left" | "right";
}) {
  return (
    <Container
      flex="row"
      gap="xs"
      center="y"
      style={{
        flexWrap: "nowrap",
      }}
    >
      <Container
        flex="column"
        gap="xxs"
        style={{
          alignItems: props.align === "right" ? "flex-end" : "flex-start",
        }}
      >
        <Container flex="row" gap="xxs">
          <Text size={props.amountSize} color="primaryText">
            {props.amount}
          </Text>
          <TokenSymbol
            chain={props.chain}
            size={props.amountSize}
            token={props.token}
            color="primaryText"
            inline
          />
        </Container>
        <Container flex="row" gap="xxs">
          <TokenIcon
            token={props.token}
            size={props.iconSize}
            chain={props.chain}
            client={props.client}
          />
          <ChainName
            chain={props.chain}
            size={props.chainNameSize}
            client={props.client}
            short
          />
        </Container>
      </Container>
    </Container>
  );
}

export function Stepper(props: {
  step: number;
  content: React.ReactNode;
  isActive: boolean;
  isDone: boolean;
}) {
  return (
    <div
      data-step
      data-active={props.isActive}
      style={{
        display: "flex",
        gap: spacing.sm,
        position: "relative",
        paddingBottom: spacing.md,
      }}
    >
      <StepCircle data-active={props.isActive} data-done={props.isDone}>
        {props.isDone ? (
          <CheckIcon
            style={{
              width: fontSize.md,
              height: fontSize.md,
            }}
          />
        ) : (
          props.step
        )}
      </StepCircle>

      <div
        data-content
        style={{
          flex: 1,
          paddingBottom: spacing.md,
          opacity: props.isActive || props.isDone ? 1 : 0.5,
        }}
      >
        {props.content}
      </div>
      <StepperLine data-stepline />
    </div>
  );
}

export const StepContainer = StyledDiv({
  "& [data-step]:last-child [data-stepline]": {
    display: "none",
  },
});

const stepCircleSize = 24;

const StepperLine = StyledDiv((_p) => {
  const theme = useCustomTheme();
  return {
    width: "1px",
    height: "100%",
    left: `${stepCircleSize / 2}px`,
    backgroundColor: theme.colors.borderColor,
    position: "absolute",
    zIndex: 0,
  };
});

const StepCircle = StyledDiv((_p) => {
  const theme = useCustomTheme();
  return {
    width: `${stepCircleSize}px`,
    height: `${stepCircleSize}px`,
    flexShrink: 0,
    borderRadius: "50%",
    border: `1px solid ${theme.colors.borderColor}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: fontSize.sm,
    marginTop: "-1.5px",
    backgroundColor: theme.colors.tertiaryBg,
    position: "relative",
    zIndex: 1,
    fontWeight: 500,
    '&[data-active="true"]': {
      background: theme.colors.accentButtonBg,
      borderColor: theme.colors.accentButtonBg,
      color: theme.colors.accentButtonText,
    },
    '&[data-done="true"]': {
      color: theme.colors.success,
      borderColor: theme.colors.success,
      background: theme.colors.modalBg,
    },
  };
});

export function WithSwitchNetworkButton(props: {
  targetChain: Chain;
  activeChain: Chain;
  onClick: () => void;
  label: string;
  loadingLabel: string;
  isLoading: boolean;
}) {
  if (props.targetChain === props.activeChain) {
    return (
      <Button fullWidth variant="accent" gap="xs">
        {props.isLoading ? (
          <>
            {props.loadingLabel}
            <Spinner size="sm" color="accentButtonText" />
          </>
        ) : (
          props.label
        )}
      </Button>
    );
  }

  return (
    <SwitchNetworkButton
      variant="secondary"
      fullWidth
      chain={props.targetChain}
    />
  );
}
