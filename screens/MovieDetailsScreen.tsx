import { Image } from "react-native";

import { useQuery } from "@apollo/client";
import CharacterListItem from "@components/CharacterListItem";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { MonoTextDescription, MonoTextSubtitle } from "@components/StyledText";
import { Text, View } from "@components/Themed";
import { StorageKeys } from "@constants/Enums";
import { getData, storeData } from "@helpers/AsyncStorageHelper";
import { GET_MOVIE } from "@queries/MovieQuery";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { AnimatedStyles, ComponentStyles, ListStyles } from "@styles/ComponentStyles";
import { useEffect, useState } from "react";
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";
import { Film, RootStackParamList } from "types";

type MovieDetailsScreenProps = RouteProp<RootStackParamList, "MovieDetails">;
const MovieDetailsScreen = () => {
  const navigation = useNavigation();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);
  // const expanded = useSharedValue(false);
  // const height = useSharedValue(0);
  // const rotation = useSharedValue(0);
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const routeParams = useRoute<MovieDetailsScreenProps>().params;
  const [likedCharacters, setLikedCharacters] = useState<string[]>([]);
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: { id: routeParams.movie_id },
  });

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
    opacity: opacity.value,
  }));

  // const animatedStyles = useAnimatedStyle(() => ({
  //   height: height.value, //change the height property of the component
  // }));

  // const animatedRotationStyle = useAnimatedStyle(() => ({
  //   transform: [{ rotate: `${rotation.value}deg` }],
  // }));

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

  // const handleExpandButton = () => {
  //   expanded.value = !expanded.value;
  //   rotation.value = 90;
  //   // withTiming(expanded.value ? 0 : 90, {
  //   //   duration: 300,
  //   //   easing: Easing.in(Easing.linear),
  //   // });
  //   height.value = withTiming(expanded.value ? 0 : 300, {
  //     duration: 300,
  //     easing: Easing.in(Easing.linear),
  //   });

  //   console.log(rotation.value);
  // };

  if (loading) return <LoadingIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;
  const movie = data.film as Film;

  return (
    <View style={ComponentStyles.container}>
      <Animated.View style={AnimatedStyles.container} pointerEvents="none">
        <AnimatedImage
          source={require("@assets/images/heart.png")}
          style={[AnimatedStyles.container, imageStyle]}
          resizeMode={"center"}
        />
      </Animated.View>
      <View style={ComponentStyles.section}>
        <View style={ListStyles.listContainer}>
          <FlashList
            renderItem={(item) => CharacterListItem({ item, likedCharacters, handleLikeButton, navigation })}
            keyExtractor={(item) => item.id.toString()}
            data={movie.characterConnection.characters}
            estimatedItemSize={movie.characterConnection.totalCount || 10}
            extraData={likedCharacters}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <MonoTextSubtitle bold>
                  Planet Count: <MonoTextDescription>{movie.planetConnection.totalCount}</MonoTextDescription>
                </MonoTextSubtitle>
                <MonoTextSubtitle bold>
                  Release Date: <MonoTextDescription>{movie.releaseDate}</MonoTextDescription>
                </MonoTextSubtitle>
                <MonoTextSubtitle bold>
                  Species Count: <MonoTextDescription>{movie.speciesConnection.totalCount}</MonoTextDescription>
                </MonoTextSubtitle>
                <MonoTextSubtitle bold>
                  Vehicles Count: <MonoTextDescription>{movie.vehicleConnection.totalCount}</MonoTextDescription>
                </MonoTextSubtitle>
                {/* <Pressable onPress={handleExpandButton}>
                    <Animated.View style={{ flex: 1, flexDirection: "row" }}>
                      <FontAwesome
                        name="chevron-right"
                        size={18}
                        color={Colors.starWars.text}
                        style={[{ marginTop: 4 }, animatedRotationStyle]}
                      />
                      <MonoTextSubtitle bold style={[{ paddingHorizontal: 4 }]}>
                        Opening Scroll:
                      </MonoTextSubtitle>
                    </Animated.View>
                  </Pressable> */}
                {/* Collapsible Text  */}
                <MonoTextSubtitle bold>Opening Scroll:</MonoTextSubtitle>
                <Animated.ScrollView entering={FadeIn.duration(500)} exiting={FadeIn} style={[{ overflow: "hidden" }]}>
                  <MonoTextDescription style={{ fontSize: 14, paddingLeft: 10 }}>{movie.openingCrawl}</MonoTextDescription>
                </Animated.ScrollView>
                <MonoTextSubtitle bold style={{ paddingTop: 10 }}>
                  Characters:
                </MonoTextSubtitle>
              </>
            }
          />
        </View>
      </View>
    </View>
  );
};

export default MovieDetailsScreen;
