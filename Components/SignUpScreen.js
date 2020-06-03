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
            email: '',
            password: '',
            isReady: false,
        })
    }

    async componentDidMount() {

        await Font.loadAsync({
            'Cafe24Ohsquare': require('../assets/fonts/Cafe24Ohsquare.ttf'),
            'Cafe24Ohsquareair': require('../assets/fonts/Cafe24Ohsquareair.ttf'),
        });

        this.setState({ isReady: true });
    }

    signUpUser = (email, password) => {
        try {
            if (this.state.password.length < 6) {
                alert("please enter at least 6 characters")
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                this.props.navigation.navigate('SetProfileScreen')
            })
        }
        catch (error) {
            alert(error.toString())
        }

    }

    render() {
        return (
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label style={{ fontFamily: 'Cafe24Ohsquareair' }}>Email</Label>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(email) => this.setState({ email })}
                            style={styles.form}
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label style={{ fontFamily: 'Cafe24Ohsquareair' }}>Password</Label>
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
                        onPress={() => this.signUpUser(this.state.email, this.state.password)}>
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
    button_text: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Cafe24Ohsquareair",
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
        fontFamily: "Cafe24Ohsquareair"
    }
})
/*
export default class SignUp extends React.Component {

    state = { email: '', password: '', errorMessage: null }
    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('SetProfileSrcreen'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Sign Up" onPress={this.handleSignUp} />
                <Button
                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})
*/