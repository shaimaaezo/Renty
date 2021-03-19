//import { NavLink } from 'react-router-dom'
import '../../component/Home/MainHome.css'
import firImg from '../../imgs/p1.jpg'
import { NavLink } from "react-router-dom";



const HomePosts = (props) => {
    console.log(props.posts)
    return (
        <div className="d-block d-md-flex listing-horizontal">
            <img className="img d-block post-img" src={firImg} alt="" />
            <span className="status">Available</span>
            <div className="post-content align-self-center pl-4 pt-4 pb-4 pr-4">
                <h3 className="post-tittle">{props.posts.titleUnit}</h3>
                <p>{props.posts.locationUnit}</p>
                <p className="description">{props.posts.descriptionUnit}</p>
                <div className="post-review">
                    {/*this is stars review*/}
                    <span className="bi bi-star-fill checked"></span>
                    <span className="bi bi-star-fill checked"></span>
                    <span className="bi bi-star-fill checked"></span>
                    <span className="bi bi-star-fill"></span>
                    <span className="bi bi-star-fill"></span>
                    <span className="review-numder ml-1">{props.posts.ratingUnit}</span>

                </div>
                <div className="container text-end">
                    <span><NavLink to={`/profile/${props.posts.userID}/details/${props.posts._id}`} className="details-btn btn btn-outline mt-3">
                        View Details <i className="bi bi-arrow-right"></i></NavLink></span>

                        
                </div>
                </div>
            </div>
    );
}

export default HomePosts;

/*this.props.history.replace(`/profile/${response.data.name}`)
<NavLink to="home/details/" className="details-btn btn btn-outline mt-3">
*/