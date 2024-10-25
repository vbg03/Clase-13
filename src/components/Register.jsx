import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'

const Register = () => {
    const [email, setEmail] = useState("valeria.bowers@uao.edu.co");
    const [password, setPasword] = useState("123456");
    const { registerUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();//previene recargar  todo el sitio
        console.log("enviando datos: ", email, " ", password)
        try {
            await registerUser(email, password)

        } catch (error) {
            console.log(error.code);

        }



    }

    return (

        <>
            <div>Register</div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="" id="" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="" id="" placeholder='password' value={password} onChange={(e) => setPasword(e.target.value)} />
                <button type="submit">Enviar</button>
            </form>
        </>

    )
}

export default Register