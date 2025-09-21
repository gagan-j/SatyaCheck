'use server';
/**
 * @fileOverview Generates human-friendly explanations for fact-checking verdicts, 
 * including snippets of supporting evidence.
 *
 * - generateExplainableVerdict - A function that generates explanations for verdicts.
 * - ExplainableVerdictInput - The input type for the generateExplainableVerdict function.
 * - ExplainableVerdictOutput - The return type for the generateExplainableVerdict function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainableVerdictInputSchema = z.object({
  claim: z.string().describe('The claim to be fact-checked.'),
  verdict: z.string().describe('The verdict of the fact-checking process.'),
  evidence: z.array(z.string()).describe('The evidence snippets supporting the verdict.'),
});
export type ExplainableVerdictInput = z.infer<typeof ExplainableVerdictInputSchema>;

const ExplainableVerdictOutputSchema = z.object({
  explanation: z.string().describe('A human-friendly explanation (2-3 sentences) of the verdict with evidence snippets.'),
});
export type ExplainableVerdictOutput = z.infer<typeof ExplainableVerdictOutputSchema>;

export async function generateExplainableVerdict(input: ExplainableVerdictInput): Promise<ExplainableVerdictOutput> {
  return generateExplainableVerdictFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainableVerdictPrompt',
  input: {schema: ExplainableVerdictInputSchema},
  output: {schema: ExplainableVerdictOutputSchema},
  prompt: `You are an expert fact-checker. Your task is to provide a concise and human-friendly explanation for a given verdict based on the provided claim and supporting evidence.

  Specifically, create a 2-3 sentence explanation that clearly articulates why the claim received the given verdict. Incorporate snippets of the evidence to strengthen the explanation.

  Claim: {{{claim}}}
  Verdict: {{{verdict}}}
  Evidence: {{#each evidence}} - {{{this}}}{{/each}}
  `,
});

const generateExplainableVerdictFlow = ai.defineFlow(
  {
    name: 'generateExplainableVerdictFlow',
    inputSchema: ExplainableVerdictInputSchema,
    outputSchema: ExplainableVerdictOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
