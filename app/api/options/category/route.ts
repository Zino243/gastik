import { NextRequest, NextResponse } from "next/server";
import { f } from "../../../lib/fetch";

export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json()
        const result = await f.category.create(request, name)
        return NextResponse.json({ data: result })
    } catch (error) {
        console.error('POST /api/options/category error:', error)
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 })
    }
}