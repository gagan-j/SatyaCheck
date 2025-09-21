'use server';
/**
 * @fileOverview Analyzes content for potential misinformation using AI.
 * It uses a tool to search the web for trusted sources to verify claims.
 *
 * - analyzeContentForMisinformation - A function that analyzes content for misinformation.
 * - AnalyzeContentForMisinformationInput - The input type for the analyzeContentForMisinformation function.
 * - AnalyzeContentForMisinformationOutput - The return type for the analyzeContentForMisinformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnalyzeContentForMisinformationInputSchema = z.object({
  content: z.string().describe('The content to analyze, which can be text, an image data URI, or video transcript.'),
});
export type AnalyzeContentForMisinformationInput = z.infer<typeof AnalyzeContentForMisinformationInputSchema>;

const AnalyzeContentForMisinformationOutputSchema = z.object({
  verdict: z.string().describe('The verdict on whether the content is likely to be misinformation (e.g., "Likely Factual", "Likely Misinformation", "Potentially Misleading").'),
  explanation: z.string().describe('A brief explanation (2-3 sentences) of the verdict, citing evidence found.'),
  sources: z.array(z.string()).describe('A list of source URLs used to determine the veracity of the claim.'),
});
export type AnalyzeContentForMisinformationOutput = z.infer<typeof AnalyzeContentForMisinformationOutputSchema>;

export async function analyzeContentForMisinformation(input: AnalyzeContentForMisinformationInput): Promise<AnalyzeContentForMisinformationOutput> {
  return analyzeContentForMisinformationFlow(input);
}

const searchTool = ai.defineTool(
  {
    name: 'search',
    description: 'Searches the web for information about a given query to fact-check a claim.',
    inputSchema: z.object({query: z.string()}),
    outputSchema: z.object({
      documents: z.array(
        z.object({
          content: z.string(),
          url: z.string().optional(),
        })
      ),
    }),
  },
  async ({query}) => {
    // In a real application, this would call a web search API.
    // For this example, we'll return dummy data.
    console.log(`Fact-check searching for: ${query}`);
    return {
      documents: [
        {
          content: 'Kajal Aggarwal is an Indian actress who primarily works in Telugu and Tamil films. There have been no credible reports of her death.',
          url: 'https://en.wikipedia.org/wiki/Kajal_Aggarwal',
        },
        {
          content: 'The sky is blue due to a phenomenon called Rayleigh scattering.',
          url: 'https://www.nasa.gov/content/sky-blue',
        },
      ],
    };
  }
);

const analyzeContentForMisinformationPrompt = ai.definePrompt({
  name: 'analyzeContentForMisinformationPrompt',
  input: {schema: AnalyzeContentForMisinformationInputSchema},
  output: {schema: AnalyzeContentForMisinformationOutputSchema},
  tools: [searchTool],
  prompt: `You are an expert fact-checker. Your task is to analyze the provided content for potential misinformation.

  1.  Carefully read the content provided by the user.
  2.  Identify the primary claim being made.
  3.  Use the provided 'search' tool to find information from trusted sources on the web to verify the claim. You must use this tool.
  4.  Based on your search results, determine a verdict: "Likely Factual", "Likely Misinformation", or "Potentially Misleading".
  5.  Provide a concise, 2-3 sentence explanation for your verdict, directly referencing the evidence you found.
  6.  List the URLs of the sources you used.

  Content to analyze: {{{content}}}
  `,
});

const analyzeContentForMisinformationFlow = ai.defineFlow(
  {
    name: 'analyzeContentForMisinformationFlow',
    inputSchema: AnalyzeContentForMisinformationInputSchema,
    outputSchema: AnalyzeContentForMisinformationOutputSchema,
  },
  async input => {
    const llmResponse = await analyzeContentForMisinformationPrompt(input);
    const output = llmResponse.output;

    if (!output) {
      throw new Error('The AI model did not return a valid response.');
    }
    
    // Extract sources from the tool calls made by the model
    const sources =
      llmResponse.history
        ?.map(turn => turn.tools?.[0]?.output.documents.map(doc => doc.url))
        .flat()
        .filter((url): url is string => !!url) ?? [];
        
    const uniqueSources = Array.from(new Set(sources));

    return {
      verdict: output.verdict,
      explanation: output.explanation,
      sources: uniqueSources,
    };
  }
);
