import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//import * as firebase from 'firebase';
import * as firebase from "firebase/app";
import "firebase/auth";
import XMLParser from 'react-xml-parser';

import * as Font from 'expo-font';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';


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
            'Cafe24Ohsquareair': require('../assets/fonts/Cafe24Ohsquareair.ttf'),

        });

        this.setState({ isReady: true });
    }

    logoutUser = () => {
        try {
            firebase.auth().signOut().then(() => {
                this.props.navigation.navigate('LoadingScreen')
            })
        }
        catch (error) {
            alert(error.toString())
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
                <Button
                    title="logout"
                    style={styles.button_logout}
                    onPress={() => this.logoutUser()}>
                    <Text style={styles.button_logout_text}>logout</Text>
                </Button>
                <View style={styles.container}>
                    <Text style={styles.header}>CoWel</Text>
                    <View style={styles.secondContainer}>
                        <Card>
                            <CardItem>
                                <Text style={{ fontFamily: 'Cafe24Ohsquareair' }}>
                                    COVID19 NEWS
                            </Text>
                            </CardItem>
                        </Card>
                    </View>
                </View>
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
        fontSize: 100,
        color: 'tomato'

    },
    user: {
        fontFamily: 'Cafe24Ohsquareair',
        padding: 10,
        alignSelf: "flex-end",
        marginTop: 10
    },
    button_logout: {
        justifyContent: "space-between",
        alignSelf: "flex-end",
        backgroundColor: "white",
        marginRight: 30,
        width: 50
    },
    button_logout_text: {
        color: "#5c5c5c",
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        fontFamily: "Cafe24Ohsquareair",
        fontSize: 15
    },
    secondContainer: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    thirdContainer: {
        flex: 3
    }

});