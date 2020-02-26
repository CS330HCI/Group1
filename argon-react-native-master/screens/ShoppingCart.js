import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, sSelect, Icon, Input, Header, Switch } from "../components/";
import { Block, Text, theme } from "galio-framework";
import { argonTheme, tabs } from "../constants/";

import { CartItem } from '../components';
import productsInCart from '../constants/productsInCart';
const { width } = Dimensions.get('screen');

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.handleCart = this.handleCart.bind(this)
        this.totalPoints = 0
      }

  renderFood = () => {
    const { state } = this.props;
    if (state === undefined) {
      return (null)
    }
    if (Object.keys(state.displayed_list).length > 0) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          <Block flex>
            {state.displayed_list.map((f) => 
            <Card item={f} horizontal/>)}
          </Block>
        </ScrollView>
      )
    }
    else {
      return (null)
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
                        SAVE POINTS 
                    </Button>
                    <Text>{"\n"}</Text>
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
