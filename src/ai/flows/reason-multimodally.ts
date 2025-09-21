'use server';

/**
 * @fileOverview Uses multimodal reasoning to analyze content, considering text, images, and contextual cues.
 *
 * - reasonMultimodally - A function that handles the multimodal reasoning process.
 * - ReasonMultimodallyInput - The input type for the reasonMultimodally function.
 * - ReasonMultimodallyOutput - The return type for the reasonMultimodally function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReasonMultimodallyInputSchema = z.object({
  text: z.string().optional().describe('Text content to analyze.'),
  imageUrl: z.string().optional().describe('URL of an image to analyze.'),
  videoTranscript: z.string().optional().describe('Transcript of a video to analyze.'),
  contextualCues: z.string().optional().describe('Additional contextual information.'),
});

export type ReasonMultimodallyInput = z.infer<typeof ReasonMultimodallyInputSchema>;

const ReasonMultimodallyOutputSchema = z.object({
  analysisResult: z.string().describe('The result of the multimodal reasoning analysis.'),
  confidenceScore: z.number().describe('A score indicating the confidence level of the analysis.'),
  explanation: z.string().describe('An explanation of the reasoning process.'),
});

export type ReasonMultimodallyOutput = z.infer<typeof ReasonMultimodallyOutputSchema>;

export async function reasonMultimodally(input: ReasonMultimodallyInput): Promise<ReasonMultimodallyOutput> {
  return reasonMultimodallyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reasonMultimodallyPrompt',
  input: {schema: ReasonMultimodallyInputSchema},
  output: {schema: ReasonMultimodallyOutputSchema},
  prompt: `You are an AI expert in multimodal reasoning, adept at analyzing content by considering text, images, and contextual cues.

Analyze the following content and provide an analysis result, a confidence score (0-1), and an explanation of your reasoning.

Text: {{{text}}}
Image URL: {{#if imageUrl}}{{media url=imageUrl}}{{else}}N/A{{/if}}
Video Transcript: {{{videoTranscript}}}
Contextual Cues: {{{contextualCues}}}

Analysis Result: 
Confidence Score: 
Explanation: `,
});

const reasonMultimodallyFlow = ai.defineFlow(
  {
    name: 'reasonMultimodallyFlow',
    inputSchema: ReasonMultimodallyInputSchema,
    outputSchema: ReasonMultimodallyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
