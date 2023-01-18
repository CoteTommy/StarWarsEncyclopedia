import { useQuery } from "@apollo/client";
import CharacterListItem from "@components/CharacterListItem";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { MonoTextTitle } from "@components/StyledText";
import { Text, View } from "@components/Themed";
import { StorageKeys } from "@constants/Enums";
import { getData, storeData } from "@helpers/AsyncStorageHelper";
import { GET_ALL_CHARACTERS } from "@queries/CharacterQuery";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { ComponentStyles, ListStyles } from "@styles/ComponentStyles";
import React, { useEffect, useState } from "react";
import { Person } from "types";

// type CharacterScreenRouteProps = RouteProp<RootStackParamList, "LikedCharacter">;
const LikedCharactersScreen = () => {
  const [characters, setCharacters] = useState<Person[]>([]);
  // Query all the characters then filter since the swapi api doesn't have filter
  const {
    data: queryData,
    loading,
    error,
    refetch,
  } = useQuery(GET_ALL_CHARACTERS, {
    onCompleted(data) {
      setCharacters(data.allPeople.people);
    },
  });
  // From AsyncStorage
  const [likedCharacters, setLikedCharacters] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Liked characters", headerTitleStyle: { fontFamily: "Strjmono" } });
  }, []);

  // Ensure the data is always up to date when navigating to this screen
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getData(StorageKeys.LikedCharacters).then((data: string[] | undefined) => {
        setLikedCharacters(data || []);
      });
    }
  }, [isFocused]);

  useEffect(() => {
    storeData(StorageKeys.LikedCharacters, likedCharacters.join(","));
  }, [likedCharacters]);

  const handleLikeButton = (id: string) => {
    likedCharacters.includes(id)
      ? setLikedCharacters(likedCharacters.filter((characterId) => characterId !== id))
      : setLikedCharacters([...likedCharacters, id]);
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={ComponentStyles.container}>
      <View style={ListStyles.listContainer}>
        <FlashList
          onRefresh={refetch}
          refreshing={loading}
          ListEmptyComponent={() => <MonoTextTitle style={{ textAlign: "center" }}>No liked characters yet!</MonoTextTitle>}
          renderItem={(item) => CharacterListItem({ item, likedCharacters, handleLikeButton, navigation })}
          keyExtractor={(item: any) => item?.id?.toString()}
          data={characters?.filter((person: Person) => likedCharacters.includes(person.id)) ?? []}
          estimatedItemSize={queryData?.allPeople?.totalCount || 10}
          extraData={likedCharacters}
        />
      </View>
    </View>
  );
};

export default LikedCharactersScreen;
