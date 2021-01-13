import React from 'react';
import { Dimensions, View, Text, TouchableOpacity, Alert } from 'react-native';
export const deviceWidth = Dimensions.get('window').width;

const NameListItem = ({ name, navigation }) => (
  <View style={{
    height: 60,
    width: deviceWidth,
    marginLeft: 40,
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
    justifyContent: 'center'
  }}>
    <TouchableOpacity onPress={() => alert('Thank you')} >
      <Text style={{ fontSize: 18, fontWeight: '700' }}>{name}</Text>
    </TouchableOpacity>
  </View>
)


export default NameListItem;
