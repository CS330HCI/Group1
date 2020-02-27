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
import Home from "../screens/Home";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";

import ShoppingCart from "../screens/ShoppingCart";
import Itempage from "../screens/Itempage";
import MyPoints from "../screens/MyPoints";
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

const ElementsStack = createStackNavigator({
  Elements: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Elements" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ItempageStack = createStackNavigator({
  Itempage:{
    screen:Itempage,
    navigationOptions:({navigation}) => ({
      header:<Header title="Item Page" navigation={navigation} />
    })
  }

});

const ArticlesStack = createStackNavigator({
  Articles: {
    screen: Articles,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Articles" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
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

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

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
    Home: {
      screen: Home,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
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
    }
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
