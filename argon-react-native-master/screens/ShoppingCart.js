import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, sSelect, Icon, Input, Header, Switch } from "../components/";
import { Block, Text, theme } from "galio-framework";
import { argonTheme, tabs } from "../constants/";
import { Card, CartItem } from '../components';
import productsInCart from '../constants/productsInCart';
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
            cartItem: [food_products[6], food_products[7]]
        }
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
    
    removeFromCart(item){
        var index = this.state.cartItem.indexOf(item);
        var items = this.state.cartItem;
        if (index !== -1) items.splice(index, 1);
        this.setState({cartItem: items});
        console.log(this.state.cartItem);
    }

    clearCartContents = () => {
        this.setState({cartItem: []})
        this.setState({totalPoints: 0})
    }

    renderTotalPoints = () => {
        var totalPoints = 0
        this.state.cartItem.map((f) => 
            totalPoints += f.points)
        return (
            <Text size={24} bold >
                TOTAL POINTS: {totalPoints}
                {"\n"}
            </Text>)

    }
    renderFood = () => {
    if (Object.keys(this.state.cartItem).length > 0) {
        return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}>
            <Block flex>
            {this.state.cartItem.map((f) => 
            <CartItem item={f} horizontal removeFromCart={this.removeFromCart.bind(this)}/>)}
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
        // console.log(state)
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
        console.log(this.state.cartItem)
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
