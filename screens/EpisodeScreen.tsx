import { Pressable, StyleProp, StyleSheet, TextStyle } from "react-native";

import { useQuery } from "@apollo/client";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { Text, View } from "@components/Themed";
import { GET_ALL_MOVIES } from "@queries/MovieQuery";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
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
        <Pressable onPress={() => sortMovies()}>
          <Text style={[styles.card_title, { paddingRight: 10 }]}>{sortedMovies.ascending ? "Asc" : "Desc"}</Text>
        </Pressable>
      ),
      headerTitleStyle: { ...styles.card_title, fontFamily: "Strjmono" },
    });
  }, [sortedMovies]);

  if (loading) return <LoadingIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderItem = ({ item: movie }: any) => {
    return (
      <Pressable onPress={() => navigation.navigate("MovieDetails", { movie_id: movie.episodeID })} style={styles.item}>
        <Text style={styles.card_title}>{movie.title}</Text>
        <Text style={styles.card_subtitle}>{movie.releaseDate}</Text>
        <Text style={styles.card_description}>{movie?.openingCrawl?.substring(0, 50).replace(/\r\n/g, " ")}...</Text>
      </Pressable>
    );
  };

  const sortOptionStyle = (sortBy: sortbyEnum): StyleProp<TextStyle> => {
    return [
      styles.card_subtitle,
      { fontWeight: sortedMovies.sortBy === sortBy ? "bold" : "normal" },
    ] as StyleProp<TextStyle>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlashList
          ListHeaderComponent={
            <View style={styles.header}>
              <Pressable onPress={() => sortMovies(sortbyEnum.title, sortedMovies.ascending)}>
                <Text style={sortOptionStyle(sortbyEnum.title)}>Sort by title</Text>
              </Pressable>
              <Pressable onPress={() => sortMovies(sortbyEnum.releaseDate, sortedMovies.ascending)}>
                <Text style={sortOptionStyle(sortbyEnum.releaseDate)}>Sort by release date</Text>
              </Pressable>
            </View>
          }
          onRefresh={refetch}
          refreshing={loading}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.episodeID.toString()}
          data={sortedMovies.movies}
          estimatedItemSize={data.allFilms.totalCount || 10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 20,
  },
  separator: {
    height: 1,
    marginBottom: 10,
    marginTop: 30,
    width: "80%",
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
    alignSelf: "center",
    height: "100%",
    width: "95%",
  },
  card_title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Strjmono",
  },
  card_subtitle: {
    fontSize: 18,
  },
  card_description: {
    fontSize: 18,
    paddingTop: 4,
  },
});

export default EpisodeScreen;
