import { useEffect, useRef, useState } from "react"
import imagePlaceholder from "../../public/placeholder.png"
import Image from "next/image"

export default function CreateSubscriptionModal({ subsModal } : {subsModal: boolean}) {

    const [ name, setName ] =useState('')
    const [ cost, setCost ] = useState('0')
    const [ period, setPeriod ] = useState("mensual")
    const [ startPay, setStartPay ] = useState('')
    const [ endPay, setEndPay ] = useState('')
    const [ notification, setNotification ] = useState("mail")
    const [ category, setCategory ] = useState('redes')
    const [ isOpen, setIsOpen ] = useState(true)

    useEffect(() => {
        function changeOpen() {
            setIsOpen(!isOpen)
        }
        changeOpen()
    }, [subsModal])


    function save() {
        console.log(
            '[name] ', name, '\n',
            '[precio] ', cost, '\n',
            '[tipo]', period, '\n',
            '[empieza]', startPay, '\n',
            '[termina]',endPay, '\n',
            '[notificacion]',notification, '\n',
            '[categoria]',category, '\n',
        )

    }
    return (
    <div className={`
    ${isOpen ? "" : "hidden"}
    fixed inset-0 z-50 backdrop-blur-xs bg-black/10 flex flex-col justify-center items-center`}>
        <div className="bg-card w-2/5 flex flex-col items-center px-4 pt-4 rounded-lg">
            <span
            onClick={() => {setIsOpen(!isOpen)}}
            className="
            *:w-6
            ml-auto
            p-2
            hover:cursor-pointer
            "
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></span>
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
                <input
                onChange={(e) => {setName(e.target.value)}}
                type="text" placeholder="Netflix" />
            </div>
            <span className="font-semibold text-primary">{period}</span>
            
            <div className="border-2 rounded-sm [&>div>*:last-child]:ml-auto *:flex m-2 p-3 *:py-1 w-full">
                <div className="flex">
                    <span>coste</span>
                    <input
                    onChange={(e) => {setCost(e.target.value)}}
                    className="text-end w-20" type="number" placeholder="4.33€" />
                </div>
                <hr />
                <div>
                    <span>Tipo de suscripcion</span>
                    <select
                        className="appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[center_right_0.5rem] pr-8"
                        value={period} 
                        onChange={(e) => setPeriod(e.target.value)}
                    >
                        <option value="diario">diario</option>
                        <option value="mensual" defaultChecked>mensual</option>
                        <option value="semanal">semanal</option>
                        <option value="anual">anual</option>
                    </select>
                </div>
                <hr />
                <div>
                    <span>¿Cuando empiezas a pagar?</span>
                    <input
                    onChange={(e) => {setStartPay(e.target.value)}}
                    type="date"/>
                </div>
                <hr />
                <div>
                    <div className="flex flex-col [&>*:last-child]:text-secondary">
                        <span>Cuando terminas de pagar </span>
                        <span>(vacío = indeterminado)</span>
                    </div>
                    <input
                    onChange={(e) => {setEndPay(e.target.value)}}
                    type="date"/>
                </div>
                <hr />
                <div>
                    <span>Notificaciones</span>
                    <select
                    className="appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[center_right_0.5rem] pr-8"
                    value={notification} onChange={(e) => setNotification(e.target.value)}>
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
                    <select
                    onChange={(e) => {setCategory(e.target.value)}}
                    className="appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[center_right_0.5rem] pr-8">
                        <option value="Redes">Redes</option>
                    </select>
                </span>
            </div>
            <div className="w-full *:w-full mb-4">
                <button
                className="p-4 px-6 bg-primary rounded-sm text-xl font-semibold hover:cursor-pointer active:brightness-75 active:scale-95 active:translate-y-0.5"
                onClick={() => {save()}}
                >guardar</button>
            </div>
        </div>
    </div>
    )
}