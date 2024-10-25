import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("valeriabowers123@gmail.com");
    const [password, setPassword] = useState("12345678");
    const { loginUser } = useContext(UserContext);
    const navega = useNavigate();

    const handleSubmitLogin = async(e)=>{
        e.preventDefault();
        try {
            await loginUser(email, password)
            console.log("usuario logueado")
        } catch (error) {
            console.log(error.code)
        }
    }

    return (
        <>
            <div><h1>Login</h1></div>
            <form onSubmit={handleSubmitLogin}>
                <input type="email" name='' id='' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="" id="" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login