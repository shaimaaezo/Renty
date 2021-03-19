import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './formPosts.css'
import axios from '../../../axiosConfig/axios'
import $ from 'jquery'
import Joi from 'joi-browser'

import logo from '../../../imgs/logo.png'
import done from '../../../imgs/post-done.svg'



class Posts extends Component {
    state = {

        //userID: '',
        titleUnit: '',
        locationUnit: '',
        categoryUnit: '',
        guestsUnit: 0,
        bedroomsUnit:0,
        bathroomsUnit:0,
        amenitiesUnit: [],
        descriptionUnit: "",
        //reviewsAtUnit: '',
        imagesRentalUnit: null,
        rentalPriceUnit: 3,

        postID:"",

        errors: {},
        isFIRSTvalidate: false,
        isSUBMITED: false,
        selectFILE: null


    }

    componentDidMount() {
        $(document).ready(function () {

            var current_fs, next_fs, previous_fs; //fieldsets
            var opacity;
            var current = 1;
            var steps = $("fieldset").length;

            setProgressBar(current);

            $(".next").click(function () {

                current_fs = $(this).parent();
                next_fs = $(this).parent().next();

                //Add Class Active
                $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

                //show the next fieldset
                next_fs.show();
                //hide the current fieldset with style
                current_fs.animate({ opacity: 0 }, {
                    step: function (now) {
                        // for making fielset appear animation
                        opacity = 1 - now;

                        current_fs.css({
                            'display': 'none',
                            'position': 'relative'
                        });
                        next_fs.css({ 'opacity': opacity });
                    },
                    duration: 500
                });
                setProgressBar(++current);
            });

            $(".previous").click(function () {

                current_fs = $(this).parent();
                previous_fs = $(this).parent().prev();

                //Remove class active
                $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

                //show the previous fieldset
                previous_fs.show();

                //hide the current fieldset with style
                current_fs.animate({ opacity: 0 }, {
                    step: function (now) {
                        // for making fielset appear animation
                        opacity = 1 - now;

                        current_fs.css({
                            'display': 'none',
                            'position': 'relative'
                        });
                        previous_fs.css({ 'opacity': opacity });
                    },
                    duration: 500
                });
                setProgressBar(--current);
            });

            function setProgressBar(curStep) {
                var percent = parseFloat(100 / steps) * curStep;
                percent = percent.toFixed();
                $(".progress-bar")
                    .css("width", percent + "%")
            }

            $(".submit").click(function () {
                return false;
            })

        });
        // Upload field modified

        $(document).on('click', '.upload-field', function () {
            var file = $(this).parent().parent().parent().find('.input-file');
            file.trigger('click');
        });
        $(document).on('change', '.input-file', function () {
            $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
        });
    }

    schema = {
        titleUnit: Joi.string().min(6).max(127).required(),
        locationUnit: Joi.string().min(6).max(255).required(),
        descriptionUnit: Joi.string().min(1).max(1023).required(),
        categoryUnit: Joi.string().min(6).max(255).required(),
        guestsUnit: Joi.number().min(1).max(20).required(),
        bedroomsUnit: Joi.number().min(1).max(20).required(),
        bathroomsUnit: Joi.number().min(1).max(20).required(),
        rentalPriceUnit: Joi.number().min(1).max(1000).required(),


    }
    SECschema = {
        amenitiesUnit: Joi.array().items(Joi.string()).max(8).required(),
    }


    validateFIRSTpage = () => {
        console.log('i am in validateFIRSTpage')
        const errors = {}
        const state = { ...this.state }
        delete state.amenitiesUnit
        delete state.errors
        delete state.isFIRSTvalidate
        delete state.isSUBMITED
        delete state.selectFILE
        delete state.imagesRentalUnit
        delete state.userID

        //console.log(state)
        const res = Joi.validate(state, this.schema, { abortEarly: false })

        if (res.error === null) {
            console.log('error null')
            this.setState({ errors: {} })
            return null;
        }
        else {
            for (const err of res.error.details) {
                errors[err.path] = err.message
            }
            this.setState({ errors })
            //return errors
        }
    }
    checkFRISTvalidate = (e) => {
        e.preventDefault()

        const error = this.validateFIRSTpage()
        //console.log(error)
        if (error === null) {
            this.setState({ isFIRSTvalidate: true })
            return true
        }
        else {
            this.setState({ isFIRSTvalidate: false })
            return false
        }
    }

