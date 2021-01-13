
// Import react
import React, { useMemo, useState, useEffect, Platform } from 'react';
import SearchComponent from './src/SearchComponent';
// Import react-native components
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native'

// Import react-native-vector-icons
// from "https://github.com/oblador/react-native-vector-icons"
import Icon from 'react-native-vector-icons/FontAwesome5'
import mockList from './src/helpers/mockList';

console.log(mockList);

// Import react-native-reanimated
// from "https://github.com/software-mansion/react-native-reanimated"
import Animated, { Easing } from 'react-native-reanimated'
const { Value, timing } = Animated

// Calculate window size
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function Text() {
  const [state, setstate] = useState({

  })
  return (
    <SafeAreaView style={styles.header_safe_area}>
    <View style={styles.header}>
      <View style={styles.header_inner}>
        <View>
          <Image
            source={require('./assets/icon.png')}
            style={{ width: 152, height: 30 }}
          />
        </View>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={"#ccd0d5"}
          onPress={_onFocus}
          style={styles.search_icon_box}
        >
          <Icon name="search" size={22} color="#000000" />
        </TouchableHighlight>
        <Animated.View
          style={[styles.input_box, { transform: [{ translateX: _input_box_translate_x }] }]}
        >
          <Animated.View style={{ opacity: _back_button_opacity }}>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor={"#ccd0d5"}
              onPress={this._onBlur}
              style={styles.back_icon_box}
            >
              <Icon name="chevron-left" size={22} color="#000000" />
            </TouchableHighlight>
          </Animated.View>
          <TextInput
            ref="input"
            placeholder="Search Facebook"
            clearButtonMode="always"
            value={this.state.keyword}
            onChangeText={(value) => this.setState({ keyword: value })}
            style={styles.input}
          />
        </Animated.View>
      </View>
    </View>
  </SafeAreaView>

  <Animated.View style={[styles.content, { opacity: this._content_opacity, transform: [{ translateY: this._content_translate_y }] }]}>
    <SafeAreaView style={styles.content_safe_area}>
      <View style={styles.content_inner}>
        <View style={styles.separator} />
        {
          this.state.keyword === ''
            ?
            <View style={styles.image_placeholder_container}>
              <Image
                source={require('./assets/icon.png')}
                style={styles.image_placeholder}
              />
              <Text style={styles.image_placeholder_text}>
                  Enter a few words{"\n"}
                to search on Facebook
              </Text>
            </View>
            :
            <ScrollView>
              {mockList?.map(i => {
                return <View style={styles.search_item}>
                  <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                  <Text>{i}</Text>
                </View>
              })}

            </ScrollView>
        }
      </View>
    </SafeAreaView>
  </Animated.View>
  )
}



const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000
  },
  header: {
    height: 50,
    paddingHorizontal: 16
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  },
  search_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    width: width - 32
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15
  },
  content: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: 'white'
  },
  content_inner: {
    flex: 1,
    paddingTop: 50
  },
  separator: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#e6e4eb'
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-50%'
  },
  image_placeholder: {
    width: 150,
    height: 113,
    alignSelf: 'center'
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5
  },
  search_item: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e4eb',
    marginLeft: 16
  },
  item_icon: {
    marginRight: 15
  }
})
