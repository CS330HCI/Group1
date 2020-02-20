import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, sSelect, Icon, Input, Header, Switch } from "../components/";
import { Block, Text, theme } from "galio-framework";
import { argonTheme, tabs } from "../constants/";
import {Image} from 'react-native';
import { CartItem } from '../components';
import productsInCart from '../constants/productsInCart';
const { width } = Dimensions.get('screen');

class Itempage extends React.Component {
    renderArticles = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}>
                <Block flex>
                    <Block flex={1.25} right>
                        <Text>{"\n"}</Text>
                    </Block>             
                    
                    <Image source={require("../data/images/01.jpg")} />

                    <Button small center color="warning" style={styles.optionsButton}>
                            ADD
                    </Button>
                    <Text>{"\n"}</Text>
                    <Text>{"Alternatives"} </Text>
                    <Text>{"\n"}</Text>
                    <CartItem item={productsInCart[0]} horizontal />
                    <CartItem item={productsInCart[1]} horizontal />
                    <CartItem item={productsInCart[2]} horizontal />
                    <CartItem item={productsInCart[3]} horizontal />

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

export default Itempage;
