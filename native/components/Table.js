import React, { useMemo, Component } from "react";
import { StyleSheet, View, TextInput, Image, Button, ImageBackground, Dimensions, Text, TouchableOpacity } from 'react-native';
import MOCK_DATA from './MOCK_DATA.json';
import { FlatList } from "react-native-gesture-handler";
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const baseUrl = 'http://168.119.57.253:5001/auth';

export const Table = () => {

    const [data, setData] = React.useState([]);
    const [expanded, setExpanded] = React.useState([]);

    React.useEffect(() => {
        try {
            AsyncStorage.getItem('@token').then((value) => {
                if (value !== null) {
                    // We have data!!
                    //console.log(value);

                    axios.get(`${baseUrl}/maincategory`, { params: { token: value.toString() } })
                        .then((response) => setData(response.data))
                };
            }
            )

        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    }, [])

    console.log(data);

    const AddId = (id) => {
        if (!expanded.includes(id)) {
            let array = expanded;
            array.push(id);
            setExpanded(expanded => [...expanded, array]);
        }
        else {
            let array = expanded;
            array.splice(array.indexOf(id), 1);
            setExpanded(expanded => [...expanded, array]);
        }
        //console.log(expanded);
    }

    const item = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => AddId(item._id)}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.cell}>
                            <Text style={styles.cellcolor}>{item.Name}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.cellcolor}>{item.location}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.cellcolor}>{item.category}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {expanded.includes(item._id) ? (
                    <TouchableOpacity onPress={() => null}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.cell}>
                                <Text style={styles.cellcolor2}>{item.categorys}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.cellcolor}>{item.location}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.cellcolor}>{item.category}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ) : (
                    null
                )}
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
        textAlign: 'center',
    },
    cellcolor: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    cellcolor2: {
        color: 'black',
        fontSize: 16,
        //fontWeight: 'bold'
    },
    headercolor: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    }
});