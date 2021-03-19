import React, { Component } from 'react';
import './profile.css'
import axios from '../../axiosConfig/axios'

import Footer from '../../subcomponent/profile/footer';
import UserCard from '../../subcomponent/profile/postcard';
import { Link } from 'react-router-dom';

import profileImg from '../../imgs/user-profile.svg'


class Profile extends Component {
    state = {
        result: [],
        isClick: false,
        Users: {
            posts: [],
            role: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: 0,
            profilePic: '',
            rating: 0,
            about: '',
            reviewsByUser: '',
            reviewsAtUser: '',
            address: '',
            //userID: '',

        },
        postsfromUSER: [],
    }

    componentDidMount() {
        //console.log(this.props)

        axios.get(`/user/${this.props.match.params.id}`)
            .then(response => {
                const getData = []
                for (let key in response.data.Data) {
                    getData.push(
                        getData[key] = response.data.Data[key]
                    )
                }
                this.setState({ result: getData })

                //console.log(this.state.result)
                //console.log(this.state.result) 
                /*var newresult = {
                    ...response.data.Data,
                    phoneNumber: 0,
                    profilePic: '',
                    rating: 0,
                    about: '',
                    reviewsByUser: '',
                    reviewsAtUser: '',
                    address: ''}

                    this.setState({allDATA:newresult})
                    console.log(this.state.allDATA)
                */
            })
    }

    URL = () => {
        this.setState({ profilePic: true })
    }

