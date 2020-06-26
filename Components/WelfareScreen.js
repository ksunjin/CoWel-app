import React, { Component } from 'react';
import { StyleSheet, Text, Image } from 'react-native';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import firebaseConfig from '../src/config/fire';

import Constants from 'expo-constants';
import { Card, CardItem } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

export default class Welfare extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: [],
            isReady: false
        });
    }

    async componentDidMount() {

        await Font.loadAsync({
            'MapoDPP': require('../assets/fonts/MapoDPP.ttf'),
            'RIDIBatang': require('../assets/fonts/RIDIBatang.ttf'),
        });

        this.setState({ isReady: true });
    }


    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        const ref = firebase.database().ref();
        ref.on('value', snapshot => {
            this.setState({ data: snapshot.val() });
        });
    }

    render() {

        return (
            <ScrollView style={{ backgroundColor: "#263249" }}>
                <Image source={require('../assets/pic2.png')} style={styles.logo} />
                <Text style={styles.sub}>공공데이터 활용지원센터</Text>
                <Text style={styles.sub}>코로나19 관련 정부지원 맞춤형 서비스 정보(민생경제지원)</Text>
                {
                    this.state.data.map(value => {

                        return (
                            <Card style={styles.card_style}>
                                <CardItem header>
                                    <Text style={styles.welfare_title}>
                                        [{value.서비스명}]
                                    </Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={styles.welfare_text}>구비서류: {value.구비서류}</Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={styles.welfare_text}>지원대상: {value.지원대상}</Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={styles.welfare_text}>신청절차: {value.신청절차}</Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={styles.welfare_text}>문의처 명: {value.문의처명}</Text >
                                </CardItem>
                                <CardItem>
                                    <Text style={styles.welfare_text}>문의처 전화번호: {value.문의처전화번호}</Text >
                                </CardItem>
                            </Card>

                        )
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        marginTop: Constants.statusBarHeight,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    header: {
        fontFamily: 'MapoDPP',
        padding: 10,
        marginTop: 50,
        fontSize: 100,
        marginLeft: '2%',
        color: '#ec1d27'
    },
    sub: {
        fontSize: 20,
        fontFamily: 'RIDIBatang',
        marginTop: 10,
        marginLeft: '2%',
        padding: 10,
        color: "white"
    },
    card_style: {
        marginTop: '2%',
        marginLeft: '2%',
        marginRight: '2%',
        marginBottom: '2%',
        borderRadius: 10,
    },
    welfare_title: {
        fontFamily: 'RIDIBatang',
        fontSize: 20
    },
    welfare_text: {
        fontFamily: 'RIDIBatang',
        fontSize: 15
    },
    logo: {
        justifyContent: "center",
        alignSelf: "center",
        width: 650,
        height: 650,
        position: "relative"
    }

})