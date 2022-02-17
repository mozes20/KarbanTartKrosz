import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../Views/Login';
import Home from '../Views/Home';

const screens = {
    Login: {
        screen: Login
    },
    Home: {
        screen: Home
    }
};

const Stack = createStackNavigator(screens);

export default createAppContainer(Stack);