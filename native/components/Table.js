import React, { useMemo, Component } from "react";
import { StyleSheet, View, TextInput, Image, Button, ImageBackground, Dimensions, Text } from 'react-native';
import MOCK_DATA from './MOCK_DATA.json';
import { FlatList } from "react-native-gesture-handler";

export const Table = () => {

    const data = useMemo(() => MOCK_DATA, []);

    const item = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.cell}>
                    <Text style={styles.cellcolor}>{item.name}</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.cellcolor}>{item.location}</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.cellcolor}>{item.category}</Text>
                </View>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.main}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.header}>
                        <Text style={styles.headercolor}>Name</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.headercolor}>Location</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.headercolor}>Category</Text>
                    </View>
                </View>
                <FlatList
                    data={data}
                    renderItem={item}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        //maxHeight: Dimensions.get('window').height / 1.3
        maxHeight: 600
    },
    header: {
        width: Dimensions.get('window').width / 3 - 5,
        backgroundColor: 'rgba(100, 100, 100, 0.5)',
        textAlign: 'center'
    },
    cell: {
        width: Dimensions.get('window').width / 3 - 5,
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
        textAlign: 'center'
    },
    cellcolor: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    headercolor: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});