import { useCallback, useState } from "react";
import { VStack, Icon, useToast, FlatList } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Octicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { api } from "../services/api";
import { Loading } from "../components/Loading";

import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function Pools() {
  const toast = useToast();
  const [pools, setPools] = useState<PoolCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  async function fetchPools() {
    try {
      setIsLoading(true);

      const response = await api.get("/pools");

      setPools(response.data.pools);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possível carregar os bolões!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="green.900">
      <Header title="Meus bolões"></Header>
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.500"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigation.navigate("find")}
        />
      </VStack>
      <FlatList
        data={pools}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PoolCard
            data={item}
            onPress={() => navigation.navigate("details", { id: item.id })}
          />
        )}
        px={5}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ pb: 10 }}
        ListEmptyComponent={() => <EmptyPoolList />}
      />
    </VStack>
  );
}
