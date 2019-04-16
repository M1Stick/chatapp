import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [],

    }
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager ({
        instanceLocator,
        userId: 'perborgen',
        tokenProvider: new Chatkit.TokenProvider({
          url: tokenUrl
        })
    })

    chatManager.connect()
    .then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: 19694416,
        hooks: {
          onNewMessage: message => {
            console.log('message.text: ', message.text);
            this.setState({
              messages: []
            })
          }
        }
      })
    })
  }


  render() {
    return (
      <div className="app">
        <RoomList />
        <MessageList />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    );
  }
}

export default App
