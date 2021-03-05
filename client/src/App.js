import './App.css';
import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import 'antd/dist/antd.css';
import Tables from './components/Tables';
import Register from "./components/Register";
import Login from "./components/Login";
import Error from "./components/Error";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path='/' component={Login}/>
                    <Route path="/users/register" component={Register}/>
                    <Route path="/users/login" component={Login}/>
                    <Route path="/tables" component={Tables}/>
                    <Route path="/error" component={Error}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
