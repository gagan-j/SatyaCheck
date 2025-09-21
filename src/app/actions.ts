'use server';

import { z } from 'zod';
import {
  analyzeContentForMisinformation,
} from '@/ai/flows/analyze-content-for-misinformation';
import {
  compareClaimsAgainstTrustedSources,
} from '@/ai/flows/compare-claims-against-trusted-sources';
import {
  extractYouTubeTranscript,
} from '@/ai/flows/extract-real-time-youtube-transcripts';
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

    let { content } = validatedFields.data;
    const originalContent = content;
    let contentToAnalyze = content;

    if (youtubeRegex.test(content)) {
      try {
        const transcriptResult = await extractYouTubeTranscript({ youtubeUrl: content });
        contentToAnalyze = transcriptResult.transcript;
      } catch (e) {
        console.error('Error extracting YouTube transcript:', e);
        // If transcript extraction fails, we can still try to analyze the URL itself.
        contentToAnalyze = content;
      }
    }
    
    const analysisPromise = analyzeContentForMisinformation({ content: contentToAnalyze });
    const sourcesPromise = compareClaimsAgainstTrustedSources({ claim: contentToAnalyze.substring(0, 500) });

    const [analysisResult, sourcesResult] = await Promise.all([analysisPromise, sourcesPromise]);
    
    const verdict = 'verdict' in analysisResult ? analysisResult.verdict : (analysisResult as any).analysisResult;

    const newResult: AnalysisResult = {
      id: new Date().toISOString(),
      claim: originalContent,
      verdict: verdict,
      explanation: analysisResult.explanation,
      sources: sourcesResult.sources,
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
