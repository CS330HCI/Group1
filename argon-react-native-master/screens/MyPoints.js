import React, { useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  AsyncStorage,
  View,
  Button
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import tree from '../data/tree';

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class MyPoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        totalPoints: '',
        cur_tree: tree[0].image,
        show: false,
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

  handleTree = () => {
    var temp_score = Math.floor(this.state.totalPoints/40);
    
    if (temp_score > 0) {
      temp_score = this.state.totalPoints - temp_score*40;
    }

    if (temp_score >= 0 && temp_score < 10) {
      this.setState({cur_tree: tree[0].image})
    }
    else if (temp_score >= 10 && temp_score < 20) {
      this.setState({cur_tree: tree[1].image})
    }
    else if (temp_score >= 20 && temp_score < 30) {
      this.setState({cur_tree: tree[2].image})
    }
    else if (temp_score >= 30 && temp_score < 40) {
      this.setState({cur_tree: tree[3].image})
    }
    console.log(temp_score)
  }

  render() {
    this.getTotalPoints();

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
                  </Block>
                  
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle style={styles.nameInfo}>
                    <Text size={20} style={{margin: '3%'}}>
                      10 points = Growing your tree!
                    </Text>
                    <Block style={{width: 150, height: 150, justifyContent: 'center', alignItems: 'center'}}>
                      <Image source={this.state.cur_tree}/>
                    </Block>
                      <Text size={20}>
                        You saved {Math.floor(this.state.totalPoints/40)} trees!
                    </Text>
                    {/* {this.state.show ?       
                      <React.Fragment>
                        <Block style={{width: 150, height: 150, justifyContent: 'center', alignItems: 'center'}}>
                          <Image source={this.state.cur_tree}/>
                        </Block>
                          <Text size={20}>
                            You saved {Math.floor(this.state.totalPoints/40)} trees!
                        </Text>
                      </React.Fragment> : 
                      <Button style={{width: '50%'}} onPress={() => {this.handleTree();this.setState({show: true});}} title={"Check Your Tree"}/>} */}
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
