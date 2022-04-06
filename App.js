import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import SignIn from "./src/Components/Authentication/SignIn";
import Home from "./src/Components/Home/Home";
import { axios } from "./src/API/Axios";

const AuthContext = React.createContext();
const Stack = createStackNavigator();

const SignInScreen = props => {
  const navigation = useNavigation();
  const { signIn } = React.useContext(AuthContext);
  return <SignIn {...props} navigation={navigation} userSignIn={signIn} />;
};

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isVerified: false,
          };

        case "SIGN_OUT":
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
      isVerified: false,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {state.userToken == null ? (
              <>
                <Stack.Screen
                  name="SignInScreen"
                  component={SignInScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
