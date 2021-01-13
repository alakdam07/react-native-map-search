import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import mockList from '../src/helpers/mockList';
import FaceBook from '../FaceBook';
import { Uber } from '../mapSkin/Uber'
//import MapView from "react-native-map-clustering";
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import datas from '../data/task.json';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import styled from 'styled-components';
import { GOOGLE_MAPS_APIKEY, filterPropertiesInRegion } from '../utilities/index';
import Animated, { Extrapolate, Value, interpolate } from 'react-native-reanimated';
import { getDistance, getPreciseDistance } from 'geolib';

const { height } = Dimensions.get(`window`);


const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

const MainMap = () => {
  const bottomSheetRef = React.useRef<ScrollBottomSheet<any> | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [bottomSheetProperties, setBottomSheetProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState(``);
  const [searchBarIsFocussed, setSearchBarIsFocussed] = useState(false);
  const [distance, setDistance] = useState({
    "distance": undefined,
    "duration": undefined
  });
  const animatedPosition = React.useRef(new Value(0));
  const opacity = interpolate(animatedPosition.current, {
    "inputRange": [0, 1],
    "outputRange": [0, 0.75],
    "extrapolate": Extrapolate.CLAMP
  });

  const getSearchResults = () => {
    return datas?.data.filter((list) => {
      return list?.Property?.toLowerCase().includes(searchTerm?.toLowerCase());
    });
  };

  const [state, setstate] = useState({
    "latitude": 60.1098678,
    "longitude": 24.7385084,
    "latitudeDelta": 1,
    "longitudeDelta": 1
  });

  useEffect(() => {
    _onMapReady();
  }, [_onMapReady]);

  const _onMapReady = useCallback(async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== `granted`) {
      // console.log(`Permisson Denied`);
    }
    const location = await Location.getCurrentPositionAsync({ "accuracy": Location.Accuracy.Low });
    setstate({
      ...state,
      "latitude": location.coords.latitude,
      "longitude": location.coords.longitude
    });
    // console.log(`This is current location`, location.coords.latitude, location.coords.longitude);
    setIsLoadingLocation(false);
  }, [state]);


  const { latitude, longitude } = state;

  const onRegionChangeComplete = (region) => {
    const propertiesInRegion = filterPropertiesInRegion(region, datas?.data)
      .map((location) => {
        const dis = getPreciseDistance(
          { "latitude": location.location.lat, "longitude": location.location.lng },
          { latitude, longitude }

        );
        return {
          ...location,
          "distance": dis / 1000
        };
      });

    setBottomSheetProperties(
      propertiesInRegion
    );
  };

  const mapRef = React.useRef(null);
  useEffect(() => {
    animateToRegion();
  },
    [state, animateToRegion]);
  const animateToRegion = useCallback(() => {
    mapRef?.current?.animateToRegion(state, 1000);
  }, [state]);



  return (
    <>
      <View style={styles.container}>
        <FaceBook

        />
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={state}
          ref={mapRef}
          showsIndoors={true}
          showsMyLocationButton={true}
          zoomControlEnabled={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          showsScale={true}
          onRegionChangeComplete={onRegionChangeComplete}
          showsBuildings={true}
          showsUserLocation={true}
          mapPadding={{ "top": 0, "left": 0, "bottom": 220, "right": 0 }}
          showsCompass={true}
          onMapReady={_onMapReady}
          customMapStyle={Uber}
          style={styles.mapStyle}
        >

        </MapView>
      </View>
    </>
  )
}

export default MainMap;

// const App = () => {
//   const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
//   const [searchedTerm, setSearchedTerm] = useState('');

//   const clampedScroll = Animated.diffClamp(
//     Animated.add(
//       scrollYValue.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, 1],
//         extrapolateLeft: 'clamp',
//       }),
//       new Animated.Value(0),
//     ),
//     0,
//     50,
//   )
//   const usersList = useMemo(() => {
//     if (searchedTerm.length === 0) {
//       return mockList;
//     }
//     const list = mockList.filter((name) => {
//       return name.includes(searchedTerm)
//     });
//     return list;
//   }, [searchedTerm])
//   return (
//     <Animated.View style={{
//       backgroundColor: 'white',
//       flex: 1,
//     }}>
//       <StatusBar barStyle="dark-content" backgroundColor='white' translucent={true} />
//       <View style={{ height: Platform.OS === 'ios' ? StatusBar.currentHeight + 50 : 30 }}></View>
//       <View style={{ position: 'relative' }}>
//         {Platform.OS === 'ios' && (
//           <SearchComponent searchedTerm={searchedTerm} setSearchedTerm={setSearchedTerm} clampedScroll={clampedScroll} />
//         )}
//         <Animated.ScrollView
//           stickyHeaderIndices={Platform.OS === 'android' ? [0] : []}
//           showsVerticalScrollIndicator={false}
//           style={{
//             backgroundColor: 'white',
//             paddingTop: Platform.OS === 'ios' ? 70 : 0
//           }}
//           contentContainerStyle={{
//             display: 'flex',
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             justifyContent: 'space-around',
//             backgroundColor: 'white',
//           }}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
//             { useNativeDriver: true },
//             () => { },          // Optional async listener
//           )}>
//           {/* {Platform.OS === 'android' && (
//             <SearchComponent searchedTerm={searchedTerm} setSearchedTerm={setSearchedTerm} clampedScroll={clampedScroll} />
//           )} */}
//           {usersList.length === 0 && <Text style={{ textAlign: 'center', width: deviceWidth, fontSize: 18, paddingTop: 20 }}>No results for {searchedTerm}</Text>}
//           {usersList.map((name, index) => <NameListItem key={index} name={name} />)}
//           <View style={{ height: deviceHeight * 0.5 }}></View>
//         </Animated.ScrollView>
//       </View>
//     </Animated.View>
//   );
// };

// export default App;
const styles = StyleSheet.create({
  "container": {
    "flex": 1
  },
  "mapStyle": {
    flex: 1,
    "height": Dimensions.get(`window`).height,
    "width": Dimensions.get(`window`).width

  }
})
