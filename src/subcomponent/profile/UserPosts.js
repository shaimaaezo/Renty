import React, { Component } from 'react';

import '../../component/profile/profile.css'
import { Link } from 'react-router-dom';
import axios from '../../axiosConfig/axios'
import UserCard from './postcard';


class UserPosts extends Component {
    state = {
        postsfromUSER: [],
        foundPosts:false
    }

    componentDidMount() {
        console.log(this.props.result)  
        if(this.props.result['posts'] ===null){
            console.log('no posts')
            this.setState({foundPosts:true})
        }
        else{
            console.log('there are posts')
            this.getData()
        }   
        
    }
    getData = async () => {
        const getData = []
        for (let key in this.props.result['posts']) {

            console.log(this.props.result['posts'][key])
            const response = await axios.get('/post/' + this.props.result['posts'][key])
            console.log('i am in get')
            getData.push(
                getData[key] = response.data.post
            )
            console.log(getData.length)
        }
        console.log(getData)
        this.setState({ postsfromUSER: getData })
    }

    render() {
        return (
            <div className="col-lg-8 ml-auto">
                {this.state.foundPosts && (<div>there is no posts yet , post NOW -^</div>)}
                {this.state.postsfromUSER.map(post => (
                    <UserCard
                        key={parseInt(post._id)}
                        posts={post}
                    />
                )
                )}
                <div className="row text-center">
                    <div className="col host-home-linl" >
                        <Link to={`/profile/${this.props.props.match.params._id}/post`} className="btn home-post-btn ml-2 mt-3">Host New Property </Link>
                    </div>
                </div>
            </div>

        );
    }
}

export default UserPosts;
