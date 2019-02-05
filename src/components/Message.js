import React, { Component } from 'react';

class Message extends Component {

  state = {
    hide: true
  }

  toggleEditForm = () => {
    this.setState({
      hide: !this.state.hide
    }, () => this.props.oldEditState(this.props.msgData))
  }

  render() {
    return(
      <div>

        <p hidden={!this.state.hide}>
          {this.props.msgData.real_name}: {this.props.msgData.message}
        </p>
        <div hidden={this.state.hide}>
          <form onChange={this.props.editMessageForm}>
            <label>Name
              <input type="text" id="editName" value={this.props.editName}/>
            </label>
            <label>Message
              <input type="text" id="editMessage" value={this.props.editMessage}/>
            </label>
            <br/>
            <button onClick={() => this.props.handleEditSubmit(this.props.msgData.id)}>Submit</button>
          </form>
        </div>
        <button onClick={this.toggleEditForm}>Edit</button>
        <button onClick={() => this.props.deleteMessageForm(this.props.msgData)}>Delete</button>
      </div>
    )
  }

}
export default Message
