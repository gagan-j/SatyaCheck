import type { AnalysisResult } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Separator } from './ui/separator';
import { CheckCircle, AlertTriangle, XCircle, Info, Link as LinkIcon, Quote } from 'lucide-react';

type VerdictDisplay = {
  text: string;
  Icon: React.ElementType;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
};

function getVerdictDisplay(verdict: string): VerdictDisplay {
  const lowerVerdict = verdict.toLowerCase();
  if (lowerVerdict.includes('misinformation') || lowerVerdict.includes('false')) {
    return { text: 'Likely Misinformation', Icon: XCircle, variant: 'destructive' };
  }
  if (lowerVerdict.includes('misleading') || lowerVerdict.includes('partially true')) {
    return { text: 'Potentially Misleading', Icon: AlertTriangle, variant: 'secondary' };
  }
  if (lowerVerdict.includes('factual') || lowerVerdict.includes('true')) {
    return { text: 'Likely Factual', Icon: CheckCircle, variant: 'default' };
  }
  return { text: 'Analysis', Icon: Info, variant: 'outline' };
}

function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export default function ResultCard({ result }: { result: AnalysisResult }) {
  const { Icon, text, variant } = getVerdictDisplay(result.verdict);

  return (
    <div className="break-inside-avoid transform transition-transform duration-300 ease-in-out hover:scale-[1.02]">
      <Card className="shadow-md bg-card/60 backdrop-blur-xl border border-white/10 rounded-2xl">
        <CardHeader>
          <Badge variant={variant} className="w-fit">
            <Icon className="mr-2 h-4 w-4" />
            {text}
          </Badge>
          <CardDescription className="pt-4 !text-foreground font-medium">
            "{result.explanation}"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Quote className="h-4 w-4 shrink-0 mt-1" />
            <p className="line-clamp-3 italic">
              {result.claim}
            </p>
          </div>

          {result.sources && result.sources.filter(isValidUrl).length > 0 && (
            <>
              <Separator />
              <div className="flex flex-col gap-2 text-sm">
                {result.sources.filter(isValidUrl).map((source, index) => (
                  <a
                    key={index}
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-foreground/80 hover:underline"
                  >
                    <LinkIcon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{new URL(source).hostname}</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
