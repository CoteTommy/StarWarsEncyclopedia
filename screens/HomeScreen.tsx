import { StyleSheet } from "react-native";

import { StarWarsText } from "@components/StyledText";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { Separator, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  const animation = useRef(null);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          marginBottom: 30,
        }}
        source={require("@assets/starWarsAnimation2.json")}
      />
      <StarWarsText style={styles.title}>Star Wars Encyclopedia</StarWarsText>
      <Separator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 40,
  },
});

export default HomeScreen;
