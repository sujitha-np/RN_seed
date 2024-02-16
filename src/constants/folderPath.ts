import {Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import * as RNFS from 'react-native-fs';
export const IOS_PATH = ReactNativeBlobUtil.fs.dirs.DocumentDir;
// export const IOS_PATH = RNFS.DocumentDirectoryPath;
export const directoryPath =
  Platform.OS === 'android'
    ? RNFS.DownloadDirectoryPath
    : RNFS.DocumentDirectoryPath;
