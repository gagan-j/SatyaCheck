'use server';

import { z } from 'zod';
import {
  analyzeContentForMisinformation,
} from '@/ai/flows/analyze-content-for-misinformation';
import type { AnalysisResult } from '@/lib/types';

const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

const FormSchema = z.object({
  content: z.string().min(10, 'Please enter at least 10 characters.'),
});

export type FormState = {
  results: AnalysisResult[];
  error?: string;
  timestamp?: number;
};

export async function performAnalysis(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = FormSchema.safeParse({
      content: formData.get('content'),
    });

    if (!validatedFields.success) {
      return {
        ...prevState,
        error: validatedFields.error.flatten().fieldErrors.content?.[0] || 'Invalid input.',
      };
    }

    const { content } = validatedFields.data;

    if (youtubeRegex.test(content)) {
       return {
        ...prevState,
        error: 'Sorry, YouTube video fact-checking is not supported.',
      };
    }
    
    const result = await analyzeContentForMisinformation({ content });

    const newResult: AnalysisResult = {
      id: new Date().toISOString(),
      claim: content,
      verdict: result.verdict,
      explanation: result.explanation,
      sources: result.sources,
    };

    return {
      results: [newResult, ...prevState.results],
    };
  } catch (error) {
    console.error('An error occurred during analysis:', error);
    return {
      ...prevState,
      error: 'Failed to analyze content. Please try again.',
    };
  }
}
