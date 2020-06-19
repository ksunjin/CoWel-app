import React from 'react';

import { Platform, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

import * as Font from 'expo-font';
import { Button, Container, Content, Header, Form, Input, Item, Label } from 'native-base';

export default class Loading extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'Login')
        })
    }

    constructor(props) {
        super(props);

        this.state = {
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.halfContainer}>
                    <Text style={styles.title_header}>CoWel</Text>
                    <Text style={styles.text_title}>COVID19 특별 복지 알리미</Text>
                    <Text style={styles.text_subtitle}>맞춤 검색을 통해 본인에게 알맞는 복지를 찾아보세요.</Text>
                    <View style={styles.halfContainer}>

                        <Button
                            title="시작하기"
                            style={styles.start_button}
                            rounded
                            onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.start_text}>시작하기</Text>
                        </Button>

                    </View>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title_header: {
        fontFamily: 'MapoDPP',
        padding: 10,
        marginTop: 50,
        fontSize: 80,
        color: 'tomato'

    },
    text_title: {
        padding: 20,
        marginTop: 20,
        fontFamily: 'MapoDPP',
        fontSize: 32,
        textAlign: "center",
        color: '#5c5c5c'
    },
    text_subtitle: {
        fontFamily: 'MapoDPP',
        fontSize: 20,
        textAlign: "center",
        color: '#5c5c5c'
    },
    start_button: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        backgroundColor: 'tomato'
    },
    start_text: {
        fontFamily: 'RIDIBatang',
        fontSize: 30,
        alignItems: "center",
        justifyContent: "center",
        color: "white"
    }

})