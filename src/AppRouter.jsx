import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { FormularioAgenda } from './components/FormularioAgenda'
import { TablaAgenda } from './components/TablaAgenda'
import { AgendaContacto } from './components/AgendaContacto'
import { MostrarPorLetra } from './components/MostrarPorLetra'
import { Navbar } from './components/Navbar'

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<AgendaContacto/>}/>
            <Route path="/:letra" element={<MostrarPorLetra/>}/>
            <Route path="/agregar" element={<FormularioAgenda/>}/>
            <Route path="/grilla/" element={<TablaAgenda/>}/>

        </Routes>
    </BrowserRouter>
  )
}
