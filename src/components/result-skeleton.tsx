import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ResultSkeleton() {
  return (
    <div className="break-inside-avoid">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-4 w-full mt-4" />
          <Skeleton className="h-4 w-5/6" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
