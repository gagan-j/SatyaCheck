'use server';
/**
 * @fileOverview Compares claims against trusted sources.
 *
 * - compareClaimsAgainstTrustedSources - A function that compares claims against trusted sources.
 * - CompareClaimsAgainstTrustedSourcesInput - The input type for the compareClaimsAgainstTrustedSources function.
 * - CompareClaimsAgainstTrustedSourcesOutput - The return type for the compareClaimsAgainstTrustedSources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CompareClaimsAgainstTrustedSourcesInputSchema = z.object({
  claim: z.string().describe('The claim to verify.'),
});
export type CompareClaimsAgainstTrustedSourcesInput = z.infer<typeof CompareClaimsAgainstTrustedSourcesInputSchema>;

const CompareClaimsAgainstTrustedSourcesOutputSchema = z.object({
  veracity: z.string().describe('The veracity of the claim based on trusted sources.'),
  explanation: z.string().describe('A brief explanation of the veracity.'),
  sources: z.array(z.string()).describe('A list of sources used to determine the veracity.'),
});
export type CompareClaimsAgainstTrustedSourcesOutput = z.infer<typeof CompareClaimsAgainstTrustedSourcesOutputSchema>;

export async function compareClaimsAgainstTrustedSources(input: CompareClaimsAgainstTrustedSourcesInput): Promise<CompareClaimsAgainstTrustedSourcesOutput> {
  return compareClaimsAgainstTrustedSourcesFlow(input);
}

const searchTool = ai.defineTool(
  {
    name: 'search',
    description: 'Searches the web for information about a given query.',
    inputSchema: z.object({query: z.string()}),
    outputSchema: z.object({
      documents: z.array(z.object({content: z.string()})),
    }),
  },
  async ({query}) => {
    // This is where you would add your own logic to search the web
    // and return a list of ranked documents.
    // For this example, we'll just return some dummy data.
    console.log(`Searching for: ${query}`);
    return {
      documents: [
        {content: 'The sky is blue because of Rayleigh scattering.'},
        {
          content:
            'The moon is not made of cheese, it is made of rock.',
        },
      ],
    };
  }
);

const prompt = ai.definePrompt({
  name: 'compareClaimsAgainstTrustedSourcesPrompt',
  input: {schema: CompareClaimsAgainstTrustedSourcesInputSchema},
  output: {schema: CompareClaimsAgainstTrustedSourcesOutputSchema},
  tools: [searchTool],
  prompt: `You are an expert fact-checker.

  Based on the claim provided, you will use the provided search tool to gather information from trusted sources such as Wikipedia, Google News, and fact-checking databases.

  Using the information from the trusted sources, determine the veracity of the claim and provide a brief explanation.

  Claim: {{{claim}}}
  `,
});

const compareClaimsAgainstTrustedSourcesFlow = ai.defineFlow(
  {
    name: 'compareClaimsAgainstTrustedSourcesFlow',
    inputSchema: CompareClaimsAgainstTrustedSourcesInputSchema,
    outputSchema: CompareClaimsAgainstTrustedSourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
