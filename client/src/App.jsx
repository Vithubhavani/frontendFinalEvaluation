import {BrowserRouter,Routes,Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import Login from './pages/Login'
import HomePage from './pages/HomePage'

export default function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/login' element={<Login/>}/>
  </Routes>
  </BrowserRouter>
  )
}
