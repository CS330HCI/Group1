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

class Itempage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mainitem: food_products[7],
          subitem: food_products[6]
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
        console.log('aaaaaa')
        
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
                    
                    <MainItem item={this.state.mainitem} horizontal />
                    <Text>{"\n"}</Text>
                    <Text onPress={this.handleClick} bold>{"Alternatives"} </Text>
                    <AltCard handleClick={this.handleClick.bind(this)} item={this.state.subitem} horizontal />
                    <AltCard handleClick={this.handleClick.bind(this)} item={food_products[8]} horizontal />
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
