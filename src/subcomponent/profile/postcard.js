import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../component/profile/profile.css' 

class UserCard extends Component {
    state = { 
        
     }
    
    render() { 
        //console.log(this.props.posts.imagesRentalUnit[0])
        return ( 
            <div className="posts-wrapper">
                <div className="d-block d-md-flex listing-horizontal">
                    <img className="img d-block post-img" src={'http://localhost:4000/'+this.props.posts.imagesRentalUnit[0]} alt="" />
                    <span className="status ">{this.props.posts.statusUnit}</span>
                    <div className="post-content align-self-center pl-4 pt-4 pb-4 pr-4">
                        <h3 className="post-tittle">{this.props.posts.titleUnit}</h3>
                        <p>{this.props.posts.locationUnit}</p>
                        <p className="description">{this.props.posts.descriptionUnit}.</p>
                        <div className="post-review">
                            <span className="bi bi-star-fill checked"></span>
                            <span className="bi bi-star-fill checked"></span>
                            <span className="bi bi-star-fill checked"></span>
                            <span className="bi bi-star-fill"></span>
                            <span className="bi bi-star-fill"></span>
                            <span className="review-numder ml-1">(3 Reviews)</span>

                        </div>
                        <div className="container text-end">
                            <span><Link to={`/profile/details/${this.props.posts._id}`} className="details-btn btn btn-outline mt-3">View Details <i className="bi bi-arrow-right"></i></Link></span>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default UserCard;
