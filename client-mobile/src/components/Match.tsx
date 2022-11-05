import { Button, HStack, Text, useTheme, VStack } from "native-base";
import { X, Check } from "phosphor-react-native";
import { getName } from "country-list";

import { Team } from "./Team";

import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";

interface BetProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  teamOneScores: number;
  teamTwoScores: number;
}

export interface MatchProps {
  id: string;
  date: string;
  teamOneCountryCode: string;
  teamTwoCountryCode: string;
  bet: null | BetProps;
}

interface Props {
  data: MatchProps;
  onBetConfirm: () => void;
  setTeamOneScores: (value: string) => void;
  setTeamTwoScores: (value: string) => void;
}

export function Match({
  data,
  setTeamOneScores,
  setTeamTwoScores,
  onBetConfirm,
}: Props) {
  const { colors, sizes } = useTheme();

  const matchDate = dayjs(data.date)
    .locale(ptBR)
    .format("DD [de] MMMM [de] YYYY [às] HH:00[h]");

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.teamOneCountryCode)} vs.{" "}
        {getName(data.teamTwoCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {matchDate}
      </Text>

      <HStack
        mt={4}
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Team
          code={data.teamOneCountryCode}
          position="right"
          onChangeText={setTeamOneScores}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.teamTwoCountryCode}
          position="left"
          onChangeText={setTeamTwoScores}
        />
      </HStack>

      {!data.bet && (
        <Button
          size="xs"
          w="full"
          bgColor="green.500"
          mt={4}
          onPress={onBetConfirm}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      )}
    </VStack>
  );
}
