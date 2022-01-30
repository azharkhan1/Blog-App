import React, { useState } from 'react';
import "./login.css";
import TextField from "../../components/TextField";
import Button from "../../components/Button"
import DrawerMenu from "../../components/DrawerMenu";
function Signup(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        // here api call
    }

    return (
        <DrawerMenu>
            <div className="main">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className='input-container'>
                            <TextField placeholder="Email" label="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='input-container'>
                            <TextField placeholder="Password" label="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className='input-container'>

                            <Button text={"Submit"} />
                        </div>
                    </div>
                </form>
            </div>
        </DrawerMenu>

    );
}

export default Signup;