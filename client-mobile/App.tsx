import { THEME } from "./src/styles/theme";
import { NativeBaseProvider, StatusBar } from "native-base";
import { Find } from "./src/screens/Find";
import { Loading } from "./src/components/Loading";
import { AuthContextProvider } from "./src/contexts/AuthContext";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {fontsLoaded ? <Find /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
