import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Text, VStack } from "native-base";

import { Bettors, BettorProps } from "./Bettors";

export interface BettorCardProps {
  id: string;
  code: string;
  title: string;
  ownerId: string;
  createdAt: string;
  owner: {
    name: string;
  };
  bettors: BettorProps[];
  _count: {
    bettors: number;
  };
}

interface Props extends TouchableOpacityProps {
  data: BettorCardProps;
}

export function BettorCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        w="full"
        h={20}
        bgColor="gray.800"
        borderBottomWidth={3}
        borderBottomColor="yellow.500"
        justifyContent="space-between"
        alignItems="center"
        rounded="sm"
        mb={3}
        p={4}
      >
        <VStack>
          <Heading color="white" fontSize="md" fontFamily="heading">
            {data.title}
          </Heading>

          <Text color="gray.200" fontSize="xs">
            Criado por {data.owner.name}
          </Text>
        </VStack>

        <Bettors count={data._count.bettors} bettors={data.bettors} />
      </HStack>
    </TouchableOpacity>
  );
}
