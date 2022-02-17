import React from 'react';
import { StyleSheet, View, TextInput, Image, Button } from 'react-native';

const Login = ({ navigation }) => {
    const [name, onChangeName] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const onPressLogin = () => {
        navigation.navigate('Home');
    }

    return (<>
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logo.png')}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                placeholder="Name"
                value={name}
                selectionColor={'black'}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
                selectionColor={'black'}
            />
            <Button
                style={styles.button}
                onPress={onPressLogin}
                title="LOGIN"
                color="grey"
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

export default Login;
