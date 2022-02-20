import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../Views/Login';
import Home from '../Views/Home';


const screens = {
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerTintColor: 'azure',
            headerStyle: { backgroundColor: 'grey', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
            headerBackTitleVisible: true,
            headerBackTitle: 'LOGOUT',
            headerLeft: () => <Icon name='navicon' size={30} color='azure' onPress={() => { goBack() }} style={{ marginLeft: 10 }} />,
            headerTitle: 'SZERELLEK',
            headerTitleAlign: 'center',
        }
    }
};

const Stack = createStackNavigator(screens);

export default createAppContainer(Stack);