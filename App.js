import 'react-native-gesture-handler';
import * as React from 'react';
import {useState, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Pressable,
  Image,
  Dimensions,
  Animated,
  Platform,
  Alert,
  PermissionsAndroid,
  BackHandler,
  Appearance,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Button, ActivityIndicator, HelperText, ProgressBar, TouchableRipple, Chip, BottomNavigation, Appbar, RadioButton, TextInput, Colors, IconButton, Searchbar, FAB, Divider, Card, Title, Paragraph, Surface, List, Badge, Avatar, Snackbar,} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import * as ImagePicker from 'react-native-image-picker';
import SendSMS from 'react-native-sms';

import MapView, {
  UrlTile,
  Marker,
  Circle
} from 'react-native-maps';

import { MAP_TYPES, ProviderPropType } from 'react-native-maps';

import RNGooglePlaces from 'react-native-google-places';

import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import PropTypes from 'prop-types';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Rating } from 'react-native-ratings';
import NetInfo from "@react-native-community/netinfo";
import DatePicker from 'react-native-date-picker';
import { decode } from 'base64-arraybuffer';
import fs from 'react-native-fs';
const axios = require("axios");
var S3 = require('aws-sdk/clients/s3');
import { AlphabetList } from 'react-native-section-alphabet-list';
import carData from './assets/data';
import colors from './assets/color';
import sizes from './assets/size';
import notifee from "@notifee/react-native"
import useInterval from './utils/useinterval';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
LogBox.ignoreAllLogs();

const AuthContext = React.createContext();

const colorOfmyLocationMapMarker = 'blue';

const ANCHOR = { x: 0.5, y: 0.5 };

const ACCESS_KEY_ID = 'AKIA55RAOI3SBYWGVFVZ';
const SECRET_ACCESS_KEY = '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';
const PROFILES_BUCKET = 'flux-user-profiles';


const REGION = 'us-east-2';
const IDENTITY_POOL_ID =  'us-east-2:60fc8b38-6443-400d-8013-26e0c756abae';

const customStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]

const ThemeDefault = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    text: 'black',
    background: 'white',
    border: 'grey',
    card: 'white',
    surface: 'white',
    notification: 'red',
    appbar: '#5318f0',
    appbartext: 'white',
    chip: 'white',
    search: 'lavender',
    customcard: 'white',
  },
};

const ThemeDark = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#212121',
    text: 'white',
    background: '#484848',
    border: '#FAFAFA',
    card: '#484848',
    surface: '#484848',
    notification: 'red',
    appbar: '#121212',
    appbartext: 'white',
    chip: 'grey',
    search: '#484848',
    customcard: 'darkgray',
  },
};
let InitialTheme;
InitialTheme = {...ThemeDefault};

const initialTheme = async() => {
  var a = await AsyncStorage.getItem('theme');

if(a === 'dark'){
  InitialTheme = {...ThemeDark};
} else if(a === null){
  var b = Appearance.getColorScheme();
  if(b === 'dark'){
    InitialTheme = {...ThemeDark};
  } else {
    InitialTheme = {...ThemeDefault};
  }
}else {
  InitialTheme = {...ThemeDefault};
}

console.log(initialTheme);
}

initialTheme();

function ErrorPage({ navigation }){
  const [theme, setTheme] = React.useState(InitialTheme);
  const { networkChange } = React.useContext(AuthContext);
  const [net, setNet] = React.useState(false);

  const isFocused = useIsFocused();

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {

const unsubscribe = NetInfo.addEventListener(state => {
  state.isConnected ? setNet(true): setNet(false);
});

unsubscribe();

  }, []);

  if(net){
    networkChange({state: true});
  }


  React.useEffect(() => {
    async function checkTheme(){
      var theme = await AsyncStorage.getItem('theme');

      if(theme == 'dark'){
        setTheme(ThemeDark);
      } else {
        setTheme(ThemeDefault);
      }
    }

    checkTheme();

    const unsubscribe = NetInfo.addEventListener(state => {
      state.isConnected ? setNet(true): setNet(false);
    });
    unsubscribe();

    if(isFocused){
      unsubscribe();
    }

    var timer = setInterval(function(){onRefresh()},1000)

    return () => {
      clearInterval(timer);
    }

  }, [isFocused]);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', backgroundColor: theme.colors.background }} >
         <StatusBar hidden={true} />
         <ScrollView refreshControl={
        <RefreshControl
        refreshing={true}
        onRefresh={onRefresh}
      />
      }
      contentContainerStyle={[styles.image, { flex: 1, bottom: '5%', justifyContent: 'flex-end', backgroundColor: theme.colors.background}]}

       >
                  <TouchableRipple
    rippleColor="rgba(0, 0, 0, .32)"
    style={{left: '3%', width: '95%'}}
  >
        <Button disabled={true}  mode="contained" contentStyle={{height: 70,}} labelStyle={{color: 'white',}} style={{ backgroundColor: 'red', borderRadius: 30,}}>
         Network error!
      </Button>
      </TouchableRipple>
      </ScrollView>
    </SafeAreaView>
  );
}

function WelcomePage({ navigation }){
  const [theme, setTheme] = React.useState(InitialTheme);
  const { networkChange } = React.useContext(AuthContext);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    async function checkTheme(){
      var theme = await AsyncStorage.getItem('theme');

      if(theme == 'dark'){
        setTheme(ThemeDark);
      } else {
        setTheme(ThemeDefault);
      }
    }

    checkTheme();

    const unsubscribe = NetInfo.addEventListener(state => {
      state.isConnected ? networkChange({state: true}): networkChange({state: false});
    });
    unsubscribe();

    if(isFocused){
      unsubscribe();
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', backgroundColor: theme.colors.background }} >
         <StatusBar hidden={true} />
         <View style={[styles.image, { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background}]}>
         <ActivityIndicator size={30} animating={true} color={Colors.purple700} />
      </View>
    </SafeAreaView>
  );
}
// splash page screen

function SplashPage({navigation}){
  const [theme, setTheme] = React.useState(InitialTheme);
  const { networkChange } = React.useContext(AuthContext);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    async function checkTheme(){
      var theme = await AsyncStorage.getItem('theme');

      if(theme == 'dark'){
        setTheme(ThemeDark);
      } else {
        setTheme(ThemeDefault);
      }
    }

    checkTheme();

    const unsubscribe = NetInfo.addEventListener(state => {
      state.isConnected ? networkChange({state: true}): networkChange({state: false});
    });
    unsubscribe();

    if(isFocused){
      unsubscribe();
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', backgroundColor: 'blue'}} >
         <StatusBar hidden={true} />
         <ImageBackground source={require('./wave.png')} resizeMode="cover" style={[styles.image, { flex: 1, justifyContent: 'space-between',}]}>
      <Text style={[styles.logo, {color: "white"}]}>Flux </Text>
      
      <View style={[styles.bottomView, {color: theme.colors.text}]}>
        <Text style={[styles.brand, {color: "white"}]}>Flux Ride</Text>
        <Text style={[styles.brandText, {color: "white"}]}>Order your favourite ride at the most affordable price in town!</Text>
        <View style={styles.buttonViewLogin} >
        <TouchableRipple
    onPress={() => {navigation.navigate("Login")}}
    rippleColor="rgba(0, 0, 0, .32)"
  >
        <Button  mode="contained" contentStyle={{height: 50,}} labelStyle={{color: 'blue',}} style={{ backgroundColor: 'white', borderRadius: 20,}}>
         LOGIN
      </Button>
      </TouchableRipple>
       </View>
       <View style={styles.buttonViewRegister} >
       <TouchableRipple
       onPress={() => {navigation.navigate("Register")}}
    rippleColor="rgba(0, 0, 0, .32)"
  >
       <Button  mode="outlined" contentStyle={{height: 50,}} style={{color: 'white', borderRadius: 20,  borderColor: 'white'}} color="white">
         Sign Up
      </Button>
      </TouchableRipple>
       </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

// login screen

function LoginScreen({navigation}){
  const { signIn } = React.useContext(AuthContext);
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [securetext, setSecureText] = React.useState(true);
  const [emailerror, setEmailError] = React.useState(false);
  const [passworderror, setPasswordError] = React.useState(false);
  const [theme, setTheme] = React.useState(InitialTheme);
  const [helper, setHelper] = React.useState(false);
  const [helpermessage, setHelperMessage] = React.useState('');
  const { networkChange } = React.useContext(AuthContext);
  const isFocused = useIsFocused();
  // when login in
  const [indicator, setIndicator] = React.useState(false);

  const handlePhoneText = (text) => {
    if(text[0] === '0'){
      var newphone = text.replace('0', '+254');
      setPhone(newphone); 
    }
  }

  const handleLogin = () => {
    if(phone === ''){
      setEmailError(true);

      
      setTimeout(function(){
        setEmailError(false);
      }, 2000);
    }

    if(password === ''){
      setPasswordError(true);

      setTimeout(function(){
        setPasswordError(false);
      }, 2000);
    }

    if(phone != '' && password != ''){
      setIndicator(true);
     
        axios.post("https://fluxservice.herokuapp.com/users/login", {
          phone: phone,
          password: password
        }).then(async function(response){
          if(response.status === 200){
            signIn({ phone, password });
          } else if(response.status === 203) {
            setHelper(true);
            setHelperMessage("We are having issues at our end! Sorry")
            setTimeout(function(){
              setIndicator(false);
            }, 1000);

            setTimeout(function(){
              setHelper(false);
            }, 5000);
          } else {
            setHelper(true);
            setHelperMessage("Invalid phone or password!");
            setTimeout(function(){
              setIndicator(false);
            }, 1000);

            setTimeout(function(){
              setHelper(false);
            }, 5000);
          }
        }).catch(function(error){
          console.log(error);
        })

    }
  }

  React.useEffect(() => {
    async function getTheme(){
      var usertheme = await AsyncStorage.getItem('theme');

      usertheme === 'dark' ? setTheme(ThemeDark) : setTheme(ThemeDefault);
    }

    getTheme();

    const unsubscribe = NetInfo.addEventListener(state => {
      state.isConnected ? networkChange({state: true}): networkChange({state: false});
    });
    unsubscribe();

    if(isFocused){
      unsubscribe();
    }
  },[isFocused])

  const surfaceHeight = (Dimensions.get('window').height) * 3/4;

  return (
    <View style={{flex: 1,backgroundColor: 'white'}}>
         <StatusBar backgroundColor={Colors.green700} hidden={false} />
<Appbar.Header style={{backgroundColor: Colors.green700}} >
           <Appbar.BackAction onPress={() => {navigation.navigate("Splash")}} />
         </Appbar.Header>
    <Surface style={{left: 10, right: 10, marginTop: '10%', height: surfaceHeight, justifyContent:"center", }}>
          <ScrollView>
            <Text style={{fontSize: 18, paddingLeft: 10, marginTop: "25%", color: 'black'}} >Welcome back</Text>
          <View style={{marginTop: '5%', marginLeft: 10, marginRight: 10,}}  >
          <TextInput
            style={{right: 20, marginLeft: 20, marginBottom: 10, height: 50, backgroundColor: 'transparent'}}
            mode='outlined'
            placeholder="Phone Number"
            selectionColor='white'
            keyboardType='numeric'
            error= {emailerror}
            onChangeText={(text) => {handlePhoneText(text)}}
            left={<TextInput.Icon name="phone" size={15} />}
          />

<TextInput
      mode='outlined'
      style={{right: 20, marginLeft: 20, marginBottom: 10, height: 50, backgroundColor: 'transparent'}}
      placeholder="Password"
      error={passworderror}
      secureTextEntry = {securetext}
      onChangeText={(text) => {setPassword(text)}}
      left={<TextInput.Icon name="lock" size={15} />}
      right={<TextInput.Icon name="eye" onPress={() => {setSecureText(!securetext)}} size={15} />}
    />
         {indicator ? (<ActivityIndicator size="small" color={Colors.blue700} animating={true} />) : null}
<HelperText type="error" visible={helper}>
        {helpermessage}
      </HelperText>
          </View>

          <Text onPress={() => {navigation.navigate("ForgotPassword")}} style={{textAlign:"right", color:Colors.lightGreen700, fontSize: 16, marginRight: 20, marginTop: 20, marginBottom: 5, }}>Forgot Password ?</Text>


          <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableRipple   onPress={() => {handleLogin()}} style={{borderRadius: 40, marginTop: 10, width: '80%'}} >
            <Button  mode= "contained" contentStyle={{height: 60,}} labelStyle={{color: theme.colors.text}} style={{ borderRadius: 40, backgroundColor: Colors.green700}} >Login</Button>
          </TouchableRipple>
          </View>

          
       <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30, marginBottom: 20,}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
  <View>
    <Text style={{width: 50, textAlign: 'center', color: 'black'}}>OR</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
</View>

<View style={[styles.buttonViewLogin, { marginLeft: '10%', marginRight: '10%',}]} >
        <TouchableRipple
    onPress={() => {navigation.navigate("Register")}}
    rippleColor="rgba(0, 0, 0, .32)"
  >
         <Text style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, color: 'black'}}>Sign Up</Text>

      </TouchableRipple>
       </View>
          </ScrollView>
        </Surface>
  </View>
  );
}

