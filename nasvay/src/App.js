import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Input } from 'antd';
import { Button } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

Element.prototype.appendChildren = function() {
  for (let arg of arguments)
    this.appendChild(arg)
};

class App extends Component {
  state = {users: []}
  componentDidMount() {
    this.searchUsers(this.state.text)    
  }
  changeState(value) {
    this.setState({ text: value })
  }
  appendSosi(value) {
    axios.get('http://localhost:3001/huy?string=' + value)
      .then(data => {
        this.changeState(data.data)
      })
  }
  addUsersToResults(array) {
    var searchResults = document.getElementsByClassName('searchResults')[0];
    if (!searchResults) {
      searchResults = document.createElement('div')
      searchResults.className = 'searchResults'
      document.body.appendChild(searchResults)
    }
    searchResults.innerHTML = ''
    console.log(array)
    array.forEach(el => {
      console.log(el);
      
      var cardDiv = document.createElement('div')
      cardDiv.className = 'userCard'
      var theHeading = document.createElement('h1')
      theHeading.innerText = el.name
      var theAge = document.createElement('p')
      theAge.innerText = el.age + ' years'
      var theDesc = document.createElement('p')
      theDesc.innerText = el.desc
      cardDiv.appendChildren(theHeading, theAge, theDesc)
      searchResults.appendChild(cardDiv)
      // searchResults.append(cardDiv, theHeading, theAge, theDesc)
    });
  }
  searchUsers(value) {
    // axios.get('http://localhost:3001/huy?string=' + value)
    //   .then(data => {
    //     this.addUsersToResults(data.data);
    //   })
    var thearr = [
      {
        name: "The Lupa",
        age: 1337
      },
      {
        name: "Matvey",
        age: 23
      },
      {
        name: "Pidor",
        age: 69
      },
      {
        name: "Arthur",
        age: 19
      },
    ]
    thearr.forEach(el => {
      el.desc = 'Lorem ipsum dolor sit on your face';
    })
    this.addUsersToResults(thearr);
  }
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <TextArea autoFocus onChange={e => { this.changeState(e.target.value) }} style={{maxWidth: "15rem"}} placeholder="Autosize height based on content lines" autosize />
        <Button onClick={() => { this.searchUsers(this.state.text) }} type="primary">Primary</Button>
        <div className="chlen">
          <h1>{ this.state.text }</h1>
        </div>
      </div>
    );
  }
}

export default App;
