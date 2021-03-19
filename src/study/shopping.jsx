import Product from './product'
//import { Component } from 'react';

import React, { Component } from 'react';

class Shopping extends Component {
    state = {  }
    render() { 
        console.log(this.props)
        return ( 
            <div>
                <h1>hello from shopping</h1>
                {this.props.product.length === 0 && <h3>no product here</h3>}
                <div>
                    {this.props.product.map(prod => (
                        <Product 
                        key={prod.id} 
                        product={prod} 
                        onClickdel={this.props.handelClick} 
                        increase={this.props.handelIncrease} />
                    ))}
                </div>
            </div>
         );
    }
}
 
export default Shopping;
