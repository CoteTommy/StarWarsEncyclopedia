import { Pressable, StyleSheet } from "react-native";

import { useQuery } from "@apollo/client";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { Text, View } from "@components/Themed";
import { GET_CHARACTER } from "@queries/CharacterQuery";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
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
    data &&
      navigation.setOptions({ title: data?.person?.name});
  }, [data]);

  const renderItem = ({ item: movie }: { item: Film }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("MovieDetails", { movie_id: String(movie.episodeID) })}
        style={styles.item}>
        <Text style={styles.card_title}>{movie.title}</Text>
        <Text style={styles.card_subtitle}>{movie.releaseDate}</Text>
        <Text style={styles.card_description}>{movie?.openingCrawl?.substring(0, 50).replace(/\r\n/g, " ")}...</Text>
      </Pressable>
    );
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const character = data.person as Person;
  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        <Text style={styles.card_subtitle}>Birth Year: {character.birthYear}</Text>
        <Text style={styles.card_subtitle}>Height: {character.height}</Text>
        <Text style={styles.card_subtitle}>Mass: {character.mass}kg</Text>
        <Text style={styles.card_subtitle}>Homeworld: {character.homeworld.name}</Text>
        <View style={styles.list}>
          <Text style={styles.card_subtitle}>Movies:</Text>
          <FlashList
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            data={character.filmConnection.films}
            estimatedItemSize={character.filmConnection.totalCount || 10}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 20,
  },
  informationContainer: {
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "flex-start",
    width: "90%",
  },
  title: {
    color: "#FFE81F",
    fontFamily: "Strjmono",
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 20,
  },
  item: {
    borderColor: "#FFE81F",
    borderRadius: 5,
    borderWidth: 2,
    display: "flex",
    flex: 1,
    fontSize: 30,
    marginVertical: 8,
    padding: 20,
    shadowColor: "#FFE81F",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  list: {
    height: "100%",
    width: "100%",
  },
  card_title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  card_subtitle: {
    fontSize: 18,
  },
  card_description: {
    fontSize: 18,
    paddingTop: 4,
  },
});

export default CharacterDetailsScreen;
