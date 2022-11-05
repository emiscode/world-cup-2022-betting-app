import { useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { PoolCardProps } from "../components/PoolCard";
import { api } from "../services/api";
import { Loading } from "../components/Loading";

interface RouteParams {
  id: string;
}

export function Details() {
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const toast = useToast();
  const [pool, setPool] = useState<PoolCardProps>({} as PoolCardProps);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  async function fetchPool() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${id}`);

      setPool(response.data.pool);

      console.log(response.data.pool);

      setIsLoading(false);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possível carregar este bolão!",
        placement: "top",
        bgColor: "red.500",
      });

      navigation.navigate("pools");
    }
  }

  useEffect(() => {
    fetchPool();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="green.900">
      <Header title={id} showBackButton showShareButton></Header>
      <VStack></VStack>
    </VStack>
  );
}
