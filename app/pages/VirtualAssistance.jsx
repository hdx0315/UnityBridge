import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Button, Alert } from "react-native";
import * as Speech from 'expo-speech'
import { useRef } from "react";
import { Audio } from "expo-av";
import Voice from '@react-native-voice/voice'


const VirtualAssistance = () => {
  
    //extracting users 
    const [users, setUsers] = useState([])

    //state changes for text - to speech recognition
    const [recording, setRecording] = useState();
    const [recordings, setRecordings] = useState([]);

    //state changes for speech to text detection services 
    const [recognized, setRecognized] = useState('');
    const [started, setStarted] = useState(false)
    const [results , setResults] = useState([])
    const [wantedUser, setWantedUser] = useState({})

    useEffect(() => {
      if (user?.uid) {
        getUsers()
      }
    }, [])

    const getUsers = async () => {
      const q = query(usersRef, where('userId', '!=', user?.uid))
      const querySnapshot = await getDocs(q)
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({...doc.data()})
      })
      // console.log('got data:', data);
      setUsers(data)
    }

    const onspeechStart = (e) => {
      setStarted(true)
      console.log("Speech has started : ")   //this is for testing purposes
    };

    const onSpeechRecognized = (e) => {
      setRecognized(true);
      console.log("speech recognized")
    }

    const onSpeechResults = (e) => {
      setResults(e.value);
      handleCommand(e.value);
    }

    const handleCommand = (commands) => {
      const command = commands[0].toLowerCase();

      const chatCommand = /open chat  (\w+)/;
      const sendMssageCommand = /send message (\w+)/;

      const sendMessageMatch = command.match(sendMssageCommand);
      const match = command.match(chatCommand); //string

      if(match){
        const chatname = match[1]
        const user = users.find(user => user?.username == 'match')
        setWantedUser(user)
        router.push({pathname: 'pages/InboxChat', params: user})
      }else {
        Alert.alert("command not recognized");
      }

      if(sendMessageMatch){
        const message = match[1];
        router.push({pathname: 'pages/InboxChat', params: user})
      }else {
        console.log("command didnt reongnized according to the regEx")
      }

      if(command.includes('give me new messages')){
        Alert.alert("command triggered");

      }else if(command.includes('send message i wan to do this now ')){
        Alert.alert("a another command triggered");
        

      }else {
        Alert.alert('nothing found')
      }
    }

    async function startRecording(){
        try {
            const perm = await Audio.requestPermissionsAsync();
            if (perm.status === "granted") {
              await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true
              });
              const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
              setRecording(recording);
            }
          } catch (err) {}
    }
    async function stopRecording(){
        setRecording(undefined);

    await recording.stopAndUnloadAsync();
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    const uri = recording.getURI();
    
    let allRecordings = [...recordings];
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: uri,
    });

    setRecordings(allRecordings);

    // Upload the audio file to the backend
    const formData = new FormData();
    formData.append("audio", {
      uri: uri,
      name: `recording-${Date.now()}.m4a`,
      type: "audio/m4a",
    });

    try {
      const response = await fetch("http://backend-endpoint/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseJson = await response.json();
      console.log("Upload successful:", responseJson);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    }

    function getDurationFormatted(milliseconds) {

        const minutes = milliseconds / 1000 / 60;
        const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
        return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
    }

    function getRecordingLines (){
        return recordings.map((recordingLine, index) => {
            return (
              <View key={index} style={styles.row}>
                <Text style={styles.fill}>
                  Recording #{index + 1} | {recordingLine.duration}
                </Text>
                <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
              </View>
            );
          });
    }

    function clearrecordings(){
        setRecordings([])
    }

    const speak = () => {
        const thingToSay = "i am okay now because i have intialize expo speech";
        Speech.speak(thingToSay);
        console.log("speech function works")
    }

    return (
    // <View>
    //   <TouchableOpacity style={styles.button} onPress={speak} className="bg-green-700">
    //     <Text style={styles.buttonText}>Virtual Assistance</Text>
    //   </TouchableOpacity>
    // </View>

        <View>
            <Button title={recording ? 'Stop Recording' : 'Start Recording' } onPress={recording ? stopRecording : startRecording}/>
            {getRecordingLines()}

            <Button title={recordings.length > 0 ? 'clear Recordings' : ''} onPress={clearrecordings} ></Button>
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