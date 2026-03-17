"use client"


import Header from "../components/header"
import Aside from "../components/aside"
import { useState } from "react"
export default function Dashboard() {
    const [asideOpen, setAsideOpen] =useState(false)

    return(
        <>
            <Header asideOpen={asideOpen} setAsideOpen={setAsideOpen}/>
            <Aside isOpen={asideOpen} setAsideOpen={setAsideOpen}/>
        </>

    )
}