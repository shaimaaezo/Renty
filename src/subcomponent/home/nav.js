import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../../component/Home/MainHome.css'
import logo from '../../imgs/logo2.png'
import seclogo from '../../imgs/logo.png'
/* import notification from '../../imgs/ring-notification2.svg'
 */import userProfile from '../../imgs/user-profile.svg'
import '../../component/Home/MainHome'
import axios from '../../axiosConfig/axios'


class Navbar extends Component {
  state = { 
    result:[]

   }

  componentDidMount(){
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
/* 
      this.setState({profilePic: this.state.result['profilePic']})
      console.log(this.state.profilePic) 
      */
  })
  }

  logout = () => {
    console.log('in log out')
    localStorage.removeItem('token')
  }

  render() { 

    var img = userProfile
        if (this.state.result['profilePic']){
            //console.log('ther are image')
            //console.log('http://localhost:4000/' + this.state.result['profilePic'])
            img = 'http://localhost:4000/' + this.state.result['profilePic']
        } 

    return (
  
      <header className="header">
        <nav className="navbar navbar-expand-lg fixed-top py-3">
          <div className="container"><Link to="/" className="navbar-brand"><img src={logo} className="nav-logo mr-1" alt="Renty logo" /><img src={seclogo} className="nav-logo2 mr-1" alt="Renty logo" />Renty</Link>
            <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right"><i className="fa fa-bars"></i></button>
  
            <div id="navbarSupportedContent" className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
  
                {/*  <li className="nav-item">
                            <div className="dropdown">
                              <button className="btn dropdown-toggle p-0 pl-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={notification} className="home-notification-img" alt="" />
                              </button>
                              <div className="dropdown-menu  notification-dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <NavLink className="dropdown-item" to="#">Action</NavLink>
                                
                              </div>
                            </div>
                          </li> */}
                <li className="nav-item">
                  <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img src={img} className="home-nav-dropdown-img" alt="" /></button>
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
      </header>
  
    );
  }
}
 
export default Navbar;

