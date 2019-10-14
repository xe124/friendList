import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Input } from 'antd';
import { Button } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

class App extends Component {
  state = {users: []}
  changeState(value) {
    this.setState({ text: value })
  }
  appendSosi(value) {
    axios.get('http://localhost:3001/huy?string=' + value)
      .then(data => {
        this.changeState(data.data)
      })
  }
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <TextArea autoFocus onChange={e => { this.changeState(e.target.value) }} style={{maxWidth: "15rem"}} placeholder="Autosize height based on content lines" autosize />
        <Button onClick={() => { this.appendSosi(this.state.text) }} type="primary">Primary</Button>
        <div className="chlen">
          <h1>{ this.state.text }</h1>
        </div>
      </div>
    );
  }
}

export default App;
