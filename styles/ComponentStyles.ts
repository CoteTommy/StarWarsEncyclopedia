import Colors from "@constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

export const ModifierStyles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.starWars.accent,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

// Export styleSheets to be consistent with the rest of the app
export const ComponentStyles = StyleSheet.create({
  // Component styles for the Star Wars app
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
    paddingTop:10,
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
  },
  button: {
    backgroundColor: Colors.starWars.backgroundLight,
    borderColor: Colors.starWars.accent,
    borderRadius: 100,
    borderWidth: 1,
    margin: 4,
    padding: 15,
  },
});

export const ListStyles = StyleSheet.create({
  listContainer: {
    height: "100%",
    width: "95%",
  },
  card: {
    ...ModifierStyles.shadow,
    backgroundColor: Colors.starWars.backgroundLight,
    borderColor: Colors.starWars.accent,
    borderRadius: 5,
    borderWidth: 2,
    display: "flex",
    flex: 1,
    padding: 10,
    marginVertical: 5,
  },
  card_title: {
    fontSize: 20,
  },
  card_subtitle: {
    fontSize: 18,
  },
  card_description: {
    fontSize: 16,
    // paddingTop: 4,
  },
});

export const AnimatedStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    zIndex: 5,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
  },
  image: {
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.35,
    shadowRadius: 35,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
  },
});
