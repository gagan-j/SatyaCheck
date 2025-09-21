'use server';

/**
 * @fileOverview A flow to extract transcripts from YouTube videos and Shorts.
 *
 * - extractYouTubeTranscript - A function that handles the transcript extraction process.
 * - ExtractYouTubeTranscriptInput - The input type for the extractYouTubeTranscript function.
 * - ExtractYouTubeTranscriptOutput - The return type for the extractYouTubeTranscript function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractYouTubeTranscriptInputSchema = z.object({
  youtubeUrl: z.string().describe('The URL of the YouTube video or Shorts.'),
});
export type ExtractYouTubeTranscriptInput = z.infer<
  typeof ExtractYouTubeTranscriptInputSchema
>;

const ExtractYouTubeTranscriptOutputSchema = z.object({
  transcript: z.string().describe('The extracted transcript from the YouTube video.'),
});
export type ExtractYouTubeTranscriptOutput = z.infer<
  typeof ExtractYouTubeTranscriptOutputSchema
>;

export async function extractYouTubeTranscript(
  input: ExtractYouTubeTranscriptInput
): Promise<ExtractYouTubeTranscriptOutput> {
  return extractYouTubeTranscriptFlow(input);
}

const extractYouTubeTranscriptPrompt = ai.definePrompt({
  name: 'extractYouTubeTranscriptPrompt',
  input: {schema: ExtractYouTubeTranscriptInputSchema},
  output: {schema: ExtractYouTubeTranscriptOutputSchema},
  prompt: `You are an expert at extracting transcripts from YouTube videos. Extract the transcript from the following YouTube video URL: {{{youtubeUrl}}}.\n\nTranscript:`,
});

const extractYouTubeTranscriptFlow = ai.defineFlow(
  {
    name: 'extractYouTubeTranscriptFlow',
    inputSchema: ExtractYouTubeTranscriptInputSchema,
    outputSchema: ExtractYouTubeTranscriptOutputSchema,
  },
  async input => {
    const {output} = await extractYouTubeTranscriptPrompt(input);
    return output!;
  }
);
