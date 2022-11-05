import { useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { PoolCardProps } from "../components/PoolCard";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";

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
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possível carregar este bolão!",
        placement: "top",
        bgColor: "red.500",
      });

      navigation.navigate("pools");
    } finally {
      setIsLoading(false);
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
      <Header title={pool.title} showBackButton showShareButton></Header>

      {pool._count?.bettors > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={pool} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={pool.code} />
      )}
    </VStack>
  );
}
