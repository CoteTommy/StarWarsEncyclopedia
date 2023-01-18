import { Pressable, StyleSheet, TouchableOpacity } from "react-native";

import { useQuery } from "@apollo/client";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { MonoTextDescription, MonoTextSubtitle, MonoTextTitle, StarWarsText } from "@components/StyledText";
import { Text, View } from "@components/Themed";
import { GET_ALL_MOVIES } from "@queries/MovieQuery";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { ComponentStyles, ListStyles, ModifierStyles } from "@styles/ComponentStyles";
import { useEffect, useState } from "react";
import { Film } from "types";

enum sortbyEnum {
  episodeID = "episodeID",
  title = "title",
  releaseDate = "releaseDate",
}

const EpisodeScreen = () => {
  const navigation = useNavigation();
  const [sortedMovies, setSortedMovies] = useState({
    ascending: true,
    sortBy: sortbyEnum.title,
    movies: [],
  });
  const { data, loading, error, refetch } = useQuery(GET_ALL_MOVIES, {
    onCompleted: (data) => {
      setSortedMovies({ ...sortedMovies, movies: data.allFilms.films });
    },
  });

  const sortMovies = (sortBy: sortbyEnum = sortedMovies.sortBy, ascending: boolean = !sortedMovies.ascending) => {
    const movies = [...sortedMovies.movies].sort((a: Film, b: Film) => {
      if (a[sortBy as keyof Film] > b[sortBy as keyof Film]) {
        return ascending ? 1 : -1;
      } else if (a[sortBy as keyof Film] < b[sortBy as keyof Film]) {
        return ascending ? -1 : 1;
      } else {
        return 0;
      }
    });
    setSortedMovies({ ascending, sortBy, movies });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => sortMovies()}>
          <StarWarsText style={[ListStyles.card_title, { paddingRight: 10 }]}>
            {sortedMovies.ascending ? "Asc" : "Desc"}
          </StarWarsText>
        </TouchableOpacity>
      ),
      headerTitleStyle: { ...ListStyles.card_title, fontFamily: "Strjmono" },
    });
  }, [sortedMovies]);

  const renderItem = ({ item: movie }: any) => {
    return (
      <Pressable onPress={() => navigation.navigate("MovieDetails", { movie_id: movie.episodeID })} style={ListStyles.card}>
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

  return (
    <View style={ComponentStyles.container}>
      <View style={ListStyles.listContainer}>
        <FlashList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => sortMovies(sortbyEnum.title, sortedMovies.ascending)}
                style={[sortedMovies.sortBy === sortbyEnum.title && ModifierStyles.shadow]}>
                <MonoTextDescription
                  bold={sortedMovies.sortBy === sortbyEnum.title}
                  style={[sortedMovies.sortBy === sortbyEnum.title && ModifierStyles.shadow]}>
                  Sort by title
                </MonoTextDescription>
              </TouchableOpacity>
              <TouchableOpacity
                style={[sortedMovies.sortBy === sortbyEnum.releaseDate && ModifierStyles.shadow]}
                onPress={() => sortMovies(sortbyEnum.releaseDate, sortedMovies.ascending)}>
                <MonoTextDescription
                  bold={sortedMovies.sortBy === sortbyEnum.releaseDate}
                  style={[sortedMovies.sortBy === sortbyEnum.releaseDate && ModifierStyles.shadow]}>
                  Sort by release date
                </MonoTextDescription>
              </TouchableOpacity>
            </View>
          }
          onRefresh={refetch}
          refreshing={loading}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.episodeID.toString()}
          data={sortedMovies?.movies ?? []}
          estimatedItemSize={data.allFilms.totalCount || 10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
});

export default EpisodeScreen;
