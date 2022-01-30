import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from "../Pages/Login"
import Post from "../Pages/Post"
import Signup from '../Pages/Signup';
import DrawerMenu from "../components/DrawerMenu";



export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route element={<Login />} path="/" exact />
                <Route element={<Signup />} path="/signup" />
                <Route element={<Post />} path="/post" />
            </Routes>
        </Router>
    )
}