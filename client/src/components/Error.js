import './index.css';
import { Component } from 'react';

class Error extends Component {

    render() {
        let message = this.props.location.state.detail;
        console.log(message);
        return (
            <h2 dangerouslySetInnerHTML={{__html: message}}/>
        );
    }
}

export default Error;