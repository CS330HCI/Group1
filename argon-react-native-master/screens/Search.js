import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';
import food_products from '../data/food_products';
import { Card, Input, Icon } from '../components';
const { width } = Dimensions.get('screen');

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleCart = this.handleCart.bind(this)
    this.state = {
      input: '',
      full_list: food_products,
      displayed_list: {},
      cart: {},
    }
  }

  handleCart(item) {
    console.log(this.state.cart)
    console.log(item)
    this.setState({cart: item})
    
  }

  renderFood = () => {
    if (this.state.input === '') {
      return (null)
    }
    if (Object.keys(this.state.displayed_list).length > 0) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          <Block flex>
            {this.state.displayed_list.map((f) => 
            <Card item={f} horizontal handleCart={this.handleCart.bind(this)}/>)}
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
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Search;
