import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as firebase from 'firebase';
import * as Font from 'expo-font';

export default class MainScreen extends Component {
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
            'Cafe24Ohsquare': require('../assets/fonts/Cafe24Ohsquare.ttf'),
        });

        this.setState({ isReady: true });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>CoWel</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        fontFamily: 'Cafe24Ohsquare',
        padding: 20,
        marginTop: 50,
        fontSize: 40,
        color: 'tomato'

    },
    secondContainer: {
        flex: 1
    }
});