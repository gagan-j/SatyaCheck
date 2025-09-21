import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-content-for-misinformation.ts';
import '@/ai/flows/provide-explainable-verdicts.ts';
import '@/ai/flows/extract-real-time-youtube-transcripts.ts';
import '@/ai/flows/compare-claims-against-trusted-sources.ts';
import '@/ai/flows/reason-multimodally.ts';
import '@/ai/flows/support-regional-languages.ts';