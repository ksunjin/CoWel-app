import React, { Component } from 'react';
import { StyleSheet, View, Text, Picker } from 'react-native';

import * as firebase from "firebase/app";
import "firebase/firebase-database";
import firebaseConfig from '../src/config/fire';

import * as Font from 'expo-font';
import { Button, Container, Form, Input, Item, Label } from 'native-base';
import RadioGroup from 'react-native-radio-buttons-group';
import { ScrollView } from 'react-native-gesture-handler';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default class SetProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                age: '',
                address: '',
                Quintile: '',
                gender: '',
                family: '',
                child: [
                    {
                        label: '유',
                        value: '유',
                    },
                    {
                        label: '무',
                        value: '무',
                    },
                ],
                job: [
                    {
                        label: '학생',
                        value: '학생',
                    },
                    {
                        label: '직장인',
                        value: '직장인',
                    },
                    {
                        label: '소상공인',
                        value: '소상공인',
                    },
                    {
                        label: '실업',
                        value: '실업',
                    },
                    {
                        label: '무급 휴직',
                        value: '무급휴직',
                    },
                    {
                        label: '사업주',
                        value: '사업주',
                    },
                    {
                        label: '제 1차 산업(농업, 임업, 광업, 원유 추출 등)',
                        value: '제1차산업',
                    },
                ],
            },
            isReady: false,
        };
    }
    async componentDidMount() {

        await Font.loadAsync({
            'MapoDPP': require('../assets/fonts/MapoDPP.ttf'),
            'RIDIBatang': require('../assets/fonts/RIDIBatang.ttf'),

        });

        this.setState({ isReady: true });
    }

    onPress = job => this.setState({ job });
    onPress2 = child => this.setState({ child });

    addProfile = (age, address, Quintile, gender, family) => {
        var user = firebase.auth().currentUser;

        let selectedButton = this.state.profile.job.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.profile.job.value;

        let selectedButton2 = this.state.profile.child.find(e => e.selected == true);
        selectedButton2 = selectedButton2 ? selectedButton2.value : this.state.profile.child.value;
        try {
            if (user != null) {
                firebase.firestore().collection('users').doc(user.uid)
                    .update({
                        age,
                        address,
                        Quintile,
                        gender,
                        family,
                        child: [selectedButton2],
                        job: [selectedButton]
                    })
            } this.props.navigation.navigate('MainScreen')
        }
        catch (error) {
            alert(error)
        }
    }

    render() {

        return (

            <ScrollView>
                <Container styles={styles.container}>
                    <Text style={styles.title_header}>
                        CoWel
                        </Text>
                    <Text style={styles.title}>
                        SetProfile
                        </Text>
                    <Text style={styles.subtitle}>
                        CoWel 어플리케이션 사용을 위한 개인정보 입력 폼입니다. 추후, 맞춤 검색 시 사용됩니다.
                        </Text>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{ fontFamily: 'RIDIBatang' }}>나이</Label>
                            <Input
                                onChangeText={(age) => this.setState({ age })}
                                style={styles.form}>
                            </Input>
                        </Item>

                        <Item floatingLabel>
                            <Label style={{ fontFamily: 'RIDIBatang' }}>주소 (시군구)</Label>
                            <Input
                                onChangeText={(address) => this.setState({ address })}
                                style={styles.form}>
                            </Input>
                        </Item>

                        <Item floatingLabel>
                            <Label style={{ fontFamily: 'RIDIBatang' }}>소득분위</Label>
                            <Input
                                onChangeText={(Quintile) => this.setState({ Quintile })}
                                style={styles.form}>
                            </Input>
                        </Item>

                        <Item floatingLabel>
                            <Label style={{ fontFamily: 'RIDIBatang' }}>성별</Label>
                            <Input
                                onChangeText={(gender) => this.setState({ gender })}
                                style={styles.form}>
                            </Input>
                        </Item>
                        <Item floatingLabel>
                            <Label style={{ fontFamily: 'RIDIBatang' }}>가구 수</Label>
                            <Input
                                onChangeText={(family) => this.setState({ family })}
                                style={styles.form}>
                            </Input>
                        </Item>
                        <Text style={{ fontFamily: 'RIDIBatang', color: '#575757', fontSize: 17, marginTop: 15, marginLeft: 15 }}>자녀 여부</Text>
                        <RadioGroup
                            radioButtons={this.state.profile.child} onPress={this.onPress2} flexDirection="row"
                            style={{ fontFamily: 'RIDIBatang', justifyContent: 'space-between', marginLeft: 20, marginTop: 20 }} />

                        <Text style={{ fontFamily: 'RIDIBatang', color: '#575757', fontSize: 17, marginTop: 15, marginLeft: 15 }}>직업</Text>
                        <RadioGroup
                            radioButtons={this.state.profile.job} onPress={this.onPress} flexDirection="row"
                            style={{ fontFamily: 'RIDIBatang', justifyContent: 'space-between', marginLeft: 20, marginTop: 20 }} />
                        <Button
                            title="save"
                            style={styles.button_ok}
                            rounded
                            backgroundColor='tomato'
                            onPress={() => this.addProfile(this.state.age, this.state.address, this.state.Quintile, this.state.gender, this.state.family)}>
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
        padding: 20,
    },
    user: {
        fontFamily: 'RIDIBatang',
        padding: 10,
        alignSelf: "flex-end",
        marginTop: 10
    },
    title_header: {
        fontFamily: 'MapoDPP',
        fontSize: 80,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 50,
        color: "tomato"
    },
    title: {
        fontFamily: 'RIDIBatang',
        fontSize: 20,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 50
    },
    subtitle: {
        fontFamily: 'RIDIBatang',
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
        fontFamily: "RIDIBatang"
    },
    button_text: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "RIDIBatang",
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