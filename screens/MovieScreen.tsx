import { Pressable, StyleSheet, Text } from "react-native";

import { useQuery } from "@apollo/client";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { View } from "@components/Themed";
import { GET_MOVIE } from "@queries/MovieQuery";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Film } from "types";

type RootProps = {
  navigation: any;
  MovieScreen: {
    movie: Film;
  };
};

type MovieScreenRouteProps = RouteProp<RootProps, "MovieScreen">;
const MovieScreen = () => {
  const routeParams = useRoute<MovieScreenRouteProps>().params;
  const navigation = useNavigation();
  const { data, loading, error, refetch } = useQuery(GET_MOVIE, {
    variables: { id: routeParams.movie.episodeID },
  });

  if (loading) return <LoadingIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const movie = data.film as Film;

  navigation.setOptions({ title: movie.title, headerTitleStyle: { color: "#FFE81F", fontFamily: "Strjmono" } });

  const renderItem = ({ item }: any) => {
    console.log("🚀 ~ file: MovieScreen.tsx:34 ~ renderItem ~ item", item);
    return (
      // <View style={styles.item}>
      <Pressable style={styles.item} onPress={() => navigation.navigate("Character", { character: item })}>
        <Text style={styles.card_title}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{movie.title}</Text> */}
      <View style={styles.informationContainer}>
        <Text style={styles.card_subtitle}>
          {/* <FontAwesome name="calendar" size={24} color="#FFE81F" /> */}
          Release Date: {movie.releaseDate}
        </Text>
        <Text style={styles.card_subtitle}>Species Count: {movie.speciesConnection.totalCount}</Text>
        <Text style={styles.card_subtitle}>Planet Count: {movie.planetConnection.totalCount}</Text>
        <Text style={styles.card_subtitle}>Vehicles Count: {movie.vehicleConnection.totalCount}</Text>
        <View style={styles.list}>
          <Text style={styles.card_subtitle}>Characters:</Text>
          <FlashList
            // ListHeaderComponent={() => (
            //   <Text style={styles.card_subtitle}>Characters</Text>
            // )}
            // onRefresh={refetch}
            // refreshing={loading}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            data={movie.characterConnection.characters}
            estimatedItemSize={movie.characterConnection.totalCount || 10}
          />
        </View>
      </View>
    </View>
  );
};

export default MovieScreen;

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
    // alignSelf: "center",
    height: "100%",
    width: "100%",
  },
  card_title: {
    fontSize: 18,
    fontWeight: "bold",
    // fontFamily: "Strjmono",
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
