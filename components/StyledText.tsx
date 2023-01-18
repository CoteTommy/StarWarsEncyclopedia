import Colors from "@colors";
import { ListStyles } from "@styles/ComponentStyles";
import { Text, TextProps } from "./Themed";

type MonoTextProps = TextProps & { bold?: boolean };

export function MonoText(props: MonoTextProps) {
  return <Text {...props} style={[props.style, { fontFamily: props.bold ? "space-mono-bold" : "space-mono" }]} />;
}

export function MonoTextTitle(props: MonoTextProps) {
  return <MonoText {...props} style={[ListStyles.card_title, props.style]} />;
}

export function MonoTextSubtitle(props: MonoTextProps) {
  return <MonoText {...props} style={[ListStyles.card_subtitle, props.style]} />;
}

export function MonoTextDescription(props: MonoTextProps) {
  return <MonoText {...props} style={[ListStyles.card_description, props.style]} />;
}

export function StarWarsText(props: TextProps) {
  // Put the color first, so it can be overwritten
  return <Text {...props} style={[{ color: Colors.starWars.text }, props.style, { fontFamily: "Strjmono" }]} />;
}
