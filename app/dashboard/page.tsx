"use client"

import Header from "../components/header"
import Aside from "../components/aside"
import { useEffect, useState } from "react"
import { type UserSubscription } from "../lib/subscription"
import { DayCard } from "../components/dayCard"
import CreateSubscriptionModal from "../components/createSubscriptionModal"
import { useRouter } from "next/navigation"

type SubscriptionWithRelations = UserSubscription & {
    Service?: { name: string; logo: string }
    Category?: { name: string }
    BillingCycle?: { name: string; days: string }
}

function CircleChart({ subscriptions }: { subscriptions: SubscriptionWithRelations[] }) {
    const totalCost = subscriptions.reduce((sum, s) => sum + (s.price || 0), 0)
    
    const colors = ['#ff1b18', '#1db954', '#113ccf', '#f59e0b', '#8b5cf6', '#ec4899']
    const size = 260
    const strokeWidth = 20
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    
    const gap = 20
    
    const itemsWithSegments = subscriptions.map((sub, idx) => {
        const percentage = totalCost > 0 ? ((sub.price || 0) / totalCost) * 100 : 0
        const dashLength = (percentage / 100) * circumference - gap
        return {
            sub,
            percentage,
            dashLength,
            color: colors[idx % colors.length],
            offset: subscriptions.slice(0, idx).reduce((sum, s) => sum + ((percentage > 0 ? (s.price || 0) / totalCost * 100 / 100 * circumference - gap : 0)), 0)
        }
    })
    
    return (
        <div className="relative w-64 h-64 rounded-full bg-card flex items-center justify-center shadow-lg">
            <svg width={size} height={size} className="absolute -rotate-90">
                {itemsWithSegments.map((item, index) => (
                    <circle
                        key={index}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={item.color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={`${item.dashLength} ${circumference}`}
                        strokeDashoffset={-item.offset}
                        strokeLinecap="round"
                        className="cursor-pointer transition-all hover:opacity-80"
                    />
                ))}
            </svg>
            
            <div className="text-center z-10 cursor-pointer">
                <span className="text-3xl font-bold text-primary">${totalCost.toFixed(2)}</span>
                <p className="text-xs text-gray-400 mt-1">Total mensual</p>
            </div>
        </div>
    )
}

function ViewSubscriptions({ subscriptions, monthView, weekDays }: { subscriptions: SubscriptionWithRelations[], monthView:boolean, weekDays?: number[] }) {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    
    if (monthView) {
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        let firstDayOfMonth = new Date(year, month, 1).getDay() - 1
        if (firstDayOfMonth === -1) firstDayOfMonth = 6
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
        return (
            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {days.map((day) => <DayCard key={day} day={day} />)}
            </div>
        )
    }

    const week = weekDays || []
    return (
        <div className="grid grid-cols-7 gap-1">
            {week.map((day) => (
                <DayCard key={day} day={day} />
            ))}
        </div>
    )
}

export default function Dashboard() {
    const router = useRouter()
    const [asideOpen, setAsideOpen] = useState(false)
    const [monthView, setMonthView] = useState(false)
    const [subscriptionsList, setSubscriptionsList] = useState<SubscriptionWithRelations[]>([])
    const [createSubModal, setCreateSubModal] = useState(false)

    useEffect(() => {
        async function fetchSubscriptions() {
            try {
                const res = await fetch('/api/subscription', { credentials: 'include' })
                if (res.status === 401) {
                    router.push('/')
                    return
                }
                const json = await res.json()
                if (json.data) {
                    console.log(json.data)
                    setSubscriptionsList(json.data)
                }
            } catch (error) {
                console.error('Error fetching subscriptions:', error)
            }
        }
        fetchSubscriptions()
    }, [router])

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
        router.push('/')
    }

    const handleSubscriptionSaved = () => {
        setCreateSubModal(false)
        fetch('/api/subscription', { credentials: 'include' })
            .then(res => res.json())
            .then(json => {
                if (json.data) setSubscriptionsList(json.data)
            })
    }

    const now = new Date()
    const today = now.getDate()
    const firstDayOfWeek = today - (now.getDay() - 1)
    const startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek)
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startDate)
        d.setDate(startDate.getDate() + i)
        return d.getDate()
    })

    return(
        <>
            <CreateSubscriptionModal subsModal={createSubModal} onSaved={handleSubscriptionSaved}/>
            <Header asideOpen={asideOpen} setAsideOpen={setAsideOpen}/>
            <Aside isOpen={asideOpen} setAsideOpen={setAsideOpen} subscriptions={subscriptionsList} onLogout={handleLogout}/>
            <main className="flex flex-col items-center justify-center mt-20 gap-8">
                <CircleChart subscriptions={subscriptionsList} />

                <div>
                    <div className="flex">
                        <button 
                            onClick={() => setMonthView(!monthView)}
                            className="bg-primary p-2 px-5 my-2 rounded-sm font-semibold active:brightness-75 active:scale-95 active:translate-y-0.5">
                            {monthView ? "mensual" : "semanal"}
                        </button>
                        <button 
                            onClick={() => setCreateSubModal(!createSubModal)}
                            className="flex bg-primary p-2 px-5 my-2 rounded-sm font-semibold ml-auto hover:cursor-pointer active:brightness-75 active:scale-95 active:translate-y-0.5">
                            crear sub
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-copy-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" /><path d="M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /><path d="M11 14h6" /><path d="M14 11v6" /></svg>
                        </button>
                    </div>
                    <ViewSubscriptions subscriptions={subscriptionsList} monthView={monthView} weekDays={!monthView ? weekDays : undefined}/>
                </div>
            </main>
        </>
    )
}