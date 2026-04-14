import { NextRequest, NextResponse } from "next/server";
import { f } from "../../../lib/fetch";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const data = await request.json()
        const result = await f.subscription.put(request, id, data)
        return NextResponse.json({ data: result })
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        await f.subscription.delete(request, id)
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 })
    }
}