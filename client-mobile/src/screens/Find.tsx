import { Heading, VStack } from "native-base";
import { Header } from "../components/Header";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Find() {
  return (
    <VStack flex={1} bgColor="green.900">
      <Header title="Buscar por código" showBackButton></Header>

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

        <Input mb={2} placeholder="Qual o código do bolão" />

        <Button title="BUSCAR BOLÃO"></Button>
      </VStack>
    </VStack>
  );
}
