import React from 'react';
import { TouchableWithoutFeedback,Button,StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Block, Text, theme } from "galio-framework";
import {Image} from 'react-native';
import trivia from '../data/trivia';
const { width, height } = Dimensions.get('screen');

class Trivia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mainitem: trivia[0],
          remaining: trivia,
          all: trivia,
          score: 0,
          show: false,
          correct: true,
        }
        this.handleNext = this.handleNext.bind(this);
        this.handleImage1 = this.handleImage1.bind(this);
        this.handleImage2 = this.handleImage2.bind(this);
      }
    handleImage1() {
        this.setState({show: true})
        if (this.state.mainitem.footprint1 > this.state.mainitem.footprint2) {
            this.setState({correct: false})
        }
        else {
            this.setState({correct: true})
        }
    }

    handleImage2() {
        this.setState({show: true})
        if (this.state.mainitem.footprint2 > this.state.mainitem.footprint1) {
            this.setState({correct: false})
        }
        else {
            this.setState({correct: true})
        }
    }

    handleNext() {
        this.setState({show: false})
        if (this.state.correct == true) {
            let old_arr = this.state.remaining
            let new_arr = old_arr.filter(r => r.key !== this.state.mainitem.key)
            if (Object.keys(new_arr).length == 0) {
                new_arr = this.state.all
            }
            this.setState({remaining: new_arr})
            let random = Math.floor(Math.random() * Math.floor(Object.keys(this.state.remaining).length-1))
            this.setState({mainitem: this.state.remaining[random], score: this.state.score+1})
        }
        else {
            let random = Math.floor(Math.random() * Math.floor(Object.keys(this.state.remaining).length-1))
            this.setState({mainitem: this.state.remaining[random], score:this.state.score-1})
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <Block flex center style={styles.home}>
                        <Text style={styles.title}>Which one is better for the environment?</Text>
                        <Block style={styles.imagecontainter}>
                            <TouchableWithoutFeedback onPress={this.handleImage1}>
                                <Image source={this.state.mainitem.image1} style={styles.image}/>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this.handleImage2}>
                                <Image source={this.state.mainitem.image2} style={styles.image}/>
                            </TouchableWithoutFeedback>
                        </Block>
                        <Block style={styles.textcontainter}>
                            <Text style={styles.food}>
                                {this.state.mainitem.name1}
                            </Text>
                            <Text style={styles.food}>
                                {this.state.mainitem.name2}
                            </Text>
                        </Block>
                    </Block>
                    {this.state.show ? (<Block>
                        {this.state.correct ? (<Text style={styles.answer_cor}>CORRECT</Text>) : (<Text style={styles.answer_wrg}>WRONG</Text>)}
                        <Text style={styles.items}>
                            {this.state.mainitem.name1}: {this.state.mainitem.footprint1}
                        </Text>
                        <Text style={styles.items}>
                            {this.state.mainitem.name2}: {this.state.mainitem.footprint2}
                        </Text>
                        <View style={styles.button}>
                            <Button title='Next Round' onPress={this.handleNext}/>
                        </View>
                    </Block>) : null}      
                </ScrollView>
                <View>
                    <Text style={styles.score}>Your Score: {this.state.score}</Text>
                </View>
            </View>
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
    title: {
        textAlign: 'center',
        fontSize: 18,
        marginVertical: '5%',
    },
    imagecontainter: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: '2%',
    },
    textcontainter: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: '2%',
    },
    image: {
        flex: 1,
        height: height / 3,
        borderWidth: 3,
        borderColor: 'black'
    },
    food: {
        flex: 1,
        marginTop: "2%",
        textAlign: 'center'
    },
    score: {
        textAlign: 'center',
        fontSize: 30,
        margin: '5%'
    },
    answer_cor: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: '10%',
        marginBottom: '3%',
        color: 'green'
    },
    answer_wrg: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: '10%',
        marginBottom: '3%',
        color: 'red'
    },
    items: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: '2%'
    },
    button: {
        alignSelf: 'center',
        width: 120,
        height: 60,
        marginTop: '4%',
    }
});

export default Trivia;
