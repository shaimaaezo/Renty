
const Product = (props) => {
    let state = props.product.count >= 2 ? 'badge badge-primary' : 'badge badge-warning'
    
    return (

        <div className="container row" style={{ marginTop: 50 }}>
                <div className="col-1">
                    <span className="m-2" style={{ backgroundColor: "pink" }}>{props.product.name}</span>
                </div>
                <div className="col-1">
                    <span className={state}>{props.product.count}</span>
                </div>
                <div className="col">
                    <button onClick={() => props.increase(props.product)}>increase</button>

                    <i onClick={()=>props.onClickdel(props.product)} className="fas fa-trash-alt m-2" ></i>
                </div>
            </div>
    );
}

export default Product;

/*

*/