// forgot password

function FPScreen({ navigation }){
  const [theme, setTheme] = React.useState(InitialTheme);
  const { networkChange } = React.useContext(AuthContext);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    async function getTheme(){
      var usertheme = await AsyncStorage.getItem('theme');

      usertheme === 'dark' ? setTheme(ThemeDark) : setTheme(ThemeDefault);
    }


    getTheme();

    const unsubscribe = NetInfo.addEventListener(state => {
      state.isConnected ? networkChange({state: true}): networkChange({state: false});
    });
    unsubscribe();

    if(isFocused){
      unsubscribe();
    }
  },[isFocused])
  const surfaceHeight = (Dimensions.get('window').height) * 3/4;
  return (<View style={{flex: 1, backgroundColor: 'white'}}>
         <StatusBar backgroundColor={Colors.green700} hidden={false} />
<Appbar.Header style={{backgroundColor: Colors.green700}} >
           <Appbar.BackAction onPress={() => {navigation.navigate("Login")}} />
         </Appbar.Header>
    <Surface style={{left: 10, right: 10, marginTop: '20%', height: surfaceHeight, justifyContent:"center", }}>
          <ScrollView>
            <Text style={{fontSize: 18, paddingLeft: 10, marginTop: "25%", color: 'black'}} >Please provide a phone number associated with your account.</Text>
          <View style={{marginTop: '5%', marginLeft: 10, marginRight: 10,}}  >
            
          <TextInput
            style={{right: 20, marginLeft: 20, marginBottom: 10, height: 50, backgroundColor: 'transparent'}}
            mode='outlined'
            placeholder="Phone Number"
            selectionColor='white'
            keyboardType='numeric'
          />
          </View>

          <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableRipple style={{borderRadius: 40, marginTop: 10, width: '80%'}} >
            <Button  mode= "contained" contentStyle={{height: 60,}} labelStyle={{color: theme.colors.text}} style={{ borderRadius: 40, backgroundColor: Colors.green700}} >Forgot Password</Button>
          </TouchableRipple>

          </View>
          </ScrollView>
        </Surface>
  </View>)
}

// register screen

function RegisterScreen({navigation}){
  const [main, setMain] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [phone, setPhone] = React.useState(null);
  const [theme, setTheme] = React.useState(InitialTheme);
  const { networkChange } = React.useContext(AuthContext);
  const isFocused = useIsFocused();
  const [firstname, setFirstname] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [lastname, setLastName] = React.useState(null);
  const [secure, setSecure] = React.useState(true);
  const surfaceHeight = (Dimensions.get('window').height) * 3/4;

  // error
  const [firstnameerror, setFirstnameError] = React.useState(false);
  const [lastnameerror, setLastnameError] = React.useState(false);
  const [passerror, setPassError] = React.useState(false);

  const [helper, setHelper] = React.useState(false);
  const [helpermessage, setHelperMessage] = React.useState('');
  const [indicator, setIndicator] = React.useState(false);

  const phoneInput = useRef(null);

  const { signUp } = React.useContext(AuthContext);
const someFunction = () => {
	SendSMS.send({
		body: 'Testing react native SMS!',
		recipients: ['0741582811', '0714638883'],
		successTypes: ['sent', 'queued'],
		allowAndroidSendWithoutReadPermission: true
	}, (completed, cancelled, error) => {

		console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

	});
}

const handlePhoneText = (text) => {
  if(text.length > 9 ){
    setHelper(true);
    setHelperMessage("The number is invalid. Should be less than 10");
    setTimeout(function(){setHelper(false)}, 3000);
  } else if(text.length < 9){
    setHelper(true);
    setHelperMessage("The number is invalid. Check again.");
    setTimeout(function(){setHelper(false)}, 3000);
  } else {
    setPhone(text)
  }

}


const handleBackPress = () => {
  setMain(true);
}

const handleRegistration = () => {
  console.log(phone);
  if(firstname === null){
    setFirstnameError(true);

    setTimeout(function(){setFirstnameError(false)}, 5000)
  }

  if(lastname === null){
    setLastnameError(true);

    setTimeout(function(){setLastnameError(false)}, 5000)
  }

  if(password === null){
    setPassError(true)

    setTimeout(function(){setPassError(false)}, 5000)
  }

  if(password.length < 8){
    setPassError(true)

    setTimeout(function(){setPassError(false)}, 5000)
  }

  if(firstname != null && lastname != null && password != null ){
    if(password.length > 7){
        setIndicator(true);
        axios.post("https://fluxservice.herokuapp.com/users/register", {
          phone: phone,
          firstname: firstname,
          lastname: lastname,
          password: password,
          email: null
        }).then(async function(response){
          if(response.status === 200){
            signUp({phone, firstname, lastname, password})
            setIndicator(false);
          } else if(response.status === 203){
            setIndicator(false);
            setHelper(true);
            setHelperMessage("Sorry! An error occured!");
            setTimeout(function(){setHelper(false)}, 3000)
          } else {
            setIndicator(false);
            setHelper(true);
            setHelperMessage("Sorry! An error occured!");
            setTimeout(function(){setHelper(false)}, 3000)
          }
        }).catch(function(error){
          console.log(error);
        })
    }
  }
}

const net = React.useCallback(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    state.isConnected ? networkChange({state: true}): networkChange({state: false});
  });
  unsubscribe();
}, [])

React.useEffect(() => {
  async function getTheme(){
    var usertheme = await AsyncStorage.getItem('theme');

    usertheme === 'dark' ? setTheme(ThemeDark) : setTheme(ThemeDefault);
  }

  getTheme();

  const unsubscribe = NetInfo.addEventListener(state => {
    state.isConnected ? networkChange({state: true}): networkChange({state: false});
  });
  unsubscribe();

  if(isFocused){
    unsubscribe();
  }

  var timer = setInterval(function(){net()}, 1000);

  return () => {
    clearInterval(timer);
  }
},[isFocused])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between',backgroundColor: 'white' }} >
         <StatusBar backgroundColor={Colors.green700} hidden={main || loader ? true : false} />

         {!main && !loader ? (
           <Appbar.Header style={{backgroundColor: Colors.green700}} >
           <Appbar.BackAction onPress={() => {handleBackPress()}} />
         </Appbar.Header>
         ) : 
         <Appbar.Header style={{backgroundColor: Colors.green700}} >
  <Appbar.BackAction onPress={() => {navigation.navigate("Splash")}} />
</Appbar.Header>
         }
         
        {main ? (

<View style={{flex: 1,}}>
<StatusBar backgroundColor={Colors.green700} hidden={false} />
<Surface style={{left: 10, right: 10, marginTop: '30%', height: surfaceHeight, justifyContent:"center", }}>
 <ScrollView>
 <Text style={{fontSize: 18, paddingLeft: 10, marginTop: "25%", color: 'black'}} >Create a Flux account.</Text>
          <View style={{marginTop: '5%', marginLeft: 20, marginRight: 20,}}  >

<PhoneInput
            ref={phoneInput}
            defaultValue=""
            defaultCode="KE"
            layout='first'
            withShadow
            placeholder='700 000 000'
            onChangeCountry={(text) => {handleCountry(text)}}
            onChangeText={(text) => handlePhoneText(text)}
            onChangeFormattedText={(text) => {setPhone(text)}}
            countryPickerProps={{ withAlphaFilter: true }}
          />
</View>
       <View style={{marginTop: '10%', alignItems: 'center', justifyContent: 'center'}}>
       {indicator ? (<ActivityIndicator size="small" color={Colors.blue700} animating={true} />) : null}
<HelperText type="error" visible={helper}>
        {helpermessage}
      </HelperText>
          <TouchableRipple style={{borderRadius: 40, marginTop: 10, width: '80%'}}     onPress={() => {
      if(phone === null){
        alert("Phone number is required!")
      } else {
        setIndicator(true);
        console.log(phone);
          axios.post("https://fluxservice.herokuapp.com/users/userinfo", {
          phone: phone
        }).then(function(response){
          if(response.status === 203){
            setIndicator(false);
            setMain(false);
            setLoader(true);
      
            setTimeout(function(){setLoader(false)}, 2000)
          } else {
            setIndicator(false);
            setHelper(true);
            setHelperMessage("The number is registered. Try login instead!");
            setTimeout(function(){setHelper(false)}, 3000);
          }
        }).catch(function(error){
          console.log(error);
          alert('error');
        })

      }
    }} >
            <Button  mode= "contained" contentStyle={{height: 60,}} labelStyle={{color: theme.colors.text}} style={{ borderRadius: 40, backgroundColor: Colors.green700}} >Continue</Button>
          </TouchableRipple>

          </View>

</ScrollView></Surface></View>
        ) : loader ? (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} ><ActivityIndicator  size={40} color={Colors.green700} /></View>) : <View >
                  <Surface style={{left: 10, right: 10, marginTop: '5%', height: surfaceHeight, justifyContent:"center", }}>
          <ScrollView>
            <Text style={{fontSize: 18, paddingLeft: 10, marginTop: "15%"}} >Let's set up your Flux account...</Text>
          <View style={{marginTop: '5%', marginLeft: 10, marginRight: 10,}}  >
          <TextInput
            style={{right: 20, marginLeft: 20, marginBottom: 10, height: 50, backgroundColor: 'transparent'}}
            mode='outlined'
            error={firstnameerror}
            value={firstname}
            placeholder="First Name"
            selectionColor='white'
            onChangeText={(text) => {setFirstname(text)}}
          />

          <TextInput
            style={{right: 20, marginLeft: 20, marginBottom: 10, height: 50, backgroundColor: 'transparent'}}
            mode='outlined'
            error={lastnameerror}
            value={lastname}
            placeholder="Last Name"
            selectionColor='white'
            onChangeText={(text) => {setLastName(text)}}
          />
        
          <TextInput
            style={{right: 20,  marginLeft: 20, marginBottom: 10, height: 50, backgroundColor: 'transparent'}}
            mode='outlined'
            error={passerror}
            value={password}
            placeholder="Password"
            secureTextEntry={secure}
            selectionColor='white'
            onChangeText={(text) => {setPassword(text)}}
            left={<TextInput.Icon name="lock" size={15} />}
            right={<TextInput.Icon name={secure ? "eye" : "eye-off"} onPress={() => {setSecure(!secure)}} size={15} />}
          />
          {indicator ? (<ActivityIndicator size="small" color={Colors.blue700} animating={true} />) : null}
<HelperText type="error" visible={helper}>
        {helpermessage}
      </HelperText>
          <HelperText type="error" visible={passerror}>
        Should be minimum length of 8
      </HelperText>
          </View>

          <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableRipple style={{borderRadius: 40, marginTop: 10, width: '80%'}} onPress={() => {handleRegistration()}} >
            <Button  mode= "contained" contentStyle={{height: 60,}} labelStyle={{color: 'white'}} style={{ borderRadius: 40, backgroundColor: Colors.green700}} >Create Account</Button>
          </TouchableRipple>

          </View>
          </ScrollView>
          <Text style={{bottom: 5, fontSize: 12, paddingLeft: 10,}}>By signing up with <Text style={{fontWeight: 'bold'}} >Flux</Text>, you agree to all our terms and conditions.</Text>
        </Surface>
          </View>}
    </SafeAreaView>
  );
}

// home screen
const Drawer = createDrawerNavigator();

