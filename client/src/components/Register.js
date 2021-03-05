import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css';
import axios from "axios";
import {Component} from "react";

export const isValid = (pass) => {
    var re = /^(?=.*\d)(?=.*[a-z]).{4,}$/;
    return re.test(pass);
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', message: ''};
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        if (isValid(password)) {
            axios.post('/users/register', { username, password })
                .then((result) => {
                    this.props.history.push("/users/login")
                });
        } else {
            const message = 'Unvalid password';
            this.setState({ message:  message});
            this.props.history.push({pathname: '/error', state: { detail: message }})
        }
    };

    render() {
        const { username, password} = this.state;
        return (
            <div className="wrapper">
                <h2> Registation form </h2>
                <Form name="register" className="login-form" initialValues={{remember: true}} onSubmit={this.onSubmit}>
                    <Form.Item name="username" rules={[ { required: true, message: 'Please input your Username!'},]}>
                        <Input id="username-id" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" value={username} onChange={(e) => this.setState({...this.state, username: e.target.value})}/>
                    </Form.Item>
                    <Form.Item name="password" rules={[ { required: true, message: 'Please input your Password!',},]}>
                        <Input id="password-id" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" value={password} onChange={(e) => this.setState({...this.state, password: e.target.value})}/>
                    </Form.Item>
                    <Form.Item>
                        <Button id="submit-id" type="submit" htmlType="submit" className="login-form-button" onClick={this.onSubmit}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Register;