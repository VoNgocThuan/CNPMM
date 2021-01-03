// import React from 'react';
import ReactDOM from 'react-dom';

import React, {Component} from 'react';

class Counter extends Component {
    state = {
        counter:0
    }
    incrementCounter = (value) =>{
        let counter = this.state.counter + value;
        this.setState({
            counter
        });
    };
    decrementCounter = (value) =>{
        let counter = this.state.counter - value;
        this.setState({
            counter
        });
    };
    render() { 
        return (  
        <div>
            <div className="container mt-5">
                <h2>Count: {this.state.counter}</h2>
                <button className="btn btn-success btn-lg"
                onClick={() => this.incrementCounter(10)}>
                    +
                </button>
                <button className="btn btn-danger btn-lg ml-2"
                onClick={() => this.decrementCounter(5)}>
                    -
                </button>
            </div>
        </div>
        );
    }
}
 
export default Counter;

if (document.getElementById('counter')) {
    ReactDOM.render(<Counter />, document.getElementById('counter'));
}
