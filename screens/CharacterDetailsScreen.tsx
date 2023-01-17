import { Pressable, StyleSheet, Text } from "react-native";

import { useQuery } from "@apollo/client";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { View } from "@components/Themed";
import { GET_CHARACTER } from "@queries/CharacterQuery";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Person, RootStackParamList } from "types";

type CharacterDetailsScreenProps = RouteProp<RootStackParamList, "CharacterDetails">;
const CharacterDetailsScreen = () => {
  const routeParams = useRoute<CharacterDetailsScreenProps>().params;
  const navigation = useNavigation();
  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: { id: routeParams.character_id },
  });

  if (loading) return <LoadingIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const character = data.person as Person;

  // navigation.setOptions({ title: movie.title, headerTitleStyle: { color: "#FFE81F", fontFamily: "Strjmono" } });

  const renderItem = ({ item: movie }: any) => {
    // console.log("🚀 ~ file: MovieScreen.tsx:34 ~ renderItem ~ item", movie);
    return (
      <Pressable style={styles.item} onPress={() => navigation.navigate("MovieDetails", { movie_id: movie.id })}>
        <Text style={styles.card_title}>{movie.title}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        {/* <Text style={styles.card_subtitle}>Release Date: {movie.releaseDate}</Text>
        <Text style={styles.card_subtitle}>Species Count: {movie.speciesConnection.totalCount}</Text>
        <Text style={styles.card_subtitle}>Planet Count: {movie.planetConnection.totalCount}</Text>
        <Text style={styles.card_subtitle}>Vehicles Count: {movie.vehicleConnection.totalCount}</Text> */}
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
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  list: {
    height: "100%",
    width: "100%",
  },
  card_title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFE81F",
  },
  card_subtitle: {
    fontSize: 18,
    color: "#FFE81F",
  },
  card_description: {
    fontSize: 18,
    paddingTop: 4,
  },
});

export default CharacterDetailsScreen;
