import { StyleSheet } from "react-native";

import { StarWarsText } from "@components/StyledText";
import { Separator, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  // const animation = useRef(null);

  return (
    <View style={styles.container}>
      {/*       
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          marginBottom: 30,
          // backgroundColor: '#eee',
          // zIndex: -1
        }}
        source={require('@assets/starWarsAnimation.json')}
      /> */}
      <StarWarsText style={styles.title}>Star Wars Encyclopedia</StarWarsText>
      <Separator />
      {/* <Pressable style={styles.button} onPress={() => console.log("Pressed")}>
        <Text style={styles.text}>View Movies</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Character")}>
        <Text style={styles.text}>View Characters</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "600",
    // fontFamily: "Strjmono",
    textAlign: "center",
    lineHeight: 40,
    // textShadowColor: "rgba(255,232,31,0.5)",
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "rgba(255,232,31,0.3)",
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgba(255,232,31,0.3)",
    borderRadius: 5,
    height: 60,
    justifyContent: "center",
    margin: 10,
    width: "90%",
    borderColor: "#FFE81F",

    borderWidth: 2,
    marginVertical: 8,
    shadowColor: "#FFE81F",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
