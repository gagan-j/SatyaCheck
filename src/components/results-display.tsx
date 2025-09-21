'use client';

import type { AnalysisResult } from '@/lib/types';
import ResultCard from './result-card';
import ResultSkeleton from './result-skeleton';
import { useFormStatus } from 'react-dom';
import { FileSearch } from 'lucide-react';

type ResultsDisplayProps = {
  results: AnalysisResult[];
};

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <div className="masonry-grid">
        {[...Array(3)].map((_, i) => (
          <ResultSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-16">
        <FileSearch className="h-12 w-12 mb-4" />
        <h3 className="text-xl font-semibold">Your results will appear here</h3>
        <p className="mt-2 max-w-md">
          Enter some content above and click "Check" to begin the analysis. We support text and article URLs.
        </p>
      </div>
    );
  }

  return (
    <div className="masonry-grid space-y-6">
      {results.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
}
