import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

function createClientFromRequest(request: NextRequest) {
    const cookies = request.headers.get('cookie') || ''
    
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
            cookies: {
                getAll() {
                    const result: { name: string; value: string; options: any }[] = []
                    if (!cookies) return result
                    cookies.split('; ').forEach(c => {
                        const idx = c.indexOf('=')
                        if (idx > 0) {
                            result.push({ name: c.substring(0, idx), value: c.substring(idx + 1), options: {} })
                        }
                    })
                    return result
                },
                setAll() {},
            },
        }
    )
}

export const f = {
    createAdminClient() {
        return createSupabaseClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_KEY!
        )
    },
    auth: {
        signUp: async (email: string, password: string) => {
            const supabase = createServerClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_KEY!,
                { cookies: { getAll() { return [] }, setAll() {} } }
            )
            const { data, error } = await supabase.auth.signUp({ email, password })
            if (error) throw error
            return data
        },
        signIn: async (email: string, password: string, request: NextRequest) => {
            const supabase = createClientFromRequest(request)
                // process.env.NEXT_PUBLIC_SUPABASE_URL!,
                // process.env.NEXT_PUBLIC_SUPABASE_KEY!,
                // { cookies: { getAll() { return [] }, setAll() {} } })

            const { data, error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error
            return data
        },
        signOut: async (request: NextRequest) => {
            const supabase = createClientFromRequest(request)
            const { error } = await supabase.auth.signOut()
            if (error) throw error
        },
        getUser: async (request: NextRequest) => {
            const supabase = createClientFromRequest(request)
            const { data: { user }, error } = await supabase.auth.getUser()
            if (error) throw error
            return user
        }
    },
    subscription: {
        get: async (request: NextRequest, params?: { month?: string; year?: string; order?: string }) => {
            const supabase = createClientFromRequest(request)
            const { data: { user }, error: authError } = await supabase.auth.getUser()
            
            if (authError || !user) throw new Error('Not authenticated')

            const query = supabase.from('UserSubscription').select('*, Service(name, logo), Category(name), BillingCycle(name, days)').eq('userId', user.id)
            
            const { data, error } = await query
            if (error) throw error
            console.log('[back data]',data)
            return data
        },
        post: async (request: NextRequest, data: any) => {
            const supabase = createClientFromRequest(request)
            const { data: { user }, error: authError } = await supabase.auth.getUser()
            
            if (authError || !user) throw new Error('Not authenticated')

            console.log("[auth.uid]", user.id)
            console.log("[insert data]", { name: data.name, userId: user.id })

            const { data: serviceResult, error: serviceError } = await supabase
                .from('Service')
                .insert({
                    name : data.name,
                    userId: user.id // dato del usuario autenticado
                })
                .select()
                .single()

            if (serviceError) throw serviceError
            console.log("[log service]", serviceResult)


            const insertData = {
                userId: user.id,
                serviceId: serviceResult.id,
                billingId: data.billingId,
                notificationId: data.notificationId,
                categoryId: data.categoryId,
                price: data.price,
                startDate: data.startDate,
                cancelDate: data.cancelDate,
            }

            // name va para Service


            const { data: result, error } = await supabase
                .from('UserSubscription')
                .insert(insertData)
                .select()
            if (error) throw error

            return result
        },
        put: async (request: NextRequest, id: string, data: Partial<any>) => {
            const supabase = createClientFromRequest(request)
            const { data: { user }, error: authError } = await supabase.auth.getUser()
            
            if (authError || !user) throw new Error('Not authenticated')

            const { data: result, error } = await supabase
                .from('UserSubscription')
                .update(data)
                .eq('id', id)
                .eq('userId', user.id)
                .select()
            if (error) throw error
            return result
        },
        delete: async (request: NextRequest, id: string) => {
            const supabase = createClientFromRequest(request)
            const { data: { user }, error: authError } = await supabase.auth.getUser()
            
            if (authError || !user) throw new Error('Not authenticated')

            const { error } = await supabase
                .from('UserSubscription')
                .delete()
                .eq('id', id)
                .eq('userId', user.id)
            if (error) throw error
        }
    },
    service: {
        getAll: async () => {
            const supabase = createServerClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_KEY!,
                { cookies: { getAll() { return [] }, setAll() {} } }
            )
            const { data, error } = await supabase.from('Service').select('*')
            if (error) throw error
            return data
        }
    },
    billingCycle: {
        getAll: async () => {
            const supabase = createServerClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_KEY!,
                { cookies: { getAll() { return [] }, setAll() {} } }
            )
            const { data, error } = await supabase.from('BillingCycle').select('*')
            if (error) throw error
            return data
        }
    },
    category: {
        getAll: async (request: NextRequest) => {
            const supabase = createClientFromRequest(request)
            const { data: { user }, error: authError } = await supabase.auth.getUser()
            if (authError || !user) throw new Error('Not authenticated')
            
            const { data, error } = await supabase.from('Category').select('*').eq('userId', user.id)
            if (error) throw error
            return data
        },
        create: async (request: NextRequest, name: string) => {
            const supabase = createClientFromRequest(request)
            const { data: { user }, error: authError } = await supabase.auth.getUser()
            if (authError || !user) throw new Error('Not authenticated')
            
            const { data, error } = await supabase.from('Category').insert({ userId: user.id, name }).select()
            if (error) throw error
            return data
        }
    }
};