import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css';
import axios from 'axios';
import { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', message: ''};
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        axios.post('/users/login', { username, password })
            .then((res) => {
                localStorage.setItem('jwtToken', res.data.user.token);
                this.setState({ message: '' });
                this.props.history.push('/tables')
            })
            .catch((error) => {
                if(error.response.status === 422) {
                    this.setState({ message: 'Login failed. Username or password not match!' });
                    this.props.history.push({pathname: '/error', state: { detail: this.state.message }})
                }
                if(error.response.status === 401) {
                    this.setState({ message: 'No such user!' });
                    this.props.history.push({pathname: '/error', state: { detail: this.state.message }})
                }
            });
    };

    render() {
        return (
            <div className="wrapper">
                <h2> Login form </h2>
                <Form name="login" className="login-form" initialValues={{remember: true}} onSubmit={this.onSubmit}>
                    <Form.Item name="username" rules={[ { required: true, message: 'Please input your Username!'},]}>
                        <Input id="login-id" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" value={this.state.username} onChange={(e) => this.setState({...this.state, username: e.target.value})}/>
                    </Form.Item>
                    <Form.Item name="password" rules={[ { required: true, message: 'Please input your Password!',},]}>
                        <Input id="password-id" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({...this.state, password: e.target.value})}/>
                    </Form.Item>
                    <Form.Item>
                        <Button id="submit-id" type="submit" htmlType="submit" className="login-form-button" onClick={this.onSubmit}>
                            Log in
                        </Button>
                        Or <a href="/users/register" id="register-id">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login;