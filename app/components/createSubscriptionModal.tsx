import { useEffect, useState } from "react"
import imagePlaceholder from "../../public/placeholder.png"
import Image from "next/image"

interface Service {
    id: string
    name: string
    logo: string
}

interface BillingCycle {
    id: string
    name: string
    days: string
}

interface Category {
    id: string
    name: string
}

interface CreateSubscriptionModalProps {
    subsModal: boolean
    onSaved?: () => void
}

export default function CreateSubscriptionModal({ subsModal, onSaved }: CreateSubscriptionModalProps) {
    const [name, setName] = useState('')
    const [cost, setCost] = useState('')
    const [period, setPeriod] = useState('mensual')
    const [startPay, setStartPay] = useState('')
    const [endPay, setEndPay] = useState('')
    const [notification, setNotification] = useState('mail')
    const [category, setCategory] = useState('')
    const [isOpen, setIsOpen] = useState(true)
    
    const [serviceId, setServiceId] = useState('')
    const [billingId, setBillingId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    
    const [services, setServices] = useState<Service[]>([])
    const [billingCycles, setBillingCycles] = useState<BillingCycle[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        setIsOpen(subsModal)
    }, [subsModal])

    useEffect(() => {
        async function loadOptions() {
            try {
                const res = await fetch('/api/options', { credentials: 'include' })
                const json = await res.json()
                if (json.data) {
                    setServices(json.data.services || [])
                    setBillingCycles(json.data.billingCycles || [])
                    setCategories(json.data.categories || [])
                }
            } catch (error) {
                console.error('Error loading options:', error)
            }
        }
        if (isOpen) {
            loadOptions()
        }
    }, [isOpen])

    async function save() {
        const data = {
            serviceId: serviceId || null,
            billingId: billingId || null,
            categoryId: categoryId || null,
            price: Number(cost) || 0,
            startDate: startPay || null,
            cancelDate: endPay || null,
            name: name || null
        }

        try {
            const res = await fetch('/api/subscription/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            const json = await res.json()
            if (res.ok && json.data) {
                onSaved?.()
            } else if (json.error) {
                alert('Error: ' + json.error)
            }
        } catch (error) {
            console.error('Error saving:', error)
            alert('Error saving subscription')
        }
    }

    async function createCategory() {
        if (!categoryName.trim()) return
        try {
            const res = await fetch('/api/options/category', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: categoryName }),
                credentials: 'include'
            })
            const json = await res.json()
            if (json.data) {
                setCategories([...categories, json.data[0]])
                setCategoryId(json.data[0].id)
                setCategoryName('')
            }
        } catch (error) {
            console.error('Error creating category:', error)
        }
    }

    return (
        <div className={`${isOpen ? "" : "hidden"} fixed inset-0 z-50 backdrop-blur-xs bg-black/10 flex flex-col justify-center items-center`}>
            <div className="bg-card w-2/5 flex flex-col items-center px-4 pt-4 rounded-lg">
                <span onClick={() => setIsOpen(false)} className="*:w-6 ml-auto p-2 hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </span>
                
                <Image className="rounded-full" src={imagePlaceholder.src} width={170} height={170} alt="image" />
                
                <div className="flex flex-row text-3xl pt-2 *:text-center *:font-semibold">
                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Netflix" />
                </div>
                <span className="font-semibold text-primary">{period}</span>
                
                <div className="border-2 rounded-sm [&>div>*:last-child]:ml-auto *:flex m-2 p-3 *:py-1 w-full">
                    <div className="flex">
                        <span>coste</span>
                        <input onChange={(e) => setCost(e.target.value)} className="text-end w-20" type="number" placeholder="4.33€" />
                    </div>
                    <hr />
                    <div>
                        <span>Tipo de suscripcion</span>
                        <select className="appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[center_right_0.5rem] pr-8" value={period} onChange={(e) => setPeriod(e.target.value)}>
                            <option value="diario">diario</option>
                            <option value="mensual">mensual</option>
                            <option value="semanal">semanal</option>
                            <option value="anual">anual</option>
                        </select>
                    </div>
                    <hr />
                    <div>
                        <span>Servicio</span>
                        <select className="appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[center_right_0.5rem] pr-8" value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
                            <option value="">Seleccionar...</option>
                            {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                    <hr />
                    <div>
                        <span>¿Cuando empiezas a pagar?</span>
                        <input onChange={(e) => setStartPay(e.target.value)} type="date"/>
                    </div>
                    <hr />
                    <div>
                        <div className="flex flex-col [&>*:last-child]:text-secondary">
                            <span>Cuando terminas de pagar</span>
                            <span>(vacío = indeterminado)</span>
                        </div>
                        <input onChange={(e) => setEndPay(e.target.value)} type="date"/>
                    </div>
                    <hr />
                    <div>
                        <span>Notificaciones</span>
                        <select className="appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[center_right_0.5rem] pr-8" value={notification} onChange={(e) => setNotification(e.target.value)}>
                            <option value="mail">correo</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-row w-full px-4 border-2 rounded-sm m-2 mb-4 p-3">
                    <span className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-tag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.172 2a3 3 0 0 1 2.121 .879l7.71 7.71a3.41 3.41 0 0 1 0 4.822l-5.592 5.592a3.41 3.41 0 0 1 -4.822 0l-7.71 -7.71a3 3 0 0 1 -.879 -2.121v-5.172a4 4 0 0 1 4 -4z" /></svg>
                        <span>Categoria</span>
                    </span>
                    <div className="flex items-center justify-end gap-2 ml-auto">
                        <div className="rounded-full w-2 h-2 bg-red-500"/>
                        <input type="text" placeholder="Nueva" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="w-20" />
                        <button onClick={createCategory} className="text-xs">+</button>
                        <select className="appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[center_right_0.5rem] pr-8" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                            <option value="">Seleccionar...</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="w-full *:w-full mb-4">
                    <button className="p-4 px-6 bg-primary rounded-sm text-xl font-semibold hover:cursor-pointer active:brightness-75 active:scale-95 active:translate-y-0.5" onClick={save}>guardar</button>
                </div>
            </div>
        </div>
    )
}