import { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from "../Pages/Login"
import Post from "../Pages/Post"
import Signup from '../Pages/Signup';
import GlobalContext from "../context/GlobalContext";
import axios from "axios"
import { serverURL } from "../../config";
import Home from "../Pages/Home";
axios.defaults.withCredentials = true;

export default function AppRouter() {
    const { user, setUser } = useContext(GlobalContext);

    const getProfile = async () => {
        try {
            const user = await axios.get(`${serverURL}/profile`)
            setUser(user.data.user);
        } catch (err) {
            setUser(false)
        }
    }

    useEffect(() => {
        getProfile()
        console.log('user',)

    }, [])




    return (
        <Router>
            <Routes>

                {user ?
                    <>
                        <Route element={<Home />} path="/" exact />
                        <Route element={<Post />} path="/post" />
                    </>
                    :
                    <>
                        <Route element={<Login />} path="/" exact />
                        <Route element={<Post />} path="/post" />
                        <Route element={<Signup />} path="/signup" />
                    </>
                }

            </Routes>
        </Router>
    )
}