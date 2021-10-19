import React, { Component } from 'react';
import './profile.css'
import axios from '../../axiosConfig/axios'

import $ from 'jquery'
import Footer from '../../subcomponent/profile/footer';
import UserCard from '../../subcomponent/profile/postcard';
import { Link } from 'react-router-dom';

import profileImg from '../../imgs/user-profile.svg'
import Navbar from '../../subcomponent/home/nav';

////////////////////////////img not wooooooooooooork
class Profile extends Component {
    state = {
        result: [],
        isClick: false,    
        profilePic: null,
        postsfromUSER: [],
        foundPosts:false,
        role:"",
        booking:[],
        resultBOOKING:[],
        Isdeleted: false
        
    }

    
    componentDidMount() {
  // Upload field modified

        $(document).on('click', '.upload-field', function () {
    var file = $(this).parent().parent().parent().find('.input-file');
    file.trigger('click');
        });
        $(document).on('change', '.input-file', function () {
    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
        });

        axios.get(`/user`).then(response => {
            console.log('iam in get')
            console.log(response.data.Data)
            const getData = []
            for (let key in response.data.Data) {
                getData.push(
                    getData[key] = response.data.Data[key]
                )
            }
            this.setState({ result: getData })
            console.log(this.state.result)

            this.setState({postsfromUSER: this.state.result['posts']})
            console.log(this.state.postsfromUSER)
            //console.log(this.state.result['posts'])

            this.setState({role:this.state.result['role']})

            this.setState({booking:this.state.result['bookings']})
        })
    }

    handelChangtext = e => {
        const result = { ...this.state.result }
        result[e.currentTarget.name] = e.currentTarget.value
        this.setState({ result })   
    }

    PatchData = (e) => {
        e.preventDefault();
        this.setState({ isClick: false })

        this.handelUPLOADImage()

        const data = {
            firstName:this.state.result['firstName'],
            lastName: this.state.result['lastName'],
            email: this.state.result['email'],
            address: this.state.result['address'],
            phoneNumber: this.state.result['phoneNumber'],
            about: this.state.result['about'] 
        }
        axios.patch(`/user/update`,data).then(res=>{
            console.log(res.data.user, "res")
            this.setState({result :res.data.user})
            
        })
    } 
    
    handelFILEimages = event => {
        //const img = [...this.state.profilePic]
        //img.push(event.target.files[0])
        this.setState({
            profilePic: event.target.files[0]
        })
        //console.log(event.target.files[0])        
    }

    handelUPLOADImage = () => {
        
        //if (this.state.profilePic.name ) {
            const fd = new FormData();
            fd.append('profilePic', this.state.profilePic, this.state.profilePic.name)
            axios.patch(`/user/image-profile`, fd).then(res => {
                console.log(res)
                console.log('in handelUPLOAD')
            }).catch(err => {console.log(err)})
        //}else{
          //  console.log('no file')
        //}    
        console.log(this.state.result['profilePic'])
    }

    GOdashBoard=()=>{
        this.props.history.push('/admin')
    }

    //get booking 
    getBOOKING=(booID)=>{
        axios.get(`/book/${booID}`).then(res=>{
            console.log(res)
            const getData = []
            for (let key in res.data.booking) {
                getData.push(
                    getData[key] = res.data.booking[key]
                )
            }
            this.setState({resultBOOKING: getData})
            console.log(this.state.resultBOOKING)
        }).catch(err=>{
            console.log(err)
        })
    }
/* 
    EditPoking=(e)=>{
        e.preventDefault()

        const data ={
            checkIn: this.state.resultBOOKING['checkIn'],
            checkOut: this.state.resultBOOKING['checkOut'],
            adults : this.state.resultBOOKING['adults'],
            children: this.state.resultBOOKING['children']
        }
        axios.patch(`/book/${this.state.resultBOOKING['_id']}`).then(res=>{
            console.log(res.data.booking)
        })
        
    } */

    handelBooking = e => {
        const resultBOOKING = { ...this.state.resultBOOKING }
        resultBOOKING[e.currentTarget.name] = e.currentTarget.value
        this.setState({ resultBOOKING })   
    }

