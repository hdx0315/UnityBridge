import axios from 'axios';
import FormData from 'form-data';
import * as FileSystem from 'expo-file-system';

interface TranscriptionResult {
  text: string;
  confidence: number;
}

export class TranscriptionService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async transcribeAudio(audioUri: string): Promise<TranscriptionResult> {
    try {
      // Read file
      const fileBase64 = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64
      });

      // Prepare request to transcription API (example with Rev.ai)
      const response = await axios.post(
        'https://api.rev.ai/revaai/v1/jobs',
        {
          media_url: `data:audio/m4a;base64,${fileBase64}`,
          metadata: 'Mobile App Transcription',
          callback_url: 'https://your-callback-url.com/callback'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Poll for transcription result
      const jobId = response.data.id;
      const transcription = await this.pollTranscriptionJob(jobId);

      return {
        text: transcription,
        confidence: 0.9 // Placeholder confidence
      };
    } catch (error) {
      console.error('Transcription error:', error);
      throw error;
    }
  }

  private async pollTranscriptionJob(jobId: string): Promise<string> {
    // Implement job polling logic
    // This is a simplified version and should be expanded
    const maxAttempts = 20;
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const jobStatus = await axios.get(
          `https://api.rev.ai/revaai/v1/jobs/${jobId}`,
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`
            }
          }
        );

        if (jobStatus.data.status === 'transcribed') {
          // Fetch transcript
          const transcriptResponse = await axios.get(
            `https://api.rev.ai/revaai/v1/jobs/${jobId}/transcript`,
            {
              headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Accept': 'application/vnd.rev.transcript.v1.0+json'
              }
            }
          );

          return transcriptResponse.data.monologues
            .map(mono => mono.elements.map(el => el.value).join(' '))
            .join(' ');
        }

        // Wait before next attempt
        await new Promise(resolve => setTimeout(resolve, 3000));
        attempts++;
      } catch (error) {
        console.error('Polling error:', error);
        throw error;
      }
    }

    throw new Error('Transcription timeout');
  }
}