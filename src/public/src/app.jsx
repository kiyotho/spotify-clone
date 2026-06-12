
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { RegisterPage } from "./pages/auth/register.page"
import { HomePage } from "./pages/music/home.page.jsx"
import { LoginPage } from './pages/auth/login.page.jsx'
import { UploadPage } from './pages/music/upload.page.jsx'


export function App(){
    return (
        <Router>
            <Routes>
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/upload' element={<UploadPage />} />
            </Routes>
        </Router>
    )
}