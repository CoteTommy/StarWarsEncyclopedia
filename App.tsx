import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Strjmono: require("./assets/fonts/Strjmono.ttf"),
  });

  // Apollo Client initialization
  const client = new ApolloClient({
    uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
    // uri: "https://graphql.org/swapi-graphql",
    cache: new InMemoryCache(),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}
