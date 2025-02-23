import { Platform } from "react-native";

const fontChoice = () => {
  if (Platform.OS === "android") {
    return "Roboto";
  } else if (Platform.OS === "ios") {
    return "Arial";
  } else {
    return "system-ui";
  }
};

export const theme = {
  colors: {
    headerBackground: "red",
    color: "white",
    mainBackground: "#e1e4e8",
    // ...
  },
  fonts: {
    fontSelection: fontChoice(),
  },
};
