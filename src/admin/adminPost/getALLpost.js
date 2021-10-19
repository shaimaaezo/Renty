import React, { Component } from 'react';
import './getALLpost.css'
import $ from 'jquery'
import logo from '../../imgs/logo.png'
import axios from '../../axiosConfig/axios'
import { Link } from 'react-router-dom';

/* 
import '../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'
import '../../../node_modules/datatables.net-dt/js/dataTables.dataTables.min.js' */

class AllPosts extends Component {

    state = {
        result: [],
        resultobj: [],
        approvePosts: [],
        pendingPosts: [],
        rejectPosts: [],
        NumberOfAllPosts: 0,
        NumberOf_ApprovePosts: 0,
        NumberOf_PendingPosts: 0,
        NumberOf_RejectPosts: 0,

        Isdeleted: false,
        Isapporved: false
    }

    componentDidMount() {
        /* $('#table_id').DataTable();

        $(function () {
        $('[data-toggle="tooltip"]').tooltip()
        }) */

        axios.get('/post/all').then(res => {
            console.log(res.data)
            const getData = []
            for (let key in res.data) {
                getData.push(
                    getData[key] = res.data[key]
                )
            }
            console.log(getData)
            this.setState({ resultobj: getData })
            console.log(this.state.resultobj)

            this.setState({ result: this.state.resultobj['posts'] })
            console.log(this.state.result)

        }).catch(err => { console.log(err) })

    }

    //admin@renty.com
    //admin1

    delete = (postID) => {
        console.log(postID)
        axios.delete(`/post/delete/${postID}`).then(res => {
            console.log(res)
            this.setState({ Isdeleted: true })
        }).catch(err => { console.log(err) })
    }

    MakeApprove(posstID) {
        console.log(posstID)
        const data = {
            statusUnit: "approve"
        }
        axios.patch(`/post/pendeing-action/${posstID}`, data).then(res => {
            console.log(res)
            this.setState({ Isapporved: true })
        }).catch(err => { console.log(err) })
    }

    logout=()=>{
        console.log('in log out')
        localStorage.removeItem('token')
      }

    render() {
        console.log(this.state.result)
        return (
            <>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/home">
                        <img src={logo} width="30" height="30" className="d-inline-block align-top ml-lg-5" alt="" />
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
                                    <a className="dropdown-item" href="#">Profile</a>
                                    <a className="dropdown-item" href="#">Tasks</a>
                                    <a className="dropdown-item" href="#">Etc ...</a>
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

                        <div className="content-heading mt-5 ml-2">
                        {this.state.Isdeleted &&
                            <div class="col-6 mx-auto alert alert-danger alert-dismissible fade show" role="alert">
                                Post has been<strong> Deleted</strong>.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }

                        {this.state.Isapporved &&
                            <div class="col-6 mx-auto alert alert-success alert-dismissible fade show" role="alert">
                                Post has been<strong> Approved</strong>.
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }
                            <h4>All Posts</h4>
                        </div>


                        <div className="table-wrapper mt-3">

                            <table id="table_id" className="display" style={{ width: "100%" }}>
                                <thead className="bg-dark text-light">
                                    <tr>

                                        <th>Post Tittle</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Guests</th>
                                        <th>Bedrooms</th>
                                        <th>Bathrooms</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.result.map(post => (
                                        <tr>

                                            <td>{/* <a href="../details.html"> */}{post.titleUnit}{/*</a>*/}</td>
                                            <td>{post.rentalPriceUnit}</td>
                                            <td>{post.categoryUnit}</td>
                                            <td>{post.guestsUnit}</td>
                                            <td>{post.bedroomsUnit}</td>
                                            <td>{post.bathroomsUnit}</td>
                                            {post.statusUnit === "pending" ? <td><button onClick={() => this.MakeApprove(post._id)} className="post-status pending" data-toggle="tooltip" data-placement="top" title="Click To Approve">{post.statusUnit}</button></td> : <td><span className="post-status approve" data-toggle="tooltip" data-placement="top" title="Approve post">{post.statusUnit}</span></td>}
                                            <td><button style={{ backgroundColor: "white", borderColor: "white" }} onClick={() => this.delete(post._id)} ><i className="bi bi-trash text-danger"></i></button></td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>

                        <div className="add-btn-wrapper">
                            {/*                             <a href="addpost.html" className="btn btn-default add-btn mt-3"><i className="bi bi-plus-circle mr-1"></i> Add New Post</a>
 */}                        </div>







                        <footer className="mt-5">
                            <div className="footer mt-5 p-3 text-center text-dark ">
                                <span>Copyright copy 2021 All rights reserved | Made with ♥ by ITI Aswan Mearn Stack</span>
                            </div>
                        </footer>
                    </div>






                </div>

            </>
        );
    }
}

export default AllPosts;