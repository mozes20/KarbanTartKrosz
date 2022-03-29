import React from 'react';
import { StyleSheet, View, TextInput, Image, Button, ImageBackground, Dimensions, Text } from 'react-native';
import { AuthContext } from '../components/context';
import { Table } from '../components/Table';
import { AsyncStorage } from 'react-native';

const Home = ({ navigation }) => {
    const [name, onChangeName] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const onPressLogin = () => {
        navigation.navigate('Login');
    }

    React.useEffect(() => {
        const _retrieveData = async () => {
            try {
                const value = await AsyncStorage.getItem('@MySuperStore:key');
                if (value !== null) {
                    // We have data!!
                    console.log(value);
                }
            } catch (error) {
                // Error retrieving data
            }
        };
        _retrieveData
    });

    const { signOut } = React.useContext(AuthContext);

    return (<>
        <View style={styles.container}>
            <ImageBackground source={require('../assets/back_logo.png')} resizeMode="cover" style={styles.logo}>
                <View style={styles.tablecontainer}>
                    <Table></Table>
                </View>
                <Button
                    title="Log Out"
                    color="grey"
                    onPress={() => signOut()}
                />
            </ImageBackground>
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
        width: Dimensions.get('window').width,
        backgroundColor: `#333333`,
    },
    logo: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    tablecontainer: {
        width: Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height / 1.2,
        overflow: 'scroll',
        //margin: '20px'
    }
});

export default Home;