    validateLAST = () => {
        console.log('in sec validate')
        const errors = {}
        const state = { amenitiesUnit: this.state.amenitiesUnit }
        console.log(state)
        const res = Joi.validate(state, this.SECschema, { abortEarly: false })
        //console.log(res)
        if (res.error === null) {
            this.setState({ errors: {} })
            return null;
        }
        for (const err of res.error.details) {
            errors[err.path] = err.message
        }

        this.setState({ errors })
        console.log(this.state.errors)
        return errors
    }

    PostData = (e) => {
        e.preventDefault()
        const data = {
            titleUnit: this.state.titleUnit,
            locationUnit: this.state.locationUnit,
            categoryUnit: this.state.categoryUnit,
            guestsUnit: this.state.guestsUnit,
            bedroomsUnit: this.state.bedroomsUnit,
            bathroomsUnit: this.state.bathroomsUnit,
            amenitiesUnit: this.state.amenitiesUnit,
            descriptionUnit: this.state.descriptionUnit,
            rentalPriceUnit: this.state.rentalPriceUnit,
        }
        const error = this.validateLAST()
        console.log(error)
        console.log(data)
        if (error === null) {
            console.log('a5eran')
            axios.post('/post/create', data).then(response => {
                this.setState({ isSUBMITED: true })
                console.log(response)
                this.setState({ postID: response.data.Data._id })
                console.log(this.state.postID)
                //this.props.history.push(`/profile/${this.props.match.params.id}/details/${this.state.postID}`)
            })
        }
        else {
            console.log('yady el nela')
        }

    }

    handelChangtext = e => {
        const posts = { ...this.state }

        delete posts.amenitiesUnit
        delete posts.errors
        delete posts.isFIRSTvalidate
        delete posts.isSUBMITED
        delete posts.selectFILE
        delete posts.imagesRentalUnit
        delete posts.userID

        console.log(posts)

        posts[e.currentTarget.name] = e.currentTarget.value
        this.setState({
            titleUnit: posts.titleUnit,
            locationUnit: posts.locationUnit,
            categoryUnit: posts.categoryUnit,
            guestsUnit: posts.guestsUnit,
            bedroomsUnit: posts.bedroomsUnit,
            bathroomsUnit: posts.bathroomsUnit,
            descriptionUnit: posts.descriptionUnit,
            rentalPriceUnit: posts.rentalPriceUnit
        })
    }

    handelCHECKbox = e => {
        const posts = [...this.state.amenitiesUnit]
        console.log(posts)
        if (e.currentTarget.checked) {
            posts.push(e.currentTarget.name)
            console.log(posts)


            this.setState({ amenitiesUnit: posts })
            console.log(this.state.amenitiesUnit)
        }
        else {
            posts.pop(e.currentTarget.name)
            console.log(posts)


            this.setState({ amenitiesUnit: posts })
            console.log(this.state.amenitiesUnit)
        }




    }

    handelFILEimages = event => {
        //const img = [...this.state.imagesRentalUnit]
        //img.push(event.target.files[0])
        this.setState({
            imagesRentalUnit: event.target.files[0]
        })
        /*this.setState({
            imagesRentalUnit: event.target.files[0]
        })*/

        //this.handelUPLOADImage()
        this.handelUPLOADImage()
        /*img.pop(event.target.files[0])
        this.setState({
            imagesRentalUnit: img
        })*/
        //console.log(img)
        //this.setState({selectFILE:event.target.files[0]})
        //console.log(event.target.files[0])
    }