function Home({ navigation }) {
  const { width, height } = Dimensions.get('window');
  const { networkChange } = React.useContext(AuthContext);
  const [theme, setTheme] = React.useState(InitialTheme);
  const [geocodingvalue, setGeocodingValue] = React.useState({
    latitude: null,
    longitude: null,
    latitudeDelta: null,
    longitudeDelta: null
  });
const ASPECT_RATIO = width / height;
const LATITUDE = -1.2752751901320123;
const LONGITUDE = 36.81992017652019;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const [region, setRegion] = React.useState({latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,});


  const [bar, setBar] = React.useState(true);
  const [customstyle, setCustomStyle]  = React.useState(false);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [heading, setHeading] = React.useState(null);
  const [indicator, setIndicator] = React.useState(false);
  const [catalogue, setCatalogue] = React.useState(false);
  const [themetype, setThemeType] = React.useState(false);

  const [ride, setRide] = React.useState('');
const [distance, setDistance] = React.useState(0);
const [duration, setDuration] = React.useState(0);
const [fare, setFare] = React.useState(500);
const [from, setStart] = React.useState('');
const [to, setTo] = React.useState('');
const [vehicle, setVehicle] = React.useState('Any');
const [phone, setPhone] = React.useState('');
const [connecting, setConnecting] = React.useState(false);

// steps in requesting a ride
const [choice, setChoice] = React.useState(true);
const [means, setMeans] = React.useState(false);
const [mode, setMode] = React.useState(false);
const [locs, setLocs] = React.useState(false);

const [service, setService] = React.useState("Ride");
const [meansval, setMeansVal] = React.useState("Car");
const [modeval, setModeVal] = React.useState("");

const [alphabet, setAlphabet] = React.useState(false);

const [fromInput, setFromInput] = React.useState(false);

const [maptheme, setMapTheme] = React.useState(null);

var defaultStyle = [
  {}
];


const GOOGLE_MAPS_APIKEY = "AIzaSyAYe7yKaQdvd3pOv_0fq_Mr3cy7rYFZT6E";
Geocoder.init(GOOGLE_MAPS_APIKEY);
const fromRef = React.useRef();
const mapRef = React.createRef();
const isFocused = useIsFocused();

const onRefresh = React.useCallback(() => {

  const unsubscribe = NetInfo.addEventListener(state => {
    state.isConnected ? networkChange({state: true}): networkChange({state: false});
  });
  
  unsubscribe();

  async function checkTheme(){
    var theme = await AsyncStorage.getItem("theme");
    if(theme === 'dark'){
      setTheme(ThemeDark);
       setMapTheme(customStyle);
     } else {
       setTheme(ThemeDefault);
       setMapTheme(defaultStyle);
     }
  
  }
  
  checkTheme();
  
    }, []);

React.useEffect(() => {
  async function requestFineLocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permission Request",
          message:
            "Allow Flux to use fine Location " ,
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Fine allowed');
      } else {
        console.log("Fine permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  requestFineLocation()
/*
* initial location of user.
* @params none
*/
  const initLocation = async () => {
    Geolocation.getCurrentPosition(async position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setHeading(position.coords.heading);
          setRegion({
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          });


            if(position.coords.latitude != null){
              Geocoder.from(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude))
              .then(json => {
                      var addressComponent = json.results[0].formatted_address;
                if(addressComponent != null){
                  setStart(addressComponent);
                  setOrgin({
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude)
                  })

                  console.log(origin);
                  if(locs){
                    fromRef.current.setAddressText(addressComponent);
                  }
                }
              })
        .catch(error => fromRef.current.setAddressText('Where are you?'));
            }


    }, 
    error => console.log(error),
    );

  }

initLocation();

async function checkTheme(){
  var theme = await AsyncStorage.getItem("theme");

  if(theme === 'dark'){
    setTheme(ThemeDark);
     setMapTheme(customStyle);
   } else {
     setTheme(ThemeDefault);
     setMapTheme(defaultStyle);
   }

}

checkTheme();

async function getPhone(){
  var phone1 = await AsyncStorage.getItem("userToken");
setPhone(phone1);
}

getPhone();

const unsubscribe = NetInfo.addEventListener(state => {
  state.isConnected ? networkChange({state: true}): networkChange({state: false});
});
unsubscribe();

if(isFocused){
  checkTheme();
  initLocation();
  unsubscribe();
}

function handleBackButtonClick() {
  navigation.goBack();
  return true;
}

var timer = setInterval(function(){onRefresh()}, 10000);

BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  return () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    clearInterval(timer);
};

}, [isFocused]);

const updateLocation = () => {
  Geolocation.getCurrentPosition(async position => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setHeading(position.coords.heading);
      setRegion({
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      });


        if(position.coords.latitude != null){
          Geocoder.from(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude))
          .then(json => {
                  var addressComponent = json.results[0].formatted_address;
            if(addressComponent != null){
              setStart(addressComponent);
              setOrgin({
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude)
              })

              console.log(origin);
              if(locs){
                fromRef.current.setAddressText(addressComponent);
              }
            }
          })
    .catch(error => fromRef.current.setAddressText('Where are you?'));
        }


}, 
error => console.log(error),
);
}

const { signOut } = React.useContext(AuthContext);

const [origin, setOrgin] = React.useState({
  latitude: null,
  longitude: null
});

const [destination, setDestination] = React.useState({
  latitude: null,
  longitude: null
});

 const handleSubmission = () => {
  setIndicator(true);
 }

 renderListItem = (item) => {
  return (
    <View style={[styles.listItemContainer,  {backgroundColor: theme.colors.background, borderTopColor: theme.colors.text}]}>
      <Text style={[styles.listItemLabel, {color: theme.colors.text}]} onPress={() => {
        setVehicle(item.value);
        setAlphabet(false);
      }} >{item.value}</Text>
    </View>
  );
};

renderSectionHeader = (section) => {
  return (
    <View style={[styles.sectionHeaderContainer, {backgroundColor: theme.colors.background}]}>
      <Text style={[styles.sectionHeaderLabel, {color: theme.colors.text, fontSize: 25, fontWeight: 'bold'}]}>{section.title}</Text>
    </View>
  );
};

renderCustomListHeader = () => {
  return (
    <View style={[styles.listHeaderContainer, {backgroundColor: theme.colors.background}]}>
      <Text style={{color: theme.colors.text}}>Car preference</Text>
    </View>
  );
};

const newRequest = async () => {
  axios.post("https://fluxservice.herokuapp.com/requests/newRequest", {
    originLatitude: origin.latitude,
    originLongitude: origin.longitude,
    destinationLatitude: destination.latitude,
    destinationLongitude: destination.longitude,
    cost: fare,
    phone: phone,
    vehicle: vehicle,
    brand: 'Any',
    model: 'Any',
    distance: distance,
    duration: duration,
    means: meansval,
    service: service,
    origin: from,
    destination: to
  }).then(function(response){
    console.log(response.data.result);
    setConnecting(true);

  }).catch(function(error){
    console.log(error);
  }); 
}

const surfaceWidth = (Dimensions.get('window').width) * 1/3 - 10;
const halfsurfaceWidth = (Dimensions.get('window').width) * 1/2 -10;

  return (
    <View style={{ flex: 1, }}>
       <StatusBar backgroundColor="#1d2c4d" />

       {catalogue && !alphabet && !connecting ? (
         <Appbar.Header style={{backgroundColor: theme.colors.appbar}} >
         <Appbar.BackAction onPress={() => {
           setBar(true);
           setLocs(false);
           setMode(false);
           setMeans(false);
           setChoice(true);
           setIndicator(false);
           setConnecting(false);
           setAlphabet(false);
           setCatalogue(false);
           setDestination({
            latitude: null,
            longitude: null,
          });
          setOrgin({
            latitude: null,
            longitude: null,
          });
          updateLocation();
         }} />
         <Appbar.Content title="Flux Ride Request" style={{color: theme.colors.appbartext}} />
       </Appbar.Header>
       ) : catalogue && alphabet && !connecting ? (
        <Appbar.Header style={{backgroundColor: theme.colors.appbar}} >
        <Appbar.BackAction onPress={() => {
          setAlphabet(false);
        }} />
        <Appbar.Content title="Choose a car preference" style={{color: theme.colors.appbartext}} />
      </Appbar.Header>
       ) : catalogue && connecting && !alphabet ? (
        <Appbar.Header style={{backgroundColor: theme.colors.appbar}} >
        <Appbar.Content title="Connecting to an agent..." style={{color: theme.colors.appbartext}} />
      </Appbar.Header>
       ) : null}

{!catalogue && !indicator && !alphabet && !connecting ? (
         <MapView
         ref={mapRef}
          style={styles.map}
          initialRegion={region}
          customMapStyle= {maptheme}
          showsMyLocationButton={true}
          showsUserLocation={true}
          showsTraffic = {false}
          showsCompass = {true}
        >       
  
          <UrlTile
            urlTemplate="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
  
          />
  
  {(origin.latitude != null) && (destination.latitude != null) ? (
                <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={8}
                strokeColor={themetype ? "pink" : "cyan"} 
                onReady={(data) => {
                  setDistance(Math.round(data.distance));
                  setDuration(Math.round(data.duration));
                  setTimeout(function(){
                    setCatalogue(true);
                    setBar(false);
                    setIndicator(false);
                  }, 3000);
                }}
                onError={() =>{
                  console.log("An error occured!");
                }}
              /> 
  ) : null}
        </MapView>
) : null}

    {bar && !indicator && !alphabet && !connecting ? (
      choice ? (
        <View style={{position: 'absolute', bottom: 0, flexDirection: 'column', right: 0, left: 0, backgroundColor: theme.colors.search}}>

                <TouchableRipple onPress={() => {
                  setChoice(false);
                  setMeans(true);
                  setService("Ride")
                }} 
                style={{marginTop: 10, marginBottom: 10,}}
                >
            <Button uppercase={false}  mode="contained" contentStyle={{height: 50,}} labelStyle={{color: 'white'}} style={{ borderRadius: 20,}}>
                  Get a Ride
                </Button>

            </TouchableRipple>


          </View>
      ) : means ? (
        <View style={{position: 'absolute', bottom: 0, flexDirection: 'column', right: 0, left: 0, backgroundColor: theme.colors.search}}>
          
          <IconButton icon="chevron-left" color={theme.colors.text} size={40} onPress={() => {
            setChoice(true);
            setMeans(false);
            updateLocation();
            setLocs(false);
          }} />
           <Paragraph style={{marginLeft: 10, marginTop: 10, fontSize: 17, color: theme.colors.text}} >Select your preferred means of navigation</Paragraph>

<ScrollView horizontal>
<TouchableRipple onPress={() => {
                  setChoice(false);
                  setMeans(false);
                  setMode(true)
                  updateLocation()
                  setMeansVal("Car");
                }} >
            <Surface onP style={{marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 5, height: 120, width: surfaceWidth, backgroundColor: theme.colors.customcard, elevation: 10, alignItems:"center", justifyContent: "center" }}>
            <Paragraph style={{color: theme.colors.text, fontSize: 13}}>Car</Paragraph>
            </Surface>
            </TouchableRipple>

            <TouchableRipple onPress={() => {
                  setChoice(false);
                  setMeans(false);
                  setMode(true)
                  updateLocation();
                  setMeansVal("Motorbike");
                }} >
            <Surface onP style={{marginTop: 10, marginBottom: 10, marginLeft: 5, height: 120, marginRight: 5, width: surfaceWidth, backgroundColor: theme.colors.customcard, elevation: 10, alignItems:"center", justifyContent: "center" }}>
            <Paragraph style={{color: theme.colors.text, fontSize: 13}}>Motorbike</Paragraph>
            </Surface>
            </TouchableRipple>

            <TouchableRipple onPress={() => {
                  setChoice(false);
                  setMeans(false);
                  setMode(true)
                  updateLocation()
                  setMeansVal("Scooter");
                }} >
            <Surface onP style={{marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 5, height: 120, width: surfaceWidth, backgroundColor: theme.colors.customcard, elevation: 10, alignItems:"center", justifyContent: "center" }}>
            <Paragraph style={{color: theme.colors.text, fontSize: 13}}>Scooter</Paragraph>
            </Surface>
            </TouchableRipple>
            </ScrollView>
          </View>
      ) : mode ? (
        <View style={{position: 'absolute', bottom: 0, flexDirection: 'column', right: 0, left: 0, backgroundColor: theme.colors.search}}>
          
          <IconButton icon="chevron-left" color={theme.colors.text} size={40} onPress={() => {
            setChoice(true);
            setMeans(false);
            setMode(false);
            setLocs(false);
          }} />
           <Paragraph style={{marginLeft: 10, marginTop: 10, fontSize: 17, color: theme.colors.text}} >Do you need a driver?</Paragraph>

<ScrollView horizontal>
<TouchableRipple onPress={() => {
                  setChoice(false);
                  setMeans(false);
                  setLocs(true)
                  setMode(false);
                  updateLocation()
                  setModeVal("Driver");
                }} 
                style={{marginLeft: 5, marginRight: 5,}}
                >
            <Surface onP style={{marginTop: 10, marginBottom: 10,  height: 70, width: halfsurfaceWidth, backgroundColor: theme.colors.customcard, elevation: 10, alignItems:"center", justifyContent: "center" }}>
            <Paragraph style={{color: theme.colors.text, fontSize: 13}}>Driver</Paragraph>
            </Surface>
            </TouchableRipple>

            <TouchableRipple onPress={() => {
                  setChoice(false);
                  setMeans(false);
                  setLocs(true)
                  setMode(false);
                   updateLocation()
                  setModeVal("self");
                }}
                style={{marginLeft: 5, marginRight: 5,}}
                >
            <Surface onP style={{marginTop: 10, marginBottom: 10,  height: 70,  width: halfsurfaceWidth, backgroundColor: theme.colors.customcard, elevation: 10, alignItems:"center", justifyContent: "center" }}>
            <Paragraph style={{color: theme.colors.text, fontSize: 13}}>Self Driving</Paragraph>
            </Surface>
            </TouchableRipple>

            </ScrollView>
          </View>

      ) : locs ? (
        
        <View style={{position: 'absolute', bottom: 0, flexDirection: 'column', right: 0, left: 0, backgroundColor: theme.colors.search}}>
          <IconButton icon="chevron-left" color={theme.colors.text} size={40} onPress={() => {
            setChoice(true);
            setMeans(false);
            setLocs(false);
          }} />
            <Paragraph style={{marginLeft: 10, marginTop: 10, fontSize: 17, color: theme.colors.text}} >Lets get your picking and droping zones</Paragraph>

          {fromInput ? (
                    <GooglePlacesAutocomplete
                    styles={{flex: 1, textInput: {height: 55, borderRadius: 28,}, textInputContainer: {marginTop: 10, marginBottom: 5, marginLeft: '10%', borderRadius: 28, marginRight: '10%', borderColor: theme.colors.text}}}
                          placeholder='Search your picking zone'
                          ref={fromRef}
                          autoFillOnNotFound = {true}
                          enablePoweredByContainer={false}
                          debounce = {0}
                          minLength={2}
                          returnKeyType={'default'}
                          onNotFound = {() => {alert("Location not found. Please Select from options below.")}}
                          onFail= {() => {alert("Search failed. Please try again")}}
                          keepResultsAfterBlur={true}
                          fetchDetails={true}
                          keyboardShouldPersistTaps="never"
                          onPress={async (data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            setStart(data.structured_formatting.main_text);
                            console.log(data.structured_formatting.main_text);
                            await Geocoder.from(data.structured_formatting.main_text).then(json => {
                              var location = json.results[0].geometry.location;
                              if(location.lat != null){
                                setOrgin({
                                  latitude: parseFloat(location.lat),
                                  longitude: parseFloat(location.lng)
                                })
                          
                              } 
                             }).catch(error => console.warn(error));
                          }}
                          query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en',
                          }}
                        />
          ) : (

            <View style={{marginLeft: 10, marginRight: 10,}} >
              <Paragraph style={{color: theme.colors.text, fontSize: 17, marginBottom: 10, marginTop: 10,}}>Current: <Text style={{fontWeight: 'bold'}} >{from}</Text> </Paragraph>
            <TouchableRipple style={{marginTop: 10, marginBottom: 20}} >
            <Button mode='contained' onPress={()=> {setFromInput(!fromInput)}} icon={fromInput ? "eye-off" : "eye"}>Change Picking Point</Button>
            </TouchableRipple>
            </View>
          )}
         <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss}} >
