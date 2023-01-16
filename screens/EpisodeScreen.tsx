import { Pressable, StyleSheet } from "react-native";

import { useQuery } from "@apollo/client";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { Text, View } from "@components/Themed";
import { GET_ALL_MOVIES } from "@queries/MovieQuery";
import { FlashList } from "@shopify/flash-list";
import { RootTabScreenProps } from "types";

export default function EpisodeScreen({ navigation }: RootTabScreenProps<"Episode">) {
  const { data, loading, error, refetch } = useQuery(GET_ALL_MOVIES);

  if (loading) return <LoadingIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderItem = ({ item: movie }: any) => {
    return (
      <Pressable onPress={() => navigation.navigate("MovieDetails", { movie_id: movie.episodeID })} style={styles.item}>
        <Text style={styles.card_title}>{movie.title}</Text>
        <Text style={styles.card_subtitle}>{movie.releaseDate}</Text>
        <Text style={styles.card_description}>{movie?.openingCrawl?.substring(0, 50)}...</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlashList
          onRefresh={refetch}
          refreshing={loading}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.episodeID.toString()}
          data={data.allFilms.films}
          estimatedItemSize={data.allFilms.totalCount || 10}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
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
    shadowOpacity: 0.3,
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
    // alignSelf: "flex-end",
    // float: "right",
    fontSize: 18,
  },
  card_description: {
    fontSize: 18,
    paddingTop: 4,
  },
  // top: {
  //   backgroundColor: "transparent",
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // }
});