    //get user posts
    getPOSTS = async () => {
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


    PatchData = (e) => {
        e.preventDefault();
        this.setState({ isClick: false })
    
        this.handelUPLOADImage()
        console.log(this.state.result[3],"firstname")
        console.log(this.state.result[4],"last name ")
        console.log(this.state.result, "resulttttttttttttttttttt")


        const data = {
            firstName:this.state.result[3]   ,
            lastName: this.state.result[4],
            email: this.state.result[5],
            address: this.state.result[11],
            phoneNumber: this.state.Users.phoneNumber,
            about: this.state.Users.about
        }
        console.log(data, "dataaaaaaaaaaa")
        axios.patch(`/user/update/${this.props.match.params.id}`,data).then(res=>{
            console.log(res.data, "resssssssssss")
            this.setState({result :res.data})
        })

        //console.log(this.state.Users)
        //console.log(this.state.result)
        //axios.patch(`/user/update/${this.props.match.params.id}`, data).then(response => {
        // this.setState({ Users: response.data.Data })
        //console.log(response.data)
        //const getData = this.state.result
        //console.log(getData)
        /* for (let key in response.data.Data) {
             console.log(this.state.result[key])
             //this.state.result[key] = response.data.Data[key]
         }*/
        //this.setState({updated: getData })



        //})
    }

    handelChangtext = e => {
        const Users = { ...this.state.Users }
        Users[e.currentTarget.name] = e.currentTarget.value
        this.setState({ Users })

    }

    /*handelAbout = () => {
        this.setState({ isClick: true })
    }*/

    handelFILEimages = event => {
        //const img = [...this.state.profilePic]
        //img.push(event.target.files[0])
        this.setState({
            profilePic: event.target.files[0]
        })
        //console.log(event.target.files[0])
        
    }

    handelUPLOADImage = () => {
        
        if (this.state.profilePic.name ) {
            const fd = new FormData();
            fd.append('image', this.state.profilePic, this.state.profilePic.name)
            axios.patch(`/post/image-profile/${this.props.match.params.id}`, fd).then(res => {
                console.log(res)
                console.log('in handelUPLOAD')

            }).catch(err => {console.log(err)})
        }else{
            console.log('no file')
        }



    }

    reload = () => {
        //window.location.reload(false)
    }
    render() {
        //console.log(this.state.result)
        //console.log(this.state.result['profilePic'])
        console.log(this.state.result)
        var img = profileImg
        if (this.state.result['profilePic']){
            console.log('ther are image')
            img = 'http://localhost:4000/' + this.state.result['profilePic']
        }
// {<img src={'http://localhost:4000/' + this.state.result['profilePic']} className="card-img-top profile-img" alt="" />}

        return (
            <>
                <section className="posts-container mt-5" id="posts-container" >
                    <div className="container">
                        <div className="row profile-wrapper">
                            <div className="col-lg-4">
                                <div className="card profile-card mb-5" >
                                    {<img src={img} className="card-img-top profile-img" alt="" />}
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{this.state.result['firstName']}</h5>


                                        <div className="col-9">
                                            <p className="card-text">{this.state.result['about']}</p>
                                            {/*this.state.isClick === false && <p className="card-text">{this.state.result['about']}</p>}
                                            {this.state.isClick === true && <><input type="text" name="about"
                                                value={this.state.about} onChange={this.handelChangtext} />
                                                 <button onClick={this.PostReamin}>save</button></>*/}
                                        </div>
                                        <div className="col-3">
                                            {/*this.state.isClick === false && <button onClick={this.handelAbout}>about</button>*/}
                                        </div>


                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item profile-list-item">
                                            <i className="bi bi-geo-alt mr-3"></i> {this.state.result['address']}</li>
                                        <li className="list-group-item profile-list-item">
                                            <i className="bi bi-envelope mr-3"></i> {this.state.result['email']}</li>
                                        <li className="list-group-item profile-list-item">
                                            <i className="bi bi-telephone mr-3"></i> {this.state.result['phoneNumber']}</li>
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
                                                            <div className="input-group form-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="bi bi-envelope"></i></div>
                                                                </div>
                                                                <input type="text" className="form-control" placeholder="Email" name="email"
                                                                    defaultValue={this.state.result['email']} onChange={this.handelChangtext}
                                                                />
                                                            </div>
                                                            {/*<div className="input-group form-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="bi bi-lock"></i></div>
                                                                </div>
                                                                <input type="password" className="form-control" placeholder="Password" 
                                                                />
                                                            </div>
                                                            <div className="input-group form-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="bi bi-telephone"></i></div>
                                                                </div>
                                                                <input type="password" className="form-control" placeholder="Phone number" name="phone"
                                                                    value={this.state.result['phone} onChange={this.handelChangtext}
                                                                />
                                                </div>*/}
                                                            <div className="input-group form-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text"><i className="bi bi-geo-alt"></i></div>
                                                                </div>
                                                                <input type="text" className="form-control" placeholder="Address" name="address"
                                                                    defaultValue={this.state.result['address']} onChange={this.handelChangtext}
                                                                />
                                                            </div>
                                                            <div className="form-group img-form">
                                                                <div className="">
                                                                    <input type="file" onChange={this.handelFILEimages} />
                                                                    <div className="input-group col-xs-12">
                                                                        <span className="input-group-btn">
                                                                            <button className="upload-field btn btn-upload-profile" type="button"><i className="bi bi-cloud-arrow-up"></i> Browse</button>
                                                                        </span>
                                                                        <input type="text" className="form-control" disabled placeholder="Upload Image" />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group align-text-left">
                                                                <label htmlFor="exampleFormControlTextarea1 float-left">About</label>
                                                                <textarea className="form-control" rows="2" name="about"
                                                                    defaultValue={this.state.result['about']} onChange={this.handelChangtext} ></textarea>
                                                            </div>

                                                            <button type="submit" className="btn btn-edit-form" onClick={this.PatchData} >Save Changes <i className="bi bi-check2"></i></button>

                                                        </form>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*<UserPosts result={this.state.result} props={this.props}/>*/}

                            {<div className="col-lg-8 ml-auto">
                                <div className="row text-center">

                                    {<div className="col host-home-linl" >
                                        {this.state.foundPosts && (<div className="center">there is no posts yet , post NOW -^</div>)}
                                        <button className="btn home-post-btn ml-2 mt-3" onClick={this.getPOSTS}>show posts</button>
                                    </div>}
                                </div>
                                {this.state.postsfromUSER.map(post => (
                                    <UserCard
                                        key={parseInt(post._id)}
                                        posts={post}
                                    />
                                )
                                )}
                                <div className="row text-center">
                                    <div className="col host-home-linl" >
                                        <Link to={`/profile/${this.props.match.params.id}/post`} className="btn home-post-btn ml-2 mt-3">Host New Property </Link>
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