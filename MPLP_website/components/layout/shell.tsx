import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface ShellProps {
    children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
    return (
        <div className="flex min-h-screen flex-col bg-mplp-dark text-mplp-text selection:bg-mplp-blue-soft selection:text-white">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
