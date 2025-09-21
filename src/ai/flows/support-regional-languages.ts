'use server';

/**
 * @fileOverview This flow supports regional languages for content analysis and explanations.
 *
 * - analyzeContentRegional - Analyzes content and provides explanations in the specified regional language.
 * - AnalyzeContentRegionalInput - The input type for the analyzeContentRegional function.
 * - AnalyzeContentRegionalOutput - The return type for the analyzeContentRegional function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContentRegionalInputSchema = z.object({
  content: z.string().describe('The content to be analyzed (text, image data URI, video transcript, or YouTube link).'),
  language: z.string().describe('The regional language to use for analysis and explanations (e.g., Hindi, Tamil).'),
});
export type AnalyzeContentRegionalInput = z.infer<typeof AnalyzeContentRegionalInputSchema>;

const AnalyzeContentRegionalOutputSchema = z.object({
  analysisResult: z.string().describe('The result of the misinformation analysis in the specified language.'),
  explanation: z.string().describe('A human-friendly explanation of the verdict in the specified language.'),
});
export type AnalyzeContentRegionalOutput = z.infer<typeof AnalyzeContentRegionalOutputSchema>;

export async function analyzeContentRegional(input: AnalyzeContentRegionalInput): Promise<AnalyzeContentRegionalOutput> {
  return analyzeContentRegionalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeContentRegionalPrompt',
  input: {schema: AnalyzeContentRegionalInputSchema},
  output: {schema: AnalyzeContentRegionalOutputSchema},
  prompt: `You are an AI assistant specializing in identifying misinformation in online content. You are fluent in {{{language}}}.

Analyze the following content and provide your analysis in {{{language}}}. Explain your verdict in 2-3 sentences, also in {{{language}}}.

Content: {{{content}}}`,
});

const analyzeContentRegionalFlow = ai.defineFlow(
  {
    name: 'analyzeContentRegionalFlow',
    inputSchema: AnalyzeContentRegionalInputSchema,
    outputSchema: AnalyzeContentRegionalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
