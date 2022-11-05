import { Heading, HStack, Text, VStack } from "native-base";

import { PoolCardProps } from "./PoolCard";
import { Bettors } from "./Bettors";

interface Props {
  data: PoolCardProps;
}

export function PoolHeader({ data }: Props) {
  return (
    <HStack
      w="full"
      h={20}
      bgColor="transparent"
      borderBottomWidth={1}
      borderBottomColor="gray.600"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      p={4}
    >
      <VStack>
        <Heading color="white" fontSize="md" fontFamily="heading">
          {data.title}
        </Heading>

        <HStack>
          <Text color="gray.200" fontSize="xs" mr={1}>
            Código:
          </Text>

          <Text color="gray.200" fontSize="xs" fontFamily="heading">
            {data.code}
          </Text>
        </HStack>
      </VStack>

      <Bettors count={data._count?.bettors} bettors={data.bettors} />
    </HStack>
  );
}
