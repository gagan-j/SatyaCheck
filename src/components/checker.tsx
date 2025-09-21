'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { performAnalysis, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import ResultsDisplay from './results-display';
import { Card, CardContent } from './ui/card';
import { useEffect } from 'react';

const initialState: FormState = {
  results: [],
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Checking...
        </>
      ) : (
        <>
          Check
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export function Checker() {
  const [state, formAction] = useActionState(performAnalysis, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state.error, state.timestamp, toast]);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg bg-card/60 backdrop-blur-xl border border-white/10">
        <CardContent className="p-6">
          <form action={formAction} className="space-y-4">
            <Textarea
              name="content"
              placeholder="Enter text or an article URL to start fact-checking..."
              className="min-h-[150px] w-full resize-y rounded-xl border-0 bg-black/20 p-4 text-base shadow-inner focus-visible:ring-1 focus-visible:ring-white/40"
              required
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
      
      <ResultsDisplay results={state.results} />
    </div>
  );
}
