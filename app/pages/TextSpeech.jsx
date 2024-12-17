import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const speak = async () => {
    const isSpeakingNow = await Speech.isSpeakingAsync();
    if (isSpeakingNow) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const options = {
        language: 'en',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => setIsSpeaking(false),
        onError: (error) => {
          console.log(error);
          setIsSpeaking(false);
        },
      };

      Speech.speak(text, options);
    }
  };

  return (
    <View className="flex-1 justify-center p-5 bg-bprimary">
      <TextInput
        className="h-24 border border-gray-300 rounded-lg p-3 mb-5 text-base bg-gray-50"
        onChangeText={setText}
        value={text}
        placeholder="Enter text to speak"
        multiline
        numberOfLines={4}
        placeholderTextColor="#9CA3AF"
      />
      <Pressable
        onPress={speak}
        disabled={!text.trim()}
        className={`py-3 px-6 rounded-lg ${
          !text.trim() 
            ? 'bg-bprimary-700' 
            : isSpeaking 
              ? 'bg-col_important' 
              : 'bg-t_secondary'
        }`}
      >
        <Text 
          className={`text-center text-base font-medium ${
            !text.trim() ? 'text-gray-100' : 'text-white'
          }`}
        >
          {isSpeaking ? "Stop Speaking" : "Start Speaking"}
        </Text>
      </Pressable>
    </View>
  );
}