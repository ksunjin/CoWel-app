import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as firebase from "firebase/app";
import "firebase/firebase-database";
import firebaseConfig from '../src/config/fire';

import * as Font from 'expo-font';
import { Button, Container, Content, Header, Form, Input, Item, Label } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

export default class SetProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: '',
            address: '',
            Quintile: '',
            gender: '',
            family: '',
            isReady: false
        };
    }

    async componentDidMount() {

        await Font.loadAsync({
            'Cafe24Ohsquare': require('../assets/fonts/Cafe24Ohsquare.ttf'),
            'Cafe24Ohsquareair': require('../assets/fonts/Cafe24Ohsquareair.ttf'),

        });

        this.setState({ isReady: true });
    }

    componentDidMount() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    render() {
        return (
            <ScrollView>
                <Container styles={styles.container}>
                    <Text style={styles.title}>
                        SetProfile
                    </Text>
                    <Text style={styles.subtitle}>
                        CoWel 어플리케이션 사용을 위한 개인정보 입력 폼입니다. 추후, 맞춤 검색에 사용될 수 있습니다.
                    </Text>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{ fontFamily: 'Cafe24Ohsquareair' }}>나이</Label>
                            <Input
                                onChangeText={(age) => this.setState({ age })}
                                style={styles.form}>
                            </Input>
                        </Item>

                        <Item floatingLabel>
                            <Label style={{ fontFamily: 'Cafe24Ohsquareair' }}>주소 (시군구)</Label>
                            <Input
                                onChangeText={(address) => this.setState({ address })}
                                style={styles.form}>
                            </Input>
                        </Item>

                        <Item floatingLabel>
                            <Label style={{ fontFamily: 'Cafe24Ohsquareair' }}>소득분위</Label>
                            <Input
                                onChangeText={(Quintile) => this.setState({ Quintile })}
                                style={styles.form}>
                            </Input>
                        </Item>

                        <Item floatingLabel>
                            <Label style={{ fontFamily: 'Cafe24Ohsquareair' }}>성별</Label>
                            <Input
                                onChangeText={(gender) => this.setState({ gender })}
                                style={styles.form}>
                            </Input>
                        </Item>

                        <Item floatingLabel>
                            <Label style={{ fontFamily: 'Cafe24Ohsquareair' }}>가구 수</Label>
                            <Input
                                onChangeText={(family) => this.setState({ family })}
                                style={styles.form}>
                            </Input>
                        </Item>

                        <Button
                            title="save"
                            style={styles.button_ok}
                            rounded
                            backgroundColor='tomato'
                            onPress={() => this.loginUser(this.state.age, this.state.address, this.state.Quintile, this.state.gender, this.state.family)}>
                            <Text style={styles.button_text}>저장</Text>
                        </Button>

                    </Form>
                </Container>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20
    },
    title: {
        fontFamily: 'Cafe24Ohsquareair',
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20
    },
    subtitle: {
        fontFamily: 'Cafe24Ohsquareair',
        fontSize: 15,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10
    },
    form: {
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20,
        fontFamily: "Cafe24Ohsquareair"
    },
    button_text: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Cafe24Ohsquareair",
        fontSize: 25
    },
    button_ok: {
        marginBottom: 10,
        marginTop: 30,
        padding: 30,
        width: 200,
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "tomato"
    },
})