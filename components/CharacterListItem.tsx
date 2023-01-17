import { LikedStatus } from "@constants/Enums";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Person } from "types";

interface Props {
  item: { item: Person };
  likedCharacters: string[];
  handleLikeButton: (id: string) => void;
  navigation: any;
}

const CharacterListItem: React.FC<Props> = ({ item, likedCharacters, handleLikeButton, navigation }): JSX.Element => {
  const character = item.item;
  const singleTap = Gesture.Tap()
    .runOnJS(true)
    .maxDuration(300)
    .onStart(() => {
      navigation.navigate("CharacterDetails", { character_id: character.id });
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .runOnJS(true)
    .maxDuration(300)
    .onStart(() => {
      handleLikeButton(character.id);
    });

  return (
    <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
      <View style={styles.item}>
        <Text style={styles.card_title}>{character.name}</Text>
        <Pressable
          style={{ alignSelf: "flex-end", zIndex: 100 }}
          onPress={() => handleLikeButton(character.id)}
          hitSlop={10}>
          <FontAwesome
            name={likedCharacters.includes(character.id) ? LikedStatus.Liked : LikedStatus.NotLiked}
            size={24}
            color="#FFE81F"
          />
        </Pressable>
      </View>
    </GestureDetector>
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

export default CharacterListItem;
