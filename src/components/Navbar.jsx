import { UserContext } from "../context/UserProvider"
import { NavLink } from "react-router-dom"
import { useContext } from "react"

const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);
    const handleClicklogOut = async () => {
        try {
            await signOutUser();

        } catch (error) {
            console.log("error en cerrrar sesión: ", error.code)

        }
    }
    return (
        <>
            <div>
                {
                    user ? (
                        <>
                            <NavLink to='/'>| Inicio |</NavLink>
                            <button onClick={handleClicklogOut}>| Logout |</button>
                        </>

                    ) :
                        (<>
                            <NavLink to="/login">| Login |</NavLink>
                            <NavLink to="/register" >| Register |</NavLink>
                        </>

                        )
                }
            </div>
        </>
    )
}

export default Navbar