    deletebooking=(booID)=>{
        //e.preventDefault()

        axios.delete(`/book/${booID}`).then(res=>{
            console.log(res)
            this.setState({Isdeleted: true})
        })
    }



    
    render() {
        
        console.log(this.state.postsfromUSER)
        var img = profileImg
        if (this.state.result['profilePic']){
            console.log('ther are image')
            console.log('http://localhost:4000/' + this.state.result['profilePic'])
            img = 'http://localhost:4000/' + this.state.result['profilePic']
        }
// {<img src={'http://localhost:4000/' + this.state.result['profilePic']} className="card-img-top profile-img" alt="" />}

        return (
            <>
            <Navbar/>

                {<div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Congratulaions!</strong> You Successfully booked this property.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>}

                <section className="posts-container mt-5" id="posts-container" >

                         
                    <div className="container">

                    { this.state.Isdeleted &&
                              <div class="col-6 mx-auto alert alert-success alert-dismissible fade show" role="alert">
                                You <strong> Deleted </strong>your booking.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                }


                        <div className="row profile-wrapper">

                            <div className="col-lg-4">
                                <div className="card profile-card mb-5" >
                                    <img src={img} className="card-img-top profile-img" alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{this.state.result['firstName']}</h5>


                                        {/* {<div className="col-9">
                                            <p className="card-text">{this.state.result['about']}</p>
                                        </div>} */}
                                        <div className="col-3">
                                            {/*this.state.isClick === false && <button onClick={this.handelAbout}>about</button>*/}
                                        </div>


                                    </div>
                                    <ul className="list-group list-group-flush">
                                         {this.state.result['address'] && <li className="list-group-item profile-list-item">
                                            <i className="bi bi-geo-alt mr-3"></i> {this.state.result['address']} </li>}
                                        <li className="list-group-item profile-list-item">
                                            <i className="bi bi-envelope mr-3"></i> {this.state.result['email']}</li>
                                            {this.state.result['phoneNumber'] && <li className="list-group-item profile-list-item">
                                            <i className="bi bi-telephone mr-3"></i> {this.state.result['phoneNumber']}</li>}
                                    </ul>





                                    <div className="card-body text-center">
                                        <button type="button" className="btn btn-edit mb-3" data-toggle="modal" data-target="#exampleModal">
                                            <i className="bi bi-pencil-square">
                                            </i> Edit Profile
                                            </button>

                                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">

                                                        <form >
                                                            <div className="form-group row">
                                                                <div className="col">
                                                                    <input type="text" className="form-control" placeholder="First name" name="firstName"
                                                                        defaultValue={this.state.result['firstName']} onChange={this.handelChangtext}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <input type="text" className="form-control" placeholder="Last name" name="lastName"
                                                                        defaultValue={this.state.result['lastName']} onChange={this.handelChangtext}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/*<div className="input-group form-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="bi bi-envelope"></i></div>
                                                                </div>
                                                                <input type="text" className="form-control" placeholder="Email" name="email"
                                                                    defaultValue={this.state.result['email']} onChange={this.handelChangtext}
                                                                />
                                                            </div>*/}
                                    
                                                            <div className="input-group form-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="bi bi-telephone"></i></div>
                                                                </div>
                                                                <input type="text" className="form-control" placeholder="Phone number" name="phoneNumber"
                                                                    defaultValue={this.state.result['phoneNumber']} onChange={this.handelChangtext}
                                                                />
                                                            </div>
                                                            <div className="input-group form-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="bi bi-geo-alt"></i></div>
                                                                </div>
                                                                <input type="text" className="form-control" placeholder="Address" name="address"
                                                                    defaultValue={this.state.result['address']} onChange={this.handelChangtext}
                                                                />
                                                            </div>
              {/*                                               <div className="form-group img-form">
                                                                <div className="">
                                                                    <input type="file" className="input-file" onChange={this.handelFILEimages} defaultValue={this.state.result['profilePic']}/>
                                                                    <div className="input-group col-xs-12">
                                                                        <span className="input-group-btn">
                                                                            <button className="upload-field btn btn-upload-profile" type="button"><i className="bi bi-cloud-arrow-up"></i> Browse</button>
                                                                        </span>
                                                                        <input type="text" className="form-control" disabled placeholder="Upload Image" />

                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                             <div className="form-group img-form">
                                                                {/* <div className="">
                                                                <label className="custom-file">
                                                                    <input type="file" id="file" className="custom-file-input" />
                                                                    <span className="custom-file-control"></span>
                                                                    </label>

                                                                     </div> */}
                                                                     <div class="col-lg-9">
                                                    <div class="">
                                                    <div class="mb-3">
                                                        <input class="form-control" name="img[]" type="file" id="formFileMultiple" onChange={this.handelFILEimages} defaultValue={this.state.result['profilePic']} />
                                                        </div>
                                                    </div>
                                                </div>



                                                               </div> 


                                                               






                                                    {<div className="form-group align-text-left">
                                                                <label htmlFor="exampleFormControlTextarea1 float-left">About</label>
                                                                <textarea className="form-control" rows="2" name="about"
                                                                    defaultValue={this.state.result['about']} onChange={this.handelChangtext} ></textarea>
                                                            </div>}


                                                            {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                                            <button type="submit" className="btn btn-edit-form" onClick={this.PatchData} >Save Changes <i className="bi bi-check2"></i></button>

                                                        </form>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            


                            {<div className="col-lg-8 ml-auto">



                            
                                {/* edited about section */}
                                <div className="row p-3">
                                    <h3>Hi,I'm {this.state.result['firstName']}</h3>
                                    </div>
                                    <div className="row p-3">
                                    <h3 className="about-txt">About</h3>
                                    </div>

                                    <div className="row pr-3 pl-3 mb-3">
                                    <p className="card-text">{this.state.result['about']}</p>
                                </div>





                                <div className="row text-center">

                                    <div className="col host-home-linl" >
                                        {this.state.role === "admin" && (<button className="btn home-post-btn ml-2 mt-3" onClick={this.GOdashBoard}>Go to Dashboard</button>)}
                                    </div>
                                </div>



                                  {/* انا ضفت الجزززززززززززء ده */}
                                {this.state.role !== "admin" && <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#mypost" role="tab" aria-controls="mypost" aria-selected="true"><i className="bi bi-list-ul tab-icon"></i> My Posts</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="cart-tab" data-toggle="tab" href="#mycart" role="tab" aria-controls="mycart" aria-selected="false"><i className="bi bi-cart2 tab-icon"></i> My Booking Cart</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="booked-tab" data-toggle="tab" href="#booked" role="tab" aria-controls="booked" aria-selected="false"><i className="bi bi-bell tab-icon"></i> Who Booked My Property</a>
                                    </li>

                                </ul>}

                                {this.state.role !== "admin" && <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="mypost" role="tabpanel" aria-labelledby="home-tab">

                                        {/* هنا المفروض البوستات اللي هتظهر بتاع اليوزر */}
                                        {this.state.postsfromUSER.map(post => (
                                            <>
                                        <UserCard
                                            key={parseInt(post._id)}
                                            posts={post}
                                        />
                                           
                                         </>
                                        )
                                        )}

                                    </div>

                                    <div className="tab-pane fade" id="mycart" role="tabpanel" aria-labelledby="cart-tab">
                                
                                    {/*هنا المفروض البوكينج  */}

                                    {this.state.booking.map(book =>(
                                        

                                        
                                    <div className="col-9 mb-4">
                                    <div className="row">
                <div className="card" >
                  <div className="card-body">
                    <Link to={`/profile/details/${book.bookedPost._id}`} className="cart-title" ><h5 className="card-title book-title">{book.bookedPost.titleUnit}</h5></Link>
                    <h5 className="card-subtitle mb-2 text-muted"  >booking from {new Date(book.checkIn).toLocaleString().split(',')[0]} to {new Date(book.checkOut).toLocaleString().split(',')[0]} ... </h5> 
                    <p className="card-subtitle mb-2 text-muted">Total amount: {book.amount}</p>
                    <div className="container text-end">
                    <button onClick={()=>this.deletebooking(book._id)} type="button" className="btn btn-outline-danger mt-3" data-toggle="modal" data-target="#detailsModal">
                     Delete
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
            )}
        </div>


             {/* booked property will be showen here */}
             <div className="tab-pane fade" id="booked" role="tabpanel" aria-labelledby="booked-tab">

                 {this.state.postsfromUSER.map(who=>(
                    /* {who.map(once=>( */
                        <>
                    
                    {who.bookings.map(item=>(
                        <div className="row m-3">
                        <div className="card booking-card">
                            <div className="content">
                            <img className="user-pic mr-3" src={'http://localhost:4000/' + item.bookingUser.profilePic} alt="user profile"/>
                            <span>{item.bookingUser.email}</span>
   
                            <div className="hover_content">
                                <ul className="list-group booking-info-list">
                                <li className="list-group-item"><i className="bi bi-bookmarks mr-3"></i>{who.titleUnit} </li>
                                <li className="list-group-item"><i className="bi bi-bookmarks mr-3"></i>{item.bookingUser.firstName} {item.bookingUser.lastName} </li>
                                 <li className="list-group-item"><i className="bi bi-calendar-week mr-3"></i> booking from {new Date(item.checkIn).toLocaleString().split(',')[0]} to {new Date(item.checkOut).toLocaleString().split(',')[0]}</li>
                                <li className="list-group-item"><i className="bi bi-people mr-3"></i> {item.adults} Guests</li>
                                </ul>
   
                               
                                <div className="card-footer">
                                <div className="row total-amount pl-3 justify-content">
                                <span className="earn">You Will Earn: <strong>{item.amount} LE</strong></span>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>    

))}

</>
                   ))
                 }
                                    </div>

                                </div>}

                                {/* لحد هناااااااااااا */}


                                
                                <div className="row text-center">
                                    <div className="col host-home-linl" >
                                        <Link to={`/profile/post`} className="btn home-post-btn2 ml-2 mt-3">Host New Property </Link>
                                    </div>
                                </div>
                            </div>
                            }

                        </div>
                    </div>
                </section>

                <Footer />
            </>
        );
    }
}

export default Profile;


       /* URL = () => {
            this.setState({ profilePic: true })
        }
    */
        //get user posts
      /*  getPOSTS = async () => {
            if (this.state.result['posts'].length === 0) {
                console.log('no posts')
                this.setState({ foundPosts: true })
            }
            else {
                this.setState({ foundPosts: false })
                console.log('there are posts')
                const getData = []
                for (let key in this.state.result['posts']) {
    
                    console.log(this.state.result['posts'][key])
                    const response = await axios.get('/post/' + this.state.result['posts'][key])
                    console.log('i am in get')
                    getData.push(
                        getData[key] = response.data.post
                    )
                    console.log(getData.length)
                }
                console.log(getData)
                this.setState({ postsfromUSER: getData })
            }
        }
    */
    
      
    
        
        /*handelAbout = () => {
            this.setState({ isClick: true })
        }*/
    
        
    
           
  /*      reload = () => {
            //window.location.reload(false)
        }
*/