<GooglePlacesAutocomplete
        styles={{flex: 2, textInput: {height: 55, borderRadius: 28,}, textInputContainer: { marginBottom: 10, marginLeft: '10%', borderRadius: 28, borderBottomColor: 'black', marginRight: '10%',}}}
              placeholder='Where are you going?'
              enablePoweredByContainer={false}
              debounce = {0}
              minLength={2}
              returnKeyType={'default'}
              onNotFound = {() => {alert("Location not found. Please Select from options below.")}}
              onFail= {() => {alert("Search failed. Please try again")}}
              keepResultsAfterBlur={true}
              fetchDetails={true}
              keyboardShouldPersistTaps="never"
              onPress={async (data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setTo(data.structured_formatting.main_text);
                console.log(data.structured_formatting.main_text);
                await Geocoder.from(data.structured_formatting.main_text).then(json => {
                  var location = json.results[0].geometry.location;
                  if(location.lat != null){
                    setIndicator(true);
                      setDestination({
                        latitude: parseFloat(location.lat),
                        longitude: parseFloat(location.lng),
                      });
                      setCatalogue(false);
                      setChoice(true);
                      setMeans(false);
                      setLocs(false)
                      setMode(false);
                      setTimeout(function(){
                        setIndicator(false);
                      }, 1000)
                  } 
                 }).catch(error => console.warn(error));
              }}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
              }}
            />
    </TouchableWithoutFeedback>
          </View>
      ) : null
    ) : null}

    {catalogue && !alphabet && !connecting && !indicator ? (
<View style={{flex: 1, backgroundColor: theme.colors.background}} >
<ScrollView>
    <List.Section style={{left: 5, right: 5,}} titleStyle={{color: theme.colors.text}} title="Ride request details">
    <List.Accordion
      title="Picking point"
      description={from}
      titleStyle={{color: theme.colors.text}}
      descriptionStyle={{color: theme.colors.text}}
      expanded={false}
      style={{left: 0, backgroundColor: theme.colors.background,}}
      right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.text} />}
      >
    </List.Accordion>

    <List.Accordion
      title="Destination point"
      description={to}
      descriptionStyle={{color: theme.colors.text}}
      titleStyle={{color: theme.colors.text}}
      expanded={false}
      style={{left: 0, backgroundColor: theme.colors.background,}}
      right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.text} />}
      >
    </List.Accordion>

    <List.Accordion
      title="Duration"
      description={duration + 'min ~ '+distance + 'KM'}
      descriptionStyle={{color: theme.colors.text}}
      titleStyle={{color: theme.colors.text}}
      expanded={false}
      style={{left: 0, backgroundColor: theme.colors.background,}}
      right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.text} />}
      >
    </List.Accordion>

    <List.Accordion
      title="Vehicle Preference"
      description={modeval}
      descriptionStyle={{color: theme.colors.text}}
      titleStyle={{color: theme.colors.text}}
      expanded={false}
      onPress = {() => {setAlphabet(true)}}
      style={{left: 0, backgroundColor: theme.colors.background,}}
      right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.text} />}
      >
    </List.Accordion>

    <List.Accordion
      title="Cost"
      description={fare}
      descriptionStyle={{color: theme.colors.text}}
      titleStyle={{color: theme.colors.text}}
      expanded={false}
      style={{left: 0, backgroundColor: theme.colors.background,}}
      right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.text} />}
      >
    </List.Accordion>

    </List.Section>

<Text style={{color: theme.colors.text, fontSize: 13, marginLeft: 20, marginTop: 20, marginBottom: 20,}} >A <Text style={{fontWeight: 'bold'}} >Flux</Text> agent will contact you shortly.</Text>
    <TouchableRipple
              rippleColor="rgba(0, 0, 0, .32)"
              style={{borderRadius: 40, marginLeft: '20%', marginRight: '20%', marginBottom: 20, marginTop: 10,}}
              onPress={() => {newRequest()}}
            >
                  <Button uppercase={false}  mode="contained" contentStyle={{height: 50,}} labelStyle={{color: 'white'}} style={{ borderRadius: 20,}}>
                  Request Service
                </Button>
      </TouchableRipple>

      </ScrollView>
</View>
    ) : catalogue && alphabet && !connecting && !indicator ? (
      <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background,}}>
      <AlphabetList
          style={{ flex: 1 }}
          data={carData}
          renderCustomItem={renderListItem}
          renderCustomSectionHeader={renderSectionHeader}
          renderCustomListHeader={renderCustomListHeader}
          getItemHeight={() => sizes.itemHeight}
          sectionHeaderHeight={sizes.headerHeight}
          listHeaderHeight={sizes.listHeaderHeight}
          indexLetterStyle={{ color: colors.primary }}
        />
        </SafeAreaView>
    ) : catalogue && connecting && !alphabet? (
      <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={80} color={theme.colors.text} animating={true} />
      </SafeAreaView>
    ) : null}

    {indicator && !catalogue ? (
     <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
     </SafeAreaView>
    ) : null}

{!catalogue && !indicator ? (
        <View style={styles.mapBtn} ><FAB
        style={styles.fab}
        icon="menu"
        color='#fff'
        onPress={() => {navigation.toggleDrawer()}}
      /></View>
) : null}
    </View>
  );
}


function History({ navigation }) {
  const [theme, setTheme] = React.useState(InitialTheme);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    async function getTheme(){
      var usertheme = await AsyncStorage.getItem('theme');
  
      usertheme === 'dark' ? setTheme(ThemeDark) : setTheme(ThemeDefault);
    }
  
    getTheme();
    if(isFocused){
      getTheme();
    }

  },[isFocused])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background}}>
      <StatusBar backgroundColor="#5318f0" />
      <ScrollView>
      <List.Item
      style={{backgroundColor: theme.colors.background}}
    titleStyle={{color: theme.colors.text}}
  title="Nakuru-Nairobi"
  descriptionStyle={{color: theme.colors.text}}
  description="01/01/2022"
  left={props => <List.Icon {...props} icon="dots-vertical" color={ theme.colors.text} />}
/>

<List.Item
      style={{backgroundColor: theme.colors.background}}
    titleStyle={{color: theme.colors.text}}
  title="Nakuru-Nairobi"
  descriptionStyle={{color: theme.colors.text}}
  description="01/01/2022"
  left={props => <List.Icon {...props} icon="dots-vertical" color={ theme.colors.text} />}
/>

<List.Item
      style={{backgroundColor: theme.colors.background}}
    titleStyle={{color: theme.colors.text}}
  title="Nakuru-Nairobi"
  descriptionStyle={{color: theme.colors.text}}
  description="01/01/2022"
  left={props => <List.Icon {...props} icon="dots-vertical" color={ theme.colors.text} />}
/>
      </ScrollView>
    </SafeAreaView>
  );
}

function Privacy({ navigation }){

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar backgroundColor="#5318f0" />
      <Text>How we use your data</Text>
      <Text>What data do we collect from you, and why?</Text>
      <Text>Terms and conditions of using this platform</Text>
      <Text>frequently Asked questions</Text>
      <Text>Application license, patenting trademarks etc</Text>
      <Text>Application version</Text>
    </View>
  );
}

function Settings({ navigation }){
  const [phone, setPhone] = React.useState('');
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [theme, setTheme] = React.useState(InitialTheme);
  const [themetype, setThemeType] = React.useState(false);
  const { signOut } = React.useContext(AuthContext);


  const { changeTheme } = React.useContext(AuthContext);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    async function fetchUserInfo() {
      var userPhone = await AsyncStorage.getItem('userToken');
      var firstn = await AsyncStorage.getItem('firstname');
      var lastn = await AsyncStorage.getItem('lastname');
      setPhone(userPhone);
      setFirst(firstn);
      setLast(lastn);
    }

    fetchUserInfo();

    async function checkTheme() {
      var theme = await AsyncStorage.getItem('theme');
      theme === 'dark' ? setTheme(ThemeDark) : setTheme(ThemeDefault);
      theme === 'dark' ? setThemeType(true) : setThemeType(false);
      
    }

    checkTheme();

    if(isFocused){
      checkTheme();
    }

  }, [isFocused]);

  const setDefaultTheme = async () => {
    var theme = await AsyncStorage.getItem('theme');
    if(theme === 'dark'){
      await AsyncStorage.setItem('theme', 'light');
      changeTheme({ theme: 'light' });
      setTheme(ThemeDefault);
    } else {
      await AsyncStorage.setItem('theme', 'dark');
      changeTheme({ theme: 'dark' })
      setTheme(ThemeDark);
    }
  }
  return (
    <View style={{flex: 1,backgroundColor: theme.colors.background}} >
      <List.Section>
      <List.Accordion
      style={{left: 0, color: theme.colors.text, backgroundColor: theme.colors.surface}}
        title="Edit Phone number"
        titleStyle={{color: theme.colors.text,}}
        descriptionStyle={{color: Colors.green700}}
        description={phone}
        expanded={false}
        right={props => <List.Icon {...props} icon="chevron-right" color={ theme.colors.text} />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
           style={{left: 0, color: theme.colors.text, backgroundColor: theme.colors.surface}}
        title="Edit Name"
        titleStyle={{color: theme.colors.text,}}
        descriptionStyle={{color: Colors.green700}}
        description={first + ' ' + last}
        expanded={false}
        right={props => <List.Icon {...props} icon="chevron-right" color={ theme.colors.text} />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>


      <List.Accordion
           style={{left: 0, color: theme.colors.text, backgroundColor: theme.colors.surface}}
        title="Theme Settings"
        titleStyle={{color:theme.colors.text,}}
        descriptionStyle={{color: Colors.green700}}
        description={themetype ? "Current theme - Dark Theme" : "Current theme - Default Theme"}
        expanded={false}
        onPress={() => {setDefaultTheme()}}
        right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.text} /> }>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>


      <List.Accordion
           style={{left: 0, backgroundColor: theme.colors.surface}}
        title="Terms of use, FAQs & Data privacy"
        titleStyle={{color: theme.colors.text,}}
        descriptionStyle={{color: Colors.green700}}
        description="Read our terms, our frequently asked questions and more about how we handle your data."
        expanded={false}
        right={props => <List.Icon {...props} icon="chevron-right" color={ theme.colors.text} /> }>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>


      <List.Accordion
           style={{left: 0, color: theme.colors.text, backgroundColor: theme.colors.surface}}
           titleStyle={{color: theme.colors.text,}}
        title="Logout"
        expanded={false}
        onPress={signOut}
        right={props => <List.Icon {...props} icon="arrow-right" color={ theme.colors.text} /> }>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>


    </List.Section>
    
    </View>
  )
  
}


