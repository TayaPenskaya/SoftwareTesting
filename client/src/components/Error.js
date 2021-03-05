import './index.css';
import { Component } from 'react';

class Error extends Component {

    render() {
        let message = this.props.location.state.detail;
        console.log(message);
        return (
            <h2>{ message}</h2>
        );
    }
}

export default Error;