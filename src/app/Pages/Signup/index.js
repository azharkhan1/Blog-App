import React, { useState } from 'react';
import "./signup.css";
import TextField from "../../components/TextField";
import Button from "../../components/Button"
import DrawerMenu from "../../components/DrawerMenu";
import axios from 'axios';
import { serverURL } from "../../../config/index";
function Signup(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit')
        setLoading(true);
        // here api call
        try {
            const response = await axios.post(`${serverURL}/auth/signup`, {
                name, email, password
            })
            alert("Signed up successfully");
        } catch (err) {
            if (err.response.data) {
                alert(err.response.data.message)
            } else {
                alert("some error occured")
            }
        }
    }

    return (
        <DrawerMenu>
            <div className="main">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className='input-container'>
                            <TextField placeholder="name" label="name" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className='input-container'>
                            <TextField placeholder="Email" label="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='input-container'>
                            <TextField placeholder="Password" label="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className='input-container'>
                            <Button text={"Submit"} type="submit" />
                        </div>
                    </div>
                </form>
            </div>
        </DrawerMenu>
    );
}

export default Signup;