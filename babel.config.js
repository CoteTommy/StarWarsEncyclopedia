module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "@assets": "./assets",
            "@components": "./components",
            "@constants": "./constants",
            "@hooks": "./hooks",
            "@screens": "./screens",
            "@queries": "./queries",
            "@helpers": "./helpers",
            "@colors": "./constants/Colors.ts",
            "@styles": "./styles",
          },
        },
      ],
    ],
  };
};
