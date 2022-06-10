import { Link, NavLink } from 'react-router-dom';


export const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Agenda Contacto
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink 
                        className={() => 'nav-item nav-link'}
                        to="/agregar"
                    >
                        Formulario Agenda
                    </NavLink>
                    <NavLink 
                        className={() => 'nav-item nav-link'}
                        to="/grilla"
                    >
                        Tabla Agenda
                    </NavLink>                                     
                </div>
            </div>
        </nav>
    )
}