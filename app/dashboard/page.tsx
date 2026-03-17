"use client"


import Header from "../components/header"
import Aside from "../components/aside"
import { useState } from "react"
import { type subscription } from "../lib/subscription"
import { DayCard } from "../components/dayCard"
import { subs } from "../lib/data/subscriptions"

function CircleChart({ subscriptions, weekDays }: { subscriptions: subscription[], weekDays?: number[] }) {
    const filteredSubs = weekDays 
        ? subscriptions.filter(sub => sub.nextPay.some(day => weekDays.includes(day)))
        : subscriptions
    
    const totalCost = filteredSubs.reduce((sum, s) => sum + s.cost, 0)
    
    const label = weekDays ? "Total semanal" : "Total mensual"
    const size = 260
    const strokeWidth = 20
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    
    const gap = 20
    
    const itemsWithSegments = filteredSubs.reduce<{sub: subscription, percentage: number, dashLength: number, offset: number}[]>((acc, sub) => {
        const percentage = totalCost > 0 ? (sub.cost / totalCost) * 100 : 0
        const dashLength = (percentage / 100) * circumference - gap
        const offset = acc.reduce((sum, item) => sum + item.dashLength + gap, 0)
        acc.push({ sub, percentage, dashLength, offset })
        return acc
    }, [])
    
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
                        stroke={item.sub.color}
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
                <p className="text-xs text-gray-400 mt-1">{label}</p>
            </div>
        </div>
    )
}

function ViewSubscriptions({ subscriptions, monthView, weekDays }: { subscriptions: subscription[], monthView:boolean, weekDays?: number[] }) {

    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    
    if (monthView) {
        const daysInMonth = new Date(year, month, 0).getDate()
        let firstDayOfMonth = new Date(year, month, 1).getDay() -1
        if (firstDayOfMonth == -1){
            firstDayOfMonth = 6 // Domingo
        }
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
        return (
            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {days.map((day) => {
                    const subsOnDay = subscriptions.filter(sub => 
                        sub.nextPay.includes(day)
                    )
                    
                    return (
                        <DayCard 
                            key={day} 
                            day={day} 
                            subscriptions={subsOnDay} 
                        />
                    )
                })}
            </div>
        )
    }

    const week = weekDays || []
    return (
        <div className="grid grid-cols-7 gap-1">
            {week.map((day) => {
                const subsOnDay = subscriptions.filter(sub => 
                    sub.nextPay.includes(day)
                )
                return (
                    <DayCard key={day} day={day} subscriptions={subsOnDay} />
                )
            })}
        </div>
    )
}

export default function Dashboard() {
    
    const [asideOpen, setAsideOpen] =useState(false)
    const [monthView, setMonthView] = useState(false) // true == month false == week
    const [ subscriptionsList ] = useState<subscription[]>(subs)

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
            <Header asideOpen={asideOpen} setAsideOpen={setAsideOpen}/>
            <Aside isOpen={asideOpen} setAsideOpen={setAsideOpen}/>
            <main className="flex flex-col items-center justify-center">
                <CircleChart subscriptions={subscriptionsList} weekDays={!monthView ? weekDays : undefined} />

                <div>
                    <div className="flex">
                        <button 
                            onClick={() => {
                                setMonthView(!monthView)
                            }}
                            className="bg-primary p-2 px-5 my-2 rounded-sm font-semibold">
                                {monthView? "menusal" : "semanal"}
                        </button>
                        <button 
                            onClick={() => {setMonthView(!monthView)}}
                            className="flex bg-primary p-2 px-5 my-2 rounded-sm font-semibold ml-auto">
                                crear sub
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-copy-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" /><path d="M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /><path d="M11 14h6" /><path d="M14 11v6" /></svg>
                                </span>
                        </button>
                    </div>
                <ViewSubscriptions subscriptions={subscriptionsList} monthView={monthView} weekDays={!monthView ? weekDays : undefined}/>
                </div>
            </main>
        </>

    )
}