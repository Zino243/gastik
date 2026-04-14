"use client"

import { useState } from "react"
import { ThemeToggle } from "../components/themeToggle"
import { useRouter } from "next/navigation"

export default function Login() {
    const [ changeLogin, setChangeLogin ] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent, action: 'signIn' | 'signUp') {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, action })
            })
            const json = await res.json()
            
            if (json.error) {
                setError(json.error)
            } else {
                if (action === 'signUp') {
                    setError('Check your email to confirm your account!')
                    setChangeLogin(true)
                } else {
                    router.push('/dashboard')
                }
            }
        } catch (err) {
            setError('An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const renderContent = changeLogin ? (
        <div className="flex flex-col w-full min-h-screen items-center justify-center">
            <div className="flex flex-col w-full justify-center bg-card py-25 max-w-2xl p-8 rounded-xl">
                <h1 className="text-primary text-5xl font-bold pb-22 w-full items-start mx-6">Sign In</h1>
                <form onSubmit={(e) => handleSubmit(e, 'signIn')} className="
                [&>input]:bg-secondary
                [&>input]:text-secondary-foreground
                [&>input]:rounded-full
                [&>input]:p-6
                [&>input]:py-4
                [&>input]:mb-8
                [&>input]:mx-8
                flex flex-col">
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com" 
                        required
                    />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="•••••••••" 
                        required
                    />
                    <div className="*:text-input flex w-full px-10 pb-8">
                        <input type="checkbox" name="remember" id="remember" className="w-5 h-5 accent-primary"/>
                        <span className="px-2">Remember me</span>
                        <span className="ml-auto">Forgot Password?</span>
                    </div>
                    {error && <p className="text-red-500 mx-8 mb-4">{error}</p>}
                    <button type="submit" disabled={loading} className="bg-primary p-4 px-8 text-xl rounded-full mx-8 mb-12 disabled:opacity-50">
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
                    <div className="flex items-center gap-4 w-full py-2 pb-8">
                        <div className="h-0.5 bg-input flex-1"></div>
                        <span className="text-input">or</span>
                        <div className="h-0.5 bg-input flex-1"></div>
                    </div>
                    <div className="
                    [&>svg]:w-12
                    [&>svg]:bg-primary
                    [&>svg]:rounded-full
                    [&>svg]:p-2
                    flex
                    flex-row
                    justify-center
                    gap-4
                    pb-6
                    -pt-2
                    ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e7e5e4" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e7e5e4" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" /></svg>
                    </div>
                    <div className="flex justify-center ">
                        <p className="text-secondary px-2">Dont have an account?</p>
                        <button onClick={() => setChangeLogin(false)} className="text-primary">Create new one</button>
                    </div>
            </div>
        </div>
    ) : (
        <div className="flex flex-col w-full min-h-screen items-center justify-center">
            <div className="flex flex-col w-full justify-center bg-card py-25 max-w-2xl p-8 rounded-xl">
                <h1 className="text-primary text-5xl font-bold pb-22 w-full items-start mx-6">Sign Up</h1>
                <form onSubmit={(e) => handleSubmit(e, 'signUp')} className="
                [&>input]:bg-secondary
                [&>input]:text-secondary-foreground
                [&>input]:rounded-full
                [&>input]:p-6
                [&>input]:py-4
                [&>input]:mb-8
                [&>input]:mx-8
                flex flex-col">
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        required
                    />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="•••••••••" 
                        required
                        minLength={6}
                    />
                    <div className="*:text-secondary [&>a]:text-primary flex w-full px-10 pb-8">
                        <input type="checkbox" name="remember" id="remember" className="w-5 h-5 accent-primary"/>
                        <div className="*:px-0.5 [&>a]:text-primary">
                            <span className="m-1">By signning up you accpet the</span>
                            <a href="#">Term of service</a>
                            <span>and</span>
                            <a href="#">Privacy Policy</a>
                        </div>
                    </div>
                    {error && <p className="text-red-500 mx-8 mb-4">{error}</p>}
                    <button type="submit" disabled={loading} className="bg-primary p-4 px-8 text-xl rounded-full mx-8 mb-12 disabled:opacity-50">
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                </form>
                    <div className="flex justify-center ">
                        <p className="text-secondary px-2">Dont have an account?</p>
                        <button onClick={() => setChangeLogin(true)} className="text-primary">Sign In</button>
                    </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            {renderContent}
        </>
    )
}