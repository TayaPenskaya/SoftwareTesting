import './App.css';
import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import 'antd/dist/antd.css';
import axios from 'axios';
import Tables from './components/Tables';
import Register from "./components/Register";
import Login from "./components/Login";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: ''};
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path='/' component={Login}/>
                    <Route path="/users/register" component={Register}/>
                    <Route path="/users/login" component={Login}/>
                    <Route path="/tables" component={Tables}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
