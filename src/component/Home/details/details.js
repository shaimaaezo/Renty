import React, { Component } from 'react';
import Navbar from '../../../subcomponent/home/nav'
import './details.css'
import axios from '../../../axiosConfig/axios'

import firImg from '../../../imgs/p1.jpg'
import secImg from '../../../imgs/p2.jpg'
import thirImg from '../../../imgs/p3.jpg'
import fifthImg from '../../../imgs/p5.jpg'
import DImg from '../../../imgs/d1.jpg'
import DfirImg from '../../../imgs/d2.jpg'
import DthirImg from '../../../imgs/d5.jpg'
import agent from '../../../imgs/person1.jpg'
import Footer from '../../../subcomponent/home/footer';

/////////////////المفروض اخلص الصقحه بتاعه الdetails

class Details extends Component {
    state = {
        result: [],
        resultUSER: []
    }


    //get post db
    componentDidMount() {
        //console.log(this.props)
        axios.get(`/post/${this.props.match.params.postid}`)
            .then(response => {
                console.log(response.data.post)
                const getData = []
                for (let key in response.data.post) {
                    getData.push(
                        getData[key] = response.data.post[key]
                    )
                }
                this.setState({ result: getData })
                //console.log(this.state.result['email'])
            })

        //get user 
        axios.get(`/user/${this.props.match.params.id}`)
            .then(response => {
                console.log(response.data.Data)
                const getData = []
                for (let key in response.data.Data) {
                    getData.push(
                        getData[key] = response.data.Data[key]
                    )
                }
                this.setState({ resultUSER: getData })
                //console.log(this.state.result['email'])
            })
    }