function Help({ navigation }){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar backgroundColor="#5318f0" />
      <Text>Ambulance</Text>
      <Text>Police</Text>
    </View>
  );
}

/*
* Driver navigation components
*/

function RideRequests({ navigation }){
  const [icon, setCloseIcon] = React.useState(true);
  const [networkmessage, setNetworkMessage] = React.useState('Online');
  const [userinfo, setUserInfo] = React.useState({});
  const [theme, setTheme] = React.useState(InitialTheme);
  const [count, setCount] = React.useState(0);
  const [socket, setWebsocket] = React.useState(false);
  const [state, setState] = React.useState(false);
  const { networkChange } = React.useContext(AuthContext);
  const [rides, setRides] = React.useState([]);
  const [details, setDetails] = React.useState(false);
  const [indicator, setIndicator] = React.useState(false);
  const [indicator2, setIndicator2] = React.useState(false);
  const [traffic, setTraffic] = React.useState(false);
  const GOOGLE_MAPS_APIKEY = "AIzaSyAYe7yKaQdvd3pOv_0fq_Mr3cy7rYFZT6E";
  const [region, setRegion] = React.useState({});
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [maptheme, setMapTheme] = React.useState(null);
  const [origin, setOrigin] = React.useState(null);
  const [destination, setDestination] = React.useState(null);

  // holds the instance request data under view
  const [userrequest, setUserRequest] = React.useState({});
  // end of instance request data
  const isFocused = useIsFocused();
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  

  const [refreshing, setRefreshing] = React.useState(false);

  const syncTheme = React.useCallback( async() => {
      var theme = await AsyncStorage.getItem("theme");
  
      theme === 'dark' ? setTheme(ThemeDark) : setTheme(ThemeDefault);

      async function checkTheme(){
        var theme = await AsyncStorage.getItem("theme");
        if(theme === 'dark'){
          setTheme(ThemeDark);
           setMapTheme(customStyle);
         } else {
           setTheme(ThemeDefault);
           setMapTheme({});
         }
      
      }
      
      checkTheme();
    
  }, [])

  const onSync = React.useCallback(() => {

    const unsubscribe = NetInfo.addEventListener(state => {
      state.isConnected ? networkChange({state: true}): networkChange({state: false});
    });
    
    unsubscribe();

    const sendMessage = async () => {
      try{
        await axios.post("https://fluxservice.herokuapp.com/requests/all").then(function(response){
          if(response.status === 200){
            var data = response.data.data;
            setRides(data);
            onDisplayRequestNotification();
          }
        }).catch(function(error){
          console.log(error);
        });
      }catch(e){
        console.log(e);
      }
  
    }
  

  sendMessage();
    
      }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
      const sendMessage = async () => {
    try{
      await axios.post("https://fluxservice.herokuapp.com/requests/all").then(function(response){
        if(response.status === 200){
          var data = response.data.data;
          setRides(data);
          //onDisplayRequestNotification();
        }
      }).catch(function(error){
        console.log(error);
      });
    }catch(e){
      console.log(e);
    }

  }

  async function getDefaultTheme() {
    var theme = await AsyncStorage.getItem("theme");

    theme === 'dark' ? setTheme(ThemeDark) : setTheme(ThemeDefault);
  
}

const unsubscribe = NetInfo.addEventListener(state => {
  state.isConnected ? setNetworkMessage("Online") : setNetworkMessage("Offline");
});

const retrieveUser = async () => {
  var phone = await AsyncStorage.getItem("userToken");
  await axios.post("https://fluxservice.herokuapp.com/users/userinfo", {
    phone: phone
  }).then(function(response){
    if(response.status === 200){
      var data = response.data.data;
      setUserInfo(data);
    }
  }).catch(function(error){
    console.log(error);
  });
}

const initLocation = async () => {
  Geolocation.getCurrentPosition(async position => {
        setRegion({
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        });

        setLatitude(parseFloat(position.coords.latitude));
        setLongitude(parseFloat(position.coords.longitude));

  }, 
  error => console.log(error),
  );

}

initLocation();


getDefaultTheme();
unsubscribe();
sendMessage();
    wait(2000).then(() => setRefreshing(false));
  }, []);


  async function onDisplaySuccessNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'success',
      name: 'Success Channel',
      sound: 'success',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Connected to server',
      body: 'You are connected to server.',
      android: {
        channelId,
        color: '#5318f0',
        sound: 'success',
        importance: AndroidImportance.HIGH,
      },
    });
  }

  async function onDisplayFailureNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'failure',
      name: 'Failure Channel'
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Disconnected from server',
      body: 'You are disconnected from server. We are retrying to restore connection...',
      android: {
        channelId
      },
    });
  }

  async function onDisplayRequestNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'request',
      name: 'Request Channel',
      sound: 'juntos',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'New request',
      body: 'New ride request available',
      android: {
        channelId
      },
    });
  }

  

React.useEffect(() => {
  const sendMessage = async () => {
    try{
      await axios.post("https://fluxservice.herokuapp.com/requests/all").then(function(response){
        if(response.status === 200){
          var data = response.data.data;
          setRides(data);
          onDisplaySuccessNotification();
        }
      }).catch(function(error){
        console.log(error);
      });
    }catch(e){
      console.log(e);
    }

  }

  async function getDefaultTheme() {
    var theme = await AsyncStorage.getItem("theme");

    theme === 'dark' ? setTheme(ThemeDark) : setTheme(ThemeDefault);
  
    
}

async function checkTheme(){
  var theme = await AsyncStorage.getItem("theme");
  if(theme === 'dark'){
    setTheme(ThemeDark);
     setMapTheme(customStyle);
   } else {
     setTheme(ThemeDefault);
     setMapTheme({});
   }

}

checkTheme();

const unsubscribe = NetInfo.addEventListener(state => {
  state.isConnected ? setNetworkMessage("Online") : setNetworkMessage("Offline");
});

const retrieveUser = async () => {
  var phone = await AsyncStorage.getItem("userToken");
  await axios.post("https://fluxservice.herokuapp.com/users/userinfo", {
    phone: phone
  }).then(function(response){
    if(response.status === 200){
      var data = response.data.data;
      setUserInfo(data);
    }
  }).catch(function(error){
    console.log(error);
  });
}

async function requestCamera() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Permission Request",
        message:
          "Allow Flux to use camera " ,
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('allowed');
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

const initLocation = async () => {
  Geolocation.getCurrentPosition(async position => {
        setRegion({
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        });

  }, 
  error => console.log(error),
  );

}

initLocation();

getDefaultTheme();
unsubscribe();
sendMessage();
retrieveUser();
requestCamera();

if(isFocused){
  getDefaultTheme();
  unsubscribe();
  sendMessage();
}

var timer = setInterval(function(){onSync()}, 10000);

var timer2 = setInterval(function(){syncTheme}, 500)

return () => {
  clearInterval(timer);
  clearInterval(timer2);
}
}, [isFocused])


function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hrs";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " mins";
  }
  return Math.floor(seconds) + " secs";
}

const handleRequest = (data) => {
  setUserRequest(data);
  var originLatitude = parseFloat(data.originLatitude);
  var originLongitude = parseFloat(data.originLongitude);

  var destinationLatitude = parseFloat(data.destinationLatitude);
  var destinationLongitude = parseFloat(data.destinationLongitude);

  setOrigin({
    latitude: originLatitude,
    longitude: originLongitude
  });

  setDestination({
    latitude: destinationLatitude,
    longitude: destinationLongitude
  });

  setRegion({
    latitude: originLatitude,
    longitude: originLongitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

 setIndicator(true);

 setTimeout(function(){
  setDetails(true);
  setIndicator(false);
 }, 2000);
}

const handleBackPress = () => {
  setDetails(false);
}

const handleTraffic = () => {
  setTraffic(!traffic);
}

const handleAcceptRequest = async () => {
  setIndicator2(true);
  var id = userrequest._id;
  var driverphone = await AsyncStorage.getItem('userToken');

  console.log(id);

  setTimeout(function(){setIndicator2(false)}, 5000)
  /*axios.post("https://fluxservice.herokuapp.com/acceptrequest", {
    requestID: id,
    driverPhone: driverphone
  }).then(function(response){
    if(response.status == 200){
      setIndicator2(false);
    }
  }) */
}
const height = (Dimensions.get('window').height) * 1/2;


  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}} >
      <StatusBar backgroundColor="#5318f0" />
      <Appbar.Header style={{backgroundColor: theme.colors.appbar, borderRadius: 2, borderColor: theme.colors.border}}>
      {details &&  !indicator && !indicator2 ?  <Appbar.BackAction onPress={() => {handleBackPress()}} />  : !details && !indicator && !indicator2 ? <Appbar.Action icon="menu" onPress={() => {navigation.toggleDrawer()}} /> : null}
      <Appbar.Content title={details && indicator && !indicator2 ? "Request Details" : details && !indicator && indicator2  ? "Connecting ..." : "Flux Ride Requests"} style={{color: theme.colors.text}}  />
    </Appbar.Header>
{!details && !indicator && !indicator2 ? (
        <ScrollView refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        } >
  {icon ? (<Chip mode='outline' icon="wifi" style={{marginLeft: 10, marginRight: 10, marginTop: 5, backgroundColor: theme.colors.chip }} onClose={() => {setCloseIcon(false)}} textStyle={{alignItems: 'center', backgroundColor: 'red', paddingLeft: 5, paddingRight: 5, borderRadius: 10, color: 'white'}} >{networkmessage}</Chip>) : null}
  {rides && rides.length != 0 ? rides.slice(0).reverse().map((data) => {
    return (
      <Surface key={data._id}  style={{marginLeft: 5, marginRight: 5, marginTop: 10, backgroundColor: theme.colors.background , elevation:4}}>
      <List.Item
      titleStyle={{color: theme.colors.text}}
    title={data.origin + ' - '+ data.destination}
    description={props => <View ><Paragraph style={{color: theme.colors.text}} >Offer: KSH. <Text style={{fontWeight: 'bold'}}>{data.cost}</Text></Paragraph><Paragraph style={{color: theme.colors.text}}  >Duration: <Text style={{fontWeight: 'bold'}} >{data.duration} min ~ {data.distance} KM</Text></Paragraph><Paragraph style={{color: theme.colors.text}}  >Service: <Text style={{fontWeight: 'bold'}} >{data.service}</Text></Paragraph><TouchableRipple style={{marginTop: 10, width: '80%'}} onPress={() => {handleRequest(data )}} ><Button mode="contained" contentStyle={{height: 40,}} labelStyle={{color: 'white'}} style={{ borderRadius: 10,}} >View More Details</Button></TouchableRipple></View>}
    left={props => <View style={{justifyContent: 'center'}}><Avatar.Image size={50} source={require('./assets/user-nobg.png')}/><View style={{alignItems: 'center'}}><Text>{data.firstname} {data.lastname}</Text>
  <Text style={{color: theme.colors.text}} >{timeSince(Date.parse(data.createdAt))}</Text>
    </View></View>}
  />
  </Surface>
    )
  }) : null}
        </ScrollView>
) : !details && indicator && !indicator2 ? (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }} >
    <ActivityIndicator size="large" animating={true} color={theme.colors.text} />
  </View>
) : details && !indicator && !indicator2 ? (

  <View style={{flex: 1,}} >
    <View style={{height: height,}} >
    <MapView
   style={styles.map}
   initialRegion={region}
   customMapStyle= {maptheme}
   showsMyLocationButton={true}
   showsUserLocation={true}
   showsTraffic = {traffic}
   showsCompass = {true}
 >       



      <MapViewDirections
      origin={origin}
      destination={destination}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={10}
      strokeColor="cyan" 
      onError={() =>{
        console.log("An error occured!");
      }}
    /> 

 </MapView>

 <View style={styles.mapBtn} ><FAB
        style={styles.fab}
        icon="car"
        label='Toggle Traffic'
        color='#fff'
        onPress={() => {handleTraffic()}}
      /></View>
    </View>

    <View style={{ backgroundColor: theme.colors.background}} >
      <View style={{marginLeft: 20, backgroundColor: theme.colors.background, marginTop: 10,}} >
        <Title style={{color: theme.colors.text, fontSize: 15}} >Location Details</Title>
      <Paragraph style={{color: theme.colors.text, fontSize: 15,}}>Picking Point: <Text style={{fontWeight: 'bold'}} >{userrequest.origin}</Text> </Paragraph>
      <Paragraph style={{color: theme.colors.text, fontSize: 15,}}>Destination: <Text style={{fontWeight: 'bold'}} >{userrequest.destination}</Text> </Paragraph>
        <Title style={{color: theme.colors.text, fontSize: 15}} >Distance Matrix</Title>
      <Paragraph style={{color: theme.colors.text, fontSize: 15,}}>Distance: <Text style={{fontWeight: 'bold'}} >{userrequest.distance} Kilometres</Text> </Paragraph>
      <Paragraph style={{color: theme.colors.text, fontSize: 15,}}>Duration: <Text style={{fontWeight: 'bold'}} >{userrequest.duration} Minutes</Text> </Paragraph>


     </View>
      <View style={{marginLeft: '10%', marginRight: '10%', marginTop: 15,}} >
    <TouchableRipple style={{marginTop: 10,}} onPress={() => {handleAcceptRequest()}} ><Button mode="contained" contentStyle={{height: 40,}} labelStyle={{color: 'white'}} style={{ borderRadius: 10,}} >Accept Request</Button></TouchableRipple>
    </View>
    </View>
</View>

  ) : details && !indicator && indicator2 ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background}} >
      <ActivityIndicator size="large" animating={true} color={theme.colors.text} />
    </View>
  ): (<View></View>)
}
</View>
)}

