import React, { Component } from 'react';
import { Image, StyleSheet, Text, ImageBackground } from 'react-native';

import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../src/config/fire';

import * as Font from 'expo-font';
import { Button, Container, Form, Input, Item, Label } from 'native-base';


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
            alert(error);

        }

    }

    render() {
        return (
            <Container style={styles.container}>
                <ImageBackground source={require("../assets/background.jpg")} style={styles.bgImage}>


                    <Image source={require('../assets/pic2.png')} style={styles.logo} />
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
                            backgroundColor='#ec1d27'
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
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontFamily: 'MapoDPP',
        padding: 10,
        fontSize: 80,
        color: '#ec1d27',
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
        backgroundColor: "#ec1d27"
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
    },
    bgImage: {
        position: "absolute",
        width: '100%',
        height: '100%',
        left: 0,
        right: 0
    },
    logo: {
        justifyContent: "center",
        alignSelf: "center",
        width: "40%",
        height: "40%",
        position: "relative"
    }
})