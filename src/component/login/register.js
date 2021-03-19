import React, { Component } from 'react';
import './login.css'
import face from '../../imgs/facebook-logo.png'
import google from '../../imgs/google-logo.png'
import Joi from 'joi-browser'
import axios from '../../axiosConfig/axios'


class Register extends Component {
    state = {
        Users: {
            email: '',
            password: '',
        },
        errors: {},
        emailFOUND: false,
        getresponce: [],
        getALLmail: [],
        getALLpas: [],
        wrongPass: false,
    }

    componentDidMount() {
        axios.get(`/user/all`)
            .then(response => {
                //console.log(response.data.users)
                const getData = []
                for (let key in response.data.users) {
                    //console.log(key)
                    //console.log(response.data.users[key])
                    getData.push(
                        getData[key] = response.data.users[key]
                    )
                }
                //console.log(getData)
                this.setState({ getresponce: getData })
                //console.log(this.state.getresponce)

                //get all mails
                const getmails = []
                const getPass = []
                for (let key in this.state.getresponce) {
                    getmails.push(
                        getmails[key] = this.state.getresponce[key].email
                    )

                    getPass.push(
                        getPass[key] = this.state.getresponce[key].password
                    )
                }
                this.setState({ getALLmail: getmails })
                this.setState({ getALLpas: getPass })
                console.log(this.state.getALLpas)
                //console.log(this.state.getALLmail)

            })
        //console.log(this.state.getresponce)

    }

    passIconAppare = () => {
        this.state.appare === 'password' ? this.setState({ appare: 'text' }) : this.setState({ appare: 'password' })
    }

    schema = {
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    }

    getData = (e) => {
        e.preventDefault();
        //console.log(e.target.value)
        const data = {
            email: this.state.Users.email,
            password: this.state.Users.password,
        }
        const err = this.validateEnteries()
        console.log(this.state.errors === {})
        ////// 35355526-35355625-35355522
        if (err === null) {
            console.log('login');
            const value = this.state.getALLmail.find(e => e === data.email)
            const index = this.state.getALLmail.findIndex(e => e === data.email)
            //console.log(value)
            //console.log(index)

            if (value === undefined) {
                this.setState({ emailFOUND: true })
            }
            else {
                if (this.state.getALLpas[index]) {
                    console.log(this.state.getALLpas[index])
                    this.setState({ emailFOUND: false })
                    const getID = this.state.getresponce[index]._id
                    //console.log(getID)
                    //post to database
                    axios.post('/login', data).then(response => {
                        console.log(response.data.token)
                        localStorage.setItem('token', response.data.token)
                        this.props.allprops.history.replace(`/profile/${getID}`)
                    }).catch(error => console.log(error))
                    console.log('accurate pass')
                }
                else {
                    console.log('wrong pass')
                }
            }
        }
        //console.log(this.state.errors)
        else {
            console.log('not login')
        }


    }

    //validate data
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
        //return errors
    }

    handelChang = e => {
        const Users = { ...this.state.Users }
        Users[e.currentTarget.name] = e.currentTarget.value
        this.setState({ Users })
        //console.log(Users)
    }

    render() {
        //console.log(this.props.AllMail)
        return (
            <div className="form form--login">
                <div className="form--heading"><h3>Welcome back! </h3></div>
                <form className="login-form" autoComplete="off" onSubmit={this.getData}>
                    {this.state.emailFOUND && <small className="text text-danger"> User NOT Exists please signup</small>}


                    {this.state.errors.email && (<small className="form-text text-danger">{this.state.errors.email}</small>)}
                    <input className="mainInput" type="text" placeholder="Email" name="email"
                        value={this.state.Users.email} onChange={this.handelChang} />


                    {this.state.errors.password && (<small className="form-text text-danger">{this.state.errors.password}</small>)}
                    <small className="btn-show-pass show-pass "> <i className="fa fa-eye" onClick={this.passIconAppare} aria-hidden="true"></i> </small>
                    <input className="mainInput" type="password" placeholder="Password" name="password"
                        value={this.state.Users.password} onChange={this.handelChang} />


                    <button className="button">Login</button>
                    <div className="divider2">Or</div>
                    <div className="btn-group">
                        <div className="gmail-btn">
                            <img src={google} alt="Gmail" />
                            <span>Log in with Gmail</span>
                        </div>
                        <div className="facebook-btn">
                            <img src={face} alt="Facebook" />
                            <span>Log in with Facebook</span>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default Register;

