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

    const classButtonBlue = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    const classButtonRed = "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {
                        user ? (
                            <>
                                <NavLink to='/' className="flex item-center">| Inicio |</NavLink>
                                <button onClick={handleClicklogOut} className={classButtonBlue}>| Logout |</button>
                            </>

                        ) :
                            (<>
                                <NavLink to="/login" className={classButtonBlue}>| Login |</NavLink>
                                <NavLink to="/register" className={classButtonRed}>| Register |</NavLink>
                            </>

                            )
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar