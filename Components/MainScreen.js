//import '../shim'; android 
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import "../src/config/watson";
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import config from '../src/config/publicData';

import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Button } from 'native-base';

const axios = require('axios');
const cheerio = require('cheerio');

export default class MainScreen extends Component {
    state = { currentUser: null }
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
    }

    constructor(props) {
        super(props);
        this.state = {
            status: [],
            crawling: [],
            isReady: false
        };
    }

    async componentDidMount() {

        await Font.loadAsync({
            'MapoDPP': require('../assets/fonts/MapoDPP.ttf'),
            'RIDIBatang': require('../assets/fonts/RIDIBatang.ttf'),

        });

        this.setState({ isReady: true });

        await this.fetchData();
        await this.getHTML()
            .then(html => {
                let list = [];
                let temp = [];
                let $ = cheerio.load(html.data);
                try {
                    $('table').find('tr').each(function () {
                        list.push({
                            kinds: $(this).find('td').text().trim(),
                            brands: $(this).find('td').next().text().trim()
                        });

                    });

                    for (var i = 1; i < list.length - 3; i++) {
                        temp[i] = list[i];
                    }
                    this.setState({ crawling: temp });

                    this.state.crawling.map(value => {
                        console.log(value);
                    })
                } catch (error) {
                    console.log(error);
                }

            })
    }

    fetchData() {
        var DOMParser = require('react-native-html-parser').DOMParser;

        const API_STEM = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"
        var url = `${API_STEM}?serviceKey=${config}&pageNo=1&numOfRows=10&startCreateDt=20200623&endCreateDt=20200623`;

        let list = [];
        let temp = null;

        return fetch(url)
            .then(response => response.text())
            .then(data => {

                var xmlDoc = new DOMParser().parseFromString(data, 'text/xml');
                var x = xmlDoc.getElementsByTagName("item");

                for (var i = 1; i < x.length; i++) {
                    var nodeList = x[i].childNodes;

                    for (var j = 0; j < nodeList.length; j++) {
                        var item = nodeList[j];

                        if (item.firstChild) {
                            if ((item.nodeName) == ("gubun")) {
                                temp = item.childNodes[0].nodeValue;

                            }
                            else if ((item.nodeName) == ("incDec")) {
                                list.push({
                                    si: temp,
                                    incDec: item.childNodes[0].nodeValue
                                })
                            }
                        }
                    }
                }
                this.setState({ status: list });

                for (var k = 0; k < list.length; k++) {
                    console.log(list[k]);
                }
                return xmlDoc;

            })
            .catch(error => {
                console.log(error);
            })

    }

    getHTML() {
        try {
            return axios.get("https://m.bccard.com/app/mobileweb/goMer.do");
        } catch (error) {
            console.log(error);
        }
    };

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
                    <Image source={require('../assets/pic2.png')} style={styles.logo} />
                </View>


                <Card style={styles.card_style}>
                    <View style={styles.secondContainer}>
                        <Text style={styles.sub}> COVID19 NEWS </Text>
                        {
                            this.state.status.map(value => {
                                return (
                                    <View style={styles.thirdContainer}>

                                        <div>
                                            <span>
                                                <Text style={styles.covid_news}> 지역: {value.si} -></Text>
                                                <Text style={styles.covid_news}> 확진자 전일 대비 증감 수: {value.incDec}</Text>
                                            </span>
                                            <div>
                                                <Text>{`\n`}</Text>
                                            </div>
                                        </div>

                                    </View>
                                )
                            })

                        }

                        <View style={styles.secondContainer}>
                            <Text style={styles.sub}> 정부긴급재난지원금 사용처</Text>
                            {
                                this.state.crawling.map(item => {
                                    return (

                                        <View style={styles.thirdContainer}>
                                            <div>
                                                <span>
                                                    <Text style={styles.covid_news}> 업종: {item.kinds} -></Text>
                                                    <Text style={styles.covid_news}> 브랜드: {item.brands}</Text>
                                                </span>
                                                <div>
                                                    <Text>{`\n`}</Text>
                                                </div>

                                            </div>

                                        </View>

                                    )
                                })
                            }
                        </View>
                    </View>
                </Card>


            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#263249'
    },
    header: {
        fontFamily: 'MapoDPP',
        padding: 10,
        marginTop: 50,
        fontSize: 100,
        color: '#ec1d27'
    },
    sub: {
        fontFamily: 'RIDIBatang',
        marginTop: 20,
        padding: 10,
        fontSize: 30,
        color: '#5c5c5c',
    },
    user: {
        fontFamily: 'RIDIBatang',
        padding: 10,
        alignSelf: "flex-end",
        marginTop: 10,
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
    secondContainer: {
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    thirdContainer: {
        marginLeft: 10
    },
    card_style: {
        borderColor: '#ec1d27',
        borderRadius: 10
    },
    covid_news: {
        fontFamily: 'RIDIBatang',
        fontSize: 15
    },
    logo: {
        justifyContent: "center",
        alignSelf: "center",
        width: 650,
        height: 650,
        position: "relative"
    }
});