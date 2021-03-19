import React, { Suspense, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//lazy loading
const Home = React.lazy(() => import('../component/Home/MainHome'));
const Login = React.lazy(() => import('../component/login/login'));
const Profile = React.lazy(() => import('../component/profile/profile'));
const Study = React.lazy(() => import('../study/mail'));
const Index = React.lazy(() => import('../component/index/index'));
const Details = React.lazy(() => import('../component/Home/details/details'));
const formPosts = React.lazy(() => import('../component/profile/postPosts/formPosts'));


class Routs extends Component {
    state = {
    }
    render() {
        return (
            <Suspense fallback='loading...'>
                <Switch>
                    <Route path="/home/:id" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/profile/:id" exact component={Profile} />
                    <Route path="/study" exact component={Study} />
                    <Route path="/index" exact component={Index} />
                    <Route path="/profile/:id/details/:postid" exact component={Details} />
                    <Route path="/profile/:id/post" exact component={formPosts} />
                    <Redirect from="/" to="/home" />
                    <Redirect to="/notfound" />
                </Switch>
            </Suspense>
        );
    }
}

export default Routs;

