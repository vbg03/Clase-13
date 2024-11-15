/*
Estas líneas importan varios módulos y componentes necesarios para el funcionamiento del componente Login:

useContext y useState son hooks de React.
UserContext es un contexto personalizado para manejar la autenticación del usuario.
useNavigate es un hook de react-router-dom para la navegación.
useForm es un hook de react-hook-form para manejar formularios.
erroresFirebase y formValidate son utilidades personalizadas para manejar errores y validaciones de formularios.
FormError, FormInput, Title y Button son componentes personalizados.
Uso del Contexto:
Aquí se utiliza el hook useContext para acceder a la función loginUser del contexto UserContext, que maneja la autenticación del usuario.
Estado de Carga:

Se define un estado loading para manejar el estado de carga durante el proceso de inicio de sesión.
Navegación:

Se utiliza el hook useNavigate para redirigir al usuario después de un inicio de sesión exitoso.

Se utConfiguración del Formulario:
Se configura el formulario utilizando useForm de react-hook-form.






*/


import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await loginUser(email, password);
      navegate("/");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title text="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Ingresa tu correo"
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          label="Ingresa contraseña"
          type="password"
          placeholder="Ingrese Password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>
        <Button text="Login" type="submit" loading={loading} color="blue" />
      </form>
    </>
  );
};

export default Login;