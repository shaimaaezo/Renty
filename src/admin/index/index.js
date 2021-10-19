import React, { Component } from 'react';
import './index.css'
import img from '../../imgs/logo.png'
import { Link } from 'react-router-dom';
import axios from '../../axiosConfig/axios'


class Index extends Component {
    state = {
        resultPOST:[],
        resultUSER:[],
        NumberOfAllPosts: 0,
        NumberOf_PendingPosts: 0 ,
        NumberOf_ApprovePosts: 0,
        NumberOfAllBookings: 0
    }

    componentDidMount(){
        axios.get('/user/all').then(res=>{
            console.log(res.data.users)
            const getData = []
            for (let key in res.data.users) {
                getData.push(
                    getData[key] = res.data.users[key]
                )
            }
            this.setState({ resultUSER: getData })
            console.log(this.state.resultUSER)

        }).catch(err=>{console.log(err)})

        axios.get('/post/all').then(res => {
            console.log(res.data)
            const getData = []
            for (let key in res.data.posts) {
                getData.push(
                    getData[key] = res.data.posts[key]
                )
            }
            console.log(getData)

            this.setState({ resultPOST: getData })
            //console.log(this.state.resultPOST)

            this.setState({NumberOfAllPosts:res.data.NumberOfAllPosts})
            //console.log(this.state.NumberOfAllPosts)

            this.setState({NumberOf_PendingPosts: res.data.NumberOf_PendingPosts})
            //console.log(this.state.NumberOf_PendingPosts)

            this.setState({NumberOf_ApprovePosts: res.data.NumberOf_ApprovePosts})

        }).catch(err => { console.log(err) })

        axios.get('/book/all?page=1&limit=1000').then(res=>{
            console.log(res.data)
            this.setState({ NumberOfAllBookings: res.data.NumberOfAllBookings })
            console.log(this.state.NumberOfAllBookings)

        }).catch(err=>{console.log(err)})

    }


    logout=()=>{
        console.log('in log out')
        localStorage.removeItem('token')
      }

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/home">
                        <img src={img} width="30" height="30" className="d-inline-block align-top ml-lg-5" alt="" />
                        <span className="menu-collapsed">Renty</span>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">


                            <li className="nav-item mr-3">
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle profile-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="nav-admin-name">  Admin <i className="bi bi-caret-down-fill"></i></span>
                                    </button>
                                    <div className="dropdown-menu profile-dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Link className="dropdown-item" to="/profile">Profile</Link>
                                        <Link className="dropdown-item" to="/home">Go to Renty</Link>
                                        <div className="dropdown-divider"></div>
                                        <Link className="dropdown-item" to="/login" onClick={this.logout}>Log Out</Link>
                                    </div>
                                </div>
                            </li>

                            <li className="nav-item dropdown d-sm-block d-md-none">
                                <a className="nav-link dropdown-toggle" href="#" id="smallerscreenmenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Menu
            </a>
                                <div className="dropdown-menu" aria-labelledby="smallerscreenmenu">
                                    <a className="dropdown-item" href="#">Dashboard</a>
                                    <a className="dropdown-item" href="#">users</a>
                                    <a className="dropdown-item" href="#">posts</a>
                                </div>
                            </li>

                        </ul>

                    </div>
                </nav>

                <div className="row" id="body-row">
                    <div id="sidebar-container" className="sidebar-expanded d-none d-md-block">

                        <ul className="list-group">
                            <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                                <small>MAIN MENU</small>
                            </li>
                            <Link to="/admin" className="bg-dark list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <i className="bi bi-speedometer2 mr-3"></i>
                                    <span className="menu-collapsed">Dashboard</span>
                                </div>
                            </Link>

