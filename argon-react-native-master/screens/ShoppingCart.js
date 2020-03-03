import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, sSelect, Icon, Input, Header, Switch } from "../components/";
import { Block, Text, theme } from "galio-framework";
import { argonTheme, tabs } from "../constants/";
import { Card, CartItem } from '../components';
import food_products from '../data/food_products';
const { width } = Dimensions.get('screen');
import {AsyncStorage} from 'react-native';


class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.removeFromCart = this.removeFromCart.bind(this)
        this.state = {
            globalTotalPoints: '',
            totalPoints: 0,
            cartItem: [food_products[6], food_products[7]],
            // cartItem: [],
            globalItems: [],
        }
      }
    
    getFoodIndex(name) {
        food = ["Ground Beef", "Ground Turkey", "Ground Plant-based Protein", "White Buns", "Whole Wheat Buns", "Whole Grains Buns", "Steak", "Salmon", "Chicken"];
        return food.indexOf(name);
    }

    updatePoints = async() => {
        try {
            let points = '';
            points = await AsyncStorage.getItem('totalPoints') || 'none';
            var totalPoints = 0
            this.state.cartItem.map((f) => 
                totalPoints += f.points)

            const newGlobalPoints = Number(points) + totalPoints;
            await AsyncStorage.setItem('totalPoints', newGlobalPoints.toString());
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    };
    
    removeFromCart = async(item) => {
        try {
            var index = this.state.cartItem.indexOf(item);
            var items = this.state.cartItem;
            if (index !== -1) items.splice(index, 1);
            // this.setState({cartItem: items});
            console.log("after remova:::: ", items)

            var newGlobalCart = "none";
            for (i in items) {
                const temp = "@".concat(items[i].name);
                newGlobalCart = newGlobalCart.concat(temp);
                console.log(items[i])
                console.log(temp)
            }
            console.log(newGlobalCart);

            await AsyncStorage.setItem('cartItems', newGlobalCart);
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    };

    // removeFromCart(item){
    //     var index = this.state.cartItem.indexOf(item);
    //     var items = this.state.cartItem;
    //     if (index !== -1) items.splice(index, 1);
    //     this.setState({cartItem: items});
    // }

    clearCartContents = async(item) => {
        try {
            await AsyncStorage.setItem('cartItems', "");
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    };

    renderTotalPoints = () => {
        var totalPoints = 0
        this.state.cartItem.map((f) =>
            {if (f !== null){
                totalPoints += f.points;
                }
            })
        return (
            <Text size={24} bold >
                TOTAL POINTS: {totalPoints}
                {"\n"}
            </Text>)

    }

    itemLookUp = (item) => {
        console.log("inside item look up  ", item)
        var ret = null;
        for (i in food_products){
            if (food_products[i].name === item){
                ret = food_products[i];
                break;
            }
        }
        return ret
    }

    updateCartItems = () => {
        var cart = this.state.CartItem;
        var arr = this.state.globalItems;
        var idx = 0
        for (i in arr) {
            if (idx === 0){idx+= 1; continue;}
            var flag = 1;

            for (j in cart){
                if(cart[j] === null){continue;}
                if (cart[j].name === arr[i]){
                    flag = 0;
                    break;
                }
            }
        
            if (flag === 1){
                // add item to cart
                console.log("looking up ", arr[i])
                const itemContent = this.itemLookUp(arr[i]);
                this.setState({
                    cartItem: this.state.cartItem.concat(itemContent)
                  });
                console.log("new states ", this.state.CartItem)
            }
        }
    }

    getCartItems = async() => {
        let items = '';
        try {
            items = await AsyncStorage.getItem('cartItems') || 'none';
            // console.log("#####################")
            // console.log(items.split('@'));
            const arr = items.split('@');
            var idx = 0
            var currentCart = [];
            for (i in arr) {
                if (idx === 0){idx+= 1; continue;}
                // console.log("inside cart: ", arr[i]);
                currentCart.push(food_products[this.getFoodIndex(arr[i])]);
            }
            // console.log("current cart total: ", currentCart);
            this.setState({cartItem: currentCart})
            return arr;
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      }

    renderFood = () => {
        // {this.updateCartItems(this.state.cartItem)}
        if (Object.keys(this.state.cartItem).length > 0) {
            return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}>
                <Block flex>
                {/* {console.log("in render food: ", this.state.cartItem)} */}
                {this.state.cartItem.map((f) => 
                    <CartItem item={f} horizontal removeFromCart={this.removeFromCart.bind(this)}/>
                )}
                </Block>
            </ScrollView>
        )
    }
    else {
        return (<Text size={24} bold >
            Your cart is empty
            {"\n"}
        </Text>)
    }
    }

    renderArticles = () => {
        const { navigation } = this.props;
        this.getCartItems();
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}>
                <Block flex>
                    <Block flex={1.25} right>
                        <Button color="primary">
                            <Block row>
                                <Button style={styles.button}
                                        onPress={() => navigation.navigate('Search')}>
                                    ADD MORE ITEMS
                                </Button>
                            </Block>
                        </Button>
                        <Text>{"\n"}</Text>
                    </Block>

                    <Block flex>
                        {this.renderFood()}
                    </Block>

                    {this.renderTotalPoints()}

                    <Button center color="warning" style={styles.optionsButton}
                            onPress={() => {this.updatePoints(); navigation.navigate('MyPoints')}}>
                        SAVE POINTS 
                    </Button>
                    <Text>{"\n"}</Text>
                    <Button center color="warning" style={styles.optionsButton}
                            onPress={() => this.clearCartContents()}>
                        CLEAR CART
                    </Button>

                </Block>

            </ScrollView>
        )
    }
    render() {
        return (
            <Block flex center style={styles.home}>
                {this.renderArticles()}
            </Block>
        );
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

export default ShoppingCart;
