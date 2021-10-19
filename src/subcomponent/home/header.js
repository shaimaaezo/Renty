import { Link } from 'react-router-dom'
import '../../component/Home/MainHome.css'

const Header = (props) => {

    /* const goTOhost=()=>{
        if(localStorage.getItem('token')){
            console.log(localStorage.getItem('token'))
            props.props.history.push('/profile/post') 
        }
        else{
            props.props.history.push('/login')
        }
    } */

    console.log(props.props)
    return (
        <div className="main-bg-contect">
            <div className="container">
                <div className="pt-5 text-white">
                    <header className="py-5 mt-5">
                        <h1 className="display-4 mt-5 hidding" data-aos="fade-up">Find Your Perfect Home</h1>
                        <p className="lead mb-2 ml-1 mt-3" style={{color:"white"}} data-aos="fade-up">We Make Search Easy, Renty is the best way to discover and book places to stay.</p>

                        <div className="host-home-btn" data-aos="fade-up">
                            <Link to='/profile/post' className="btn home-post-btn ml-2 mt-3">Host Your Home <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </header>

                </div>
            </div>
        </div>
    );
}

export default Header;
