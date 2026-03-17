"use client"

import { useEffect, useState } from "react"
import { type subscription } from "../lib/subscription"
import { subs } from "../lib/data/subscriptions"

export default function Aside({ isOpen, setAsideOpen }){

    const [ subscriptionsList ] = useState<subscription[]>(subs)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        function isVisible(){
            if (isOpen) {
                // Pequeño delay para que primero se renderice, luego animas
                setTimeout(() => setIsVisible(true), 100)
            } else {
                setIsVisible(false)
            }
        }
        isVisible()
    }, [isOpen])

    function getTextColor(hexColor: string): string {
        // Quitar el # si existe
        const hex = hexColor.replace('#', '')
        
        // Convertir a RGB
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        
        // Calcular luminosidad (fórmula W3C)
        const luminosity = (r * 299 + g * 587 + b * 114) / 1000
        
        // Si > 128 es claro, si < 128 es oscuro
        return luminosity > 128 ? '#1e1b18' : '#e7e5e4'
    }
    return (
        <>
            <div className={`
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                transition-transform
                duration-400
                fixed
                left-0
                top-0
                z-20 
                bg-card 
                h-[calc(100vh)]
                w-76
                flex
                flex-col
                `}>
                <div className="
                [&>*:first-child]:justify-end
                ">
                    <div className="
                        flex
                        flex-row
                        *:pt-8
                        *:pb-4
                        gap-2
                        ">
                        <h1 className="font-bold text-primary text-3xl text-center pt-8 pb-4">Suscripciones</h1>
                        <button 
                        onClick={() => {setAsideOpen(!isOpen)}}
                        className="
                        [&>svg]:w-8
                        [&>svg]:mr-6
                        [&>svg]:cursor-pointer
                        ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="h-0.5 bg-input mx-4 mb-6"></div>
                    {subscriptionsList.map((subscription, id) => (
                        <div key={id}
                        style={{
                            backgroundColor: subscription.color,
                            color: getTextColor(subscription.color)
                            }}
                            className={`flex flex-row justify-between p-2 py-4 m-2 rounded-sm [&>svg]:w-8 transition-all duration-300
                            ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
                            [&>svg]:text-white
                            [&>svg]:cursor-pointer
                            [&>span]:font-semibold
                            `}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-info-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                            <span>{subscription.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M11 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M11 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        </div>
                    ))}
                </div>
                <div className="mt-auto">
                    <div className="h-0.5 bg-input mx-4"></div>
                    <div className="
                    flex
                    flex-col
                    mx-8
                    *:gap-4
                    *:bg-transparent
                    *:hover:bg-primary
                    *:transition-colors
                    *:duration-400
                    *:rounded-sm
                    m-4
                    gap-2
                    ">
                        <div className="flex flex-row p-2 py-4 *:cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                            <span>Cerrar sesion</span>
                        </div>
                        <div className="flex flex-row p-2 py-4 *:cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
                            <span>Configuracion</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}