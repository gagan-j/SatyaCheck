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
import { CheckCircle, AlertTriangle, XCircle, Info, Link as LinkIcon } from 'lucide-react';

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

export default function ResultCard({ result }: { result: AnalysisResult }) {
  const { Icon, text, variant } = getVerdictDisplay(result.verdict);

  // For a pure black and white theme, we can map variants to something more neutral.
  // Or, we can rely on the theme to handle destructive as a shade.
  // Here we will just use the variant as is, and let the theme dictate the color.
  // The destructive variant will be a dark red as per the updated globals.css which is fine for accessibility.

  return (
    <div className="break-inside-avoid transform transition-transform duration-300 ease-in-out hover:scale-[1.02]">
      <Card className="shadow-md">
        <CardHeader>
          <Badge variant={variant} className="w-fit">
            <Icon className="mr-2 h-4 w-4" />
            {text}
          </Badge>
          <CardDescription className="pt-4 !text-foreground font-medium">
            "{result.explanation}"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
          <p className="mt-4 text-sm text-muted-foreground font-semibold">Original Content:</p>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{result.claim}</p>
        </CardContent>
        {result.sources && result.sources.length > 0 && (
          <CardFooter className="flex flex-col items-start gap-2">
            <p className="text-sm text-muted-foreground font-semibold">Verified Sources:</p>
            <div className="flex flex-col space-y-2 text-sm">
              {result.sources.map((source, index) => (
                <a
                  key={index}
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary-foreground/80 hover:underline"
                >
                  <LinkIcon className="mr-2 h-3 w-3" />
                  <span className="truncate">{new URL(source).hostname}</span>
                </a>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
