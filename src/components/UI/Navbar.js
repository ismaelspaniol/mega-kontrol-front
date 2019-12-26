import React from 'react';

const NavBar = (props) => {
    if (!props.isAuthenticated){
        return ("");
    }
    return (
          
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand" href="/"><i className="fas fa-stroopwafel"></i>&nbsp;{props.logo}</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMainToggler"
                aria-controls="navbarMainToggler" aria-expanded="false" atie-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <section className="collapse navbar-collapse" id="navbarMainToggler">
                <div className="navbar-nav ml-auto pr-3">

                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/#" id="navbardrop" data-toggle="dropdown">
                                Empresas
                      </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/empresa-list">ListEmpresa</a>
                                <a className="dropdown-item" href="/create-empresa">CreateEmpresa</a>

                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-item nav-link" href="/pessoas">Pessoas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-item nav-link" href="/backlog">backlog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-item nav-link" href="/empresa-list">Listaempresas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-item nav-link" href="/create-empresa2">CreateEmpesa2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-item nav-link" href="/#">Login</a>
                        </li>
                    </ul>

                </div>

            </section>
        </nav>
    );
};

export default NavBar;