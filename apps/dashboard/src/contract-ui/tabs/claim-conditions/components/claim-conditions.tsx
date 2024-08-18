import { Flex, Stack } from "@chakra-ui/react";
import type { DropContract } from "@thirdweb-dev/react";
import { UpdateNotice } from "core-ui/update-notice/update-notice";
import { thirdwebClient } from "lib/thirdweb-client";
import { useV5DashboardChain } from "lib/v5-adapter";
import { getContract } from "thirdweb";
import { Heading, Text } from "tw-components";
import { ClaimConditionsForm } from "./claim-conditions-form/index";

interface ClaimConditionsProps {
  contract?: DropContract;
  tokenId?: string;
  isColumn?: true;
  contractInfo: {
    hasNewClaimConditions: boolean;
    isErc20: boolean;
  };
}
export const ClaimConditions: React.FC<ClaimConditionsProps> = ({
  contract,
  tokenId,
  isColumn,
  contractInfo,
}) => {
  const chain = useV5DashboardChain(contract?.chainId);

  return (
    <Stack spacing={8}>
      <Flex p={0} position="relative">
        <Flex
          pt={{ base: isColumn ? 0 : 6, md: 6 }}
          direction="column"
          gap={8}
          w="full"
        >
          {/* Info */}
          <Flex as="section" direction="column" gap={4}>
            <Flex direction="column">
              <Heading size="title.md">Set Claim Conditions</Heading>
              <Text size="body.md" fontStyle="italic" mt={2}>
                Control when the {contractInfo.isErc20 ? "tokens" : "NFTs"} get
                dropped, how much they cost, and more.
              </Text>
            </Flex>
            {contractInfo.hasNewClaimConditions && (
              <UpdateNotice
                learnMoreHref="https://blog.thirdweb.com/announcing-improved-claim-conditions"
                trackingLabel="claim_conditions"
                versions={[
                  { version: "3.6.0", sdk: "react" },
                  { version: "3.6.0", sdk: "typescript" },
                ]}
              >
                Define claim conditions on a per-wallet basis and rename your
                claim phases.
              </UpdateNotice>
            )}
          </Flex>

          {/* Set Claim Conditions */}
          {contract && chain && (
            <ClaimConditionsForm
              contract={contract}
              tokenId={tokenId}
              isColumn={isColumn}
              contractV5={getContract({
                address: contract.getAddress(),
                chain,
                client: thirdwebClient,
              })}
            />
          )}
        </Flex>
      </Flex>
    </Stack>
  );
};
