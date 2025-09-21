'use server';
/**
 * @fileOverview Analyzes content for potential misinformation using AI.
 *
 * - analyzeContentForMisinformation - A function that analyzes content for misinformation.
 * - AnalyzeContentForMisinformationInput - The input type for the analyzeContentForMisinformation function.
 * - AnalyzeContentForMisinformationOutput - The return type for the analyzeContentForMisinformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContentForMisinformationInputSchema = z.object({
  content: z.string().describe('The content to analyze, which can be text, an image data URI, video transcript, or YouTube link.'),
});
export type AnalyzeContentForMisinformationInput = z.infer<typeof AnalyzeContentForMisinformationInputSchema>;

const AnalyzeContentForMisinformationOutputSchema = z.object({
  verdict: z.string().describe('The verdict on whether the content is likely to be misinformation.'),
  explanation: z.string().describe('A brief explanation (2-3 sentences) of the verdict with evidence snippets.'),
});
export type AnalyzeContentForMisinformationOutput = z.infer<typeof AnalyzeContentForMisinformationOutputSchema>;

export async function analyzeContentForMisinformation(input: AnalyzeContentForMisinformationInput): Promise<AnalyzeContentForMisinformationOutput> {
  return analyzeContentForMisinformationFlow(input);
}

const analyzeContentForMisinformationPrompt = ai.definePrompt({
  name: 'analyzeContentForMisinformationPrompt',
  input: {schema: AnalyzeContentForMisinformationInputSchema},
  output: {schema: AnalyzeContentForMisinformationOutputSchema},
  prompt: `Analyze the following content for potential misinformation. Provide a verdict and a brief explanation with evidence snippets.\n\nContent: {{{content}}}`,
});

const analyzeContentForMisinformationFlow = ai.defineFlow(
  {
    name: 'analyzeContentForMisinformationFlow',
    inputSchema: AnalyzeContentForMisinformationInputSchema,
    outputSchema: AnalyzeContentForMisinformationOutputSchema,
  },
  async input => {
    const {output} = await analyzeContentForMisinformationPrompt(input);
    return output!;
  }
);
