import React from 'react'
import {Channel,MessageSimple} from "stream-chat-react";
import {InnerBody,EditChannel,TeamMessage,CreateChannel} from "./index"
const ChannelContainer = ({isCreating,setIsCreating,isEditing,setIsEditing,createType}) => {
  
   
     if(isCreating){
      return(
        <div className='channel__container '>
        <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
      </div>
      )
      
     }
     if(isEditing){
      return(
        <div className='channel__container'>
        <EditChannel  setIsEditing={setIsEditing}/>
      </div>
      )
      
     }
     const EmptyChat=()=>{
      <div className='channel-empty__container'>
        <p className='channel-empty__first'>You can start your chat here</p>
        <p className='channel-empty__second'>Send messages, attach photos links and more</p>
      </div>
     }
return(
  <div className=" channel__container">
    <Channel EmptyStateIndicator={EmptyChat}
    Message={(messageProps,i)=><MessageSimple key={i}  {...messageProps}/>}
    >
      <InnerBody setIsEditing={setIsEditing}/>
    </Channel>
  </div>
)
      
    
  
}

export default ChannelContainer
