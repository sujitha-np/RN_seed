import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
export const useUtility = () => {
  const storagePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ];
        const result = await PermissionsAndroid.requestMultiple(permissions);

        const isGranted =
          result['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        return isGranted;
      } else {
        const granted = request(PERMISSIONS.IOS.MEDIA_LIBRARY).then(result => {
          if (result === 'granted') {
            return true;
          } else {
            return false;
          }
        });
        return granted;
      }
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  };
  const showPermissionAlert = () => {
    Alert.alert('Allow', 'storage_permission', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Settings',
        onPress: () => {
          if (Platform.OS === 'android') {
            // For Android, open the app settings
            Linking.openSettings();
          } else if (Platform.OS === 'ios') {
            // For iOS, open the settings app
            Linking.openURL('app-settings:');
          }
        },
      },
    ]);
  };

  return {
    storagePermission,
    showPermissionAlert,
  };
};
