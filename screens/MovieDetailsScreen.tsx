import { Dimensions, Image, StyleSheet } from "react-native";

import { useQuery } from "@apollo/client";
import CharacterListItem from "@components/CharacterListItem";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { Text, View } from "@components/Themed";
import { StorageKeys } from "@constants/Enums";
import { getData, storeData } from "@helpers/AsyncStorageHelper";
import { GET_MOVIE } from "@queries/MovieQuery";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";
import { Film, RootStackParamList } from "types";

type MovieDetailsScreenProps = RouteProp<RootStackParamList, "MovieDetails">;
const MovieDetailsScreen = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);
  const navigation = useNavigation();
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const routeParams = useRoute<MovieDetailsScreenProps>().params;
  const [likedCharacters, setLikedCharacters] = useState<string[]>([]);
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

  useEffect(() => {
    data && navigation.setOptions({ title: data.film.title, headerTitleStyle: { fontFamily: "Strjmono" } });
  }, [data]);

  const handleLikeButton = (id: string) => {
    if (!likedCharacters.includes(id)) {
      scale.value = withSpring(1, undefined, (isFinished) => {
        if (isFinished) {
          scale.value = withDelay(500, withSpring(0));
        }
      });
    }

    likedCharacters.includes(id)
      ? setLikedCharacters(likedCharacters.filter((characterId) => characterId !== id))
      : setLikedCharacters([...likedCharacters, id]);
  };

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
    opacity: opacity.value,
  }));

  if (loading) return <LoadingIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;
  const movie = data.film as Film;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          flex: 1,
          width: SIZE,
          zIndex: 5,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          bottom: 0,
          top: 0,
          right: 0,
          left: 0,
        }}
        pointerEvents="none">
        <AnimatedImage
          source={require("@assets/images/heart.png")}
          style={[
            styles.image,
            {
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.35,
              shadowRadius: 35,
            },
            imageStyle,
          ]}
          resizeMode={"center"}
        />
      </Animated.View>
      <View style={styles.informationContainer}>
        <View style={styles.list}>
          <FlashList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={{ paddingVertical: 10 }}>
                <Text style={styles.card_subtitle}>Planet Count: {movie.planetConnection.totalCount}</Text>
                <Text style={styles.card_subtitle}>Release Date: {movie.releaseDate}</Text>
                <Text style={styles.card_subtitle}>Species Count: {movie.speciesConnection.totalCount}</Text>
                <Text style={styles.card_subtitle}>Vehicles Count: {movie.vehicleConnection.totalCount}</Text>
                <Text style={[styles.card_subtitle, { paddingTop: 6 }]}>Opening Scroll:</Text>
                <Text style={[styles.card_subtitle, { fontSize: 14, paddingBottom: 10 }]}>{movie.openingCrawl}</Text>
                <Text style={[styles.card_subtitle, { paddingTop: 10 }]}>Characters:</Text>
              </View>
            )}
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

const { width: SIZE } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 20,
  },
  image: {
    width: SIZE,
    height: SIZE,
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
    // color: "#FFE81F",
  },
  card_subtitle: {
    fontSize: 18,
    // color: "#FFE81F",
  },
  card_description: {
    fontSize: 18,
    paddingTop: 4,
  },
});

export default MovieDetailsScreen;
