import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../../src/config/fire';

import '../../src/config/style.css'
import * as Font from 'expo-font';
import { Button, Container, Form, Input, Item, Label } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default class MyPageTab extends Component {
    state = { currentUser: null }
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    constructor(props) {
        super(props);
        this.state = {
            userInfo: [],
            isReady: false
        };
    }

    async componentDidMount() {

        await Font.loadAsync({
            'MapoDPP': require('../../assets/fonts/MapoDPP.ttf'),
            'RIDIBatang': require('../../assets/fonts/RIDIBatang.ttf'),

        });

        this.setState({ isReady: true });
    }

    getUserInfo() {
        var user = firebase.auth().currentUser;
        var list = [];
        try {
            if (user != null) {
                firebase.firestore().collection('users').doc(user.uid)
                    .onSnapshot(doc => {
                        list.push(doc.data());
                        this.setState({
                            userInfo: list
                        })
                    });
            }
        }
        catch (error) {
            alert(error)
        }
    }

    logoutUser = () => {
        try {
            firebase.auth().signOut().then(() => {
                this.props.navigation.navigate('LoadingScreen')
            })
        }
        catch (error) {
            alert("ID/PW를 다시 확인해주세요")
        }

    }

    render() {
        var user = firebase.auth().currentUser;
        var name;

        if (user != null) {
            name = user.displayName;
        }


        return (
            <ScrollView style={{ backgroundColor: "#263249" }}>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={styles.user}>안녕하세요 {name} 님</Text>
                    <Button
                        title="logout"
                        style={styles.button_logout}
                        onPress={() => this.logoutUser()}>
                        <Text style={styles.button_logout_text}>logout</Text>
                    </Button>
                    <View style={styles.container}>
                        <Image source={require('../../assets/pic2.png')} style={styles.logo} />
                        <Text style={styles.header}>My Page</Text>
                    </View>
                    <View style={styles.container2}>
                        <Button
                            title="정보 확인"
                            rounded
                            style={styles.check_button}
                            onPress={() => this.getUserInfo()}>
                            <Text style={styles.check_button_text}>정보 확인하기</Text>
                        </Button>
                    </View>
                    <View style={styles.container3}>

                        {
                            this.state.userInfo.map(item => {
                                return (
                                    <View>
                                        <Text style={styles.list_text}>닉네임: {item.displayName}</Text>
                                        <Text style={styles.list_text}>나이: {item.age} 세</Text>
                                        <Text style={styles.list_text}>소득분위: {item.Quintile} 분위</Text>
                                        <Text style={styles.list_text}>가구수: {item.family} 명</Text>
                                        <Text style={styles.list_text}>자녀: {item.child}</Text>
                                        <Text style={styles.list_text}>성별: {item.gender}</Text>
                                        <Text style={styles.list_text}>직업: {item.job}</Text>
                                    </View>
                                )
                            })
                        }



                    </View>
                </View>
            </ScrollView>
        )


    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    container3: {
        flex: 3,
    },
    title_header: {
        fontFamily: 'MapoDPP',
        padding: 10,
        marginTop: 20,
        fontSize: 80,
        color: '#ec1d27'

    },
    header: {
        fontFamily: 'MapoDPP',
        fontSize: 20,
        color: '#ec1d27'
    },
    user: {
        fontFamily: 'RIDIBatang',
        padding: 10,
        alignSelf: "flex-end",
        marginTop: 10,
        marginBottom: 20,
        color: "white"
    },
    button_logout: {
        justifyContent: "space-between",
        alignSelf: "flex-end",
        backgroundColor: "#263249",
        marginRight: 10,
        width: 80
    },
    button_logout_text: {
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        fontFamily: "RIDIBatang",
        fontSize: 15
    },
    check_button: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 100,
        height: 30,
        backgroundColor: 'white',
        marginTop: 100
    },
    check_button_text: {
        fontFamily: 'RIDIBatang',
        color: '#5c5c5c'
    },
    list_text: {
        color: "white",
        marginTop: 80,
        marginLeft: 50,
        marginBottom: 30,
        fontFamily: 'RIDIBatang',
        justifyContent: 'flex-start'
    },
    logo: {
        justifyContent: "center",
        alignSelf: "center",
        width: 650,
        height: 650,
        position: "relative"
    }
});