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

export default class PersonalSearchTab extends Component {
    state = { currentUser: null }
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    constructor(props) {
        super(props);
        this.state = { isReady: false };
    }

    async componentDidMount() {

        await Font.loadAsync({
            'Cafe24Ohsquare': require('../../assets/fonts/Cafe24Ohsquare.ttf'),
            'Cafe24Ohsquareair': require('../../assets/fonts/Cafe24Ohsquareair.ttf'),

        });

        this.setState({ isReady: true });
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
                    <Text style={styles.header}>사용자 정보 기반 맞춤 복지 검색 결과입니다.</Text>
                </View>

                <View style={styles.container}>
                    <Button
                        title="모델 로딩"
                        onPress={() => this.fileLoad()}>
                        <Text>모델 로딩</Text>
                    </Button>
                </View>
            </View>
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