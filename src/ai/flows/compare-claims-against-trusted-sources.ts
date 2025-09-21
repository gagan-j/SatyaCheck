'use server';
/**
 * @fileOverview Compares claims against trusted sources.
 *
 * - compareClaimsAgainstTrustedSources - A function that compares claims against trusted sources.
 * - CompareClaimsAgainstTrustedSourcesInput - The input type for the compareClaimsAgainstTrustedSources function.
 * - CompareClaimsAgainstTrustedSourcesOutput - The return type for the compareClaimsAgainstTrustedSources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

const getTrustedSources = ai.defineTool({
  name: 'getTrustedSources',
  description: 'Search Wikipedia, Google News, and fact-checking databases for information about a claim.',
  inputSchema: z.object({
    claim: z.string().describe('The claim to search for.'),
  }),
  outputSchema: z.array(z.string()).describe('A list of URLs from trusted sources related to the claim.'),
}, async (input) => {
  // Placeholder implementation; replace with actual search logic.
  // This is a simplified example and would need actual integration with search APIs.
  const searchResults = [
    `https://en.wikipedia.org/wiki/${input.claim.replace(/ /g, '_')}`,
    `https://news.google.com/search?q=${input.claim}`,
  ];
  return searchResults;
});

const prompt = ai.definePrompt({
  name: 'compareClaimsAgainstTrustedSourcesPrompt',
  input: {schema: CompareClaimsAgainstTrustedSourcesInputSchema},
  output: {schema: CompareClaimsAgainstTrustedSourcesOutputSchema},
  tools: [getTrustedSources],
  prompt: `You are an expert fact-checker.

  Based on the claim provided, you will use the getTrustedSources tool to gather information from trusted sources such as Wikipedia, Google News, and fact-checking databases.

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


