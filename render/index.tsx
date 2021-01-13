import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IRender {
  item: any;
}

export default function Render({ item }: IRender) {
  // console.log(item);

  return (
    <View>
      <View style={styles.item}>
        <TouchableOpacity>
          <Text>{item.Property}</Text>
          <Text>{item.distance} km</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  "item": {
    "padding": 50,
    "justifyContent": `center`,
    "backgroundColor": `white`,
    "alignItems": `center`,
    "marginVertical": 10
  }
});
