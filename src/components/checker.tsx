'use client';

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { performAnalysis, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import ResultsDisplay from './results-display';
import { Card, CardContent } from './ui/card';

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
              placeholder="Enter text, article URL, or YouTube link to start fact-checking..."
              className="min-h-[120px] w-full resize-y bg-background/50 text-base"
              required
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="w-full sm:w-auto">
                <Select name="language" defaultValue="English">
                  <SelectTrigger className="w-full sm:w-[180px] bg-background/50 border-white/20">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                    <SelectItem value="Bengali">Bengali</SelectItem>
                    <SelectItem value="Telugu">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
      
      <ResultsDisplay results={state.results} />
    </div>
  );
}
