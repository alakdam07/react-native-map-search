// Import react
import React, { useMemo, useState, useEffect, Platform } from 'react';
import SearchComponent from './src/SearchComponent';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import NameListItem, { deviceWidth } from './src/NameListItem';
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



// Import react-native-reanimated
// from "https://github.com/software-mansion/react-native-reanimated"
import Animated, { Easing } from 'react-native-reanimated'
const { Value, timing } = Animated

// Calculate window size
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}
// Declare component
class FBSearchBar extends React.Component {
  constructor(props) {
    super(props)
    // state
    this.state = {
      isFocused: false,
      keyword: '',
    }
    // animation values
    this._input_box_translate_x = new Value(width)
    this._back_button_opacity = new Value(0)
    this._content_translate_y = new Value(height)
    this._content_opacity = new Value(0)
  }


  list = () => {
    if (this.state.keyword.length === 0) {
      return mockList;
    }
    const lists = mockList.filter((name) => {
      return name.toLowerCase().includes(this.state.keyword.toLowerCase())
    });
    return lists;
  }







  _onFocus = () => {
    // update state
    this.setState({ isFocused: true })
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }


    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start()
    timing(this._back_button_opacity, back_button_opacity_config).start()
    timing(this._content_translate_y, content_translate_y_config).start()
    timing(this._content_opacity, content_opacity_config).start()

    // force focus
    this.refs.input.focus()

  }



  _onBlur = () => {
    // update state
    this.setState({ isFocused: false })
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: Easing.inOut(Easing.ease)
    }
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: Easing.inOut(Easing.ease)
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start()
    timing(this._back_button_opacity, back_button_opacity_config).start()
    timing(this._content_translate_y, content_translate_y_config).start()
    timing(this._content_opacity, content_opacity_config).start()

    // force blur
    this.refs.input.blur();

  }


  render() {

    return (
      <>
        <SafeAreaView style={styles.header_safe_area}>
          <View style={styles.header}>
            <View style={styles.header_inner}>
              <TouchableHighlight
                activeOpacity={1}
                underlayColor={"#ccd0d5"}
                onPress={this._onFocus}
                style={styles.search_icon_box}
              >
                <Icon name="search" size={22} color="#000000" />
              </TouchableHighlight>
              <Animated.View
                style={[styles.input_box, { transform: [{ translateX: this._input_box_translate_x }] }]}
              >
                <Animated.View style={{ opacity: this._back_button_opacity }}>
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
                  placeholder="Search Property"
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
                      to search on Property
                    </Text>
                  </View>
                  :
                  <ScrollView>
                    {this?.list()?.length === 0 && <Text style={{ textAlign: 'center', width: deviceWidth, fontSize: 18, paddingTop: 20 }}>No results for {this.state.keyword}</Text>}
                    {this?.list()?.map((i, index) => {
                      return <NameListItem key={index} name={i} />
                    })}

                  </ScrollView>
              }
            </View>
          </SafeAreaView>
        </Animated.View>
      </>
    )
  }
}

export default FBSearchBar

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
    top: 50,

  },
  header: {
    height: 50,
    paddingHorizontal: 16
  },
  header_inner: {
    flex: 2,
    overflow: 'hidden',
    flexDirection: 'row-reverse',
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
  mapStyle: {
    flex: 1,
    width: width,
    height: height,
  }
  ,
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
  },

})
