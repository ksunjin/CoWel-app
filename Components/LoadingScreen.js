import React from 'react';
import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
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

            <ImageBackground source={require("../assets/background.jpg")} style={styles.bgImage}>


                <View style={styles.halfContainer}>
                    <Image source={require('../assets/pic2.png')} style={styles.logo} />
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


            </ImageBackground >

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
        fontSize: 140,
        color: '#ec1d27',
        borderColor: '#140a00'

    },
    text_title: {
        padding: 20,
        marginTop: 20,
        fontFamily: 'MapoDPP',
        fontSize: 40,
        textAlign: "center",
        color: '#140a00'
    },
    text_subtitle: {
        fontFamily: 'MapoDPP',
        fontSize: 40,
        textAlign: "center",
        color: '#140a00'
    },
    start_button: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        backgroundColor: '#ec1d27'
    },
    start_text: {
        fontFamily: 'RIDIBatang',
        fontSize: 30,
        alignItems: "center",
        justifyContent: "center",
        color: "white"
    },
    bgImage: {
        position: "relative",
        width: '100%',
        height: '100%',

    },
    logo: {
        width: "60%",
        height: "60%",
        position: "relative"
    }
})