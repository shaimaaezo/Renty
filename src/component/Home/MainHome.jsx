import { Component } from 'react';
import Navbar from '../../subcomponent/home/nav';
import Header from '../../subcomponent/home/header'
import Footer from '../../subcomponent/home/footer'

import logo from '../../imgs/logo2.png'
import seclogo from '../../imgs/logo.png'

import $ from 'jquery'
import './MainHome.css'
import axios from '../../axiosConfig/axios'
import HomePosts from '../../subcomponent/home/homeposts';
import { Link } from 'react-router-dom';
import qs from "query-string"



class MainHome extends Component {
    state = {
        postresult: [],
        serchResult:[],
        searchposts:[],
        Notfound: ""
    }

    componentDidMount() {

        $(function () {
            $(window).on('scroll', function () {
                if ($(window).scrollTop() > 10) {
                    $('.navbar').addClass('active');
                    $('.nav-logo').attr('src', seclogo);
                    $('#myBtn').css("display", "block");
                } else {
                    $('.navbar').removeClass('active');
                    $('.nav-logo').attr('src', logo);
                    $('#myBtn').css("display", "none");
                }

                if ($(window).scrollTop() > 200) {
                    $('#scroll-btn').css("display", "block");
                } else {
                    $('#scroll-btn').css("display", "none");
                }
            });
        });

        const query = qs.parse(this.props.location.search)
        console.log(query)
        if(query.search){
            const data ={
                location:query.search
            }
            console.log(data)
            axios.post("/post/all/search", data ).then(res=>{
                console.log(res.data)
                const getData = []
                    for (let key in res.data) {
                        getData.push(
                            getData[key] = res.data[key]
                        )
                    }
                this.setState({ serchResult: getData }) 
                console.log(this.state.serchResult)
    
                this.setState({postresult: this.state.serchResult['foundPosts']})
                console.log(this.state.postresult)

                if(this.state.postresult.length === 0){
                    console.log('empty')
                    this.setState({Notfound: " ------------------ NOT found ------------------ "})
                }
            }) 
            
        }

        //show data and get data
        else{
            axios.get(`/post/all/approved`)
            .then(response => {
                console.log(response.data.postsDB)
                const getData = []
                for (let key in response.data.postsDB) {
                    getData.push(
                        getData[key] = response.data.postsDB[key]
                    )
                }
                this.setState({ postresult: getData })
                console.log(this.state.postresult)
            })
        }
    }

    logout=()=>{
        console.log('in log out')
        localStorage.removeItem('token')
      }




    render() {
        console.log(this.props.match.params.search)
        return (
            <>
                {/* <header className="header">
                    <nav className="navbar navbar-expand-lg fixed-top py-3">
                        <div className="container"><a href="index.html" className="navbar-brand"><img src={logo} className="nav-logo mr-1" alt="Renty logo" /><img src={seclogo} className="nav-logo2 mr-1" alt="Renty logo" />Renty</a>
                            <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right"><i className="fa fa-bars"></i></button>

                            <div id="navbarSupportedContent" className="collapse navbar-collapse">
                                <ul className="navbar-nav ml-auto">

                                
                                    <li className="nav-item">
                                        <div className="dropdown">
                                            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <img src={prof} className="home-nav-dropdown-img" alt="" /></button>
                                            <div className="dropdown-menu profile-dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link className="dropdown-item" to={`/home`}>Home</Link>
                                                <div className="dropdown-divider"></div>
                                                <Link className="dropdown-item" to="/profile">profile</Link>
                                                <div className="dropdown-divider"></div>
                                                <Link className="dropdown-item" to="/login" onClick={this.logout} >Log Out</Link>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>
                </header> */}
                <Navbar/>


                <Header props={this.props} />
                <section className="posts-container mt-5" id="posts-container" >
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-lg-8">

                                <div className="posts-wrapper">
                                
                                    <h2>{this.state.Notfound}</h2>
                                    {this.state.postresult.map(post => (
                                        <HomePosts
                                            key={parseInt(post.userID)}
                                            posts={post}
                                        />
                                    ))}

                                </div>
                            </div>

                            {/* filter section */}

                            <div className="col-lg-3 ml-auto">

                                <div className="mb-5">
                                    <h4 className="text-black mb-3">Filters</h4>
                                    <form>
                                        <div className="wrap-icon">
                                            <span className="icon icon-room">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </span>
                                            <div className="form-group">
                                                <input className="form-control" type="text" placeholder="Location" />
                                            </div>
                                        </div>

                                        <div className="form-group mb-5">
                                            <div className="select-wrap">
                                                <select className="form-control" name="" id="">
                                                    <option value="">All Categories</option>
                                                    <option value="">Appartment</option>
                                                    <option value="">Single Room</option>
                                                    <option value="">Shared Room</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <input className="form-control" type="number" placeholder="Guests" />
                                        </div>

                                        <div className="form-group">
                                            <input className="form-control" type="number" placeholder="Bedrooms" />
                                        </div>

                                        <div className="form-group">
                                            <input className="form-control" type="number" placeholder="Bathrooms" />
                                        </div>

                                        <h5 className="text-black mb-3 mt-5">More filters</h5>




                                        <div className="form-group">
                                            <div className="form-check" >
                                                <label className="form-check-label">
                                                    <input className="checkbox" type="checkbox" /> Wifi <i className="input-helper" ></i>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="form-check" >
                                                <label className="form-check-label">
                                                    <input className="checkbox" type="checkbox" /> TV <i className="input-helper" ></i>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="form-check" >
                                                <label className="form-check-label">
                                                    <input className="checkbox" type="checkbox" /> Elevator<i className="input-helper" ></i>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="form-check" >
                                                <label className="form-check-label">
                                                    <input className="checkbox" type="checkbox" /> Private Enterance<i className="input-helper"></i>
                                                </label>
                                            </div>
                                        </div>



                                        <div className="form-group">
                                            <button className="btn filter-btn form-control mt-5" type="submit">Apply Filters <i className="bi bi-arrow-right"></i></button>
                                        </div>

                                    </form>
                                </div>
                            </div>






                        </div>
                    </div>
                </section>
                <Footer />





            </>
        );
    }
}

export default MainHome;