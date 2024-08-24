import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Speech from 'expo-speech'


const VirtualAssistance = () => {
    const [recognizedText, setRecognizedText] = useState('')
    


    const speak = () => {
        const thingToSay = "i am okay now because i have intialize expo speech";
        Speech.speak(thingToSay);
        console.log("speech function works")
    }

    return (
    <View>
      <TouchableOpacity style={styles.button} onPress={speak} className="bg-green-700">
        <Text style={styles.buttonText}>Virtual Assistance</Text>
      </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'relative',
        bottom: 20,
        right:20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 30,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    button: {
        width: '100%',
        borderRadius: 10,
        padding: 10,
        margin: 5
    },
    buttonText : {
        color: '#fff',
        fontSize:  16
    }
})

export default VirtualAssistance;