function DriverAccountSettings({ navigation }){
  const NewVehicle = () => {
    const [expanded1, setExpanded1] = React.useState(false);
    const [expanded2, setExpanded2] = React.useState(false);
    const [expanded3, setExpanded3] = React.useState(false);
    const [expanded4, setExpanded4] = React.useState(false);
    const [expanded5, setExpanded5] = React.useState(false);
    const [errorchip, setErrorChip] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [phone, setPhone] = React.useState('');
    const [theme, setTheme] = React.useState(InitialTheme);
    const [themetype, setThemeType] = React.useState(false);

    const [userinfo, setUserInfo] = React.useState({});
    const isFocused = useIsFocused();
    const onDismissSnackBar = () => setErrorChip(false);

    // datepicker
    const [open, setOpen] = useState(false)

    const [main, setMain] = React.useState(true);

    // basic information
    const [firstname, setFirstname] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [date, setDate] = useState(new Date())
    const [lastname, setLastName] = React.useState(null);
    const [disabled, setDisabled] = React.useState(true);
    const [photo, setPhoto] = React.useState(null);
    const [photo2, setPhoto2] = React.useState(null);
    const [dateerror, setDateError] = React.useState(false);

    const [galleryOptions, setGalleryOptions] = React.useState({
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    })

    const s3Bucket = new S3({
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
      Bucket: PROFILES_BUCKET,
      region: REGION,
      signatureVersion: "v4"
    });

    // validating date


    // Driver license info


    // Vehicle info

    React.useEffect(() => {
      async function requestCamera() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Permission Request",
              message:
                "Allow Flux to use camera " ,
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("allowed");
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      }

      requestCamera()

     async function fetchProfile() {
        var phone1 = await AsyncStorage.getItem("userToken");
        setPhone(phone1);
        var awsprofilekey = 'Profile_'+phone1;
        var params = {Bucket: PROFILES_BUCKET, Key: awsprofilekey };

        s3Bucket.headObject(params, function (err, metadata) {  
          if (err && err.name === 'NotFound') {  
            setPhoto2(null);
          } else if (err) {
            setPhoto2(null);
          } else {  
            s3Bucket.getSignedUrl('getObject', params, function (err, url) {
              setPhoto2(url);
            });
          }
        });
      }

      fetchProfile();

      const retrieveUser = async () => {
        var phone = await AsyncStorage.getItem("userToken");

        axios.post("https://fluxservice.herokuapp.com/users/userinfo", {
          phone: phone
        }).then(function(response){
          if(response.status === 200){
            var data = response.data.data;
            setFirstname(data.firstname);
            setLastName(data.lastname);
            setUserInfo(data);
          }
        }).catch(function(error){
          console.log(error);
        });
      }

      retrieveUser();

      async function getDefaultTheme() {
        var theme = await AsyncStorage.getItem("theme");
    
        theme === 'dark' ? setTheme(ThemeDark) : setTheme(ThemeDefault);
        theme === 'dark' ? setThemeType(true) : setThemeType(false);

      }
    
      getDefaultTheme();

      if(isFocused){
        getDefaultTheme();
      }
    
    }, [isFocused]);

  const handlePress1 = () => {
    setExpanded1(!expanded1)
    setExpanded2(false);
    setExpanded3(false);
    setExpanded4(false);
    setExpanded5(false);
    setMain(false);
  };
  const handlePress2 = () => {
    setExpanded2(!expanded2)
    setExpanded1(false);
    setExpanded3(false);
    setExpanded4(false);
    setExpanded5(false);
    setMain(false);
  };
  const handlePress3 = () => {
    setExpanded3(!expanded3)
    setExpanded1(false);
    setExpanded2(false);
    setExpanded4(false);
    setExpanded5(false);
    setMain(false);
  };
  const handlePress4 = () => {
    setExpanded4(!expanded4)
    setExpanded1(false);
    setExpanded2(false);
    setExpanded3(false);
    setExpanded5(false);
    setMain(false);
  };

  const handlePress5 = () => {
    setExpanded5(!expanded4)
    setExpanded1(false);
    setExpanded2(false);
    setExpanded3(false);
    setExpanded4(false);
    setMain(false);
  };

  const handleBackPress = () => {
    setExpanded1(false);
    setExpanded2(false);
    setExpanded3(false);
    setExpanded4(false);
    setExpanded5(false);
    setMain(true);
  }

  const handleBasicDone = () => {
    if(firstname === null && lastname === null){
      setErrorChip(true);

    } else {
      if(photo != null){
        uploadPhotoToS3();
      }
      setExpanded1(false);
      setMain(true);
    }
  }

  const chooseCameraGallary = () => {
    Alert.alert(
      "Upload Photo",
      "Choose image source",
      [
        {
          text: "Camera",
          onPress: () => openCamera()
        },
        { text: "Gallery", onPress: () => openGallery() },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ]
    );
  }


  const openCamera = () => {

    let options = {

      storageOptions: {

        skipBackup: true,

        path: 'images',

      },

    };

    ImagePicker.launchCamera(options, (res) => {

      console.log('Response = ', res);

      if (res.didCancel) {

      console.log('cancelled!');

      } else if (res.error) {

        console.log('error!');

      } else {
        setPhoto(res);
      }

    });

}

const uploadPhotoToS3 = async () => {
  let contentType = "image/jpg";
  let contentDeposition = 'inline;filename="' +photo.assets+ '"';


  const fPath = photo.assets[0].uri;

  console.log(fPath);
  const base64 = await fs.readFile(fPath, "base64");
    //console.log(base64);

  const arrayBuffer = decode(base64);

  s3Bucket.createBucket(() => {
    const params = {
      Bucket: PROFILES_BUCKET,
      Key: 'Profile_'+phone,
      Body: arrayBuffer,
      ContentDisposition: contentDeposition,
      ContentType: contentType
    };

    s3Bucket.upload(params, (err, data) => {
      if(err){
        console.log(err);
      }

      console.log(data);
    });
  });
}

function calculateAge(birthday) { 
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs); 
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const openGallery = () => {
  ImagePicker.launchImageLibrary(galleryOptions, (res) => {
    if (res.didCancel) {
     console.log("Cancelled!");
    } else if(res.error) {
      console.log('error');
    } else {
      setPhoto(res)
    }
  });
}

const surfaceHeight = (Dimensions.get('window').height) * 3/4 + 20;

    return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}} >
      <StatusBar backgroundColor="#5318f0" />
      <Appbar.Header style={{backgroundColor: theme.colors.appbar}}>
     {!main ? <Appbar.BackAction onPress={() => {handleBackPress()}} /> :  <Appbar.Action icon="menu" onPress={() => {navigation.toggleDrawer()}} />}
     {expanded1 ? ( <Appbar.Content title="Basic Information" style={{color: theme.colors.text}}   />) : expanded2 ? ( <Appbar.Content title="License Information" style={{color: theme.colors.text}}   />) : expanded3 ? ( <Appbar.Content title="Passport/ID Information" style={{color: theme.colors.text}}   />) : expanded4 ? ( <Appbar.Content title="Logbook Information" style={{color: theme.colors.text}}  />) : expanded5 ? ( <Appbar.Content title="Vehicle Information" style={{color: theme.colors.text}}  />) : ( <Appbar.Content title="Services Account" style={{color: theme.colors.text}}  />)}
    </Appbar.Header>
      <ScrollView>
      {expanded1 ? (

        <Surface style={{left: 10, right: 10, top: 10, height: surfaceHeight,  backgroundColor: theme.colors.background }}>
          <ScrollView>
          <View style={{alignItems: 'center', justifyContent: 'center'}} >
          {photo != null ? (
            photo.assets.map((uri) => { return (
              <Avatar.Image style={{top: 10, bottom: 5}} key={uri} size={100} source={uri}/>
            ) })
          ) : photo2 != null ? (<Avatar.Image style={{top: 10, bottom: 5,}} size={100} source={{uri: photo2}}/>) : <Avatar.Image style={{top: 10, bottom: 5}} size={100} source={require('./assets/user-nobg.png')}/>}
          <TouchableRipple style={{borderRadius: 40, marginTop: 10, width: '80%'}} onPress={() => {chooseCameraGallary()}} >
            <Button mode="outlined" contentStyle={{height: 40,}} labelStyle={{color: Colors.green700}} style={{ borderRadius: 40, borderColor: Colors.green700}} >Upload Photo</Button>
          </TouchableRipple>
          </View>
          <View style={{marginTop: 30,}} >
          <TextInput
            style={{right: 20, marginLeft: 20, marginBottom: 10, height: 40, backgroundColor: themetype ? "grey" : "transparent"}}
            mode='outlined'
            value={firstname}
            placeholder="First Name"
            selectionColor='white'
            onChangeText={(text) => {setFirstname(text)}}
          />

          <TextInput
            style={{right: 20, marginLeft: 20, marginBottom: 10, height: 40, backgroundColor: themetype ? "grey" : "transparent"}}
            mode='outlined'
            value={lastname}
            placeholder="Last Name"
            selectionColor='white'
            onChangeText={(text) => {setLastName(text)}}
          />

          <TextInput
            style={{right: 20, marginLeft: 20, marginBottom: 10, height: 40, backgroundColor: themetype ? "grey" : "transparent"}}
            mode='outlined'
            placeholder="Date of Birth"
            value={date.toDateString()}
            selectionColor='white'
            onFocus = {() => {setOpen(true)}}
            onBlur = {() => {setOpen(false)}}
            outlineColor={dateerror ? "red" : null}
          />

          <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode="date"
                  title={null}
                  theme={themetype ? "dark" : null}
                  onConfirm={(date) => {
                    setOpen(false)
                    var age = calculateAge(date);
                    if(age < 18){
                     setDateError(true);
                    } else {
                      setDateError(false);
                      setDate(date)
                    }
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
          />
        
          <TextInput
            style={{right: 20,  marginLeft: 20, marginBottom: 10, height: 40, backgroundColor: themetype ? "grey" : "transparent"}}
            mode='outlined'
            value={email}
            placeholder="Email (optional)"
            selectionColor='white'
            onChangeText={(text) => {setEmail(text)}}
          />
          </View>

          <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableRipple style={{borderRadius: 40, marginTop: 10, width: '80%'}} onPress={() => {handleBasicDone()}} >
            <Button disabled={disabled} mode={disabled ? "outlined" : "contained"} contentStyle={{height: 60,}} labelStyle={{color: 'white'}} style={{ borderRadius: 40, backgroundColor: Colors.green700}} >Done</Button>
          </TouchableRipple>

          {errorchip ? (
          <Snackbar
          style={{backgroundColor: Colors.red700, color: 'white',}}
            visible={errorchip}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Undo',
              onPress: () => {
                // Do something
              },
            }}>
            Some fields required are empty!
          </Snackbar>
        ) : null}
          </View>
          </ScrollView>
        </Surface>
      ): null}

        {main? (
                <List.Section style={{left: 5, right: 5,}} titleStyle={{color: theme.colors.text}} title="Register a vehicle to get started on your first Flux ride">
                <List.Accordion
                  title="Basic Information"
                  titleStyle={{color: theme.colors.text}}
                  left={props => <List.Icon {...props} icon="information" color={theme.colors.text} />}
                  expanded={false}
                  onPress={handlePress1}
                  style={{left: 0, backgroundColor: theme.colors.background,}}
                  >
                  <List.Item title="Vehicle Owner Details"
                  description = {props => <View style={{left: 0,}} ><TextInput style={{height: 40,}} mode='outlined' value={fullname} label="Full Name" onChangeText={(text) => {setFullname(text)}} /><TextInput style={{height: 40,}} value={email} mode='outlined' label="Email Address" onChangeText={(text) => {setEmail(text)}} /><TextInput style={{height: 40,}} mode='outlined' value={ID} label="ID Number" keyboardType='numeric' onChangeText={(text) => setID(text)} /><TextInput style={{height: 40,}} mode='outlined' value={phone} label="Phone Number" keyboardType='numeric' onChangeText={(text) => {setPhone(text)}} /><View style={{alignItems: 'center'}} ><TouchableRipple onPress={() => {setExpanded1(false)}} style={{borderRadius: 40, marginTop: 10, width: '70%'}} ><Button uppercase={false} mode="contained" contentStyle={{height: 40,}} labelStyle={{color: 'white'}} style={{ backgroundColor: 'darkcyan', borderRadius: 40,}} >Save</Button></TouchableRipple></View></View>}
                  />
                </List.Accordion>
          
                <List.Accordion
                  title="License Information"
                  titleStyle={{color: theme.colors.text}}
                  left={props => <List.Icon {...props} icon="check" color={theme.colors.text} />}
                  expanded={false}
                  style={{left: 0, backgroundColor: theme.colors.background,}}
                  onPress={handlePress2}>
                  <List.Item title="First item" />
                  <List.Item title="Second item" />
                </List.Accordion>   

                <List.Accordion
                  title="Passport/ID Information"
                  titleStyle={{color: theme.colors.text}}
                  left={props => <List.Icon {...props} icon="passport" color={theme.colors.text} />}
                  expanded={false}
                  style={{left: 0, backgroundColor: theme.colors.background,}}
                  onPress={handlePress3}>
                  <List.Item title="First item" />
                  <List.Item title="Second item" />
                </List.Accordion> 
          
                <List.Accordion
                  title="Logbook Information"
                  titleStyle={{color: theme.colors.text}}
                  left={props => <List.Icon {...props} icon="star" color={theme.colors.text} />}
                  expanded={false}
                  style={{left: 0, backgroundColor: theme.colors.background,}}
                  onPress={handlePress4}>
                  <List.Item title="" />
                  <List.Item title="Second item" />
                </List.Accordion>
          
                
                <List.Accordion
                  title="Vehicle Details"
                  titleStyle={{color: theme.colors.text}}
                  left={props => <List.Icon {...props} icon="car-info" color={theme.colors.text} />}
                  expanded={false}
                  style={{left: 0, backgroundColor: theme.colors.background,}}
                  onPress={handlePress5}>
                  <List.Item
                   title="Information regarding your vehicle."
                   description={props => <TextInput mode='outlined' label="Full Name" />}
                   />
                  <List.Item title="Second item" />
                </List.Accordion>
          
              </List.Section>
        ) : null}
    </ScrollView>
      </View>
    )
  };

  const Reviews = () => {
    const [theme, setTheme] = React.useState(InitialTheme);
    return (
      <SafeAreaView style={{flex: 1,}}>
        <Appbar.Header style={{backgroundColor: theme.colors.appbar}}>
      <Appbar.Action icon="menu" onPress={() => {navigation.toggleDrawer()}} />
      <Appbar.Content title="Reviews" style={{color: theme.colors.text}} />
     </Appbar.Header>

     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

    <Text>Customer Reviews</Text>
      </View>
        </SafeAreaView>
    )
  };

  const AccountSettings = () => {
    const [theme, setTheme] = React.useState(InitialTheme);
    return (
      <SafeAreaView style={{flex: 1,}}>
        <Appbar.Header style={{backgroundColor: theme.colors.appbar}}>
      <Appbar.Action icon="menu" onPress={() => {navigation.toggleDrawer()}} />
      <Appbar.Content title="Service Manager" style={{color: theme.colors.text}} />
     </Appbar.Header>

     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

    <Text>Service Management</Text>
      </View>
        </SafeAreaView>
    )
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'newvehicle', title: 'New Service', icon: 'plus' },
    { key: 'reviews', title: 'Reviews', icon: 'star-four-points' },
    { key: 'settings', title: 'Manage', icon: 'cog' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    newvehicle: NewVehicle,
    reviews: Reviews,
    settings: AccountSettings,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

const DriverSetting = ({ navigation }) => {
  const [phone, setPhone] = React.useState('');
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [theme, setTheme] = React.useState(InitialTheme);
  const [themetype, setThemeType] = React.useState(false);
  const { signOut } = React.useContext(AuthContext);
  const [skeleton, setSkeleton] = React.useState(true);
  const isFocused = useIsFocused();
  const { changeTheme } = React.useContext(AuthContext);
  React.useEffect(() => {
    async function fetchUserInfo() {
      var userPhone = await AsyncStorage.getItem('userToken');
      setPhone(userPhone);

       axios.post("https://fluxservice.herokuapp.com/users/userinfo", {
        phone: userPhone
      }).then(function(response){
        if(response.status === 200){
          var data = response.data.data;
          setFirst(data.firstname);
          setLast(data.lastname);
          setSkeleton(false);
        }
      }).catch(function(error){
        console.log(error);
      })
    }

    fetchUserInfo();

    async function checkTheme() {
      var theme = await AsyncStorage.getItem('theme');
      theme === 'dark' ? setTheme(ThemeDark) : setTheme(ThemeDefault);
      theme === 'dark' ? setThemeType(true) : setThemeType(false);
      
    }

    checkTheme();

    if(isFocused){
      checkTheme();
    }

  }, [isFocused]);

  const setDefaultTheme = async () => {
    var theme = await AsyncStorage.getItem('theme');
    if(theme === 'dark'){
      await AsyncStorage.setItem('theme', 'light');
      changeTheme({ theme: 'light' });
      setTheme(ThemeDefault);
    } else {
      await AsyncStorage.setItem('theme', 'dark');
      changeTheme({ theme: 'dark' })
      setTheme(ThemeDark);
    }
  }
  return (
    <View style={{flex: 1,backgroundColor: theme.colors.background}} >


      <List.Section>
      <List.Accordion
      style={{left: 0, color: theme.colors.text, backgroundColor: theme.colors.surface}}
        title="Edit Phone number"
        titleStyle={{color: theme.colors.text,}}
        descriptionStyle={{color: Colors.green700}}
        description={phone}
        expanded={false}
        right={props => <List.Icon {...props} icon="chevron-right" color={ theme.colors.text} />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
           style={{left: 0, color: theme.colors.text, backgroundColor: theme.colors.surface}}
        title="Edit Name"
        titleStyle={{color: theme.colors.text,}}
        descriptionStyle={{color: Colors.green700}}
        description={first + ' ' + last}
        expanded={false}
        right={props => <List.Icon {...props} icon="chevron-right" color={ theme.colors.text} />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>


      <List.Accordion
           style={{left: 0, backgroundColor: theme.colors.surface}}
        title="Notifications"
        titleStyle={{color: theme.colors.text,}}
        descriptionStyle={{color: Colors.green700}}
        description="Allow this app to send you notifications."
        expanded={false}
        right={props => <List.Icon {...props} icon="chevron-right" color={ theme.colors.text} /> }>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
           style={{left: 0, color: theme.colors.text, backgroundColor: theme.colors.surface}}
        title="Theme Settings"
        titleStyle={{color:theme.colors.text,}}
        descriptionStyle={{color: Colors.green700}}
        description={themetype ? "Current theme - Dark Theme" : "Current theme - Default Theme"}
        expanded={false}
        onPress={() => {setDefaultTheme()}}
        right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.text} /> }>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>


      <List.Accordion
           style={{left: 0, backgroundColor: theme.colors.surface}}
        title="Terms of use, FAQs & Data privacy"
        titleStyle={{color: theme.colors.text,}}
        descriptionStyle={{color: Colors.green700}}
        description="Read our terms, our frequently asked questions and more about how we handle your data."
        expanded={false}
        right={props => <List.Icon {...props} icon="chevron-right" color={ theme.colors.text} /> }>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>


      <List.Accordion
           style={{left: 0, color: theme.colors.text, backgroundColor: theme.colors.surface}}
           titleStyle={{color: theme.colors.text,}}
        title="Logout"
        expanded={false}
        onPress={signOut}
        right={props => <List.Icon {...props} icon="arrow-right" color={ theme.colors.text} /> }>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>


    </List.Section>
    
    </View>
  )
  
}

const MechanicalServices = ({ navigation }) => {
  const [region, setRegion] = React.useState({  })
  React.useEffect(() => {
    const initLocation = async () => {
      Geolocation.getCurrentPosition(async position => {
            setRegion({
              latitude: parseFloat(position.coords.latitude),
              longitude: parseFloat(position.coords.longitude),
              latitudeDelta: 0.001,
              longitudeDelta: 0.001
            });
    
      }, 
      error => console.log(error),
      );
    
    }
    
    initLocation();
  }, [])
return (
  <View style={{flex: 1,}}>
        <MapView
   style={styles.map}
   initialRegion={region}
   showsMyLocationButton={true}
   showsUserLocation={true}
   showsCompass = {true}
 >       


 </MapView>
    </View>
)
}

const DriverEarnings = ({ navigation }) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Earnings</Text>
      </View>
  )
}

