import Colors from '@colors';
import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export function StarWarsText(props: TextProps) {
  // Put the color first, so it can be overwritten
  return <Text {...props} style={[{color: Colors.starWars.text}, props.style, { fontFamily: 'Strjmono' }]} />;
}
