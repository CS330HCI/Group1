import React from 'react';
import { TouchableWithoutFeedback,StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Button, sSelect, Icon, Input, Header, Switch } from "../components/";
import { Block, Text, theme } from "galio-framework";
import { argonTheme, tabs } from "../constants/";
import {Image} from 'react-native';
import { CartItem, MainItem, AltCard } from '../components';
import productsInCart from '../constants/productsInCart';
import food_products from '../data/food_products';
const { width } = Dimensions.get('screen');
import {AsyncStorage} from 'react-native';

class Itempage extends React.Component {
    constructor(props) {
        super(props);
        this.handleCart = this.handleCart.bind(this);
        this.state = {
          mainitem: food_products[7],
          subitem: food_products[6],
          cart: {},
        }
        this.handleClick = this.handleClick.bind(this)
      }

    handleClick = () => {
        if (this.state.mainitem == food_products[7]) {
            this.setState({mainitem: food_products[6], subitem: food_products[7]})
        }
        else {
            this.setState({mainitem: food_products[7], subitem: food_products[6]})
        }        
    }

    addToChart = async(newItem, navigation) => {
        try {
            console.log("new item:  ")
            console.log(newItem)        
            let items = '';
            items = await AsyncStorage.getItem('cartItems') || 'none';
            
            //append new item to the cart
            items = items.concat('@');
            items = items.concat(newItem);
            await AsyncStorage.setItem('cartItems', items);
            console.log(await AsyncStorage.getItem('cartItems') || 'none');
            navigation.navigate('ShoppingCart');
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
      };
    
    handleCart(item, navigation) {
        this.setState({cart: item})
        this.addToChart(item.name, navigation);
    }

    render() {
        return (
            <Block flex center style={styles.home}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}>
                <Block flex>
                    <Block flex={1.25} right>
                        <Text>{"\n"}</Text>
                    </Block>             
                    
                    <MainItem item={this.state.mainitem} handleCart={this.handleCart.bind(this)} horizontal />
                    <Text>{"\n"}</Text>
                    <Text onPress={this.handleClick} bold>{"Alternatives"} </Text>
                    <AltCard handleClick={this.handleClick.bind(this)} handleCart={this.handleCart.bind(this)} item={this.state.subitem} horizontal />
                    <AltCard handleClick={this.handleClick.bind(this)} handleCart={this.handleCart.bind(this)} item={food_products[8]} horizontal />
                </Block>

            </ScrollView>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    home: {
        width: width,
    },
    articles: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE,
    },
});

export default Itempage;
