import React, { Component } from 'react';

const NewMessageContainer = (props) => {



  return(
    <div>
      <form onChange={props.newMessageForm}>
      <label>name
        <input type="text" id="name" value={props.name}/>
      </label>
      <br/>
      <label>Message
        <input type="text" id="message" value={props.message}/>
      </label>
      <br/>
      <button onClick={props.addNewMessage}>Submit</button>
      </form>

    </div>
  )

}
export default NewMessageContainer
