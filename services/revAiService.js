import axios from 'axios';
import FormData from 'form-data';

const REV_AI_API_KEY = 'YOUR_REV_AI_API_KEY'; // Store in .env

export const transcribeAudio = async (audioUri) => {
  try {
    // Create FormData
    const formData = new FormData();
    formData.append('media', {
      uri: audioUri,
      type: 'audio/wav', // Adjust based on your audio format
      name: 'recording.wav'
    });

    // Configure headers
    const config = {
      headers: {
        'Authorization': `Bearer ${REV_AI_API_KEY}`,
        'Content-Type': 'multipart/form-data',
        ...formData.getHeaders()
      }
    };

    // Submit transcription job
    const jobResponse = await axios.post(
      'https://api.rev.ai/revai/v1/jobs',
      formData,
      config
    );

    // Poll for job completion
    return await pollTranscriptionJob(jobResponse.data.id);
  } catch (error) {
    console.error('Rev.ai transcription error:', error.response?.data || error.message);
    throw error;
  }
};

const pollTranscriptionJob = async (jobId) => {
  const maxAttempts = 20;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const jobStatus = await axios.get(
        `https://api.rev.ai/revaai/v1/jobs/${jobId}`,
        {
          headers: {
            'Authorization': `Bearer ${REV_AI_API_KEY}`
          }
        }
      );

      // Check job status
      switch (jobStatus.data.status) {
        case 'transcribed':
          // Fetch transcript
          const transcriptResponse = await axios.get(
            `https://api.rev.ai/revaai/v1/jobs/${jobId}/transcript`,
            {
              headers: {
                'Authorization': `Bearer ${REV_AI_API_KEY}`,
                'Accept': 'application/vnd.rev.transcript.v1.0+json'
              }
            }
          );
          
          // Extract monologue text
          const transcript = transcriptResponse.data.monologues
            .map(mono => mono.elements
              .map(el => el.value)
              .join(' ')
            )
            .join(' ');

          return transcript;

        case 'in_progress':
          // Wait before next poll
          await new Promise(resolve => setTimeout(resolve, 3000));
          attempts++;
          break;

        default:
          throw new Error(`Job failed with status: ${jobStatus.data.status}`);
      }
    } catch (error) {
      console.error('Polling error:', error);
      throw error;
    }
  }

  throw new Error('Transcription timeout');
};