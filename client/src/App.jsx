import {BrowserRouter,Routes,Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import Login from './pages/Login'

import Board from './pages/Board'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import SharedRead from './Component/SharedRead'

export default function App() {
  return (
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    
    <Route path='/board'element={<Board/>}/>
    <Route path='/analytics' element={<Analytics/>}/>
    <Route path='/settings' element={<Settings/>}/>
    <Route path='/task/:taskId' element={<SharedRead/>}/>
  </Routes>
  </BrowserRouter>
  )
}
