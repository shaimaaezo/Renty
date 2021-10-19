import React, { Component } from 'react';
import './login.css'
import axios from '../../axiosConfig/axios'
import logo from '../../imgs/logo.png'
/* import google from '../../imgs/google-logo.png'
import facebook from '../../imgs/facebook-logo.png' */
import Joi from 'joi-browser'
import Register from './register';
import $ from 'jquery'
//import Routs from '../../routs/routs'


class Login extends Component {
    state = {
        Users: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        errors: {},
        appare: 'password',
        /*getALLmail: [],
        emailFOUND: false,
        signup: '',
        apparesignup: true,
        signUPID: ''*/
    }


    componentDidMount() {
   
        // Hide place holder on focus
        $('[placeholder]').focus(function () {
            $(this).attr('data-text', $(this).attr('placeholder'));
            $(this).attr('placeholder', '');
        }).blur(function () {
            $(this).attr('placeholder', $(this).attr('data-text'));
        });

        // Show Password
        var password = $('.password');
        $('.show-pass').hover(function () {
            password.attr('type', 'text');
        }, function () {
            password.attr('type', 'password');
        });

        $("#signup").click(function () {
            $(".message").css("transform", "translateX(100%)");
            if ($(".message").hasClass("login")) {
                $(".message").removeClass("login");
            }
            $(".message").addClass("signup");
            $("#login").toggleClass("show hide");
            $("#signup").toggleClass("hide show");
        });

        $("#login").click(function () {
            $(".message").css("transform", "translateX(0)");
            if ($(".message").hasClass("login")) {
                $(".message").removeClass("signup");
            }
            $(".message").addClass("login");
            $("#login").toggleClass("hide show");
            $("#signup").toggleClass("show hide");
        });

        //get all users
    }

    //schema of Joi
    schema = {
        firstName: Joi.string().min(3).max(25).required(),
        lastName: Joi.string().min(2).max(25).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    }

    //take data from text box 
    handelChang = e => {
        const Users = { ...this.state.Users }
        Users[e.currentTarget.name] = e.currentTarget.value
        this.setState({ Users })
    }

    validateEnteries = () => {
        const errors = {}
        const res = Joi.validate(this.state.Users, this.schema, { abortEarly: false })
        //console.log(res)
        if (res.error === null) {
            this.setState({ errors: {} })
            return null;
        }
        for (const err of res.error.details) {
            errors[err.path] = err.message
        }

        this.setState({ errors })
        return errors
    }

    //posst data
    postData = (e) => {
            e.preventDefault();
            //console.log(e.target.value)
            const data = {
                firstName: this.state.Users.firstName,
                lastName: this.state.Users.lastName,
                email: this.state.Users.email,
                password: this.state.Users.password,    
            }
            const err = this.validateEnteries()
            console.log(err)
            if (err === null) {
                console.log('in err null')    
                axios.post('/register', data).then(response => {
                    console.log(response)
                    localStorage.setItem('token', response.data.token)
                    this.props.history.replace(`/home`)
                }).catch(error => console.log(error))
            }else {
                console.log('not login')
            }    
    }

    passIconAppare = () => {
        this.state.appare === 'password' ? this.setState({ appare: 'text' }) : this.setState({ appare: 'password' })
    }

    render() {
        return (
            <div className="body">
                <div className="form-container">
                    <div className="message signup">
                        <div className="btn-wrapper">
                            <img className="form-logo" src={logo} alt="" />
                            <button className="button hide" id="signup">Sign Up</button>
                            <button className="button show" id="login"> Login</button>
                        </div>
                    </div>
                    <div className="form form--signup">
                        <div className="form--heading"><h3>Welcome! Sign Up</h3></div>
                        <form className="login-form" onSubmit={this.postData} >
                            {/*this.state.emailFOUND && <small className="text text-danger"> User Exists please login</small>*/}
                            {/*!this.state.emailFOUND && <small className="text text-danger"> {this.state.signup} </small>*/}

                            <input className="mainInput" type="text" placeholder="First Name" name="firstName"
                                defaultValue={this.state.Users.firstName} onChange={this.handelChang} />
                            {this.state.errors.firstName && (<small className="form-text text-danger">{this.state.errors.firstName}</small>)}

                            <input className="mainInput" type="text" placeholder="Last Name" name="lastName"
                                defaultValue={this.state.Users.lastName} onChange={this.handelChang} />
                                {this.state.errors.lastName && (<small className="form-text text-danger">{this.state.errors.lastName}</small>)}

                            <input className="mainInput" type="email" required placeholder="Email" name="email"
                                defaultValue={this.state.Users.email} onChange={this.handelChang} />
                            {this.state.errors.email && (<small className="form-text text-danger">{this.state.errors.email}</small>)}

                            <small className="btn-show-pass show-pass "> <i className="fa fa-eye" onClick={this.passIconAppare} aria-hidden="true"></i> </small>
                            <input className="mainInput password" required type={this.state.appare} placeholder="Password" name="password"
                                defaultValue={this.state.Users.password} onChange={this.handelChang} />
                                {this.state.errors.password && (<small className="form-text text-danger">{this.state.errors.password}</small>)}

                            {/*this.state.apparesignup && */<button className="button">Sign Up</button>}
                            
                        </form>
                    </div>


                    <Register props={this.props}/>
                </div>
            </div>
            /////////src/imgs/bg.jpg
        );
    }
}

export default Login;

/*
<Register
                        AllMail={this.state.getALLmail}
                        emailFOUND={this.state.emailFOUND}
                        signUPID={this.state.signUPID}
                        allprops={this.props}
                    />

console.log(this.props)
        axios.get(`/user/all`)
            .then(response => {
                //console.log(response.data.users)
                const getData = []

                for (let key in response.data.users) {
                    //console.log(key)
                    console.log(response.data.users[key].email)
                    getData.push(
                        getData[key] = response.data.users[key].email
                    )

                }
                this.setState({ getALLmail: getData })

            })
            */

        
    
    
        
        /*reload = () => {
            window.location.reload(false);
            this.setState({ signup: "you sign up successulgy please login now ^ ^" })
        }
    */
        //validate data
      /*  
    
        
        
        $("#signup").click(function () {
            $(".message").css("transform", "translateX(100%)");
            if ($(".message").hasClass("login")) {
                $(".message").removeClass("login");
            }
            $(".message").addClass("signup");
        });

        $("#login").click(function () {
            $(".message").css("transform", "translateX(0)");
            if ($(".message").hasClass("login")) {
                $(".message").removeClass("signup");
            }
            $(".message").addClass("login");
        });
        */