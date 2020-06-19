import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../src/config/fire';

import * as Font from 'expo-font';
import { Button, Container, Content, Header, Form, Input, Item, Label } from 'native-base';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default class Login extends React.Component {

    constructor(props) {
        super(props)

        this.state = ({
            email: '',
            password: '',
            isReady: false,
        })
    }

    async componentDidMount() {

        await Font.loadAsync({
            'MapoDPP': require('../assets/fonts/MapoDPP.ttf'),
            'RIDIBatang': require('../assets/fonts/RIDIBatang.ttf'),
        });

        this.setState({ isReady: true });

    }
    loginUser = (email, password) => {
        try {
            firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                this.props.navigation.navigate('MainScreen')
            })
        } catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <Container style={styles.container}>
                <Text style={styles.header}>CoWel</Text>
                <Text style={{ fontFamily: 'RIDIBatang' }}>Login</Text>
                <Form>
                    <Item floatingLabel>
                        <Label style={{ fontFamily: 'RIDIBatang' }}>Email</Label>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(email) => this.setState({ email })}
                            style={styles.form}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label style={{ fontFamily: 'RIDIBatang' }}>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(password) => this.setState({ password })}
                            style={styles.form}
                        />
                    </Item>

                    <Button
                        title="login"
                        style={styles.button_login}
                        rounded
                        backgroundColor='tomato'
                        onPress={() => this.loginUser(this.state.email, this.state.password)}>
                        <Text style={styles.button_text}>Login</Text>
                    </Button>

                    <Button
                        title="signup"
                        style={styles.button_signup}
                        rounded
                        backgroundColor='#5c5c5c'
                        onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text style={styles.button_text}>Signup</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontFamily: 'MapoDPP',
        padding: 10,
        fontSize: 80,
        color: 'tomato',

    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20
    },
    button_text: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "RIDIBatang",
        fontSize: 25
    },
    button_login: {
        marginBottom: 10,
        marginTop: 30,
        padding: 30,
        width: 200,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "tomato"
    },
    button_signup: {
        marginBottom: 10,
        marginTop: 30,
        padding: 30,
        width: 200,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#5c5c5c"
    },
    form: {
        marginTop: 20,
        marginBottom: 20,
        fontFamily: "RIDIBatang"
    }
})