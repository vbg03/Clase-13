import { UserContext } from '../context/UserProvider'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'

const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);
    const handleClicklogOut = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.log("error en cerrar sesión: ", error.code)
        }
    }
    return (
        <>
            <div>
                {
                    user ? (
                        <>
                            <NavLink to='/'>| Inicio |</NavLink>
                            <button onClick={handleClicklogOut}>| Log Out |</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">| Login |</NavLink>
                            <NavLink to="/register">| Register |</NavLink>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Navbar