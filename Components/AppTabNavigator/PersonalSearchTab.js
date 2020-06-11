import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as firebase from "firebase/app";
import "firebase/firebase-database";
import firebaseConfig from '../../src/config/fire';

import * as Font from 'expo-font';
import { Button, Container, Form, Input, Item, Label } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
var key = null;

export default class PersonalSearchTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            userInfo: [],
            personalData: [],
            isReady: false
        };
    }

    state = { currentUser: null }
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })

        const ref = firebase.database().ref();
        ref.on('value', snapshot => {
            this.setState({
                data: snapshot.val()
            });
            //key = Object.keys(snapshot.val());
        });
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

    compareTo() {
        this.getUserInfo();
        let list = [];

        this.state.data.map(value => {
            this.state.userInfo.map(item => {
                for (key; i < key.length; key++) {
                    if (value.indexOf(item.job) == 0) {
                        list.push(value[key]);
                        this.setState({
                            personalData: list
                        })
                    }
                    else {
                        console.log(list[0])
                        alert(error)
                    }
                }
            })
        })
    }



    render() {
        var user = firebase.auth().currentUser;
        var name;

        if (user != null) {
            name = user.displayName;
        }
        {

            return (
                <ScrollView>
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={styles.user}>안녕하세요 {name} 님</Text>
                        <View style={styles.container}>
                            <Text style={styles.header}>사용자 정보 기반 맞춤 복지 검색 결과입니다.</Text>
                        </View>

                        <Button
                            title="정보 확인"
                            rounded
                            style={styles.check_button}
                            onPress={() => this.compareTo()}>
                            <Text style={styles.check_button_text}>정보 확인하기</Text>
                        </Button>

                        <View style={styles.container}>
                            <Text>
                                {this.state.personalData.map(p => (
                                    <Text>{p.지원대상}</Text>
                                ))}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
});