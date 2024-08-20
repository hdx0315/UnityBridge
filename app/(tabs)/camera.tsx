import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import { Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, Text, TouchableOpacity, View, Pressable } from 'react-native';
import CustomButton from '../../components/CustomButton'
import { SafeAreaView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [character , setCharacter] = useState('');
  const [message, setMessage] = useState("");
  const [isCameraReady , setiscameraReady] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false);

  const capture = async () => {
    if(isCameraReady && cameraRef.current && isCapturing){
      console.log("this function works")
      const photo = await cameraRef.current.takePictureAsync({base64: true});
      sendImageToBackend(photo.base64);
    }
  };

  const sendImageToBackend = async (image:any) => {
    try {
      const response = await axios.post('http://192.168.8.146:5000/detect' , {image});
      setCharacter(response.data.character);
      setMessage((prevMsg) => prevMsg + response.data.character);
      console.log(message + character)
      console.log("this function works")
    }
    catch(error){
      console.log("Error happend when sending the image to backend via axios , the error is " , error );
    }
  }

  const onCameraReady = () => {
    setiscameraReady(true);
  }

  const startCapture = () => {
    setIsCapturing(true);
    const intervalId = setInterval(() => {
      if(!isCapturing) {
        clearInterval(intervalId)
      }else {
        capture();
      }
    } , 2000);
  };

  const stopCapture = () => {
    setIsCapturing(false);
  }

  useEffect(() => {
    return () => {
      stopCapture();
    }
  } , []);

  // useEffect(() => {
  //   // Handle cleanup when navigating away
  //   return () => {
  //     stopCapture();
  //   };
  // }, [isCapturing]);

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
    <SafeAreaView className="flex-1 justify-center">
      <CameraView className="flex-1" facing={facing} onCameraReady={onCameraReady} ref={cameraRef}>
        <View className="flex-1 flex-row bg-transparent m-16">
          <TouchableOpacity className="flex-1 self-end items-center" onPress={toggleCameraFacing}>
            <Text className="text-xl font-bold text-white">Flip Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 self-end items-center" onPress={startCapture}>
            <Text className="text-xl font-bold text-white">Start</Text>
          </TouchableOpacity>

        </View>
        <View className="flex-row justify-center border-2 border-secondary rounded-lg m-2">
          <Text className="text-lg text-secondary">
            {character}
          </Text>

          <Text>
            {message}
          </Text>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}
