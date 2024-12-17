import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Alert, Linking } from 'react-native';
import Voice from '@react-native-voice/voice';
import * as IntentLauncher from 'expo-intent-launcher';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

export default function SpeechText() {
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [error, setError] = useState('');
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // Initialize voice handlers
    const voiceStart = () => setIsListening(true);
    const voiceEnd = () => setIsListening(false);
    const voiceResults = (e) => {
      setResults(e.value || []);
      setPartialResults([]);
    };
    const voicePartialResults = (e) => setPartialResults(e.value || []);
    const voiceError = (e) => {
      setError(e.error?.message || 'An error occurred');
      setIsListening(false);
    };

    Voice.onSpeechStart = voiceStart;
    Voice.onSpeechEnd = voiceEnd;
    Voice.onSpeechResults = voiceResults;
    Voice.onSpeechPartialResults = voicePartialResults;
    Voice.onSpeechError = voiceError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const checkPermission = async () => {
    try {
      const { status: existingStatus } = await Audio.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Audio.requestPermissionsAsync();
        finalStatus = status;
      }

      setHasPermission(finalStatus === 'granted');
      return finalStatus === 'granted';
    } catch (err) {
      setError('Error checking permission');
      return false;
    }
  };

  const openSettings = async () => {
    if (Platform.OS === 'ios') {
      await Linking.openSettings();
    } else {
      // For Android, open app settings
      await IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.APPLICATION_SETTINGS
      );
    }
  };

  const handlePermissionAndStart = async () => {
    try {
      const permissionGranted = await checkPermission();
      
      if (!permissionGranted) {
        Alert.alert(
          "Permission Required",
          "This app needs access to your microphone to convert speech to text",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Settings",
              onPress: openSettings
            }
          ]
        );
        return;
      }

      // If we have permission, start speech recognition
      await startSpeechToText();
    } catch (err) {
      setError('Error starting speech recognition');
    }
  };

  const startSpeechToText = async () => {
    try {
      setError('');
      setResults([]);
      setPartialResults([]);
      await Voice.start('en-US');
    } catch (e) {
      setError(e.message);
    }
  };

  const stopSpeechToText = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      setError(e.message);
    }
  };

  const clearResults = () => {
    setResults([]);
    setPartialResults([]);
    setError('');
  };

  return (
    <View className="flex-1 bg-white p-5">
      {/* Header */}
      <View className="mb-8 mt-12">
        <Text className="text-2xl font-bold text-center text-gray-800">
          Speech to Text
        </Text>
      </View>

      {/* Main Content */}
      <ScrollView 
        className="flex-1 bg-gray-50 rounded-lg p-4 mb-4"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Final Results */}
        {results.length > 0 && (
          <View className="mb-4">
            <Text className="font-bold text-gray-700 mb-2">Final Results:</Text>
            {results.map((result, index) => (
              <Text key={`result-${index}`} className="text-base text-gray-700 mb-2">
                {result}
              </Text>
            ))}
          </View>
        )}

        {/* Partial Results */}
        {partialResults.length > 0 && (
          <View className="mb-4">
            <Text className="font-bold text-gray-500 mb-2">Listening:</Text>
            {partialResults.map((result, index) => (
              <Text key={`partial-${index}`} className="text-base text-gray-500 italic">
                {result}
              </Text>
            ))}
          </View>
        )}

        {/* Empty State */}
        {results.length === 0 && partialResults.length === 0 && (
          <Text className="text-gray-500 text-center italic">
            {isListening 
              ? "Listening..." 
              : "Press the microphone to start speaking"
            }
          </Text>
        )}

        {/* Error Message */}
        {error ? (
          <Text className="text-red-500 text-center mt-2">
            {error}
          </Text>
        ) : null}
      </ScrollView>

      {/* Controls */}
      <View className="flex-row justify-center space-x-4 mb-6">
        <Pressable
          onPress={isListening ? stopSpeechToText : handlePermissionAndStart}
          className={`p-4 rounded-full ${
            isListening 
              ? 'bg-red-500' 
              : 'bg-blue-500'
          }`}
        >
          <Text className="text-white text-lg">
            {isListening ? '⏹' : '🎤'}
          </Text>
        </Pressable>
        
        {results.length > 0 && (
          <Pressable
            onPress={clearResults}
            className="p-4 rounded-full bg-gray-500"
          >
            <Text className="text-white text- text-lg">
              🗑️
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}