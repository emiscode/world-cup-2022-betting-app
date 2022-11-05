import { Heading, VStack, useToast } from "native-base";
import { Header } from "../components/Header";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";

export function Find() {
  const toast = useToast();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation();

  async function handleFindPool() {
    if (!code.trim()) {
      return toast.show({
        title: "Informe o código do bolão!",
        placement: "top",
        bgColor: "red.500",
      });
    }
    try {
      setIsLoading(true);

      await api.post(`/pools/${code}/join`);

      setCode("");

      toast.show({
        title: "Você entrou no bolão com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("pools");
    } catch (error) {
      setIsLoading(false);
      console.log(error.code);
      console.log(JSON.stringify(error));

      if (error.message === "Request failed with status code 404") {
        return toast.show({
          title: "Bolão não encontrado!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.message === "Request failed with status code 409") {
        return toast.show({
          title: "Você já está participando deste bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Não foi possível buscar o bolão!",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <VStack flex={1} bgColor="green.900">
      <Header
        title="Buscar por código"
        showBackButton
        onShare={() => {}}
      ></Header>

      <VStack mt={12} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="gray.100"
          fontSize="xl"
          mb={12}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"} seu código único.
        </Heading>

        <Input
          color="black"
          mb={2}
          autoCapitalize="characters"
          placeholder="Qual o código do bolão"
          onChangeText={setCode}
          value={code}
        />

        <Button
          title="BUSCAR BOLÃO"
          onPress={handleFindPool}
          isLoading={isLoading}
        ></Button>
      </VStack>
    </VStack>
  );
}
