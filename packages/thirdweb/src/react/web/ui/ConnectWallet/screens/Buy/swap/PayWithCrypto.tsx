import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useChainQuery } from "../../../../../../core/hooks/others/useChainQuery.js";
import { useWalletBalance } from "../../../../../../core/hooks/others/useWalletBalance.js";
import { useActiveAccount } from "../../../../../../core/hooks/wallets/wallet-hooks.js";
import { Skeleton } from "../../../../components/Skeleton.js";
import { Container } from "../../../../components/basic.js";
import { Button } from "../../../../components/buttons.js";
import { useCustomTheme } from "../../../../design-system/CustomThemeProvider.js";
import {
  spacing,
  fontSize,
  iconSize,
  radius,
} from "../../../../design-system/index.js";
import type { TokenInfo } from "../../../defaultTokens.js";
import { formatTokenBalance } from "../../TokenSelector.js";
import type { Chain } from "../../../../../../../chains/types.js";
import { Text } from "../../../../components/text.js";
import { isNativeToken, type NativeToken } from "../../nativeToken.js";
import { WalletIcon } from "../../../icons/WalletIcon.js";
import { formatNumber } from "../../../../../../../utils/formatNumber.js";
import { TokenIcon } from "../../../../components/TokenIcon.js";
import { TokenSymbol } from "../../../../components/token/TokenSymbol.js";
import styled from "@emotion/styled";

/**
 * Shows an amount "value" and renders the selected token and chain
 * It also renders the buttons to select the token and chain
 * It also renders the balance of active wallet for the selected token in selected chain
 * @internal
 */
export function PayWithCrypto(props: {
  value: string;
  onSelectToken: () => void;
  chain: Chain;
  token: TokenInfo | NativeToken;
  isLoading: boolean;
}) {
  const chainQuery = useChainQuery(props.chain);
  const activeAccount = useActiveAccount();

  const balanceQuery = useWalletBalance({
    address: activeAccount?.address,
    chain: props.chain,
    tokenAddress: isNativeToken(props.token) ? undefined : props.token.address,
  });

  return (
    <Container
      bg="tertiaryBg"
      style={{
        borderRadius: radius.md,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      }}
    >
      <Container
        flex="row"
        style={{
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
      >
        {/* Left */}
        <TokenButton variant="secondary" onClick={props.onSelectToken}>
          <TokenIcon token={props.token} chain={props.chain} size="md" />
          <Container flex="column" gap="xxs">
            <Container flex="row" gap="xs" center="y">
              <TokenSymbol token={props.token} chain={props.chain} size="sm" />
              <ChevronDownIcon width={iconSize.sm} height={iconSize.sm} />
            </Container>
            {chainQuery.data?.name ? (
              <Text size="xs"> {chainQuery.data.name}</Text>
            ) : (
              <Skeleton width="90px" height={fontSize.xs} />
            )}
          </Container>
        </TokenButton>

        {/* Right */}
        <div
          style={{
            flexGrow: 1,
            flexShrink: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: spacing.xxs,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            justifyContent: "center",
            paddingRight: spacing.sm,
          }}
        >
          {props.isLoading ? (
            <Skeleton width="120px" height={fontSize.md} />
          ) : (
            <Text
              size="md"
              color={props.value ? "primaryText" : "secondaryText"}
              style={{}}
            >
              {formatNumber(Number(props.value), 4) || "--"}
            </Text>
          )}

          <Container flex="row" gap="xxs" center="y" color="secondaryText">
            <WalletIcon size={fontSize.xs} />
            {balanceQuery.data ? (
              <Text size="xs" color="secondaryText" weight={500}>
                {formatTokenBalance(balanceQuery.data, true)}
              </Text>
            ) : (
              <Skeleton width="70px" height={fontSize.xs} />
            )}
          </Container>
        </div>
      </Container>
    </Container>
  );
}

const TokenButton = /* @__PURE__ */ styled(Button)(() => {
  const theme = useCustomTheme();
  return {
    background: "transparent",
    border: `1px solid transparent`,
    "&:hover": {
      background: "transparent",
      borderColor: theme.colors.accentText,
    },
    justifyContent: "flex-start",
    transition: "background 0.3s, border-color 0.3s",
    gap: spacing.sm,
    paddingInline: spacing.sm,
    paddingBlock: spacing.md,
    color: theme.colors.primaryText,
    borderRadius: radius.md,
    minWidth: "50%",
  };
});
