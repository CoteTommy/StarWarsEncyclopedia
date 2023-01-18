import { Pressable } from "react-native";

import { useQuery } from "@apollo/client";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { MonoTextDescription, MonoTextSubtitle, MonoTextTitle } from "@components/StyledText";
import { Text, View } from "@components/Themed";
import { GET_CHARACTER } from "@queries/CharacterQuery";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { ComponentStyles, ListStyles } from "@styles/ComponentStyles";
import { useEffect } from "react";
import { Film, Person, RootStackParamList } from "types";

type CharacterDetailsScreenProps = RouteProp<RootStackParamList, "CharacterDetails">;
const CharacterDetailsScreen = () => {
  const routeParams = useRoute<CharacterDetailsScreenProps>().params;
  const navigation = useNavigation();
  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: { id: routeParams.character_id },
  });

  useEffect(() => {
    data && navigation.setOptions({ title: data?.person?.name });
  }, [data]);

  const renderItem = ({ item: movie }: { item: Film }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("MovieDetails", { movie_id: `${movie.episodeID}` })}
        style={ListStyles.card}>
        <MonoTextTitle bold style={{ paddingLeft: 5 }}>
          {movie.title}
        </MonoTextTitle>
        <MonoTextSubtitle style={{ paddingLeft: 10 }}>{movie.releaseDate}</MonoTextSubtitle>
        <MonoTextDescription style={{ paddingLeft: 10 }}>
          {movie?.openingCrawl?.substring(0, 50).replace(/\r\n/g, " ")}...
        </MonoTextDescription>
      </Pressable>
    );
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const character = data.person as Person;
  return (
    <View style={ComponentStyles.container}>
      <View style={ComponentStyles.section}>
        <View style={ListStyles.listContainer}>
          <FlashList
            renderItem={renderItem}
            data={character.filmConnection.films}
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={character.filmConnection.totalCount || 10}
            ListHeaderComponent={
              <>
                <MonoTextSubtitle bold>
                  Birth Year: <MonoTextDescription>{character.birthYear}</MonoTextDescription>
                </MonoTextSubtitle>
                <MonoTextSubtitle bold>
                  Height: <MonoTextDescription>{character.height}</MonoTextDescription>
                </MonoTextSubtitle>
                <MonoTextSubtitle bold>
                  Mass: <MonoTextDescription>{character.mass}kg</MonoTextDescription>
                </MonoTextSubtitle>
                <MonoTextSubtitle bold>
                  Homeworld: <MonoTextDescription>{character.homeworld.name}</MonoTextDescription>
                </MonoTextSubtitle>
                <MonoTextSubtitle bold>Movies:</MonoTextSubtitle>
              </>
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default CharacterDetailsScreen;
