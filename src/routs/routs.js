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

//admin routs
const AdminIndex = React.lazy(() => import('../admin/index/index'));
const GetAllUser = React.lazy(() => import('../admin/adminUser/getALLuser'));
const GetAllPosts = React.lazy(() => import('../admin/adminPost/getALLpost'));

class Routs extends Component {
    state = {
    }
    render() {
        return (
            <Suspense fallback='loading...'>
                <Switch>
                    <Route path="/home/:search?" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/study" exact component={Study} />
                    <Route path="/index" exact component={Index} />
                    <Route path="/profile/details/:postID" exact component={Details} />
                    <Route path="/profile/post" exact component={formPosts} />

                    <Route path="/admin" exact component={AdminIndex} />
                    <Route path="/admin/users" exact component={GetAllUser} />
                    <Route path="/admin/posts" exact component={GetAllPosts} />

                    <Redirect from="/" to="/index" />
                    <Redirect to="/notfound" />
                </Switch>
            </Suspense>
        );
    }
}

export default Routs;

/*                    
<Route path="/login" exact component={Login} />
<Route path="/profile/:id" exact component={Profile} />
*/

