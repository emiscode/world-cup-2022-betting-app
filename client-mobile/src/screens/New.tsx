import { Heading, Text, VStack } from "native-base";
import { Header } from "../components/Header";

import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function New() {
  return (
    <VStack flex={1} bgColor="green.900">
      <Header title="Criar novo bolão"></Header>

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          fontFamily="heading"
          color="gray.100"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie o seu bolão da Copa do Mundo {"\n"} e compartilhe com os amigos!
        </Heading>

        <Input mb={2} placeholder="Qual nome do seu bolão" />

        <Button title="CRIAR MEU BOLÃO"></Button>

        <Text color="gray.200" fontSize="sm" textAlign="center" px={4} mt={4}>
          ⚽ Após criar seu bolão, você receberá um código que poderá usar para
          convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
