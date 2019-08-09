/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import VIForegroundService from '@voximplant/react-native-foreground-service';


this.startService = async() => {
    if (Platform.OS !== 'android') {
        console.log('Only Android platform is supported');
        return;
    }
    if (Platform.Version >= 26) {
        const channelConfig = {
            id: 'ForegroundServiceChannel',
            name: 'Notification Channel',
            description: 'Notification Channel for Foreground Service',
            enableVibration: false,
            importance: 2
        };
        await VIForegroundService.createNotificationChannel(channelConfig);
    }
    const notificationConfig = {
        id: 3456,
        title: 'Foreground Service',
        text: 'Foreground service is running',
        icon: 'ic_notification',
        priority: 0
    };
    if (Platform.Version >= 26) {
        notificationConfig.channelId = 'ForegroundServiceChannel';
    }
    await VIForegroundService.startService(notificationConfig);
}

startService();
AppRegistry.registerComponent(appName, () => App);
