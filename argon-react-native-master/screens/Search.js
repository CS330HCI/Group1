import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { Block, theme } from 'galio-framework';
import food_products from '../data/food_products';
import { Card, Input, Icon } from '../components';
const { width, height } = Dimensions.get('screen');
import {AsyncStorage} from 'react-native';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleCart = this.handleCart.bind(this);
    this.renderFoodInCart = this.renderFoodInCart.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.state = {
      input: '',
      full_list: food_products,
      displayed_list: {},
      top_picks: [food_products[18], food_products[10], food_products[7]],
      cart: {},
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

  renderFoodInCart() {
    if (Object.keys(this.state.cart).length > 0) {
      return (
      <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          <Block flex>
          {console.log("in render food: ", this.state.cartItem)}
          {this.state.cart.map((f) => 
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

  handleCart(item, navigation) {
    this.setState({cart: item})
    this.addToChart(item.name, navigation);
  }

  handleCardClick = async(item) => {
    try {
        console.log("new item:  ")
        console.log(item.name)        
        await AsyncStorage.setItem('currentItem', item.name);
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
  };

  renderFood = () => {
    if (this.state.input === '') {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          <Block flex>
            <Text style={{color: 'purple', fontWeight: 'bold', fontSize:22}}>Top picks of the week</Text>
            {this.state.top_picks.map((f) => 
            <Card item={f} horizontal handleCart={this.handleCart.bind(this)} handleCardClick={this.handleCardClick.bind(this)}/>)}
          </Block>
        </ScrollView>
      )
    }
    if (Object.keys(this.state.displayed_list).length > 0) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          <Block flex>
            {this.state.displayed_list.map((f) => 
            <Card item={f} horizontal handleCart={this.handleCart.bind(this)} handleCardClick={this.handleCardClick.bind(this)}/>)}
          </Block>
        </ScrollView>
      )
    }
    else {
      return (null)
    }
  }

  arrayUnique = (array) => {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
  }


  updateSearch = input => {
    this.setState({displayed_list: {}})
    this.setState({ input })
  };

  filterSearch = () => {
    if (this.state.input) {
      let name_filter = this.state.full_list.filter((l) => l.name.toLowerCase().includes(this.state.input.toLowerCase()))
      let category_filter = this.state.full_list.filter((l) => l.category.toLowerCase() === this.state.input.toLowerCase())
      let concat_filter = this.arrayUnique(name_filter.concat(category_filter))
      this.setState({displayed_list: concat_filter})
    }
    else {
      this.setState({displayed_list: {}})
    }
  }

  combined_search = async (input) => {
    await this.updateSearch(input)
    this.filterSearch()
  }

  renderSearch = () => {

    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What food are you looking for?"
        placeholderTextColor={'#8898AA'}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
        onChangeText={(input) => {this.combined_search(input)}}
    />)}

  render() {
    return (
      <Block flex center>
        <Block center>
          {this.renderSearch()}
        </Block>
        <Block flex center style={styles.home}>
          {this.renderFood()}
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  search: {
    height: height * 0.1,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  
});

export default Search;
