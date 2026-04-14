import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function createClientFromRequest(request: NextRequest) {
    const cookieStore = request.headers.get('cookie') || ''
    
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
            cookies: {
                getAll() {
                    const cookies: Record<string, string> = {}
                    cookieStore.split('; ').forEach(c => {
                        const [k, v] = c.split('=')
                        if (k) cookies[k] = v
                    })
                    return Object.entries(cookies).map(([name, value]) => ({ name, value, options: {} }))
                },
                setAll() {},
            },
        }
    )
}