"use client"


import Header from "../components/header"
import Aside from "../components/aside"
import { useState } from "react"
import { type subscription } from "../lib/subscription"
import { DayCard } from "../components/dayCard"


function CircleChart({ subscriptions }: { subscriptions: subscription[] }) {
    const totalCost = subscriptions.reduce((sum, s) => sum + s.cost, 0)
    const size = 260
    const strokeWidth = 20
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    
    const gap = 20
    
    const itemsWithSegments = subscriptions.reduce<{sub: subscription, percentage: number, dashLength: number, offset: number}[]>((acc, sub) => {
        const percentage = (sub.cost / totalCost) * 100
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
                <p className="text-xs text-gray-400 mt-1">Total mensual</p>
            </div>
        </div>
    )
}

function ViewSubscriptions({ subscriptions, monthView }: { subscriptions: subscription[], monthView:boolean }) {

    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const daysInMonth = new Date(year, month, 0).getDate()
    let firstDayOfMonth = new Date(year, month, 1).getDay() -1
    if (firstDayOfMonth == -1){
        firstDayOfMonth = 6 // Domingo
    }

    if (monthView) {
        // Crear array con los días del mes
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
        return (
            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {days.map((day) => {
                    // Encontrar suscripciones de este día
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

    const today = new Date().getDate()
    const dayOfWeek = new Date(year, month,today).getDay()   // esto me da el numero del dia de la semana
                                                                            // ej; dia 17 == 2 que es MARTES
    const firstDayOfWeek = today - (dayOfWeek - 1) // 1 es offset
    const lastDayOfWeek = new Date(year, month, firstDayOfWeek + 6).getDate()
    console.log("[today]: ", today, "\n",
        "[tDayOfWeek]: ", dayOfWeek, "\n",
        "[firstDayOfWeek]: ", firstDayOfWeek, "\n",
        "[lastDayOfWeek]: ", lastDayOfWeek, "\n"
    )
    // const isToday = now.getDate() === day
    const startDate = new Date(year, month, firstDayOfWeek)
    // Iterar 7 días de la semana
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const currentDate = new Date(startDate)
        currentDate.setDate(startDate.getDate() + i)
        return currentDate.getDate() // número del día
    })
    // Renderizar
    return (
        <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day) => {
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
    const [ subscriptionsList ] = useState<subscription[]>([
        {
            name: "netflix",
            // color: "#ffAAaa"
            color : "#1e1b18",
            nextPay:[24],
            cost: 5
        } as subscription,
        {
            name: "prime video",
            nextPay: [1,2],
            color: "#aaff00",
            cost: 3.45
        } as subscription,
        {
            name: "azuza",
            nextPay: [1,18],
            color: "#ffAAaa",
            cost: 7.32
        } as subscription,
    ])

    return(
        <>
            <Header asideOpen={asideOpen} setAsideOpen={setAsideOpen}/>
            <Aside isOpen={asideOpen} setAsideOpen={setAsideOpen}/>
            <main className="flex flex-col items-center justify-center">
                <CircleChart subscriptions={subscriptionsList} />

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
                <ViewSubscriptions subscriptions={subscriptionsList} monthView={monthView}/>
                </div>
            </main>
        </>

    )
}