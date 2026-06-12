
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { RegisterPage } from "./pages/auth/register.page"
import { HomePage } from "./pages/music/home.page.jsx"



export function App(){
    return (
        <Router>
            <Routes>
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/' element={<HomePage />} />
            </Routes>
        </Router>
    )
}