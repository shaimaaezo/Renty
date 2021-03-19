import { Component } from 'react';
import Navbar from '../../subcomponent/home/nav';
import Header from '../../subcomponent/home/header'
import Footer from '../../subcomponent/home/footer'
import './MainHome.css'
import axios from '../../axiosConfig/axios'
import HomePosts from '../../subcomponent/home/homeposts';


//import secImg from '../../imgs/p2.jpg'
//import thirImg from '../../imgs/p3.jpg'
//import fifthImg from '../../imgs/p5.jpg'

class MainHome extends Component {
    state = {
        /*posts: {
            userID: '',
            titleUnit: '',
            locationUnit: '',
            typeUnit: '',
            guestsUnit: '',
            bedroomsUnit: '',
            bathroomsUnit: '',
            amenitiesUnit: '',
            ratingUnit: '',
            descriptionUnit: '',
            reviewsAtUnit: '',
            imagesRentalUnit: '',
            postsId:''
        },*/
        postresult: [],
        
    }

    componentDidMount() {
        //show data and get data
        axios.get(`/all/approved`)
            .then(response => {
                console.log(response.data.posts)
                const getData = []
                for (let key in response.data.posts) {
                    getData.push(
                        getData[key] = response.data.posts[key]
                    )
                }
                this.setState({ postresult: getData })
                //console.log(this.state.result['email'])
            })
    }




    render() {
        //console.log(this.state.postresult[0])
        return (
            <>
                <Navbar />
                <Header />


                <section className="posts-container mt-5" id="posts-container" >
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-lg-8">
                                
                                <div className="posts-wrapper">

                                    {this.state.postresult.map(post => (
                                        <HomePosts 
                                        key={parseInt(post.userID)}
                                        posts = {post} 
                                        
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