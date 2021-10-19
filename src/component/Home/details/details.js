import React, { Component } from 'react';
import Navbar from '../../../subcomponent/home/nav'
import './details.css'
import axios from '../../../axiosConfig/axios'

import Footer from '../../../subcomponent/home/footer';


/////////////////المفروض اخلص الصقحه بتاعه الdetails

class Details extends Component {
    state = {
        result: [],
        resultUSER: [],
        USERdata: {},
        amenities: [],
        bookingResult: [],
        imgRental: [],
        ratingsUnit: [],
        reviewsAtUnit: [],
        review: "",
        rate: 0,
        cumulativeRatingUnit: 0,
        Ispoking: false

    }

    //get post db
    componentDidMount() {
        //console.log(this.props)
        axios.get(`/post/${this.props.match.params.postID}`)
            .then(response => {
                console.log(response.data.post)
                const getData = []
                for (let key in response.data.post) {
                    getData.push(
                        getData[key] = response.data.post[key]
                    )
                }
                this.setState({ result: getData })
                console.log(this.state.result)
                //console.log(this.state.result['email'])
                this.setState({
                    USERdata: this.state.result['userID']
                })
                console.log(this.state.USERdata)

                this.setState({
                    amenities: this.state.result['amenitiesUnit']
                })
                console.log(this.state.amenities)

                this.setState({
                    imgRental: this.state.result['imagesRentalUnit']
                })
                console.log(this.state.imagesRentalUnit)

                this.setState({
                    reviewsAtUnit: this.state.result['reviewsAtUnit']
                })
                console.log(this.state.reviewsAtUnit)

                this.setState({
                    cumulativeRatingUnit: this.state.result['cumulativeRatingUnit']
                })
                console.log(this.state.cumulativeRatingUnit)

            })
    }

    handelChangtext = e => {
        const result = { ...this.state.result }
        result[e.currentTarget.name] = e.currentTarget.value
        this.setState({ result })
    }

    PatchData = (e) => {
        e.preventDefault();

        const data = {
            titleUnit: this.state.result['titleUnit'],
            locationUnit: this.state.result['locationUnit'],
            descriptionUnit: this.state.result['descriptionUnit'],
            categoryUnit: this.state.result['categoryUnit'],
            guestsUnit: this.state.result['guestsUnit'],
            bedroomsUnit: this.state.result['bedroomsUnit'],
            bathroomsUnit: this.state.result['bathroomsUnit']

        }
        axios.patch(`/post/update/${this.props.match.params.postID}`, data).then(res => {
            console.log(res, "res")
            //this.setState({result :res.data.user})
        })
    }

    //BOOKING apis
    handleBooking = e => {
        const bookingResult = { ...this.state.bookingResult }
        bookingResult[e.currentTarget.name] = e.currentTarget.value
        this.setState({ bookingResult })
    }

    //post booking
    postBooking = (e) => {
        e.preventDefault()

        const data = {
            bookedPost: this.state.result['_id'],
            //checkIn: this.state.bookingResult['checkIn'],
            checkIn: this.state.bookingResult['checkIn'],
            checkOut: this.state.bookingResult['checkOut'],
            adults: this.state.bookingResult['adults']
        }

        axios.post('/book', data).then(res => {
            console.log(res)
            this.setState({ Ispoking: true })
        }).catch(err => console.log(err))
    }

    // review handeling 
    postREVIEW = (e) => {
        e.preventDefault();
        const data = {
            rate: this.state.rate,
            review: this.state.review,
            postID: this.props.match.params.postID
        }
        //console.log(data)
        axios.post('/feedback', data).then(res => {
            console.log(res)
            this.setState({
                review: this.state.review
            })
            console.log(this.state.review)

            this.setState({
                rate: this.state.rate
            })
            console.log(this.state.rate)

        }).catch(err => {
            console.log(err)
        })
    }

