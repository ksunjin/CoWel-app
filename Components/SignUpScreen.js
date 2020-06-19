import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../src/config/fire';

import * as Font from 'expo-font';
import { Button, Container, Content, Header, Form, Input, Item, Label } from 'native-base';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = ({
            displayName: '',
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

    signUpUser = (email, password, displayName) => {
        try {
            if (this.state.password.length < 6) {
                alert("please enter at least 6 characters")
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email, password).then((userInfo) => {
                userInfo.user.updateProfile({ displayName }).then(() => { })
                const userRef = firebase.firestore().collection('users').doc(userInfo.user.uid);
                userRef.set({
                    displayName,
                    email
                })
                this.props.navigation.navigate('SetProfileScreen')
            })
        }
        catch (error) {
            alert(error)
        }

    }

    render() {
        return (
            <Container style={styles.container}>
                <Text style={styles.header}>CoWel</Text>
                <Form>
                    <Item floatingLabel>
                        <Label style={{ fontFamily: 'RIDIBatang' }}>Name</Label>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(displayName) => this.setState({ displayName })}
                            style={styles.form}
                        />
                    </Item>

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
                        title="signup"
                        style={styles.button_signup}
                        rounded
                        backgroundColor='#5c5c5c'
                        onPress={() => this.signUpUser(this.state.email, this.state.password, this.state.displayName)}>
                        <Text style={styles.button_text}>Signup</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20
    },
    header: {
        fontFamily: 'MapoDPP',
        padding: 10,
        fontSize: 80,
        color: 'tomato'
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
