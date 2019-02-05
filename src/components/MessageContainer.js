import React, { Component } from 'react';
import Message from './Message'

const MessageContainer = (props) => {

  return(
    <div>
    {props.allMsg.map( msg => {
      return <Message
      key={msg.id}
      msgData={msg}
      editName={props.editName}
      editMessage={props.editMessage}
      deleteMessageForm={props.deleteMessageForm}
      handleEditSubmit={props.handleEditSubmit}
      editMessageForm={props.editMessageForm}
      oldEditState={props.oldEditState}
      />
    })}
    </div>
  )

}
export default MessageContainer
