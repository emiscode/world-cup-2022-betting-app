import { Avatar, Center, HStack, Text } from "native-base";

export interface BettorProps {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
}

interface Props {
  bettors: BettorProps[];
  count: number;
}

export function Bettors({ bettors, count }: Props) {
  return (
    <HStack>
      {bettors &&
        bettors.map((bettor) => (
          <Avatar
            key={bettor.id}
            source={{ uri: bettor.user.avatarUrl }}
            w={8}
            h={8}
            rounded="full"
            borderWidth={2}
            marginRight={-3}
            borderColor="gray.800"
          >
            {bettor.user?.name?.at(0).toUpperCase()}
          </Avatar>
        ))}

      <Center
        w={8}
        h={8}
        bgColor="gray.700"
        rounded="full"
        borderWidth={1}
        borderColor="gray.800"
      >
        <Text color="gray.100" fontSize="xs" fontFamily="medium">
          {count ? `+${count}` : 0}
        </Text>
      </Center>
    </HStack>
  );
}
