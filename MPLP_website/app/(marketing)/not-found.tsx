import { Shell } from "@/components/layout/shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <Shell>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-9xl font-bold text-mplp-blue-soft/20">404</h1>
                <h2 className="text-2xl font-bold text-mplp-text mt-4">Page Not Found</h2>
                <p className="text-mplp-text-muted mt-2 mb-8 max-w-md">
                    The page you are looking for doesn&apos;t exist or has been moved.
                </p>
                <Button href="/" variant="primary" size="lg">
                    Return Home
                </Button>
            </div>
        </Shell>
    );
}
