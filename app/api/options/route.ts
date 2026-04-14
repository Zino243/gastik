import { NextRequest, NextResponse } from "next/server";
import { f } from "../../lib/fetch";

export async function GET(request: NextRequest) {
    try {
        const [services, billingCycles, categories] = await Promise.all([
            f.service.getAll(),
            f.billingCycle.getAll(),
            f.category.getAll(request)
        ])
        return NextResponse.json({ data: { services, billingCycles, categories } })
    } catch (error) {
        console.error('GET /api/options error:', error)
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 })
    }
}