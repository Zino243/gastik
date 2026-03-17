import { useRef, useState } from "react"
import imagePlaceholder from "../../public/placeholder.png"
import Image from "next/image"

export default function CreateSubscriptionModal() {

    const [ period, setPeriod ] = useState("mensual")
    const [ notification, setNotification ] = useState("mail")
    return (
    <div className="fixed inset-0 z-50 backdrop-blur-xs bg-black/10 flex flex-col justify-center items-center">
        <div className="bg-card w-2/4 flex flex-col items-center px-4 pt-4 rounded-lg">
            <span
            className="
            *:w-6
            ml-auto
            p-2
            "
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></span>
            <Image
            className="rounded-full"
            src={imagePlaceholder.src}
            width={170}
            height={170}
            alt="image"
            />
            <div
            className="
            flex flex-row
            text-3xl
            pt-2 
            *:text-center
            *:font-semibold
            "
            >
                <input type="text" placeholder="Netflix" />
            </div>
            <span className="font-semibold text-primary">mensual</span>
            
            <div className="border-2 rounded-sm [&>div>*:last-child]:ml-auto *:flex m-2 p-3 *:py-1 w-full">
                <div className="flex">
                    <span>coste</span>
                    <input className="text-end w-20" type="number" placeholder="4.33€" />
                </div>
                <hr />
                <div>
                    <span>Tipo de suscripcion</span>
                    <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                        <option value="diario">diario</option>
                        <option value="mensual">mensual</option>
                        <option value="semanal">semanal</option>
                        <option value="anual">anual</option>
                    </select>
                </div>
                <hr />
                <div>
                    <span>¿Cuando empiezas a pagar?</span>
                    <input type="date"/>
                </div>
                <hr />
                <div>
                    <div className="flex flex-col [&>*:last-child]:text-secondary">
                        <span>Cuando terminas de pagar </span>
                        <span>(vacío = indeterminado)</span>
                    </div>
                    <input type="date"/>
                </div>
                <hr />
                <div>
                    <span>Notificaciones</span>
                    <select value={notification} onChange={(e) => setNotification(e.target.value)}>
                        <option value="mail">correo</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-row w-full px-4 border-2 rounded-sm m-2 mb-4 p-3">
                <span className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-tag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.172 2a3 3 0 0 1 2.121 .879l7.71 7.71a3.41 3.41 0 0 1 0 4.822l-5.592 5.592a3.41 3.41 0 0 1 -4.822 0l-7.71 -7.71a3 3 0 0 1 -.879 -2.121v-5.172a4 4 0 0 1 4 -4zm-3.672 3.5a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2" /></svg>
                    <span>Categoria</span>
                </span>
                <span className="flex items-center justify-end gap-2 ml-auto">
                    <div className="rounded-full w-2 h-2 bg-red-500"/>
                    <span>Redes</span>
                </span>
            </div>
        </div>
    </div>
    )
}