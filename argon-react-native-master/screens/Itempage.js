import React from 'react';
import { TouchableWithoutFeedback,StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Button, sSelect, Icon, Input, Header, Switch } from "../components/";
import { Block, Text, theme } from "galio-framework";
import {Image} from 'react-native';
import { CartItem, MainItem, AltCard } from '../components';
import food_products from '../data/food_products';
const { width } = Dimensions.get('screen');
import {AsyncStorage} from 'react-native';

class Itempage extends React.Component {
    constructor(props) {
        super(props);
        this.handleCart = this.handleCart.bind(this);
        this.state = {
          mainitem: food_products[7],
          subitem: [food_products[6], food_products[8]],
          cart: {},
          render: 1,
        }
        this.handleClick = this.handleClick.bind(this)
      }
    
    
    handleClick(item) {
        console.log("In handle click");
        console.log(item)
        // if (this.state.mainitem == food_products[7]) {
        //     this.setState({mainitem: food_products[6], subitem: food_products[7]})
        // }
        // else {
        //     this.setState({mainitem: food_products[7], subitem: food_products[6]})
        // }        
        this.setState({mainitem: item})

        var currItemIndex = this.getFoodIndex(item.name);
        var alternatives = [];
        for (i in food_products[currItemIndex].alternatives){
            const altIdx = this.getFoodIndex(food_products[currItemIndex].alternatives[i])
            alternatives.push(food_products[altIdx])
        }
        this.setState({subitem: alternatives})
        console.log("end of handle click.")
    }

    getFoodIndex(name) {
        food = ["Ground Beef", "Ground Turkey", "Ground Plant-based Protein", "White Buns", "Whole Wheat Buns", "Whole Grains Buns", "Steak", "Salmon", "Chicken", "Dark Chocolate", "Milk Chocolate", "Eggs", "Cheese", "Tofu", "Shrimp", "Coffee", "Beer", "Potatoes", "Rice"];
        return food.indexOf(name);
    }

    getMainItem = async() => {
        try {
            var item = await AsyncStorage.getItem('currentItem') || food_products[7].name;
            var currItemIndex = this.getFoodIndex(item);
            
            this.setState({mainitem: food_products[currItemIndex]})
            
            var alternatives = [];
            for (i in food_products[currItemIndex].alternatives){
                const altIdx = this.getFoodIndex(food_products[currItemIndex].alternatives[i])
                alternatives.push(food_products[altIdx])
            }
            this.setState({subitem: alternatives})
            
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      }

    getFlag = async() => {
        try {
            var flag = await AsyncStorage.getItem('flag') || 'none';

            if (flag === '0'){
                this.getMainItem();
                this.setFlag();            
            }
            this.setState({render: 1})
            return (null)
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
            return (null)
        }
    }

    setFlag = async() => {
        try {
            await AsyncStorage.setItem('flag', '1');
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    }

    forceRender (){
        if (this.state.render === 1){
            this.forceUpdate();
            this.setState({render: 0})
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
            // console.log(await AsyncStorage.getItem('cartItems') || 'none');
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
        // console.log("In item page")
        this.getFlag();
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
                    <Text bold>{"Alternatives"} </Text>
                    {this.state.subitem.map((f) => 
                        <AltCard handleClick={this.handleClick.bind(this)} handleCart={this.handleCart.bind(this)} item={f} horizontal />)}
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
