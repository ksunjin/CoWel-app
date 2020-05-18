import React from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';


export default class Loading extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'Login')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.halfContainer}>
                    <Text style={styles.text_title}>COVID19 특별 복지 제도 알림 앱입니다.</Text>
                    <Text style={styles.text_subtitle}>맞춤 검색을 통해 본인에게 알맞는 복지를 찾아보세요.</Text>
                    <View style={styles.halfContainer}>
                        <Button
                            title="시작하기"
                            onPress={() => this.props.navigation.navigate('Login')}
                        />
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
    text_title: {
        fontSize: 32,
        textAlign: "center"
    },
    text_subtitle: {
        fontSize: 20,
        textAlign: "center"
    }
})