import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme } from '../constants';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


class MainItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      child_cart: {}
    }
  }
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle, handleCart } = this.props;
    const imageStyles = [
      {flex: 1,
      width: undefined, 
      height: undefined,}
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback>
          <Block flex style={imgContainer}>
            <Image source={item.image} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={14} style={styles.cardTitle}>{item.name}</Text>
            <Text size={12} style={styles.cardDescription}> Carbon Footprint: {item.footprint}</Text>
            <Text size={12} style={styles.cardDescription}> Points: {item.points}</Text>
            <Text size={12} style={styles.nutrition}> Nutritions:</Text>
            <Text size={12} style={styles.nutrition_content}> Unit: {item.nutrition.unit}</Text>
            <Text size={12} style={styles.nutrition_content}> Calories: {item.nutrition.calories}</Text>
            <Text size={12} style={styles.nutrition_content}> Fat: {item.nutrition.fat}</Text>
            <Text size={12} style={styles.nutrition_content}> Protein: {item.nutrition.protien}</Text>
            {/* <Button round size="small" style={{ width: 40, height: 40, alignSelf: 'flex-end'}}
                    onPress={() => {navigation.navigate('ShoppingCart');
                  }}> 
              +
            </Button> */}
            <Button
              icon={
                <Icon
                  name="shopping-basket"
                  size={12}
                  color="white"
                />
              }
              titleStyle={{
                color: "white",
                fontSize: 14,
              }}
              style={{ width: 80, height: 40, fontSize:10, alignSelf: 'flex-end'}}
              onPress={() => {handleCart(item, navigation);}}
              title=" ADD"
            />
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

MainItem.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  nutrition: {
    padding: theme.SIZES.BASE / 2,
  },
  nutrition_content: {
    padding: theme.SIZES.BASE / 2,
    marginLeft: '5%',
    marginVertical: '-3%'
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(MainItem);