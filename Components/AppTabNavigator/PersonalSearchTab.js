import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import firebaseConfig from '../../src/config/fire';

import * as Font from 'expo-font';
import Constants from 'expo-constants';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon, Item } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

var dataTemp = [];
var personalDataTemp = [];

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default class PersonalSearchTab extends Component {
    state = { currentUser: null }
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            userInfo: [],
            personalData: [],
            isReady: false
        };
    }

    componentWillMount() {
        const ref = firebase.database().ref();
        ref.on('value', snapshot => {
            this.setState({ data: snapshot.val() });
            //console.log(Object.values(this.state.data[0].지원대상).join(" "));
            for (var i = 0; i < this.state.data.length; i++) {
                dataTemp.push({
                    id: i,
                    name: Object.values(this.state.data[i].서비스명).join(""),
                    target: Object.values(this.state.data[i].지원대상).join(""),
                    process: Object.values(this.state.data[i].신청절차).join(""),
                    contents: Object.values(this.state.data[i].지원내용).join(""),
                    documents: Object.values(this.state.data[i].구비서류).join(""),
                    number: Object.values(this.state.data[i].접수기관전화번호).join(""),
                    welfare: Object.values(this.state.data[i].지원형태).join(""),
                });
            }
        });
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
                        console.log(this.state.userInfo[0].job[0]);
                    });

            }
        }
        catch (error) {
            alert(error)
        }
    }

    compareTo() {
        this.getUserInfo();

        this.state.userInfo.map(value => {

            var userJob = value.job[0];
            console.log(userJob);

            for (var key in dataTemp) {
                var personal = dataTemp[key];
                if (personal.name.includes(userJob) == true ||
                    personal.target.includes(userJob) == true ||
                    personal.contents.includes(userJob) == true ||
                    personal.process.includes(userJob) == true) {

                    personalDataTemp.push({

                        name: personal.name,
                        target: personal.target,
                        process: personal.process,
                        contents: personal.contents,
                        documents: personal.documents,
                        number: personal.number,
                        welfare: personal.welfare
                    })

                }
                else {
                    console.log('done');
                }
            }
            this.setState({ personalData: personalDataTemp });
        })
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

                        <Text style={styles.header}>사용자 정보 기반 맞춤 복지 검색 페이지입니다.</Text>
                        <Text style={styles.sub}>5분 정도 시간이 소요될 수 있으니 조금만 기다려 주세요!</Text>
                    </View>
                    <View style={styles.container2}>
                        <Button
                            title="정보 확인"
                            rounded
                            style={styles.check_button}
                            onPress={() => this.compareTo()}>
                            <Text style={styles.check_button_text}>정보 확인하기</Text>
                        </Button>
                    </View>
                </View>
                <View>
                    <Card style={styles.card_style}>
                        {
                            this.state.personalData.map(value => {

                                return (

                                    <View style={styles.container3}>

                                        <CardItem header>
                                            <Text style={styles.personalData_text}>서비스명: {value.name}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.personalData_text}>지원 대상: {value.target}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.personalData_text}>신청 절차: {value.process}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.personalData_text}>지원 내용: {value.contents}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.personalData_text}>구비 서류: {value.documents}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.personalData_text}>접수기관 전화번호: {value.number}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.personalData_text}>지원 형태: {value.welfare}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.personalData_text}>-----------------------------------------------------------------------------------------------------</Text>
                                        </CardItem>

                                    </View>

                                )
                            })
                        }
                    </Card>
                </View>

            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        marginTop: Constants.statusBarHeight,
    },
    container2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container3: {
        flexGrow: 1,
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    title_header: {
        fontFamily: 'MapoDPP',
        padding: 10,
        marginTop: 50,
        fontSize: 100,
        color: '#ec1d27'

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
    header: {
        fontFamily: 'MapoDPP',
        fontSize: 20,
        color: '#ec1d27',
        marginLeft: '2%'
    },
    sub: {
        fontFamily: 'RIDIBatang',
        fontSize: 17,
        color: 'white',
        marginTop: 10,
        marginLeft: '2%'
    },
    user: {
        fontFamily: 'RIDIBatang',
        padding: 10,
        alignSelf: "flex-end",
        marginTop: 10,
        color: "white"
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
    card_style: {
        borderColor: '#ec1d27',
        marginTop: '2%',
        marginLeft: '2%',
        marginRight: '2%',
        marginBottom: '2%'
    },
    personalData_text: {
        fontFamily: 'RIDIBatang',
    },
    logo: {
        justifyContent: "center",
        alignSelf: "center",
        width: 650,
        height: 650,
        position: "relative"
    }
});