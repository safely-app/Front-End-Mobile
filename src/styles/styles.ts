import {StyleSheet} from 'react-native';

var colors: {[key: string]: string};

const paletteLight: typeof colors = {
  white: "#FFFFFF",
  blue: "#16304A",
  orange: "EF4F4F",
  yellow: "#FFF3AA",
  steelBlue: "#4179B5",
  red: "#EF4F4F"
}

const paletteDark: typeof colors = {
  // To be defined
}

// In the future when the paletteDark will be defined, a variable to know if
// the app will be in dark mode or not, and then we can either set the variable palette
// to dark or light.
// const palette = isDarkMode ? paletteDark : paletteLight
const palette = paletteLight;

export const theme = {
  colors: palette,
  sizeText: {
    xs: 8,
    s: 12,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 70
  },
  typeText: {
    h1: {
      fontFamily: "WorkSans-Bold",
    },
    body: {
      fontFamily: "WorkSans-Regular",
    }
  }
}

























export const colorPlaceholder: string = "#16304A";

export const styles = StyleSheet.create({
    input: {
      height: 40,
      width: '65%',
      margin: 12,
      borderWidth: 1,
      borderRadius: 10,
      color: 'black'
    },
    button: {
      height: 40,
      width: '35%',
      margin: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      borderColor: 'black',
      borderWidth: 2
    },
    content: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    },
    title: {
      margin: 12,
      fontSize: 30,
      fontFamily: 'WorkSans-Bold'
    }
});

export const stylesLogin = StyleSheet.create({
  safelyTitle: {
    // margin: 30,
    marginBottom: 25,
    fontSize: 80,
    fontFamily: 'WorkSans-Bold',
    color: "#16304A"
  },
  textInput: {
    height: 35,
    width: '80%',
    // marginLeft: 30,
    borderRadius: 7,
    color: "#16304A",
    backgroundColor: "#D6E0EC",
    paddingLeft: 10
  },
  loginContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // alignItems: 'center',
    marginBottom: 70,
    marginLeft: 30
  },
  button: {
    height: 40,
    width: '80%',
    // margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: "#16304A",
    color: "white"
  },
  horizontalLine: {
    borderBottomColor: "#16304A",
    borderBottomWidth: 0.8,
    width: '25%',
  }
});