const DriverPrivacy = ({ navigation }) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Data privacy, license, terms, FAQs</Text>
    </View>
  )
}

const DriverHelp = ({ navigation }) => {
  const [theme, setTheme] = React.useState(InitialTheme);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Police, ambulance etc</Text>
    </View>
  )
}

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const [header, setHeader] = React.useState(false);
  const [driver, setDriverState] = React.useState(false);
  const [theme, setTheme] = React.useState(InitialTheme);
  const [photo, setPhoto] = React.useState(null);
  const [first, setF] = React.useState("");
  const [last, setL] = React.useState("");
  const [connection, setConnection] = React.useState(true);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type){
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );


  React.useEffect(() => {
    SplashScreen.hide();

    const unsubscribe = NetInfo.addEventListener(state => {
      state.isConnected ? setConnection(true): setConnection(false);
    });
    unsubscribe();

    
    async function checkTheme() {
      var theme = await AsyncStorage.getItem('theme');
      theme === 'dark' ? setTheme(ThemeDark) : setTheme(ThemeDefault);
      theme === 'dark' ? (InitialTheme = {...ThemeDark}) : (InitialTheme = {...ThemeDefault});
      console.log(theme);
    }

    checkTheme();

    async function checkPassengerState() {
      var user = await AsyncStorage.getItem('userState');
      user === 'driver' ? setDriverState(true) : setDriverState(false);
      console.log(user);
      
    }

    checkPassengerState();

    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e){

      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken})
    };

      bootstrapAsync();
    

    const retrieveUser = async (phone) => {
      if(phone != null){

        axios.post("https://fluxservice.herokuapp.com/users/userinfo", {
          phone: phone
        }).then(async function(response){
          if(response.status === 200){
            var data = response.data.data;
            setF(data.firstname);
            setL(data.lastname);

            await AsyncStorage.setItem('firstname', data.firstname);
            await AsyncStorage.setItem('lastname', data.lastname);
          }
        }).catch(function(error){
          console.log(error);
        });
      } else {
        var phone = await AsyncStorage.getItem("userToken");
  
        axios.post("https://fluxservice.herokuapp.com/users/userinfo", {
          phone: phone
        }).then(async function(response){
          if(response.status === 200){
            var data = response.data.data;
            setF(data.firstname);
            setL(data.lastname);

            await AsyncStorage.setItem('firstname', data.firstname);
            await AsyncStorage.setItem('lastname', data.lastname);
          }
        }).catch(function(error){
          console.log(error);
        });
      }
    }

    retrieveUser(null);

    async function fetchProfile(data) {
      if(data != null){
        const s3Bucket = new S3({
          accessKeyId: ACCESS_KEY_ID,
          secretAccessKey: SECRET_ACCESS_KEY,
          Bucket: PROFILES_BUCKET,
          region: REGION,
          signatureVersion: "v4"
        });
    
        var awsprofilekey = 'Profile_'+data;
        var params = {Bucket: PROFILES_BUCKET, Key: awsprofilekey };
    
        s3Bucket.headObject(params, function (err, metadata) {  
          if (err && err.name === 'NotFound') {  
            setPhoto(null);
          } else if (err) {
            setPhoto(null);
          } else {  
            s3Bucket.getSignedUrl('getObject', params, function (err, url) {
              setPhoto(url);
            });
          }
        });
      } else {
        const s3Bucket = new S3({
          accessKeyId: ACCESS_KEY_ID,
          secretAccessKey: SECRET_ACCESS_KEY,
          Bucket: PROFILES_BUCKET,
          region: REGION,
          signatureVersion: "v4"
        });
    
        var phone1 = await AsyncStorage.getItem("userToken");
        var awsprofilekey = 'Profile_'+phone1;
        var params = {Bucket: PROFILES_BUCKET, Key: awsprofilekey };
    
        s3Bucket.headObject(params, function (err, metadata) {  
          if (err && err.name === 'NotFound') {  
            setPhoto(null);
          } else if (err) {
            setPhoto(null);
          } else {  
            s3Bucket.getSignedUrl('getObject', params, function (err, url) {
              setPhoto(url);
            });
          }
        });
      }
    }

    fetchProfile(null);
  
  }, []);


  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({type: 'SIGN_IN', token: data.phone});
        await AsyncStorage.setItem('userToken', data.phone);
        //retrieveUser(data.phone);
        //fetchProfile(data.phone);
        console.log('hello');
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          dispatch({type: 'SIGN_OUT'})
        } catch(e) {
          console.log(e);
        }
      
      },
      signUp: async (data) => {
             
              //retrieveUser(data.phone);
              //fetchProfile(data.phone);
              dispatch({type: 'SIGN_IN', token: data.phone});
              await AsyncStorage.setItem('userToken', data.phone);
      },
      changeTheme: async (data) => {
        await AsyncStorage.setItem("theme", data.theme);
        data.theme === 'dark' ? setTheme(ThemeDark) : setTheme(ThemeDefault);
      },
      networkChange: async(data) => {
        setConnection(data.state);
      }
    }),
    []
  );

  const changeUserState =  async () => {
    var user = await AsyncStorage.getItem("userState");


    user === 'driver' ? ( AsyncStorage.setItem('userState', 'passenger')) : ( AsyncStorage.setItem('userState', 'driver'));

    setDriverState(!driver);

  }

  const drawerWidth = (Dimensions.get('window').width) * 0.8;
