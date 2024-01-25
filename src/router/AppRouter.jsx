
import { Route, Routes } from 'react-router-dom'
import { App } from '../banco/App'
import { Cliente, Cuenta, ListClientes } from '../pages'

export const AppRouter = () => {
  return (
    <Routes>

        <Route path='/*' element={ <App/> } />
        <Route path="cliente" element={ <Cliente /> } />
        <Route path="Cuenta/:dui" element={ <Cuenta /> } />
        <Route path="listaclientes" element={ <ListClientes /> } />

    </Routes>
  )
}
