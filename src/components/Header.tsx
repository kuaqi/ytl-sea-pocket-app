import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../navigation/StackNavigator";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const Colour = {
  PRIMARY: '#01A2DA',
  SECONDARY: '#C4D4DA',
  PRIMARYTEXT: '#393939',
}

interface Props {
  onToggleVisibility: () => void,
}

export default function Header({ onToggleVisibility }: Props) {
  const navigation = useNavigation<StackNavigation>()

  function onBackPress() {
    navigation.goBack()
  }

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={[styles.iconContainer, styles.iconLeftContainer]}>
          <TouchableOpacity 
            onPress={onBackPress}
            style={styles.pressableRadiusContainer}>
            <AntDesignIcon name="back" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View style={[styles.iconContainer, styles.iconRightContainer]}>
         <TouchableOpacity 
            onPress={onToggleVisibility}
            style={styles.pressableRadiusContainer}>
            <AntDesignIcon name="eye" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colour.PRIMARY,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  iconLeftContainer: {
    justifyContent: 'flex-start',
  },
  iconRightContainer: {
    justifyContent: 'flex-end',
  },
  pressableRadiusContainer: {
    padding: 16,
    borderRadius: 24,
  },
})
