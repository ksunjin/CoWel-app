import '../shim';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//import * as firebase from 'firebase';
import * as firebase from "firebase/app";
import "firebase/auth";
import config from '../src/config/publicData';

import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Grid, Col, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';

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
            'Cafe24Ohsquare': require('../assets/fonts/Cafe24Ohsquare.ttf'),
            'Cafe24Ohsquareair': require('../assets/fonts/Cafe24Ohsquareair.ttf'),

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
        //const parseString = require('react-native-xml2js').parseString;
        var DOMParser = require('react-native-html-parser').DOMParser;

        const API_STEM = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"
        var url = `${API_STEM}?serviceKey=${config}&pageNo=1&numOfRows=10&startCreateDt=20200618&endCreateDt=20200618`;

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
                            //console.log(item.nodeName + " : " + item.childNodes[0].nodeValue);
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
            alert(error)
        }

    }

    render() {
        var user = firebase.auth().currentUser;
        var name;

        if (user != null) {
            name = user.displayName;
        }

        return (
            <ScrollView>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={styles.user}>안녕하세요 {name} 님</Text>
                    <Button
                        title="logout"
                        style={styles.button_logout}
                        onPress={() => this.logoutUser()}>
                        <Text style={styles.button_logout_text}>logout</Text>
                    </Button>
                    <View style={styles.container}>
                        <Text style={styles.header}>CoWel</Text>
                    </View>
                </View>


                <Card>
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
                                        </div>
                                        <div>
                                            <Text>{`\n`}</Text>
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
                                            </div>
                                            <div>
                                                <Text>{`\n`}</Text>
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
        justifyContent: 'center'
    },
    header: {
        fontFamily: 'Cafe24Ohsquare',
        padding: 10,
        marginTop: 50,
        fontSize: 100,
        color: 'tomato'

    },
    sub: {
        fontFamily: 'Cafe24Ohsquareair',
        marginTop: 20,
        fontSize: 30,
        color: '#5c5c5c',

    },
    user: {
        fontFamily: 'Cafe24Ohsquareair',
        padding: 10,
        alignSelf: "flex-end",
        marginTop: 10
    },
    button_logout: {
        justifyContent: "space-between",
        alignSelf: "flex-end",
        backgroundColor: "#efefef",
        marginRight: 30,
        width: 50
    },
    button_logout_text: {
        color: "#5c5c5c",
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        fontFamily: "Cafe24Ohsquareair",
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
    covid_news: {
        fontFamily: 'Cafe24Ohsquareair',
    }

});