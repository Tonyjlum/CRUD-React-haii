import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageContainer from './components/MessageContainer'
import NewMessageContainer from './components/NewMessageContainer'
const API = "http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages"

class App extends Component {
  state= {
    allMsg: [],
    name: "",
    message: "",
    editName: "",
    editMessage: "",

  }

  newMessageForm = (e) =>{
    this.setState({
      [e.target.id]: e.target.value
    }, () => console.log("In New Message State", this.state))
  }

  oldEditState = (oldData) => {
    this.setState({
      editName: oldData.real_name,
      editMessage: oldData.message
    }, () => console.log(this.state.editName, this.state.editMessage))
  }

  editMessageForm = (e) => {
    e.persist()
    console.log(e.target.id);
    this.setState({
      [e.target.id]: e.target.value
    }, () => console.log(this.state))
  }

  addNewMessage = e => {
    e.preventDefault()
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        message: {
          real_name: this.state.name,
          message: this.state.message
        }
      })
    })
    .then(response => response.json())
    .then(messageObj => {
      this.setState({
        allMsg: [messageObj, ...this.state.allMsg],
        name: '',
        message: ''
      })
    })
  }

  handleEditSubmit = msgId => {
    console.log(msgId, this.state.editMessage, this.state.editName)
    fetch(`${API}/${msgId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        message: {
          real_name: this.state.editName,
          message: this.state.editMessage
        }
      })
    })
    .then(response => response.json())
    .then( r => {
      console.log(r)
      debugger
    })
  }

  deleteMessageForm = (message) => {
    const updatedMsgs = this.state.allMsg.filter( msg => {
      return msg.id !== message.id
    })
    fetch(`${API}/${message.id}`, {
      method: "DELETE"
    })
    .then(
      this.setState({
        allMsg: updatedMsgs
      })
    )
  }

  componentDidMount(){
    fetch(API)
    .then(response => response.json())
    .then(messages =>
      this.setState({
        allMsg: messages
      }, () => console.log(this.state.allMsg))
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={"https://slack-imgs.com/?c=1&url=https%3A%2F%2F1.bp.blogspot.com%2F-eIqutSAzi_k%2FWQRkfbm-N4I%2FAAAAAAAHRnw%2FrimlsE5VglYmdhQCZ7rDR965TrGcNMxYwCLcB%2Fs1600%2FAW419452_00.gif"} className="App-logo" alt="logo" />
          <NewMessageContainer
            newMessageForm={this.newMessageForm}
            addNewMessage={this.addNewMessage}
            name={this.state.name}
            message={this.state.message}
          />
          <p>=====================================================</p>
          <MessageContainer
            allMsg={this.state.allMsg}
            editName={this.state.editName}
            editMessage={this.state.editMessage}
            deleteMessageForm={this.deleteMessageForm}
            handleEditSubmit={this.handleEditSubmit}
            editMessageForm={this.editMessageForm}
            oldEditState={this.oldEditState}
            />
        </header>
      </div>
    );
  }
}

export default App;
