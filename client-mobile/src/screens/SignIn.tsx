import { Center, Icon, Text } from "native-base";
import { Fontisto } from "@expo/vector-icons";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";

export function SignIn() {
  return (
    <Center flex={1} bgColor="green.900" p={8}>
      <Logo width={212} height={40} />
      <Button
        marginTop={12}
        type="SECONDARY"
        title="ENTRAR COM GOOGLE"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
      />
      <Text color="white" marginTop={4}>
        Não utlizamos nenhuma informação além do seu e-mail para criação da sua
        conta.
      </Text>
    </Center>
  );
}
