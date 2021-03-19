


const Nav = (props)=> {
    
    return ( 
        <nav className="navbar navbar-dark bg-dark">
            <a href="/" className="navbar-brand">Navbar</a>
            <span className="badge badge-primary">{props.len}</span>
        </nav>
     );
}
 
export default Nav