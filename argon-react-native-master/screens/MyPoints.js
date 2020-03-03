import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  AsyncStorage,
  View
} from "react-native";
import { BarChart,LineChart, Grid } from 'react-native-svg-charts'
import { Block, Text, theme } from "galio-framework";
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";


const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class MyPoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        totalPoints: '',
    }
  }
  getTotalPoints = async () => {
    let userId = '';
    try {
      userId = await AsyncStorage.getItem('totalPoints') || 'none';
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    this.setState({totalPoints: userId})
    return userId;
  }

  render() {
    this.getTotalPoints();
    const fill = 'rgb(134, 65, 244)'
    const data   = [ 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80 ]
 
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: Images.ProfilePicture }}
                    style={styles.avatar}
                  />
                </Block>
                <Block style={styles.info}>
                  <Block row space="between">
                  </Block>
                </Block>
                
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      Total Points
                    </Text>
                    <Text bold size={28} color="#32325D" style={{ marginTop: 10 }}>
                      {this.state.totalPoints}
                    </Text>

                    <LineChart
                        style={{ height: 200, zIndex:100 }}
                        data={ data }
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={{ top: 40, bottom: 40 }}
                    >
                        <Grid/>
                    </LineChart>
                  </Block>
                  
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    {/* <Button
                      color="transparent"
                      textStyle={{
                        color: "#233DD2",
                        fontWeight: "500",
                        fontSize: 16
                      }}
                    >
                      Show more
                    </Button> */}
                    <BarChart
                        style={{ height: 200, zIndex:100 }}
                        data={ data }
                        svg={{ fill }}
                        contentInset={{ top: 30, bottom: 30 }}
                    >
                      <Grid/>
                    </BarChart>
                    <View>
                    <LineChart
                        style={{ height: 200, zIndex:100 }}
                        data={ data }
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid/>
                    </LineChart>
                    </View>
                  </Block>
                  <Block
                    row
                    style={{ paddingBottom: 20, justifyContent: "flex-end" }}
                  >
                  </Block>
                </Block>
              </Block>
            </ScrollView>
            
          </ImageBackground>
          
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  }
});

export default MyPoints;
