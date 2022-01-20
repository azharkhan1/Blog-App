import React from 'react';
import "./signup.css";
import TextField from "../../components/TextField";
import Button from "../../components/Button"
function Signup(props) {
    return (
        <div className="main">
         <h2>Signup</h2>

         <div className="form-container">
             <div className='input-container'>
                 <TextField placeholder="Email" label="email"/>
             </div>
             <div className='input-container'>
                 <TextField placeholder="Password" label="password"/>
             </div>
             <div className='input-container'>

            <Button  text={"Submit"}/>
             </div>
         </div>
        </div>
    );
}

export default Signup;