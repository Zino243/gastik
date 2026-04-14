import { NextRequest, NextResponse } from "next/server";
import { f } from "../../../lib/fetch";

export async function POST(request: NextRequest) {
    try {
        await f.auth.signOut(request);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 });
    }
}