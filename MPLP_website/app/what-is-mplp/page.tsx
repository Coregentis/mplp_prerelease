import Link from 'next/link';

export const metadata = {
    title: 'What is MPLP? | Multi-Agent Lifecycle Protocol',
    description: 'MPLP is the Multi-Agent Lifecycle Protocol - a lifecycle governance interface for AI agents. Not a software license.',
};

export default function WhatIsMPLP() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">What is MPLP?</h1>
                    <p className="text-xl text-gray-600">Understanding the Multi-Agent Lifecycle Protocol</p>
                </header>

                {/* Definition - Block 1 */}
                <section className="mb-10 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r">
                    <h2 className="text-2xl font-bold text-blue-900 mb-3">Definition</h2>
                    <p className="text-lg text-blue-800">
                        <strong>MPLP</strong> stands for <strong>Multi-Agent Lifecycle Protocol</strong>.
                    </p>
                </section>

                {/* Not-a-License - Block 2 */}
                <section className="mb-10 bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r">
                    <h2 className="text-2xl font-bold text-yellow-900 mb-3">Important Clarification</h2>
                    <p className="text-lg text-yellow-800 font-semibold">
                        MPLP is not a software license and does not define licensing terms.
                    </p>
                </section>

                {/* Three-Entry Model */}
                <section className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Three-Entry Model</h2>
                    <p className="text-gray-700 mb-6">
                        MPLP information is organized across three authoritative sources:
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-blue-600 mb-2">Website</h3>
                            <p className="text-sm font-semibold text-gray-600 mb-2">Discovery & Positioning</p>
                            <p className="text-sm text-gray-700">Conceptual positioning and ecosystem overview.</p>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-green-600 mb-2">Docs</h3>
                            <p className="text-sm font-semibold text-gray-600 mb-2">Specification & Reference</p>
                            <p className="text-sm text-gray-700">Normative requirements and implementation guidance.</p>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-purple-600 mb-2">Repository</h3>
                            <p className="text-sm font-semibold text-gray-600 mb-2">Source of Truth</p>
                            <p className="text-sm text-gray-700">Schemas, tests, and governance records.</p>
                        </div>
                    </div>
                </section>

                {/* Where to Verify */}
                <section className="mb-10 bg-gray-50 border border-gray-300 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Where to Verify</h2>
                    <ul className="space-y-3">
                        <li>
                            <strong>Specification:</strong>{' '}
                            <Link href="https://docs.mplp.io/docs/reference/entrypoints" className="text-blue-600 hover:underline">
                                docs.mplp.io/docs/reference/entrypoints
                            </Link>
                        </li>
                        <li>
                            <strong>Source of Truth:</strong>{' '}
                            <Link href="https://github.com/Coregentis/MPLP-Protocol" className="text-blue-600 hover:underline">
                                github.com/Coregentis/MPLP-Protocol
                            </Link>
                        </li>
                        <li>
                            <strong>Entity Card:</strong>{' '}
                            <Link href="/assets/geo/mplp-entity.json" className="text-blue-600 hover:underline">
                                /assets/geo/mplp-entity.json
                            </Link>
                        </li>
                    </ul>
                </section>

                {/* Quick Facts */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Facts</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">What MPLP Is</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                                <li>A lifecycle governance interface for AI agents</li>
                                <li>A protocol specification with schemas and tests</li>
                                <li>An open standard for agent interoperability</li>
                            </ul>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">What MPLP Is Not</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                                <li>Not a software license</li>
                                <li>Not a certification program</li>
                                <li>Not POSIX (uses POSIX as conceptual lens only)</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
