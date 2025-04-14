/**
 * @format
 */

import 'react-native-get-random-values';
import { Buffer } from 'buffer'; // Bu satırı geri ekleyin
global.Buffer = Buffer;        // Bu satırı geri ekleyin
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
