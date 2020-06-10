import React, { Component } from 'react';
import { StyleSheet, View, Text, Picker } from 'react-native';

import * as firebase from "firebase/app";
import "firebase/firebase-database";
import firebaseConfig from '../../src/config/fire';

import '../../src/config/style.css'
import * as Font from 'expo-font';
import { Button, Container, Form, Input, Item, Label } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default class MyPageTab extends Component {
    state = { currentUser: null }
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    constructor(props) {
        super(props);
        this.state = {
            userInfo: [],
            isReady: false
        };
    }

    async componentDidMount() {

        await Font.loadAsync({
            'Cafe24Ohsquare': require('../../assets/fonts/Cafe24Ohsquare.ttf'),
            'Cafe24Ohsquareair': require('../../assets/fonts/Cafe24Ohsquareair.ttf'),

        });

        this.setState({ isReady: true });
    }

    getUserInfo() {
        var user = firebase.auth().currentUser;
        var list = [];
        try {
            if (user != null) {
                firebase.firestore().collection('users').doc(user.uid)
                    .onSnapshot(doc => {
                        list.push(doc.data());
                        this.setState({
                            userInfo: list
                        })
                    });
            }
        }
        catch (error) {
            alert(error)
        }
    }


    render() {
        var user = firebase.auth().currentUser;
        var name;

        if (user != null) {
            name = user.displayName;
        }


        return (
            <View style={{ justifyContent: 'space-between' }}>
                <Text style={styles.user}>안녕하세요 {name} 님</Text>
                <View style={styles.container}>
                    <Text style={styles.header}>My Page</Text>
                </View>
                <View style={styles.container2}>
                    <Button
                        title="정보 확인"
                        rounded
                        style={styles.check_button}
                        onPress={() => this.getUserInfo()}>
                        <Text style={styles.check_button_text}>정보 확인하기</Text>
                    </Button>
                </View>
                <View style={styles.container3}>
                    <Text>
                        {this.state.userInfo.map(item => (
                            <ul>
                                <li><Text style={styles.list_text}>닉네임: {item.displayName}</Text></li>
                                <li><Text style={styles.list_text}>나이: {item.age} 세</Text></li>
                                <li><Text style={styles.list_text}>소득분위: {item.Quintile} 분위</Text></li>
                                <li><Text style={styles.list_text}>가구수: {item.family} 명</Text></li>
                                <li><Text style={styles.list_text}>자녀: {item.child}</Text></li>
                                <li><Text style={styles.list_text}>성별: {item.gender}</Text></li>
                                <li><Text style={styles.list_text}>직업: {item.job}</Text></li>
                            </ul>
                        ))}
                    </Text>
                </View>
            </View>
        )


    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container3: {
        flex: 3,
    },
    header: {
        fontFamily: 'Cafe24Ohsquare',
        fontSize: 20,
        color: 'tomato'
    },
    user: {
        fontFamily: 'Cafe24Ohsquareair',
        padding: 10,
        alignSelf: "flex-end",
        marginTop: 10
    },
    check_button: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 100,
        height: 30,
        backgroundColor: 'white',
        marginTop: 100
    },
    check_button_text: {
        fontFamily: 'Cafe24Ohsquareair',
        color: '#5c5c5c'
    },
    list_text: {
        marginTop: 100,
        marginLeft: 50,
        fontFamily: 'Cafe24Ohsquareair',
        justifyContent: 'flex-start'
    }
});