import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Valid email is required" },
                { status: 400 }
            );
        }

        // TODO: Implement actual subscription logic
        // - Save to database
        // - Send to email marketing service (e.g., Resend, Mailchimp)
        // - Send confirmation email

        // Log subscription (sanitized to prevent log injection)
        const sanitizedEmail = email.replace(/[\r\n]/g, '').slice(0, 100);
        console.log(`New subscription: ${sanitizedEmail}`);

        return NextResponse.json(
            { message: "Successfully subscribed!" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Failed to subscribe" },
            { status: 500 }
        );
    }
}
