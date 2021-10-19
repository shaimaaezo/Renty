import React, { Component } from 'react';
import './index.css'
import logoo from "../../imgs/logo2.png"
import userIcon from "../../imgs/user-icon.png"
import hero from '../../imgs/herobanner2.jpg'
import loc from '../../imgs/locations.svg'
import list from '../../imgs/list.svg'
import search from '../../imgs/search.png'
import invest from '../../imgs/invest.png'
import { Link } from 'react-router-dom';
import $ from 'jquery'
import logo from '../../imgs/logo.png'
import user from '../../imgs/user-icon2.png'
import userI from '../../imgs/user-icon.png'
import axios from '../../axiosConfig/axios'


class Index extends Component {
    state = {
        location:"",
        result:[],
        posts:[],
        anyPosts: ""
    }

    componentDidMount = () => {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 5) {
                $('.on-stick-nav').addClass("fixed-top");
                $('.navbar .navbar-brand img').attr('src', logo);
                $('.nav-dropdown-btn img').attr('src', user);
            } else {
                $('.on-stick-nav').removeClass("fixed-top");
                $('.navbar .navbar-brand img').attr('src', logoo);
                $('.nav-dropdown-btn img').attr('src', userI);
            }
        });

    }


 /*    search=(e)=>{
        e.preventDefault();
        const data ={
            location:this.state.location
        }
        console.log(loc)
        axios.post("/post/all/search", data ).then(res=>{
            console.log(res.data)
            const getData = []
                for (let key in res.data) {
                    getData.push(
                        getData[key] = res.data[key]
                    )
                }
                this.setState({ result: getData }) 
            this.setState({result: res.data})
            console.log(this.state.result)

            this.setState({posts: this.state.result['foundPosts']})
            console.log(this.state.posts)
            
            this.setState({anyPosts:this.state.posts[0]._id})
            const data= "id"
            this.state.posts.map(post=>(
                console.log(post._id)
            ))
        
        })
        
    } */

    //api search
    handelLocation = e => {

        const location = e.target.value
        console.log(location)
        this.setState({ location })
    }


    render() {
        
        return (
            <>
                <header className="sticky-wrapper">
                    <nav className="navbar navbar-expand-lg on-stick-nav">
                        <div className="navbar-brand ml-5"><img src={logoo} className="nav-logo" alt="Renty logo" />
                            <span className="tittle">Renty.</span>
                        </div>
                        <div className="navbar-nocollapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto"></ul>
                            <div className="form-inline dropdown-btn  mr-5 my-2 my-lg-0">
                                <div className="dropdown">
                                    <button className="nav-dropdown-btn btn btn-outline-default dropdown-toggle my-2 my-sm-0" type="button" data-toggle="dropdown"><i className="fas fa-bars nav-btn-bars"></i> <img src={userIcon} className="nav-dropdown-img" /></button>
                                    <div className="nav-dropdown-menu dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Link className="dropdown-item" to="/home">Home</Link>
                                        <Link className="dropdown-item" to="#">Contact Us</Link>
                                        <Link className="dropdown-item" to="/login">Sign up/login</Link>
                                        {/*<a className="dropdown-item" href="#">Help</a>
 */}                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                <div className="site-blocks-cover" id="home-section" >
                    <div className="content">
                        <h1 data-aos="fade-up">Rent Or Host Real Appartment</h1>
                        <p data-aos="fade-up">BROWSE TO FIND YOUR PERFECT PLACE TO STAY.</p>

                        <div className="header text-center header-form fade-first" data-aos="fade-up" >
                            <form>
                                <div className="row align-items-center">
                                    <div className="col-lg-12 col-xl-4 no-sm-border border-right">
                                        <input type="text" className="form-control header-input" placeholder="What are you looking for?" />
                                    </div>
                                    <div className="col-lg-12 col-xl-3 no-sm-border border-right">
                                        <div className="wrap-icon">
                                            <span className="icon icon-room">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </span>
                                            <input type="text" className="form-control header-input" placeholder="Location" name="location" 
                                                defaultValue={this.state.location} onChange={this.handelLocation}
                                            />
                                        </div>

                                    </div>
                                    <div className="col-lg-12 col-xl-3">
                                        <div className="select-wrap">
                                            <span className="icon"><span className="icon-keyboard_arrow_down"></span></span>
                                            <select className="form-control header-input" style={{ border: "1px solid white" }} >
                                                <option value="">All Categories</option>
                                                <option value="">Entire Property</option>
                                                <option value="">Single Room</option>
                                                <option value="">Shared Room</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-xl-2 ml-auto text-right">
                                        <button className="login-btn btn btn-default"><Link to={`/home/?search=${this.state.location}`}>Search</Link></button>
                                         
                                       
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>



                <div className="container mt-5"  >
                    <div className="row mb-5">
                        <div className="col-12 text-center" data-aos="fade-up">
                            <h2 className="content-tittle mt-5">How It Works</h2>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">

                        <div className="col-lg-4 text-center" data-aos="fade-up">
                            <i className="bi bi-box-arrow-in-right icon-works"></i>
                            <h3 className="mt-4">Sign up</h3>
                            <p>If you're a new to Renty, you can sign up for free to show more offers.</p>
                        </div>
                        <div className="col-lg-4 text-center fade-first" data-aos="fade-up">
                            <i className="bi bi-house-door icon-works"></i>
                            <h3 className="mt-4">Find Property.</h3>
                            <p>Let real guest reviews help you find the right fit,then book right on Renty.</p>
                        </div>
                        <div className="col-lg-4 text-center fade-next" data-aos="fade-up">
                            <i className="bi bi-cash-stack icon-works"></i>
                            <h3 className="mt-4">Make Investment.</h3>
                            <p>Now you can make money by hosting your home, Once a guest checks in.</p>
                        </div>

                    </div>
                </div>



                <div className="container-fluid banner-wrapper" >
                    <div className="hero-banner">
                        <div className="container">
                            <div className="row no-gutters align-items-center pt-5">
                                <div className="col-5 d-none d-sm-block">
                                    <div className="hero-banner-img">
                                        <img className="img-fluid" src={hero} />
                                    </div>
                                </div>
                                <div className="banner-content-wrapper col-sm-7 col-lg-6 offset-lg-1 pl-4 pl-md-5 pl-lg-0" data-aos="fade-up">
                                    <div className="hero-banner-content">
                                        <h3>We Are Offering For You</h3>
                                        <p className="mb-5">Renty offers all types of spaces all over the world. You can stay with a host or book a place of your own.</p>
                                        <div className="row mb-4">
                                            <div className="col-2">
                                                <div className="banner-img-sec">
                                                    <img src={loc} />
                                                </div>
                                            </div>
                                            <div className="col-10">
                                                <div className="banner-content-sec">
                                                    <h4>Great Places To Live In</h4>
                                                    <p>our hosts are all about the things that make you feel welcome wherever you go.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-2">
                                                <div className="banner-img-sec">
                                                    <img src={list} />
                                                </div>
                                            </div>
                                            <div className="col-10">
                                                <div className="banner-content-sec">
                                                    <h4>Biggest Category Listing</h4>
                                                    <p>Choose from thousands places to stay around the world.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container service-container mt-5" data-aos="fade-up">
                    <div className="row mb-5">
                        <div className="col-12 text-center">
                            <h2 className="content-tittle mt-5">Services</h2>
                        </div>
                    </div>
                    <div className="row align-items-stretch">

                        <div className="col-sm-6 col-md-4 mb-4 mb-lg-0 col-lg-2 text-center" >
                            <div className="service-contect">
                                <span className="service-icon"> <i className="fas fa-laptop-house icon-works"></i></span>
                                <span className="caption mt-3 mb-2 d-block">Search Property</span>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 mb-4 mb-lg-0 col-lg-2 text-center" >
                            <div className="service-contect">
                                <span className="service-icon"> <i className="fas fa-money-bill-wave icon-works"></i></span>
                                <span className="caption mt-3 mb-2 d-block">Rent Property</span>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 mb-4 mb-lg-0 col-lg-2 text-center" >
                            <div className="service-contect">
                                <span className="service-icon"> <i className="fas fa-city icon-works"></i> </span>
                                <span className="caption mt-3 mb-2 d-block">Post Properties</span>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 mb-4 mb-lg-0 col-lg-2 text-center" >
                            <div className="service-contect">
                                <span className="service-icon"><i className="fas fa-hand-holding-usd icon-works"></i> </span>
                                <span className="caption mt-3 mb-2 d-block">Invest a Home</span>
                            </div>
                        </div>


                        <div className="col-sm-6 col-md-4 mb-4 mb-lg-0 col-lg-2 text-center" >
                            <div className="service-contect">
                                <span className="service-icon"> <i className="fas fa-search-location icon-works"></i> </span>
                                <span className="caption mt-3 mb-2 d-block">Property Locator</span>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 mb-4 mb-lg-0 col-lg-2 text-center" >
                            <div className="service-contect">
                                <span className="service-icon"> <i className="fas fa-hands-helping icon-works"></i> </span>
                                <span className="caption mt-3 mb-2 d-block">Make A Deal</span>
                            </div>
                        </div>


                    </div>
                </div>


                <div className="blocks-cover inner-page-cover overlay">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">

                            <div className="col col-lg-5" data-aos="fade-right">
                                <div className="row blocks-wrapper">
                                    <div className="col-2 align-self-center">
                                        <div className="banner-img-sec">
                                            <img src={search} />
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        <div className="blocks-content-sec">
                                            <h4>Looking For New Home </h4>
                                            <p>Whether you’re looking for a treehouse for the weekend or an entire home for the whole family, a warm welcome awaits.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-auto"></div>
                            <div className="col col-lg-5" data-aos="fade-left">
                                <div className="row blocks-wrapper">
                                    <div className="col-2 align-self-center">
                                        <div className="banner-img-sec">
                                            <img src={invest} />
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        <div className="blocks-content-sec">
                                            <h4>Want To Be A Host</h4>
                                            <p>If you have an extra room or entire home, you can earn money by sharing it with anyone in the world</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>




                <div className="container mt-5" data-aos="fade-up">
                    <div className="row mb-5">
                        <div className="col-12 text-center">
                            <h2 className="content-tittle mt-5">Frequently Ask Question</h2>
                        </div>
                    </div>
                    <div className="row justify-content-md-center question-wrapper">

                        <div className="accordion question-accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="question-link btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            How to list my property?
        </button>
                                    </h2>
                                </div>

                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body">
                                        Fill the hosting form,Choose your own schedule, prices, and requirements for guests.
      </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                        <button className="question-link btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Is it free?
        </button>
                                    </h2>
                                </div>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div className="card-body">
                                        Yes, you can create your own free account,there’s no cost to sign up.
      </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <h2 className="mb-0">
                                        <button className="question-link btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            How the system works?
        </button>
                                    </h2>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                    <div className="card-body">
                                        Share any space and choose your own schedule, prices, and requirements for guests,Once your listing is live, qualified guests can reach out. You can message them with any questions before their stay.<br /> We’re there to help along the way.
      </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <section className="signup-position" data-aos="fade-up">
                    <div className="container">
                        <div className="signup text-center">
                            <h3>Let's get started. Create your account</h3>
                            <p>Sign up to start your journey with us</p>
                            <span><Link to="/login" className="signup-btn btn">Sign Up</Link></span>
                        </div>
                    </div>
                </section>


                <footer className="footer">
                    <div className="footer-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm col-lg-4 col-8">
                                    <div className="footer-contect-wrapper">
                                        <h3 className="footer-heading mb-4">Our Mission</h3>
                                        <p>
                                            So seed seed green that winged cattle in. Gathering thing made fly you're no divided deep moved us lan Gathering thing us land years living.
                                            So seed seed green that winged cattle in. Gathering thing made fly you're no divided deep moved
            </p>
                                    </div>
                                </div>
                                <div className="col col-lg-2 col-4">
                                    <div className="footer-contect-wrapper">
                                        <h4 className="footer-heading mb-4">Quick Links</h4>
                                        <ul className="list-unstyled footer-list">
                                            <li><a href="#">About Us</a></li>
                                            <li><a href="#">Services</a></li>
                                            <li><a href="#">Testimonials</a></li>
                                            <li><a href="#">Contact Us</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col col-lg-3 col-8" >
                                    <div className="footer-contect-wrapper">
                                        <h4 className="footer-heading mb-4">Contact Info</h4>
                                        <ul className="list-unstyled contact-list">
                                            <li className="contact-item phone"><i className="bi bi-telephone-fill mr-3"></i> +2 392 3929 210</li>
                                            <li className="contact-item email"><i className="bi bi-envelope-fill mr-3"></i> renty@domain.com</li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="col col-lg-3 col-4">
                                    <div className="footer-contect-wrapper">
                                        <h4 className="footer-heading mb-2">Follow Us</h4>
                                        <span><i className="bi bi-facebook ml-3 mr-3"></i></span>
                                        <span><i className="bi bi-twitter mr-3"></i></span>
                                        <span><i className="bi bi-google"></i></span>
                                    </div>
                                </div>
                            </div>

                            <div className="row text-center copyright">
                                <span>Copyright copy 2021 All rights reserved | Made with <i className="bi bi-heart-fill mr-1 ml-1"></i> by ITI Aswan Mearn Stack</span>
                            </div>
                        </div>
                    </div>
                </footer>

            </>

        );
    }
}

export default Index;