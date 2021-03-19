import  Shopping  from "./shopping"
import { Component } from 'react';
import Nav from "./nav";

class Main extends Component {
    state={
        product:[
            {id:1,name:"hend",count:0},
            {id:2,name:"shaima",count:0},
            {id:3,name:"rewan",count:5}
        ]

    }

    del=products=>{
        console.log(products)
        const product = this.state.product.filter(p=> p.id !== products.id)
        this.setState({product})
        
    }
///////////////////////////////////////////////////
    inc = (p) => {
        this.setState({ count: p.count + 1 })
        console.log(p)
    }
    render() { 
        return ( 
            <div>
                <Nav len={this.state.product.filter((p)=>p.count>0).length}/>
                <Shopping 
                product={this.state.product} 
                handelClick={this.del} 
                handelIncrease={this.inc}/>
            </div>
         );
    }
}
 
export default Main;