
export default {
  name: "rate-repository-app",
  slug: "rate-repository-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  expo: {
    scheme: "myapp",
    name: "myapp",
    slug: "myapp",
    platforms: ["ios", "android"],
    ios: {
      bundleIdentifier: "com.example.myapp",
    },
  },
  extra: {
    env: process.env.ENV,
    // apollo_uri: process.env.APOLLO_URI
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  
};
