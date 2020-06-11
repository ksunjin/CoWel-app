import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import * as firebase from "firebase/app";
import "firebase/firebase-database";
import firebaseConfig from '../src/config/fire';

import Constants from 'expo-constants';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon, Item } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';


var key = null;
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
            'Cafe24Ohsquareair': require('../assets/fonts/Cafe24Ohsquareair.ttf'),
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
            <ScrollView>
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
    card_style: {
        marginTop: '2%',
        marginLeft: '2%',
        marginRight: '2%',
        marginBottom: '2%'
    },
    welfare_title: {
        fontFamily: 'Cafe24Ohsquareair',
        fontSize: 20
    },
    welfare_text: {
        fontFamily: 'Cafe24Ohsquareair',
        fontSize: 15
    }

})