    handelChangtext = e => {
        const review = e.currentTarget.value
        this.setState({ review })
    }

    handelRating = e => {
        const rate = e.currentTarget.value
        console.log(rate)
        this.setState({ rate })
    }


    render() {
        //console.log(this.state.rate)
        //console.log(this.state.USERdata)

        return (
            <>
                <Navbar />
                <section className="details-container" >
                    <div className="container mt-5">
                        <div className="row mt-5">
                            <div className="col-lg-6">
                                <div className="post-img-wrapper">
                                    <div className="container ">
                                        <div id="carousel-thumb" className="carousel slide  carousel-thumbnails" data-ride="carousel">
                                            <div className="carousel-inner" role="listbox">
                                                <div className="carousel-item active">
                                                    {this.state.imgRental[0] && <img className="d-block w-100" src={'http://localhost:4000/' + this.state.imgRental[0]} alt="First slide" />}
                                                </div>
                                                <div className="carousel-item">
                                                    {this.state.imgRental[1] && <img className="d-block w-100" src={'http://localhost:4000/' + this.state.imgRental[1]} alt="First slide" />}
                                                </div>
                                                <div className="carousel-item">
                                                    {this.state.imgRental[2] && <img className="d-block w-100" src={'http://localhost:4000/' + this.state.imgRental[2]} alt="First slide" />}
                                                </div>
                                                <div className="carousel-item">
                                                    {this.state.imgRental[3] && <img className="d-block w-100" src={'http://localhost:4000/' + this.state.imgRental[3]} alt="First slide" />}
                                                </div>
                                            </div>


                                            <ol className="carousel-indicators">
                                                {this.state.imgRental[0] && <li data-target="#carousel-thumb" data-slide-to="0" className="carousel-thumb active"> <img className="d-block w-100 img-fluid" src={'http://localhost:4000/' + this.state.imgRental[0]} alt="" /></li>}
                                                {this.state.imgRental[1] && <li data-target="#carousel-thumb" data-slide-to="1" className="carousel-thumb "> <img className="d-block w-100 img-fluid" src={'http://localhost:4000/' + this.state.imgRental[1]} alt="" /></li>}
                                                {this.state.imgRental[2] && <li data-target="#carousel-thumb" data-slide-to="2" className="carousel-thumb "><img className="d-block w-100 img-fluid" src={'http://localhost:4000/' + this.state.imgRental[2]} alt="" /></li>}
                                                {this.state.imgRental[3] && <li data-target="#carousel-thumb" data-slide-to="3" className="carousel-thumb "><img className="d-block w-100 img-fluid" src={'http://localhost:4000/' + this.state.imgRental[3]} alt="" /></li>}
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

                                                    {/* <a className="dropdown-item" href="/"><i className="bi bi-trash mr-2"></i> Delete Post</a> */}
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
                                                                        <input type="text" className="postInput form-control" name="titleUnit" defaultValue="Create a tittle for your listing"
                                                                            onChange={this.handelChangtext} defaultValue={this.state.result['titleUnit']}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label className="label">Address</label>
                                                                        <input type="text" className="postInput form-control" name="locationUnit" defaultValue="Don St, Brooklyn, New York."
                                                                            onChange={this.handelChangtext} defaultValue={this.state.result['locationUnit']}
                                                                        />
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label className="label">Description</label>
                                                                        <textarea className="form-control" rows="3" name="descriptionUnit" onChange={this.handelChangtext} defaultValue={this.state.result['descriptionUnit']} ></textarea>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <label className="label">Category</label>
                                                                                <select className="form-control" name="categoryUnit" defaultValue={this.state.result['categoryUnit']} onChange={this.handelChangtext} >
                                                                                    <option>Entire Place</option>
                                                                                    <option>Single Room</option>
                                                                                    <option >Shared Room</option>

                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <label className="label">Guests</label>
                                                                                <input type="number" min="1" className="postInput form-control" name="guestsUnit"
                                                                                    defaultValue={this.state.result['guestsUnit']} onChange={this.handelChangtext}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <label className="label">Bedrooms</label>
                                                                                <input type="number" min="1" className="postInput form-control" name="bedroomsUnit"
                                                                                    defaultValue={this.state.result['bedroomsUnit']} onChange={this.handelChangtext} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md">
                                                                            <div className="form-group">
                                                                                <label className="label">Bathrooms</label>
                                                                                <input type="number" min="1" className="postInput form-control" name="bathroomsUnit"
                                                                                    defaultValue={this.state.result['bathroomsUnit']} onChange={this.handelChangtext} />
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    {/* <div className="row mt-3">
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
*/}

                                                                </div>

                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                    <button type="button" className="btn btn-save btn-default" onClick={this.PatchData}>Save changes</button>
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
                                                {this.state.cumulativeRatingUnit === 0 && <span className="bi bi-star-fill "></span>}
                                                {this.state.cumulativeRatingUnit === 0 && <span className="bi bi-star-fill "></span>}
                                                {this.state.cumulativeRatingUnit === 0 && <span className="bi bi-star-fill "></span>}
                                                {this.state.cumulativeRatingUnit === 0 && <span className="bi bi-star-fill "></span>}
                                                {this.state.cumulativeRatingUnit === 0 && <span className="bi bi-star-fill "></span>}

                                                {this.state.cumulativeRatingUnit === 1 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 1 && <span className="bi bi-star-fill "></span>}
                                                {this.state.cumulativeRatingUnit === 1 && <span className="bi bi-star-fill "></span>}
                                                {this.state.cumulativeRatingUnit === 1 && <span className="bi bi-star-fill "></span>}
                                                {this.state.cumulativeRatingUnit === 1 && <span className="bi bi-star-fill "></span>}


                                                {this.state.cumulativeRatingUnit === 2 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 2 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 2 && <span className="bi bi-star-fill "></span>}
                                                {this.state.cumulativeRatingUnit === 2 && <span className="bi bi-star-fill "></span>}
                                                {this.state.cumulativeRatingUnit === 2 && <span className="bi bi-star-fill "></span>}


                                                {this.state.cumulativeRatingUnit === 3 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 3 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 3 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 3 && <span className="bi bi-star-fill "></span>}
                                                {this.state.cumulativeRatingUnit === 3 && <span className="bi bi-star-fill "></span>}


                                                {this.state.cumulativeRatingUnit === 4 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 4 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 4 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 4 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 4 && <span className="bi bi-star-fill "></span>}

                                                {this.state.cumulativeRatingUnit === 5 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 5 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 5 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 5 && <span className="bi bi-star-fill checked"></span>}
                                                {this.state.cumulativeRatingUnit === 5 && <span className="bi bi-star-fill checked"></span>}

                                                <span className="review-numder ml-1">({this.state.cumulativeRatingUnit} Reviews)</span>
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
                                        {this.state.amenities[0] && <span className="badge badge-secondary"><i className="bi bi-check2-circle"></i> {this.state.amenities[0]}</span>}
                                        {this.state.amenities[1] && <span className="badge badge-secondary"><i className="bi bi-check2-circle"></i> {this.state.amenities[1]}</span>}
                                        {this.state.amenities[2] && <span className="badge badge-secondary"><i className="bi bi-check2-circle"></i> {this.state.amenities[2]}</span>}
                                        {this.state.amenities[3] && <span className="badge badge-secondary"><i className="bi bi-check2-circle"></i> {this.state.amenities[3]}</span>}
                                        {this.state.amenities[4] && <span className="badge badge-secondary"><i className="bi bi-check2-circle"></i> {this.state.amenities[4]}</span>}
                                        {this.state.amenities[5] && <span className="badge badge-secondary"><i className="bi bi-check2-circle"></i> {this.state.amenities[5]}</span>}

                                    </div>

                                    <div className="container text-end">
                                        <button className="rent-btn btn mt-5" data-toggle="modal" data-target="#rentModal">Rent Property <i className="bi bi-arrow-right"></i></button>
                                    </div>

                                    <div className="modal fade" id="rentModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Rent Property</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    {this.state.Ispoking &&
                                                        <div class="col-6 mx-auto alert alert-success alert-dismissible fade show" role="alert">
                                                            <strong> Congratulaions! </strong>You Successfully booked this property.
                                                           <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                    }
                                                    <form>
                                                        {/* <p className="text text-danger">{this.state.bookingDONE}</p> */}

                                                        <div className="form-card p-3">
                                                            {/* <div className="row input-daterange">
                                                                <div className="col-md">
                                                                    <div className="form-group input-group">
                                                                        <input type="text" className="postInput form-control" placeholder="Arriving Date" readOnly name="checkIn"
                                                                            onChange={this.handleBooking} defaultValue={this.state.bookingResult['checkIn']}
                                                                        />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text"><i className="bi bi-calendar4-week"></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md">
                                                                    <div className="form-group input-group">
                                                                        <input type="text" className="postInput form-control" placeholder="Leaving Date" readOnly name="checkOut"
                                                                            onChange={this.handleBooking} defaultValue={this.state.bookingResult['checkOut']}
                                                                        />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text"><i className="bi bi-calendar4-week"></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> */}




                                                            <div className="row">
                                                                <div className="col-md">
                                                                    <div className="form-group">
                                                                        <label className="label">Arriving Date</label>
                                                                        <div className="col-10">
                                                                            <input className="postInput form-control" type="date" id="example-date-input" name="checkIn"
                                                                                onChange={this.handleBooking} defaultValue={this.state.bookingResult['checkIn']} />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md">
                                                                    <div className="form-group">
                                                                        <label className="label">Leaving Date</label>
                                                                        <div className="col-10">
                                                                            <input className="postInput form-control" type="date" id="example-date-input" name="checkOut"
                                                                                onChange={this.handleBooking} defaultValue={this.state.bookingResult['checkOut']}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>






                                                            <div className="row">
                                                                {/*<div className="col-md">
                                                                    <div className="form-group">
                                                                        <label className="label">Adult</label>
                                                                        <input type="number" min="1" className="postInput form-control" placeholder="Ages 13 or above" name="checkOut"
                                                                        onChange={this.handleBooking} defaultValue={this.state.bookingResult['checkOut']}
                                                                        />
                                                                    </div>
                                                                </div>*/}
                                                                <div className="col-md">
                                                                    <div className="form-group">
                                                                        <label className="label">Adults</label>
                                                                        <input type="number" min="1" className="postInput form-control" placeholder="Ages 2-12" name="adults"
                                                                            onChange={this.handleBooking} defaultValue={this.state.bookingResult['adults']}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-save btn-default" onClick={this.postBooking} >Rent Now</button>
                                                        </div>

                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>





                                    <div className="divider mt-3"><hr /></div>

                                    <section className="contact-agent-sec mb-5">
                                        <div className="container mt-5">
                                            <h4 className="contact-agent mb-5">Contact Agent</h4>
                                            <div className="row">
                                                <div className="col-sm-4 text-center">
                                                    <img className="agent-img" src={'http://localhost:4000/' + this.state.USERdata.profilePic} alt="" />
                                                </div>
                                                <div className="col-sm-8">
                                                    <span className="agent-name">{this.state.USERdata.firstName} {this.state.USERdata.lastName}</span>
                                                    <p>{this.state.USERdata.about}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>








                                </div>
                            </div>






                            <section className="comments-container pt-5" >
                                <div className="container">

                                    <div className="row">
                                        <div className="col-lg-7">
                                            <h3 className="fontheading mb-5">Comments</h3>

                                            <div className="container">
                                                {this.state.reviewsAtUnit.map(feed => (

                                                    <ul className="list-unstyled">

                                                        <li className="media">
                                                            <img src={'http://localhost:4000/' + feed.userID.profilePic} className="mr-3" alt="..." />
                                                            <div className="media-body">
                                                                <h5 className="mt-0 mb-1">{feed.userID.firstName} {feed.userID.lastName}</h5>
                                                                <div className="post-review mb-2">
                                                                    {feed.rate === 0 && <span className="bi bi-star-fill "></span>}
                                                                    {feed.rate === 0 && <span className="bi bi-star-fill "></span>}
                                                                    {feed.rate === 0 && <span className="bi bi-star-fill "></span>}
                                                                    {feed.rate === 0 && <span className="bi bi-star-fill "></span>}
                                                                    {feed.rate === 0 && <span className="bi bi-star-fill "></span>}

                                                                    {feed.rate === 1 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 1 && <span className="bi bi-star-fill "></span>}
                                                                    {feed.rate === 1 && <span className="bi bi-star-fill "></span>}
                                                                    {feed.rate === 1 && <span className="bi bi-star-fill "></span>}
                                                                    {feed.rate === 1 && <span className="bi bi-star-fill "></span>}


                                                                    {feed.rate === 2 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 2 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 2 && <span className="bi bi-star-fill "></span>}
                                                                    {feed.rate === 2 && <span className="bi bi-star-fill "></span>}
                                                                    {feed.rate === 2 && <span className="bi bi-star-fill "></span>}


                                                                    {feed.rate === 3 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 3 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 3 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 3 && <span className="bi bi-star-fill "></span>}
                                                                    {feed.rate === 3 && <span className="bi bi-star-fill "></span>}


                                                                    {feed.rate === 4 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 4 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 4 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 4 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 4 && <span className="bi bi-star-fill "></span>}

                                                                    {feed.rate === 5 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 5 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 5 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 5 && <span className="bi bi-star-fill checked"></span>}
                                                                    {feed.rate === 5 && <span className="bi bi-star-fill checked"></span>}
                                                                </div>{feed.review}
                                                            </div>
                                                        </li>

                                                    </ul>

                                                )
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <h3 className="fontheading mb-5">Add a Review</h3>
                                            <div className="container">
                                                <div className="review_box">


                                                    <form className="form-contact form-review mt-3">

                                                        <div>
                                                            <p className="your-rating">Your Rating:</p>
                                                        </div>
                                                        <div className="post-review enter-rating">
                                                            <input type="radio" id="star5" name="5" defaultValue="5" onChange={this.handelRating} />
                                                            <label htmlFor="star5" title="text">5 stars</label>
                                                            <input type="radio" id="star4" name="4" defaultValue="4" onChange={this.handelRating} />
                                                            <label htmlFor="star4" title="text">4 stars</label>
                                                            <input type="radio" id="star3" name="3" defaultValue="3" onChange={this.handelRating} />
                                                            <label htmlFor="star3" title="text">3 stars</label>
                                                            <input type="radio" id="star2" name="2" defaultValue="2" onChange={this.handelRating} />
                                                            <label htmlFor="star2" title="text">2 stars</label>
                                                            <input type="radio" id="star1" name="1" defaultValue="1" onChange={this.handelRating} />
                                                            <label htmlFor="star1" title="text">1 star</label>
                                                        </div>


                                                        <div className="form-group">
                                                            <textarea className="form-control different-control w-100" name="review" id="textarea" cols="30" rows="5" placeholder="Enter Message"
                                                                defaultValue={this.state.review} onChange={this.handelChangtext}
                                                            ></textarea>
                                                        </div>
                                                        <div className="form-group text-center text-md-right mt-3">
                                                            <button type="submit" className="btn rent-btn button-review" onClick={this.postREVIEW} >Submit Now</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </section>







                        </div>
                    </div>
                </section>

                <Footer />

            </>

        );
    }
}

export default Details;

/*

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
 */
