import React, { Component } from 'react';
import { StyleSheet, View, Text, Picker } from 'react-native';

import * as firebase from "firebase/app";
import "firebase/firebase-database";
import firebaseConfig from '../../src/config/fire';

import * as Font from 'expo-font';
import { Button, Container, Form, Input, Item, Label } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

export default class MyPageTab extends Component {
    state = { currentUser: null }
    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        const { currentUser } = firebase.auth()
        this.setState({ currentUser })

        var user = currentUser;
        try {
            if (user != null) {
                firebase.firestore().collection('users').doc(user.uid)
                    .get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            this.setState({ userInfo: snapshot.val() })
                        });
                    })
            }
        }
        catch (error) {
            alert(error)
        }

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

    /*
    getUserInfo = () => {
        var user = firebase.auth().currentUser;
        try {
            if (user != null) {
                var snapshot = firebase.firestore().collection('users').doc(user.uid)
                    .get()
    
                snapshot.forEach((doc) => {
                    userInfo.push(doc.data());
                });
            }
        }
        catch (error) {
            alert(error)
        }
    }
    
    getUserInfo = async () => {
        var user = firebase.auth().currentUser;
        try {
            if (user != null) {
                firebase.firestore().collection('users').doc(user.uid)
                    .get()
                    .then(snapshot => {
                        const userInfo = []
                        snapshot.forEach(doc => {
                            const data = doc.data()
                            userInfo.push(data)
                        });
                        this.setState({ userInfo: userInfo })
                    })
            }
        }
        catch (error) {
            alert(error)
        }
    }
    */

    render() {
        var user = firebase.auth().currentUser;
        var name;

        if (user != null) {
            name = user.displayName;
        }
        return (
            <ScrollView>
                {
                    this.state.userInfo.map(value => {
                        return (
                            <View style={{ justifyContent: 'space-between' }}>
                                <Text style={styles.user}>안녕하세요 {name} 님</Text>
                                <View style={styles.container}>
                                    <Text style={styles.header}>My Page</Text>
                                </View>
                                <View>
                                    <Text> {value}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        );
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