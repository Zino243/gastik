import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
    try {
        const { sql } = await request.json()
        
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_KEY!
        )
        
        const { data, error } = await supabase.rpc('exec_sql', { query: sql })
        
        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
        
        return NextResponse.json({ data })
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 })
    }
}