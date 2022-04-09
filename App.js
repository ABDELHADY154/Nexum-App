import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import SignIn from "./src/Components/Authentication/SignIn";
import Home from "./src/Components/Home/Home";
import { axios } from "./src/API/Axios";
import AddContact from "./src/Components/Contact/AddContact";
import Contacts from "./src/Components/Contact/Contacts";
import Profile from "./src/Components/Home/Profile";

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
  const AddNewContactScreen = props => {
    const navigation = useNavigation();
    return <AddContact {...props} navigation={navigation} />;
  };
  const ContactsScreen = props => {
    const navigation = useNavigation();
    return <Contacts {...props} navigation={navigation} />;
  };
  const HomeScreen = props => {
    const navigation = useNavigation();

    return (
      <Home
        {...props}
        navigation={navigation}
        logout={() => {
          AsyncStorage.clear();
          dispatch({ type: "SIGN_OUT" });
        }}
      />
    );
  };
  const ProfileScreen = props => {
    const navigation = useNavigation();

    return <Profile {...props} navigation={navigation} />;
  };
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
                  component={HomeScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="AddNewContact"
                  component={AddNewContactScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    title: "Add New Contact",
                  }}
                />
                <Stack.Screen
                  name="Contacts"
                  component={ContactsScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    title: "Phone Book",
                  }}
                />
                <Stack.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    title: "Profile",
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
