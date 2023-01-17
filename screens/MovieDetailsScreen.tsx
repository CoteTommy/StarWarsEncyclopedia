import { StyleSheet, Text } from "react-native";

import { useQuery } from "@apollo/client";
import CharacterListItem from "@components/CharacterListItem";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { View } from "@components/Themed";
import { StorageKeys } from "@constants/Enums";
import { getData, storeData } from "@helpers/AsyncStorageHelper";
import { GET_MOVIE } from "@queries/MovieQuery";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { Film, RootStackParamList } from "types";

type MovieDetailsScreenProps = RouteProp<RootStackParamList, "MovieDetails">;
const MovieDetailsScreen = () => {
  const navigation = useNavigation();
  const routeParams = useRoute<MovieDetailsScreenProps>().params;
  const [likedCharacters, setLikedCharacters] = useState<string[]>([]);
  // const rrr = useRef(null);

  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: { id: routeParams.movie_id },
  });

  useEffect(() => {
    getData(StorageKeys.LikedCharacters).then((data: string[] | undefined) => {
      setLikedCharacters(data || []);
    });
  }, []);

  useEffect(() => {
    storeData(StorageKeys.LikedCharacters, likedCharacters.join(","));
  }, [likedCharacters]);

  const handleLikeButton = (id: string) => {
    likedCharacters.includes(id)
      ? setLikedCharacters(likedCharacters.filter((characterId) => characterId !== id))
      : setLikedCharacters([...likedCharacters, id]);
  };

  useEffect(() => {
    data &&
      navigation.setOptions({ title: data.film.title, headerTitleStyle: { color: "#FFE81F", fontFamily: "Strjmono" } });
  }, [data]);

  if (loading) return <LoadingIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;
  const movie = data.film as Film;

  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        <Text style={styles.card_subtitle}>Planet Count: {movie.planetConnection.totalCount}</Text>
        <Text style={styles.card_subtitle}>Release Date: {movie.releaseDate}</Text>
        <Text style={styles.card_subtitle}>Species Count: {movie.speciesConnection.totalCount}</Text>
        <Text style={styles.card_subtitle}>Vehicles Count: {movie.vehicleConnection.totalCount}</Text>
        <View style={styles.list}>
          <Text style={styles.card_subtitle}>Characters:</Text>
          <FlashList
            renderItem={(item) => CharacterListItem({ item, likedCharacters, handleLikeButton, navigation })}
            keyExtractor={(item) => item.id.toString()}
            data={movie.characterConnection.characters}
            estimatedItemSize={movie.characterConnection.totalCount || 10}
            extraData={likedCharacters}
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

export default MovieDetailsScreen;
