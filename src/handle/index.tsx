import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IHandle {

}

export default function Handle({ distance, bottomSheetProperties
}: IHandle) {
  return (
    <View style={styles.header}>
      <Text>{JSON.stringify(`${distance.distance === undefined ? 0 : distance.distance} km`, null, 2)}</Text>
      <Text>{JSON.stringify(`${distance.duration === undefined ? 0 : distance.duration} min`, null, 2)}</Text>
      <Text >Places Near you ({bottomSheetProperties.length})</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  "container": {
    "flex": 1,
    "alignItems": `center`,
    "justifyContent": `center`

  },

  "body": {
    "justifyContent": `center`,
    "alignItems": `center`
  },
  "text": {
    "fontSize": 20,
    "fontWeight": `bold`
  },
  "contentContainerStyle": {
    "padding": 16,
    "backgroundColor": `#5e6fc4`
  },
  "header": {
    "alignItems": `center`,
    "backgroundColor": `lightblue`,
    "paddingVertical": 20,
    "borderTopLeftRadius": 20,
    "borderTopRightRadius": 20
  },

  "item": {
    "padding": 50,
    "justifyContent": `center`,
    "backgroundColor": `white`,
    "alignItems": `center`,
    "marginVertical": 10
  },

  "panelHandle": {
    "width": 40,
    "height": 6,
    "backgroundColor": `rgba(0,0,0,0.3)`,
    "borderRadius": 4,
    "marginBottom": 10
  }
});
