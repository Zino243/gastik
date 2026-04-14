import { NextRequest, NextResponse } from "next/server";
import { f } from "../../lib/fetch";

export async function GET(request: NextRequest) {
    try {
        const result = await f.subscription.get(request)
        return NextResponse.json({ data: result })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        if (message === 'Not authenticated') {
            return NextResponse.json({ error: message }, { status: 401 })
        }
        console.error('GET /api/subscription error:', error)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}