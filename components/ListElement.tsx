import { Pressable, StyleSheet, Text } from "react-native";

// return jsx element

export const ListElement: React.FC<{ item: any }> = ({ item }) => {
  return (
    <Pressable onPress={() => console.log("Pressed: ", item)} style={styles.item}>
      {/* <View style={styles.top}> */}
      <Text style={styles.card_title}>{item.title}</Text>
      <Text style={styles.card_subtitle}>{item.releaseDate}</Text>
      {/* </View> */}
      <Text style={styles.card_description}>{item.openingCrawl.substring(0, 50)}...</Text>
    </Pressable>
  );
};
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
