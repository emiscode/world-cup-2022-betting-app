import { useNavigation } from "@react-navigation/native";
import { useToast, FlatList } from "native-base";
import { useEffect, useState } from "react";
import { Match, MatchProps } from "./Match";
import { Loading } from "../components/Loading";
import { api } from "../services/api";

interface Props {
  poolId: string;
}

export function Bets({ poolId }: Props) {
  const toast = useToast();
  const [match, setMatch] = useState<MatchProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [teamOneScores, setTeamOneScores] = useState("");
  const [teamTwoScores, setTeamTwoScores] = useState("");

  async function fetchMatch() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/match`);

      setMatch(response.data.match);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possível carregar as partidas!",
        placement: "top",
        bgColor: "red.500",
      });

      navigation.navigate("pools");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleBetConfirm(matchId: string) {
    try {
      if (!teamOneScores.trim() || !teamTwoScores.trim()) {
        return toast.show({
          title: "Informe o placar do jogo!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post(`pools/${poolId}/match/${matchId}/bet`, {
        teamOneScores: Number(teamOneScores),
        teamTwoScores: Number(teamTwoScores),
      });

      toast.show({
        title: "Palpite enviado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      fetchMatch();
    } catch (error) {
      console.log(error);

      if (error.message === "Request failed with status code 409") {
        return toast.show({
          title: "Você já deu seu palpite neste jogo do bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Não foi possível confirmar seu palpite!",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchMatch();
  }, [poolId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={match}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Match
          data={item}
          setTeamOneScores={setTeamOneScores}
          setTeamTwoScores={setTeamTwoScores}
          onBetConfirm={() => handleBetConfirm(item.id)}
        />
      )}
    />
  );
}
