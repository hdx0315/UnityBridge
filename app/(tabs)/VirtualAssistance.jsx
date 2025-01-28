import React from "react";
import { TouchableOpacity, Text, SafeAreaView, StyleSheet } from "react-native";
import { router } from "expo-router";

const VirtualAssistance = () => {
  const handleST = () => {
    router.push('/pages/SpeechText');
  };

  const handleTS = () => {
    router.push('/pages/TextSpeech');
  };

  return (
    <SafeAreaView style={styles.container}>
{ /*     <TouchableOpacity style={styles.button} onPress={handleST} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Speech To Text</Text>
      </TouchableOpacity>*/}
      <TouchableOpacity style={styles.button} onPress={handleTS} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Text To Speech</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6e8', // Replace with your bg-bprimary color
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#90563E', // Button color
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%', // Adjust width as needed
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Text color
    fontSize: 18,
  },
});

export default VirtualAssistance;