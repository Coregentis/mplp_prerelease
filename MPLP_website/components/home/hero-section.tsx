import { Button } from "@/components/common/button";
import { Badge } from "@/components/common/badge";
import { DOCS_URLS } from "@/lib/site-config";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-space py-24 lg:py-40">
            {/* Background decoration (Living Blobs & Stars) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob animation-delay-2000" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob animation-delay-4000" />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                {/* FROZEN Badge */}
                <div className="animate-fade-in flex justify-center" style={{ animationDelay: "0ms" }}>
                    <Badge variant="frozen" size="md" className="mb-8 shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-float border border-blue-500/30 backdrop-blur-md">
                        🧊 FROZEN · MPLP Protocol v1.0.0
                    </Badge>
                </div>

                {/* Main Headline (H1) */}
                <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
                        Multi-Agent <span className="text-gradient">Lifecycle Protocol</span>
                    </h1>
                </div>

                {/* Subtitle (H2) */}
                <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-200 mb-2 opacity-90">
                        The Agent OS Protocol
                    </h2>
                    <p className="text-lg sm:text-xl font-bold text-gradient whitespace-nowrap mb-6">
                        The Lifecycle Protocol for AI Agents
                    </p>
                    <p className="text-lg sm:text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                        Observable. Governed. Vendor-neutral. <br className="hidden sm:block" />
                        The operating system layer for the agentic future.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="animate-fade-in flex flex-wrap justify-center gap-6" style={{ animationDelay: "400ms" }}>
                    <Button href={DOCS_URLS.overview} variant="primary" size="lg" className="shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.8)] transition-all duration-300 border border-blue-400/20 bg-blue-600 hover:bg-blue-500 text-white" external>
                        Get Started
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Button>
                    <Button href={DOCS_URLS.overview} variant="outline" size="lg" external className="border-slate-700 text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 backdrop-blur-sm">
                        Read the Spec
                    </Button>
                    <Button
                        href={DOCS_URLS.github}
                        variant="secondary"
                        size="lg"
                        external
                        className="bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700/50 border border-slate-700 backdrop-blur-sm"
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        Star on GitHub
                    </Button>
                </div>
            </div>
        </section>
    );
}
