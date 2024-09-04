import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons';
import { IconProps } from '@react-native-vector-icons/common';
interface IconButtonProps {
  name: any;
  size: number;
  color: string | undefined;
  onPress?: () => void;
}

const IconButton = ({ name, size, color, onPress }: IconButtonProps) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.buttonContainer}>
        <Ionicons
          name={name}
          color={color}
          size={size}
        />
      </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },

  pressed: {
    opacity: 0.75,

  }

})