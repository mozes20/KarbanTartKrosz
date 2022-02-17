import React from 'react';
import { StyleSheet, View, TextInput, Image, Button } from 'react-native';

const Home = ({ navigation }) => {
    const [name, onChangeName] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const onPressLogin = () => {
        navigation.navigate('Login');
    }

    return (<>
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
            />
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'darkgrey'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: `#333333`
    },
    logo: {
        width: 200,
        height: 150
    }
});

export default Home;
