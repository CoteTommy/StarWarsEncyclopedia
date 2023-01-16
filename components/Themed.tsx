/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, StyleSheet } from "react-native";

import Colors from "@colors";
import useColorScheme from "@hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  // Not used for now since I only want dark mode
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[styles.text, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  // Not used for now since I only want dark mode
  // const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return <DefaultView style={[styles.view, style]} {...otherProps} />;
}

export function Separator(props: ViewProps) {
  return <View {...props} style={[styles.separator, props.style]} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "80%",
    height: 1,
    backgroundColor: Colors.starWars.accent,
  },
  view: {
    backgroundColor: Colors.starWars.background,
  },
  text: {
    color: Colors.starWars.text,
  },
});