import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View, Pressable } from 'react-native';
import CustomButton from '../../components/CustomButton'

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 justify-center bg-primary px-2">
        <Text className="text-center pb-2.5 text-secondary text-2xl">We need your permission to access the camera</Text>
        <View className="flex-row justify-center my-4">
        <Pressable  onPress={requestPermission} className="items-center justify-center py-3 px-8 rounded-full max-w-[300px] bg-secondary p-6">
          <Text className="text-lg font-bold leading-5 text-black">Grant Camera Permission</Text>
        </Pressable>
        </View>
        {/* 
        <CustomButton
            title="Grant Permission"
            handlePress={requestPermission}
            containerStyles="w-full"
            textStyles="text-black font-psemibold"
            isLoading={true}
        />
        */}
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View className="flex-1 justify-center">
      <CameraView className="flex-1" facing={facing}>
        <View className="flex-1 flex-row bg-transparent m-16">
          <TouchableOpacity className="flex-1 self-end items-center" onPress={toggleCameraFacing}>
            <Text className="text-xl font-bold text-white">Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