    handelUPLOADImage =  () => {
        console.log(this.state.imagesRentalUnit)
        const fd = new FormData();
        //console.log(this.state.userID)
        //for (let k in this.state.imagesRentalUnit) {
        //    console.log(this.state.imagesRentalUnit[k])
            //fd.append('image', this.state.imagesRentalUnit, this.state.imagesRentalUnit.name)
            //var responce = await axios.patch(`/post/image-upload/${this.state.userID}`, fd)
            //console.log(responce)
            /*.then(response => {
                console.log(response)
                this.props.history.replace(`/profile/${this.props.match.params.id}/details/${this.state.userID}`)
            })*/
       // }
        console.log('in handelUPLOAD')
        this.props.history.push(`/profile/${this.props.match.params.id}/details/${this.state.postID}`)
    }

    render() {
        //console.log(this.state.posts)
        //console.log(this.props.match.params.id)

        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-9 col-md-7 col-lg-9 col-xl-9 text-center p-0 mt-3 mb-2">
                        <Link to="/"><img src={logo} className="logo mb-3" alt="" /></Link >
                        <h2 className="heading">Tell Us About Your Place</h2>


                        <ul className="progressbar pl-0 mb-0 mt-5" id="progressbar">
                            <li className="description active" id="description"><strong>Description</strong></li>
                            <li className="amenities" id="amenities"><strong>Amenities</strong></li>
                            <li className="images" id="images"><strong>Images</strong></li>
                            <li className="confirm" id="confirm"><strong>Finish</strong></li>
                        </ul>
                    </div>
                </div>


                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-11 col-sm-9 col-md-7 col-lg-7 col-xl-7 text-center p-0 mt-3 mb-2">
                            <div className="form-card-wrapper card p-4  mt-3 mb-3">

                                <form className="post-form" id="msform" >

                                    <fieldset onChange={(e) => this.checkFRISTvalidate(e)}>
                                        <div className="form-card p-3">
                                            <div className="row">
                                                <div className="col-7">

                                                    <h4 className="fs-title">Describe your place to guests:</h4>
                                                    <p>Fill all form fields to go to next step</p>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="label">Tittle</label>

                                                {this.state.errors.titleUnit && (<small className="form-text text-danger">{this.state.errors.titleUnit}</small>)}
                                                <input type="text" className="postInput form-control" placeholder="Create a tittle for your listing"
                                                    name="titleUnit" value={this.state.titleUnit} onChange={this.handelChangtext}
                                                />

                                            </div>
                                            <div className="form-group">
                                                <label className="label">Address</label>
                                                {this.state.errors.locationUnit && (<small className="form-text text-danger">{this.state.errors.locationUnit}</small>)}
                                                <input type="text" className="postInput form-control" placeholder="Ex: Don St, Brooklyn, New York."
                                                    name="locationUnit" value={this.state.locationUnit} onChange={this.handelChangtext}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="label">Price</label>
                                                {this.state.errors.rentalPriceUnit && (<small className="form-text text-danger">{this.state.errors.rentalPriceUnit}</small>)}
                                                <input type="text" className="postInput form-control" placeholder="$50 / month"
                                                    name="rentalPriceUnit" value={this.state.rentalPriceUnit} onChange={this.handelChangtext}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="label">Description</label>
                                                {this.state.errors.descriptionUnit && (<small className="form-text text-danger">{this.state.errors.descriptionUnit}</small>)}
                                                <textarea className="form-control" rows="3"
                                                    name="descriptionUnit" value={this.state.descriptionUnit} onChange={this.handelChangtext}
                                                ></textarea>
                                            </div>

                                            <div className="row">
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="label">Category</label>
                                                        {this.state.errors.categoryUnit && (<small className="form-text text-danger">{this.state.errors.categoryUnit}</small>)}
                                                        <select className="form-control" name="categoryUnit" value={this.state.categoryUnit} onChange={this.handelChangtext}>
                                                            <option>Entire Place</option>
                                                            <option>Single Room</option>
                                                            <option>Shared Room</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="label">Guests</label>
                                                        {this.state.errors.guestsUnit && (<small className="form-text text-danger">{this.state.errors.guestsUnit}</small>)}
                                                        <input type="number" min="1" className="postInput form-control" placeholder="number of guests"
                                                            name="guestsUnit" value={this.state.guestsUnit} onChange={this.handelChangtext}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="label">Bedrooms</label>
                                                        {this.state.errors.bedroomsUnit && (<small className="form-text text-danger">{this.state.errors.bedroomsUnit}</small>)}
                                                        <input type="number" min="1" className="postInput form-control" placeholder="how many bedrooms in your property"
                                                            name="bedroomsUnit" value={this.state.bedroomsUnit} onChange={this.handelChangtext}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="label">Bathrooms</label>
                                                        {this.state.errors.bathroomsUnit && (<small className="form-text text-danger">{this.state.errors.bathroomsUnit}</small>)}
                                                        <input type="number" min="1" className="postInput form-control" placeholder="how many bathrooms in your property"
                                                            name="bathroomsUnit" value={this.state.bathroomsUnit} onChange={this.handelChangtext}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        { /*this.state.isFIRSTvalidate   && */ <input type="button" name="next" className="btn next action-button" value="Next" />}

                                    </fieldset>

                                    <fieldset >
                                        <div className="form-card" >
                                            <div className="row">
                                                <div className="col-9">
                                                    <h4 className="fs-title mb-3">If your place includes any special amenities:</h4>

                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-check" >
                                                    <label className="form-check-label">
                                                    {this.state.errors.amenitiesUnit && (<small className="form-text text-danger">{this.state.errors.amenitiesUnit}</small>)}
                                                        <input className="checkbox" type="checkbox"
                                                            name="wifi" onChange={this.handelCHECKbox}
                                                        /> <i className="input-helper"></i><span className="ml-3"> Wifi </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="form-check" >
                                                    <label className="form-check-label">
                                                        <input className="checkbox" type="checkbox" name="TV" onChange={this.handelCHECKbox} />   <i className="input-helper"></i><span className="ml-3"> TV </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="form-check" >
                                                    <label className="form-check-label">
                                                        <input className="checkbox" type="checkbox" name="Elevator" onChange={this.handelCHECKbox}
                                                        /> <i className="input-helper"></i><span className="ml-3"> Elevator </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="form-check" >
                                                    <label className="form-check-label">
                                                        <input className="checkbox" type="checkbox" name="Air-Condition" onChange={this.handelCHECKbox}
                                                        /> <i className="input-helper"></i><span className="ml-3"> Air-Condition </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="form-check" >
                                                    <label className="form-check-label">
                                                        <input className="checkbox" type="checkbox" name="Fireplace" onChange={this.handelCHECKbox}
                                                        /><i className="input-helper"></i><span className="ml-3"> Fireplace </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="form-check" >
                                                    <label className="form-check-label">
                                                        <input className="checkbox" type="checkbox" name="Private Enterance" onChange={this.handelCHECKbox}
                                                        /> <i className="input-helper"></i><span className="ml-3"> Private Enterance </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="form-check" >
                                                    <label className="form-check-label">
                                                        <input className="checkbox" type="checkbox" name="Pets" onChange={this.handelCHECKbox}
                                                        /><i className="input-helper"></i><span className="ml-3"> Pets </span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="form-check" >
                                                    <label className="form-check-label">
                                                        <input className="checkbox" type="checkbox" name="Smoking Allawed" onChange={this.handelCHECKbox}
                                                        /><i className="input-helper"></i><span className="ml-3"> Smoking Allawed </span>
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                        <input type="button" name="next" className="btn next action-button" value="Next" onClick={(e) => this.PostData(e)} />
                                        <input type="button" name="previous" className="btn previous action-button-previous" value="Previous" />
                                    </fieldset>

                                    <fieldset>
                                        <div className="form-card">
                                            <div className="row">
                                                <div className="col-7">
                                                    <h4 className="fs-title">Images Upload:</h4>
                                                    <p className="mb-4">Fill all form fields to go to next step</p>
                                                </div>
                                            </div>

                                            <div className="form-group img-form">
                                                <div className="col-lg-8">
                                                    <div className="">
                                                        <input type="file" onChange={this.handelFILEimages}
                                                        />
                                                        {/* <button onClick={this.handelUPLOADImage}>upload</button>*/}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group img-form">
                                                <div className="col-lg-8">
                                                    <div className="">
                                                        <input type="file" onChange={this.handelFILEimages} />
                                                        <div className="input-group col-xs-12">
                                                            <span className="input-group-btn">
                                                                <button className="upload-field btn btn-upload" type="button"><i className="bi bi-cloud-arrow-up"></i> Browse</button>
                                                            </span>
                                                            <input type="text" className="form-control" disabled placeholder="Upload Image" />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group img-form">
                                                <div className="col-lg-8">
                                                    <div className="">
                                                        <input type="file" name="img[]" className="input-file" onChange={this.handelFILEimages} />
                                                        <div className="input-group col-xs-12">
                                                            <span className="input-group-btn">
                                                                <button className="upload-field btn btn-upload" type="button"><i className="bi bi-cloud-arrow-up"></i> Browse</button>
                                                            </span>
                                                            <input type="text" className="form-control" disabled placeholder="Upload Image" />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group img-form">
                                                <div className="col-lg-8">
                                                    <div className="">
                                                        <input type="file" name="img[]" className="input-file" />
                                                        <div className="input-group col-xs-12">
                                                            <span className="input-group-btn">
                                                                <button className="upload-field btn btn-upload" type="button"><i className="bi bi-cloud-arrow-up"></i> Browse</button>
                                                            </span>
                                                            <input type="text" className="form-control" disabled placeholder="Upload Image" />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <input type="button" name="next" className="btn next action-button" value="Submit" onClick={this.handelUPLOADImage} />
                                        <input type="button" name="previous" className="btn previous action-button-previous" value="Previous" />
                                    </fieldset>

                                    <fieldset>
                                        <div className="form-card">
                                            <div className="row justify-content-center">
                                                <div className="col-3"> {this.state.isSUBMITED && <img src={done} className="fit-image" alt="" />}</div>
                                            </div> <br /><br />
                                            <div className="row justify-content-center">
                                                <div className="col-7 text-center">
                                                    {this.state.isSUBMITED ? <h5 className="purple-text text-center">You Have Successfully Posted Your Property</h5>
                                                        : <h5 className="purple-text text-center">FAILD to Posted Your Property</h5>}

                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Posts;
/*<div className="input-group col-xs-12">
                                                            <span className="input-group-btn">
                                                                <button className="upload-field btn btn-upload" type="button" onClick={this.handelUPLOAD}><i className="bi bi-cloud-arrow-up"></i> Browse</button>
                                                            </span>
                                                            <input type="text" className="form-control" disabled placeholder="Upload Image" />

                                                        </div>
                                                        
                                                        


                                                           handelFILEimages = event => {
        /*const image = [...this.state.imagesRentalUnit]
        image.push(event.target.files[0])
        this.setState({
            imagesRentalUnit: image
        })*//*
        this.setState({
            imagesRentalUnit: event.target.files[0]
        })

        this.handelUPLOADImage()

        //console.log(image)
        //this.setState({selectFILE:event.target.files[0]})
        //console.log(event.target.files[0])
    }

    handelUPLOADImage = () => {
        console.log(this.state.imagesRentalUnit)
        const fd = new FormData();
        console.log(this.state.userID)
        //for (let k in this.state.imagesRentalUnit) {
          //  console.log(this.state.imagesRentalUnit[k])
            fd.append('image', this.state.imagesRentalUnit, this.state.imagesRentalUnit.name)
            axios.patch(`/post/image-upload/${this.state.userID}`, fd).then(response => {
                console.log(response)
                this.props.history.replace(`/profile/${this.props.match.params.id}/details/${this.state.userID}`)
            })
      ////  }
        console.log('in handelUPLOAD')
    }
                                                        
                                  */                      
                                                       