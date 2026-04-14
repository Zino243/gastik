import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from '@supabase/ssr';

export async function POST(request: NextRequest) {
    try {
        const { email, password, action } = await request.json();

        const supabaseResponse = NextResponse.json({ message: 'Auth endpoint' });

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            request.cookies.set(name, value);
                            supabaseResponse.cookies.set(name, value, options);
                        });
                    },
                },
            }
        );

        if (action === 'signUp') {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            return supabaseResponse;
        } else if (action === 'signIn') {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            return supabaseResponse;
        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Auth endpoint' });
}