import { Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const requestMicrophonePermission = async (): Promise<boolean> => {
  try {
    const permission = Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.MICROPHONE 
      : PERMISSIONS.ANDROID.RECORD_AUDIO;

    const result = await request(permission);

    switch (result) {
      case RESULTS.GRANTED:
        return true;
      case RESULTS.DENIED:
      case RESULTS.BLOCKED:
      case RESULTS.UNAVAILABLE:
      default:
        return false;
    }
  } catch (error) {
    console.error('Permission request error:', error);
    return false;
  }
};