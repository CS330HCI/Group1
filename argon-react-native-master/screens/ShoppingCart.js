import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, sSelect, Icon, Input, Header, Switch } from "../components/";
import { Block, Text, theme } from "galio-framework";
import { argonTheme, tabs } from "../constants/";

import { CartItem } from '../components';
import productsInCart from '../constants/productsInCart';
const { width } = Dimensions.get('screen');

class ShoppingCart extends React.Component {
    renderArticles = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.articles}>
                <Block flex>
                    <Block flex={1.25} right>
                        <Button color="primary">
                            <Block row>
                            <Icon
                                name="search-zoom-in"
                                family="ArgonExtra"
                                size={14}
                                color={"black"}
                                style={{ marginTop: 2, marginRight: 5 }}
                            />
                            <Text style={styles.socialTextButtons}>Add MORE ITEMS</Text>
                            </Block>
                        </Button>

                        <Text>{"\n"}</Text>

                        <Button center color="warning" style={styles.optionsButton}>
                            I'M DONE 
                        </Button>
                    </Block>
                    <CartItem item={productsInCart[0]} horizontal />
                    <CartItem item={productsInCart[1]} horizontal />
                    {/* <CartItem item={productsInCart[2]} horizontal />
                    <CartItem item={productsInCart[3]} horizontal /> */}

                    {/* <Block flex row>
                        <Card item={productsInCart[1]} style={{ marginRight: theme.SIZES.BASE }} />
                        <Card item={productsInCart[2]} />
                    </Block>
                    <Card item={productsInCart[3]} horizontal />
                    <Card item={productsInCart[4]} full /> */}

                    <Text size={24} bold >
                        TOTAL POINTS: 11
                        {"\n"}
                    </Text>

                    <Button center color="warning" style={styles.optionsButton}>
                        CLEAR CONTENT
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
