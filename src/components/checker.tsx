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
import { useEffect, useRef } from 'react';

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
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);
  
  useEffect(() => {
    if (!state.error && formRef.current) {
        formRef.current.reset();
    }
  }, [state.results]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
       // Manually trigger form submission
      if (formRef.current) {
        const submitButton = formRef.current.querySelector('button[type="submit"]') as HTMLButtonElement | null;
        submitButton?.click();
      }
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg bg-background/50 backdrop-blur-xl border border-white/10 rounded-2xl">
        <CardContent className="p-6">
          <form ref={formRef} action={formAction} className="space-y-4">
            <Textarea
              ref={textAreaRef}
              name="content"
              placeholder="Enter text or an article URL to start fact-checking... (Shift+Enter for new line)"
              className="min-h-[150px] w-full resize-y rounded-xl border-white/10 bg-white/5 p-4 text-base shadow-inner focus-visible:ring-1 focus-visible:ring-white/40 backdrop-blur-sm"
              required
              onKeyDown={handleKeyDown}
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