return (
  <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme} >
    
        {state.isLoading && connection ? (
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="welcome" component={WelcomePage} />
            </Stack.Navigator>
        ) : state.userToken == null && connection ? (
          <Stack.Navigator initialRouteName="splash">
          <Stack.Screen options={{headerShown: false}} name="Splash" component={SplashPage} />
          <Stack.Screen options={{headerShown: false}}  name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown: false}} name="ForgotPassword" component={FPScreen} />
          <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        ) : state.userToken != null && connection ? (
           
          driver ? (
            
            <Drawer.Navigator initialRouteName='Ride Requests'   
            drawerContent={(props) => {
              return (
                <SafeAreaView style={{flex: 1,}}>
                  <View style={{flexDirection: 'row',}}>
                  
                  <View
                  style={{
                  flex: 1,
                  height: 100,
                  alignItems: "flex-start",
                  justifyContent: "center",
                  marginLeft: 30,
                }}>
                  {photo != null ? (
            
                                      <Image
                                      style={{width: 70, height: 70, borderRadius: 40,}}
                                      source={{uri: photo}}
                                      
                                    />
                                  
                  ) : (
                                     
              <Image
                                      source={require("./assets/avatar.png")}
                                      style={{width: 70, height: 70, borderRadius: 40,}}
                                    /> 
                  )}
                  </View>
                  <View
                  style={{
                  flex: 2,
                  height: 100,
                  alignItems: "flex-start",
                  justifyContent: "center",
                  textAlignVertical: 'center',
                  marginLeft: 10,
                }}>
                 <Text style={{fontSize: 20, color: theme.colors.text}} >{first + ' '+ last}</Text>
                  <Text style={{fontSize: 13, color: theme.colors.text}} >Status: {driver ? "Service Provider" : "Passenger"}</Text>
                  </View>

                  </View>
                  <Divider />
                  <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View style={{ justifyContent: 'space-between'}}>
                      <DrawerItemList {...props} />
                    </View>
                   
                    <View style={{marginBottom: '5%'}}>
                      <Divider />
                    <TouchableRipple
                rippleColor="rgba(0, 0, 0, .32)"
                style={{borderRadius: 40, marginLeft: '10%', marginRight: '10%', marginTop: 5,}}
                onPress={() => {changeUserState()}}
              >
                    <Button  mode="contained" contentStyle={{height: 60,}} labelStyle={{color: 'white'}} style={{ borderRadius: 40,}}>
                    Switch to Passenger
                  </Button>
        </TouchableRipple>
                    </View>
                  </View>
                </SafeAreaView>
              )
            }}   
           
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.appbar, //Set Header color
              },
              headerTintColor: theme.colors.appbartext, //Set Header text color
              headerTitleStyle: {
               //fontWeight: 'bold', //Set Header text style
               color: theme.colors.appbartext,
              },
              drawerItemStyle: { marginLeft: 0, marginRight: 0, paddingLeft: 0, height: 60,},
              drawerType: 'front',
              drawerContentStyle: {textAlignVertical: 'center', },
              drawerStyle: {width: drawerWidth},
              drawerActiveTintColor: 'cyan',
              
              
            }} >
            <Drawer.Screen name="Ride Requests" component={RideRequests} options={{drawerLabel: 'Ride Requests', header: () => {return !header ? false : true}, drawerIcon: ({focused, size}) => (  <IconButton
      icon="car"
      size={30}
      color={theme.colors.text}
      onPress={() => console.log('Pressed')}
    />
             ),}} />
  
  <Drawer.Screen name="Provider Services" component={MechanicalServices} options={{drawerLabel: 'Important Services',  drawerIcon: ({focused, size}) => (  <IconButton
      icon="wrench"
      size={30}
      color={theme.colors.text}
      onPress={() => console.log('Pressed')}
    />
  ),}} />


<Drawer.Screen name="My Services" component={DriverAccountSettings} options={{drawerLabel: 'My Services', header: () => {return !header ? false : true}, drawerIcon: ({focused, size}) => (  <IconButton
      icon="view-dashboard"
      size={30}
      color={theme.colors.text}
      onPress={() => console.log('Pressed')}
    />
  
             ),}}/>

<Drawer.Screen name="Payments" component={DriverEarnings} options={{drawerLabel: 'Payments & Earnings', drawerIcon: ({focused, size}) => (  <IconButton
      icon="cash"
      size={30}
      color={theme.colors.text}
      onPress={() => console.log('Pressed')}
    />
             ),}} />

<Drawer.Screen name="Settings" component={DriverSetting} options={{drawerLabel: 'Settings', drawerIcon: ({focused, size}) => (  <IconButton
      icon="cog"
      size={30}
      color={theme.colors.text}
      onPress={() => console.log('Pressed')}
    />
  
             ),}}/>

            <Drawer.Screen name="Privacy, FAQs and Terms" component={DriverPrivacy} options={{drawerLabel: 'Privacy, FAQs and Terms', drawerIcon: ({focused, size}) => (  <IconButton
      icon="account-alert"
      size={30}
      color={theme.colors.text}
      onPress={() => console.log('Pressed')}
    />
             ),}} />
  
  <Drawer.Screen name="Emergency Help" component={DriverHelp} options={{drawerLabel: 'Emergency Help', drawerIcon: ({focused, size}) => (  <IconButton
      icon="help"
      size={30}
      color={theme.colors.text}
      onPress={() => console.log('Pressed')}
    />
  
             ),}}/>
            </Drawer.Navigator>
          ): (
            <Drawer.Navigator initialRouteName='Flux'   
            drawerContent={(props) => {
              return (
                <SafeAreaView style={{flex: 1,}}>
                  <View style={{flexDirection: 'row',}}>
                  <View
                  style={{
                  flex: 1,
                  height: 100,
                  alignItems: "flex-start",
                  justifyContent: "center",
                  marginLeft: 30,
                }}>
                                    {photo != null ? (
                                      <Image
                                      style={{width: 70, height: 70, borderRadius: 40,}}
                                      source={{uri: photo}}
                                    />
                  ) : (
                                      <Image
                                      source={require("./assets/avatar.png")}
                                      style={{width: 70, height: 70, borderRadius: 40,}}
                                    />
                  )}
                  </View>
                  <View
                  style={{
                  flex: 2,
                  height: 100,
                  alignItems: "flex-start",
                  justifyContent: "center",
                  textAlignVertical: 'center',
                  marginLeft: 10,
                }}>
                  <Text style={{fontSize: 20, color: theme.colors.text}}>{first + ' '+ last}</Text>
                  <Text style={{fontSize: 13, color: theme.colors.text}}> Status: {driver ? "Service Provider" : "Passenger"}</Text>
                  </View>
                  </View>
                  <Divider />
                  <View style={{flex:1, justifyContent: 'space-between'}}>
                    <View style={{justifyContent: 'space-between'}} >
                      <DrawerItemList {...props} />
                    </View>
                   
                    <View style={{marginBottom: '5%'}}>
                    <Divider />
                    <TouchableRipple
                rippleColor="rgba(0, 0, 0, .32)"
                style={{borderRadius: 40, marginLeft: '10%', marginRight: '10%'}}
                onPress={() => {changeUserState()}}
              >
                    <Button  mode="contained" contentStyle={{height: 60,}} labelStyle={{color: 'white'}} style={{ borderRadius: 40,}}>
                    Service Provider
                  </Button>
        </TouchableRipple>
                    </View>
                  </View>
                  
                </SafeAreaView>
              )
            }}   
           
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.appbar, //Set Header color
              },
              headerTintColor: theme.colors.appbartext, //Set Header text color
              headerTitleStyle: {
               //fontWeight: 'bold', //Set Header text style
               color: theme.colors.appbartext,
              },
              drawerItemStyle: { marginLeft: 0, marginRight: 0, paddingLeft: 0, height: 60,},
              drawerType: 'front',
              drawerContentStyle: {textAlignVertical: 'center', },
              drawerStyle: {width: drawerWidth},
              drawerActiveTintColor: 'cyan',
            }} >
            <Drawer.Screen name="Flux" component={Home} options={{drawerLabel: 'Order a Ride', header: () => {return !header ? false : true}, drawerIcon: ({focused, size}) => (  <IconButton
      icon="car"
      size={30}
      color={theme.colors.text}
      onPress={() => console.log('Pressed')}
    />
             ),}} />
  
            <Drawer.Screen name="Account History" component={History} options={{drawerLabel: 'Ride History', drawerIcon: ({focused, size}) => (  <IconButton
      icon="history"
      size={30}
      color={theme.colors.text}
      onPress={() => console.log('Pressed')}
    />
             ),}} />
            <Drawer.Screen name="Security" component={Privacy} options={{drawerLabel: 'Privacy, Terms & FAQs', drawerIcon: ({focused, size}) => (  <IconButton
      icon="account-alert"
      size={30}
      color={theme.colors.text}
      onPress={() => console.log('Pressed')}
    />
             ),}} />
            <Drawer.Screen name="Account Settings" component={Settings} options={{drawerLabel: 'Account Settings', drawerIcon: ({focused, size}) => (  <IconButton
      icon="cog"
      size={30}
      color={theme.colors.text}
      onPress={() => console.log('Pressed')}
    />
  
             ),}}/>
  
  <Drawer.Screen name="Help" component={Help} options={{drawerLabel: 'Help', drawerIcon: ({focused, size}) => (  <IconButton
      icon="help"
      size={30}
      color={theme.colors.text}
      onPress={() => console.log('Pressed')}
    />
             ),}}/>
            </Drawer.Navigator>
          )

        ) :  <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="errorpage" component={ErrorPage} />
        </Stack.Navigator> }

    </NavigationContainer>
  </AuthContext.Provider>
)
    
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 150,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 0,
    elevation: 4,
  },

  image: {
    flex: 1,
    justifyContent: "center"
  },

  bottomView: {
    marginBottom: 40,
  },

  logo: {
    marginTop: 30,
    marginLeft: '7%',
    fontSize: 22,
  },

  brand: {
    marginLeft: '7%',
    fontSize: 37,
  },

  brandTheme : {
    marginLeft: '7%',
    fontSize: 37,
  },

  brandText: {
    marginLeft: '7%',
    fontSize: 20,
    marginTop: 10,
  },

  buttonViewLogin: {
    marginTop: 20,
    marginLeft: '7%',
    marginRight: '7%',
    textAlignVertical: 'center',
    borderRadius: 20,
    marginBottom: 5,
    color: 'blue',
  },

  buttonViewRegister: {
    marginTop: 10,
    marginLeft: '7%',
    marginRight: '7%',
    textAlignVertical: 'center',
    borderRadius: 20,
    marginBottom: 5,
  },

  loginButton: {
    color: 'blue',
    marginBottom: 10,
  },

  textInput: {
    marginRight:10,
    marginLeft: 10,
    marginBottom: 5,
    height: 45,
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  mapBtn: {
    position: "absolute",
    top: 10,
    left: 20,
  },

  fab: {
    backgroundColor: '#5318f0',
  },

  geoBtn: {
    position: "absolute",
    top: 70,
    left: 20,
  },

  route: {
    position: 'absolute',
    top: 90,
    left: 20,
  },

  searchbar: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'column',
    right: '5%',
    left: '5%',
  },

  listItemContainer: {
    flex: 1,
    height: sizes.itemHeight,
    paddingHorizontal: sizes.spacing.regular,
    justifyContent: 'center',
    borderTopWidth: 1,
  },

  listItemLabel: {
    fontSize: 14,
  },

  sectionHeaderContainer: {
    height: sizes.headerHeight,
    justifyContent: 'center',
    paddingHorizontal: sizes.spacing.regular,
  },

  sectionHeaderLabel: {

  },

  listHeaderContainer: {
    height: sizes.listHeaderHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default App;
