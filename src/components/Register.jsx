import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Register = () => {
    //const [email, setEmail] = useState("valeria.bowers@uao.edu.co");
    //const [password, setPasword] = useState("123456");
    const { registerUser } = useContext(UserContext);
    const navegate = useNavigate();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();

    const onSubmit=async({email, password})=>{
        console.log("Procesando formulario--->_ ", email, password);
        try {
            await registerUser(email, password)

        } catch (error) {
            console.log(error.code);

        }
    }

    /*const handleSubmit = async (e) => {
        e.preventDefault();//previene recargar  todo el sitio
        console.log("enviando datos: ", email, " ", password)
        try {
            await registerUser(email, password)

        } catch (error) {
            console.log(error.code);

        }

    }*/

    return (

        <>
            <div>Register</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    name=""
                    id=""
                    placeholder='email'

                    {...register(
                        "email", {
                        required: {
                            value: true,
                            message: "El campo es obligatorio"
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Formato de email incorrecto"
                        }
                    }
                    )}
                    //value={email}
                    /*onChange={(e) => setEmail(e.target.value)}*/ />

                {errors.email && <p>{errors.email.message}</p>}
                <input
                    type="password"
                    name=""
                    id=""
                    placeholder='password'

                    {...register(
                        "password", {
                        required: {
                            value: true,
                            message: "La contraseña es obligatoria"
                        },
                        minLength: {
                            value: 8,
                            message: "La contraseña debe tener al menos 8 caracteres"
                        }
                    }
                    )}
                    //value={password}
                    /*onChange={(e) => setPasword(e.target.value)}*/ />

                <input
                    type="password"
                    name=""
                    id=""
                    placeholder='password'

                    {...register(
                        "password2", {
                            required: "La contraseña es obligatoria",
                            validate: {
                                equals:(v)=>{v== getValues("password")||"No coincide la contraseña"}
                            },
                        }
                    )}
                    //value={password}
                    /*onChange={(e) => setPasword(e.target.value)}*/ />
                {errors.password2 && <p>{errors.password2.message}</p>}
                <button type="submit">Enviar</button>
            </form>
        </>

    )
}

export default Register