    render() {
        console.log(this.state.result)
        console.log(this.state.result['amenitiesUnit'])
        //console.log(this.state.resultUSER)
        return (
            <>
                <Navbar userID={this.props.match.params.id} />
                <section className="details-container" >
                    <div className="container mt-5">
                        <div className="row mt-5">
                            <div className="col-lg-6">
                                <div className="post-img-wrapper">
                                    <div className="container ">
                                        <div id="carousel-thumb" className="carousel slide  carousel-thumbnails" data-ride="carousel">
                                            <div className="carousel-inner" role="listbox">
                                                <div className="carousel-item active">
                                                    <img className="d-block w-100" src={firImg} alt="First slide" />
                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block w-100" src={secImg} alt="Second slide" />
                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block w-100" src={thirImg} alt="Third slide" />
                                                </div>
                                                <div className="carousel-item">
                                                    <img className="d-block w-100" src={fifthImg} alt="Forth slide" />
                                                </div>
                                            </div>


                                            <ol className="carousel-indicators">
                                                <li data-target="#carousel-thumb" data-slide-to="0" className="carousel-thumb active"> <img className="d-block w-100 img-fluid" src="imgs/p2.jpg" alt="" /></li>
                                                <li data-target="#carousel-thumb" data-slide-to="1" className="carousel-thumb "><img className="d-block w-100 img-fluid" src={DImg} alt="" /></li>
                                                <li data-target="#carousel-thumb" data-slide-to="2" className="carousel-thumb "><img className="d-block w-100 img-fluid" src={DfirImg} alt="" /></li>
                                                <li data-target="#carousel-thumb" data-slide-to="3" className="carousel-thumb "><img className="d-block w-100 img-fluid" src={DthirImg} alt="" /></li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="col-lg-6 ml-auto">
                                <div className="mb-5">
                                    <div className="row">
                                        <div className="col-10">
                                            <h3 className="details-tittle mb-3">{this.state.result['titleUnit']}</h3>
                                        </div>
                                        <div className="col">
                                            <div className="dropdown">
                                                <button className="btn dropdown-toggle p-0 pl-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="bi bi-three-dots-vertical dropdown-dots"></i>
                                                </button>
                                                <div className="dropdown-menu edit-post-menu" aria-labelledby="dropdownMenuButton">
                                                    <span type="button" className="dropdown-item btn btn-edit-post" data-toggle="modal" data-target="#exampleModal">
                                                        <i className="bi bi-pencil-square mr-2"></i> Edit Post</span>

                                                    <a className="dropdown-item" href="/"><i className="bi bi-trash mr-2"></i> Delete Post</a>
                                                </div>
                                            </div>

                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title" id="exampleModalLabel">Edit Post</h4>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form>
                                                                <div className="form-card p-3">

                                                                    <div className="form-group">
                                                                        <label className="label">Tittle</label>
                                                                        <input type="text" className="postInput form-control" name="tittle" defaultValue="Create a tittle for your listing" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label className="label">Address</label>
                                                                        <input type="text" className="postInput form-control" name="address" defaultValue="Don St, Brooklyn, New York." />
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label className="label">Description</label>
                                                                        <textarea className="form-control" rows="3"></textarea>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <label className="label">Category</label>
                                                                                <select className="form-control">
                                                                                    <option>Entire Place</option>
                                                                                    <option>Single Room</option>
                                                                                    <option defaultValue>Shared Room</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <label className="label">Guests</label>
                                                                                <input type="number" min="1" className="postInput form-control" name="guests" defaultValue="5" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <label className="label">Bedrooms</label>
                                                                                <input type="number" min="1" className="postInput form-control" name="bedrooms" defaultValue="3" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <label className="label">Bathrooms</label>
                                                                                <input type="number" min="1" className="postInput form-control" name="bathrooms" defaultValue="2" />
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="row mt-3">
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <div className="form-check" >
                                                                                    <label className="form-check-label">
                                                                                        <input className="checkbox" type="checkbox" defaultChecked /><span className="ml-3"> Wifi </span>
                                                                                    </label>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <div className="form-check" >
                                                                                    <label className="form-check-label">
                                                                                        <input className="checkbox" type="checkbox" defaultChecked /><span className="ml-3"> TV </span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <div className="form-check" >
                                                                                    <label className="form-check-label">
                                                                                        <input className="checkbox" type="checkbox" /><span className="ml-3"> Elevator </span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <div className="form-check" >
                                                                                    <label className="form-check-label">
                                                                                        <input className="checkbox" type="checkbox" /><span className="ml-3"> Air-Condition </span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="row">
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <div className="form-check" >
                                                                                    <label className="form-check-label">
                                                                                        <input className="checkbox" type="checkbox" /><span className="ml-3"> Fireplace </span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <div className="form-check" >
                                                                                    <label className="form-check-label">
                                                                                        <input className="checkbox" type="checkbox" defaultChecked /><span className="ml-3"> Private Enterance </span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="row">
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <div className="form-check" >
                                                                                    <label className="form-check-label">
                                                                                        <input className="checkbox" type="checkbox" /><span className="ml-3"> Pets </span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <div className="form-check" >
                                                                                    <label className="form-check-label">
                                                                                        <input className="checkbox" type="checkbox" /><span className="ml-3"> Smoking Allawed </span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </div>

                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                    <button type="button" className="btn btn-save btn-default">Save changes</button>
                                                                </div>

                                                            </form>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>






                                    <h4 className="price">LE {this.state.result['rentalPriceUnit']}</h4>
                                    <div className="row">
                                        <div className="col-sm-7">
                                            <p className="address">{this.state.result['locationUnit']}</p>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="post-review mb-2">
                                                <span className="bi bi-star-fill checked"></span>
                                                <span className="bi bi-star-fill checked"></span>
                                                <span className="bi bi-star-fill checked"></span>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="bi bi-star-fill"></span>
                                                <span className="review-numder ml-1">(3 Reviews)</span>
                                            </div>
                                        </div>
                                    </div>


                                    <p className="avaibility"><i className="bi bi-circle-fill"></i> AVAILABLE</p>
                                    
                                    <ul className="filter-list">
                                        <li><span className="filter-item">Category</span> <span>: {this.state.result['categoryUnit']}</span></li>
                                        <li><span className="filter-item">Bedrooms</span> <span>: {this.state.result['bedroomsUnit']}</span></li>
                                        <li><span className="filter-item">Bathrooms</span> <span>: {this.state.result['bathroomsUnit']}</span></li>
                                        <li><span className="filter-item">Guests</span> <span>: {this.state.result['guestsUnit']}</span></li>
                                    </ul>

                                    <p className="description mb-5 mt-4">{this.state.result['descriptionUnit']}.</p>


                                    <div className="more-filters">
                                       { <span className="badge badge-secondary"><i className="bi bi-check2-circle"></i> {this.state.result['amenitiesUnit']}</span>}
                                        
                                    </div>

                                    <div className="container text-end">
                                        <span><a href="/" className="rent-btn btn mt-5">Rent Property <i className="bi bi-arrow-right"></i></a></span>
                                    </div>

                                    <div className="divider mt-3"><hr /></div>

                                    <div>
                                        <div className="container mt-5">
                                            <h4 className="contact-agent mb-5">Contact Agent</h4>
                                            <div className="row">
                                                <div className="col-sm-4 text-center">
                                                    <img className="agent-img" src={'http://localhost:4000/' + this.state.resultUSER['profilePic']} alt="" />
                                                </div>
                                                <div className="col-sm-8">
                                                    <a href="profile.html" className="agent-link"><span className="agent-name">{this.state.resultUSER['firstName']} {this.state.resultUSER['lastName']}</span></a>
                                                    <p>{this.state.resultUSER['about']}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </section>

                <Footer/>

            </>

        );
    }
}

export default Details;


