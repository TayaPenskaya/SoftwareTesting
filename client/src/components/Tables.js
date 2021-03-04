import axios from "axios";
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table } from 'antd';
import { Component } from 'react';

class Tables extends Component {

    constructor(props) {
        super(props);
        this.state = {tables: []};
        this.columns = [{title: 'Seats', dataIndex: 'seats'},
                        {title: 'Free seats', dataIndex: 'free'},
                        {title: 'Rake', dataIndex: 'rake'},
                        {title: 'isPlaying', dataIndex: 'isPlaying', render: (value) => {
                            if (value.flag) {
                                return <a href="#" onClick={() => this.onUnplay(value.idx)}>Unplay</a>
                            } else {
                                return <a href="#" onClick={() => this.onPlay(value.idx)}>Play</a>
                            }
                        }}]
    }

    onPlay = (idx) => {
        this.state.tables[idx].isPlaying.flag = true;
        var token = localStorage.getItem('jwtToken');
        var id = this.state.tables[idx].id;
        axios.post('/tables/' + id + '/play', {"table": {"id": id}}, { headers: {"Authorization" : `Bearer ${token}`}}).then();
        this.render();
    };

    onUnplay = (idx) => {
        this.state.tables[idx].isPlaying.flag = false;
        var token = localStorage.getItem('jwtToken');
        var id = this.state.tables[idx].id;
        axios.delete('/tables/' + id + '/play',{ headers: {"Authorization" : `Bearer ${token}`}, data: {"table": {"id": id}}}).then();
        this.render();
    };

    componentDidMount() {
        var token = localStorage.getItem('jwtToken');
        axios.get('/tables', { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                res.data.tables.map((value, index) => {
                    let flag = value.isPlaying;
                    value.isPlaying = {flag: flag, idx: index}
                });
                this.setState({ tables: res.data.tables });
                console.log(this.state);
            })
            .catch((error) => {
                if(error.response.status === 401) {
                    this.props.history.push("/users/login");
                }
            });
    }

    render() {
        return (
            <div>
                <Table
                    columns={this.columns}
                    dataSource={this.state.tables}
                />
            </div>
        )
    }


}

export default Tables;