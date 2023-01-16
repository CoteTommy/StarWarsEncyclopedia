import { Pressable, StyleSheet } from "react-native";

import { useQuery } from "@apollo/client";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { Text, View } from "@components/Themed";
import { LikedStatus, StorageKeys } from "@constants/Enums";
import { FontAwesome } from "@expo/vector-icons";
import { getData, storeData } from "@helpers/AsyncStorageHelper";
import { GET_ALL_CHARACTERS } from "@queries/CharacterQuery";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { Person, RootTabScreenProps } from "types";


// type RootProps = {
//   navigation: any;
//   CharacterScreen: {
//     character: Person;
//   };
// };

// type CharacterScreenRouteProps = RouteProp<RootProps, "CharacterScreen">;
// const CharacterScreen = () => {
//   const routeParams = useRoute<CharacterScreenRouteProps>().params;
//   const navigation = useNavigation();
export default function CharacterScreen({ navigation: _navigation }: RootTabScreenProps<"Character">) {
  const { data: queryData, loading, error, refetch } = useQuery(GET_ALL_CHARACTERS);
  const [likedCharacters, setLikedCharacters] = useState<string[]>([]);

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

  const data = queryData?.allPeople?.people || [];

  if (loading) return <LoadingIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderItem = ({ item }: { item: Person }) => {
    console.log("🚀 ~ file: CharacterScreen.tsx:19 ~ renderItem ~ person", item);
    return (
      // <Pressable onPress={() => _navigation.navigate("MovieDetail", { movieId: item.id })}>
      // <View >
      <Pressable onPress={() => console.log("Pressed: ", item)} style={styles.item}>
        {/* <View style={styles.top}> */}
        <Text style={styles.card_title}>{item.name}</Text>
        <Text style={styles.card_subtitle}>Birth year: {item.birthYear}</Text>
        <Text style={styles.card_subtitle}>Amount of movies: {item.filmConnection.films.length}</Text>
        {/* </View> */}
        <Text style={styles.card_description}></Text>
        <Pressable style={{ alignSelf: "flex-end" }} onPress={() => handleLikeButton(item.id)} hitSlop={10}>
          <FontAwesome
            name={likedCharacters.includes(item.id) ? LikedStatus.Liked : LikedStatus.NotLiked}
            size={24}
            color="#FFE81F"
          />
        </Pressable>
      </Pressable>
      // </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Movie List</Text> */}
      <View style={styles.list}>
        <FlashList
          onRefresh={refetch}
          refreshing={loading}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id.toString()}
          data={data}
          estimatedItemSize={queryData.allPeople.totalCount || 10}
          extraData={likedCharacters}
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
    fontSize: 28,
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
    // fontFamily: "Strjmono",
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