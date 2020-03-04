import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import { Block } from "galio-framework";

// screens
import Search from "../screens/Search";
import Pro from "../screens/Pro";
import ShoppingCart from "../screens/ShoppingCart";
import Itempage from "../screens/Itempage";
import MyPoints from "../screens/MyPoints";
import Trivia from "../screens/Trivia";
// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const ItempageStack = createStackNavigator({
  Itempage:{
    screen:Itempage,
    navigationOptions:({navigation}) => ({
      header:<Header title="Item Page" navigation={navigation} />
    })
  }
});

const TriviaStack = createStackNavigator({
  Trivia:{
    screen: Trivia,
    navigationOptions:({navigation}) => ({
      header:<Header title="Daily Trivia" navigation={navigation} />
    })
  }
});

const ShoppingCartStack = createStackNavigator({
  ShoppingCart: {
    screen: ShoppingCart,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Shopping Cart" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const MyPointsStack = createStackNavigator({
  ShoppingCart: {
    screen: MyPoints,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="My Points" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Search" navigation={navigation} />
      })
    },
    Pro: {
      screen: Pro,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header left={<Block />} white transparent title="" navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);
// divideru se baga ca si cum ar fi un ecrna dar nu-i nimic duh
const AppStack = createDrawerNavigator(
  {
    Search: {
      screen: SearchStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Search" title="Search" />
        )
      })
    },
    Itempage:{
      screen:ItempageStack,
      navigationOptions: navOpt => ({
         drawerLabel:({focused}) => (
            <DrawerItem focused={focused} screen="Itempage" title="Itempage" />
          ) 
      })
    },
    ShoppingCart: {
      screen: ShoppingCartStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="ShoppingCart" title="Shopping Cart" />
        )
      })
    },
    MyPoints: {
      screen: MyPointsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="My Points" title="My Points" />
        )
      })
    },
    Trivia: {
      screen: TriviaStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Trivia" title="Daily Trivia" />
        )
      })
    },
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