                            <a href="#submenu1" data-toggle="collapse" aria-expanded="false" className="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <i className="bi bi-stickies mr-3"></i>
                                    <span className="menu-collapsed">Posts</span>
                                    <span className="submenu-icon ml-auto"></span>
                                </div>
                            </a>
                            <div id='submenu1' className="collapse sidebar-submenu">
                                <Link to='/admin/posts' className="list-group-item list-group-item-action bg-dark text-white">
                                    <span className="menu-collapsed">View All Posts</span>
                                </Link>
                                {/* <a href="addpost.html" className="list-group-item list-group-item-action bg-dark text-white">
                                    <span className="menu-collapsed">Add New Post</span>
                                </a> */}
                            </div>


                            <a href="#submenu2" data-toggle="collapse" aria-expanded="false" className="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <i className="bi bi-people mr-3"></i>
                                    <span className="menu-collapsed">Users</span>
                                    <span className="submenu-icon ml-auto"></span>
                                </div>
                            </a>
                            <div id='submenu2' className="collapse sidebar-submenu">
                                <Link to='/admin/users' className="list-group-item list-group-item-action bg-dark text-white">
                                    <span className="menu-collapsed">View All Users</span>
                                </Link>
                                {/* <a href="#" className="list-group-item list-group-item-action bg-dark text-white">
                                    <span className="menu-collapsed">Add New User</span>
                                </a> */}
                            </div>




                            {/* <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                                <small>OPTIONS</small>
                            </li>

                            <a href="#" className="bg-dark list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <i className="bi bi-envelope mr-3"></i>
                                    <span className="menu-collapsed">Contact Us<span className="badge badge-pill badge-primary ml-2">5</span></span>
                                </div>
                            </a>
                            <li className="list-group-item sidebar-separator menu-collapsed"></li>
                            <a href="#" className="bg-dark list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <i className="bi bi-question-circle mr-3"></i>
                                    <span className="menu-collapsed">Help</span>
                                </div>
                            </a>
                            <a href="#" data-toggle="sidebar-colapse" className="bg-dark list-group-item list-group-item-action d-flex align-items-center">
                                <div className="d-flex w-100 justify-content-start align-items-center">
                                    <i className="bi bi-chevron-double-left mr-3"></i>
                                    <span id="collapse-text" className="menu-collapsed">Collapse</span>
                                </div>
                           </a>*/}

                        </ul>

                    </div>





                    <div className="col container">

                        <h4 className="mt-3 mb-3">
                            Workset
                <small className="text-muted">Version 1.0</small>
                        </h4>

                        <div className="">
                            <div className="row">

                                <div className="col-sm-3">
                                    <div className="card min-card1">
                                        <div className="card-body row">
                                            <div className="col-3">
                                                <span className="card-icon text-info"><i className="bi bi-people-fill"></i></span>
                                            </div>
                                            <div className="col-9 text-center card-text">
                                                <h5>{this.state.resultUSER.length}</h5>
                                                <span>ALL USERS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <div className="card min-card2">
                                        <div className="card-body row">
                                            <div className="col-3">
                                                <span className="card-icon text-success"><i className="bi bi-chat-left-text-fill"></i></span>
                                            </div>
                                            <div className="col-9 text-center card-text">
                                                <h5>{this.state.NumberOfAllPosts}</h5>
                                                <span>ALL POSTS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <div className="card min-card3">
                                        <div className="card-body row">
                                            <div className="col-3">
                                                <span className="card-icon text-warning"><i className="bi bi-clock-fill"></i></span>
                                            </div>
                                            <div className="col-9 text-center card-text">
                                                <h5>{this.state.NumberOf_PendingPosts}</h5>
                                                <span>PENDING POSTS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <div className="card min-card4">
                                        <div className="card-body row">
                                            <div className="col-3">
                                                <span className="card-icon text-danger"><i class="bi bi-stickies"></i></span>
                                            </div>
                                            <div className="col-9 text-center card-text">
                                                <h5>{this.state.NumberOfAllBookings}</h5>
                                                <span>All Bookings</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>






                </div>
            </>


        );
    }
}

export default Index;