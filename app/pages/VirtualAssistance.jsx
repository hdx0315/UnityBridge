import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VirtualAssistance = () => {
    const onButtonPress1 = () => {
        console.log("button pressed")
    }

    const virtualAssitanceMainFunction = () => {
        
    }

    return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onButtonPress1} className="bg-green-700">
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