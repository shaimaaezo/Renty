//import { NavLink } from 'react-router-dom'
import '../../component/Home/MainHome.css'
import { NavLink } from "react-router-dom";



const HomePosts = (props) => {

    return (
        <div className="d-block d-md-flex listing-horizontal">
            <img className="img d-block post-img" src={'http://localhost:4000/' + props.posts.imagesRentalUnit[0]} alt="" />
            <span className="status">Available</span>
            <div className="post-content align-self-center pl-4 pt-4 pb-4 pr-4">
                <h3 className="post-tittle">{props.posts.titleUnit}</h3>
                <p>{props.posts.locationUnit}</p>
                <p className="description">{props.posts.descriptionUnit}</p>
                <div className="post-review">
                    {/*this is stars review*/}
                    {props.posts.cumulativeRatingUnit === 0 && <span className="bi bi-star-fill "></span>}
                    {props.posts.cumulativeRatingUnit === 0 && <span className="bi bi-star-fill "></span>}
                    {props.posts.cumulativeRatingUnit === 0 && <span className="bi bi-star-fill "></span>}
                    {props.posts.cumulativeRatingUnit === 0 && <span className="bi bi-star-fill "></span>}
                    {props.posts.cumulativeRatingUnit === 0 && <span className="bi bi-star-fill "></span>}

                    {props.posts.cumulativeRatingUnit === 1 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 1 && <span className="bi bi-star-fill "></span>}
                    {props.posts.cumulativeRatingUnit === 1 && <span className="bi bi-star-fill "></span>}
                    {props.posts.cumulativeRatingUnit === 1 && <span className="bi bi-star-fill "></span>}
                    {props.posts.cumulativeRatingUnit === 1 && <span className="bi bi-star-fill "></span>}


                    {props.posts.cumulativeRatingUnit === 2 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 2 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 2 && <span className="bi bi-star-fill "></span>}
                    {props.posts.cumulativeRatingUnit === 2 && <span className="bi bi-star-fill "></span>}
                    {props.posts.cumulativeRatingUnit === 2 && <span className="bi bi-star-fill "></span>}


                    {props.posts.cumulativeRatingUnit === 3 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 3 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 3 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 3 && <span className="bi bi-star-fill "></span>}
                    {props.posts.cumulativeRatingUnit === 3 && <span className="bi bi-star-fill "></span>}


                    {props.posts.cumulativeRatingUnit === 4 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 4 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 4 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 4 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 4 && <span className="bi bi-star-fill "></span>}

                    {props.posts.cumulativeRatingUnit === 5 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 5 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 5 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 5 && <span className="bi bi-star-fill checked"></span>}
                    {props.posts.cumulativeRatingUnit === 5 && <span className="bi bi-star-fill checked"></span>}

                    <span className="review-numder ml-1">({props.posts.ratingsUnit.length} Reviewers)</span>
                    <span className="homePrice">{props.posts.rentalPriceUnit} LE/Day</span>

                </div>
                <div className="container text-end">
                    <span><NavLink to={`/profile/details/${props.posts._id}`} className="details-btn btn btn-outline mt-3">
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