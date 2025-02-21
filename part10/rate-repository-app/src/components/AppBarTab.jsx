import React from "react";
import { Pressable, Text } from "react-native";

export const AppBarTab = ({style, text}) => {
  return (
    <Pressable>
      <Text style={style}>{text}</Text>
    </Pressable>
  );
};
