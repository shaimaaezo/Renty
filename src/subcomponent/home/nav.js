import {NavLink} from 'react-router-dom'
import '../../component/Home/MainHome.css'
import logo from '../../imgs/logo2.png'
import seclogo from '../../imgs/logo.png'
import notification from '../../imgs/ring-notification2.svg'
import userProfile from '../../imgs/user-profile.svg'

const Navbar = (props) => {
console.log(props.userID)
    return (

        <header className="header">
        <nav className="navbar navbar-expand-lg fixed-top py-3">
            <div className="container"><NavLink to="/" className="navbar-brand"><img src={logo} className="nav-logo mr-1" alt="Renty logo"/><img src={seclogo} className="nav-logo2 mr-1" alt="Renty logo"/>Renty</NavLink>
                <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right"><i className="fa fa-bars"></i></button>
    
                <div id="navbarSupportedContent" className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
    
                        <li className="nav-item">
                          <div className="dropdown">
                            <button className="btn dropdown-toggle p-0 pl-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <img src={notification} className="home-notification-img" alt="" />
                            </button>
                            <div className="dropdown-menu  notification-dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <NavLink className="dropdown-item" to="#">Action</NavLink>
                              
                            </div>
                          </div>
                        </li>
                        <li className="nav-item">
                          <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <img src={userProfile} className="home-nav-dropdown-img" alt="" /></button>
                            <div className="dropdown-menu profile-dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <NavLink className="dropdown-item" to={`/home/${props.userID}`}>Home</NavLink>
                              <div className="dropdown-divider"></div>
                              <NavLink className="dropdown-item" to="/login">Log Out</NavLink>
                            </div>
                          </div>
                        </li>
    
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    );
}

export default Navbar;
/*<NavLink className="dropdown-item" to="#">Another action</NavLink>
                              <NavLink className="dropdown-item" to="#">Something else here</NavLink>*/