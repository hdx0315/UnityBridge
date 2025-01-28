import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

interface RecordingResult {
  uri: string | null;
  duration: number;
}

export class AudioRecordingService {
  private recording: Audio.Recording | null = null;
  private sound: Audio.Sound | null = null;

  async startRecording(): Promise<void> {
    try {
      // Ensure any existing recording is stopped
      if (this.recording) {
        await this.recording.stopAndUnloadAsync();
      }

      // Configure audio settings
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });

      // Prepare recording
      const recordingOptions: Audio.RecordingOptions = {
        android: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        },
        ios: {
          extension: '.m4a',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
      };

      // Create and start recording
      const { recording } = await Audio.Recording.createAsync(
        recordingOptions
      );
      this.recording = recording;
    } catch (error) {
      console.error('Recording start error:', error);
      throw error;
    }
  }

  async stopRecording(): Promise<RecordingResult> {
    if (!this.recording) {
      throw new Error('No active recording');
    }

    try {
      // Stop recording
      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();

      // Get recording duration
      const recordingStatus = await this.recording.getStatusAsync();
      const duration = recordingStatus.durationMillis || 0;

      // Reset recording
      this.recording = null;

      // Return recording details
      return {
        uri: uri,
        duration: duration
      };
    } catch (error) {
      console.error('Recording stop error:', error);
      throw error;
    }
  }

  async playRecording(uri: string): Promise<void> {
    try {
      // Stop any existing playback
      if (this.sound) {
        await this.sound.stopAsync();
      }

      // Load and play sound
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      this.sound = sound;
      await sound.playAsync();
    } catch (error) {
      console.error('Playback error:', error);
      throw error;
    }
  }

  async deleteRecording(uri: string): Promise<void> {
    try {
      await FileSystem.deleteAsync(uri);
    } catch (error) {
      console.error('Delete recording error:', error);
    }
  }
}