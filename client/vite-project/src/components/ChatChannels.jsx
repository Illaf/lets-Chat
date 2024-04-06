import React from 'react'
import { FaPlus } from "react-icons/fa6";
//import  {AddChannel}  from '../assets/AddChannel';
const ChatChannels = ({children,error=false,loading,type,setCreateType,setIsCreating,setIsEditing,setToggleContainer}) => {
    if(error){
        return type=== 'team'?(<div className='team-channel-list'>
            <p className='team-channel-list__message'>
Connection error, please wait a moment and try again
            </p>
        </div>):null;
    }
    if(loading){
        return (<div className='team-channel-list'>
        <p className='team-channel-list__message loading'>
          {type==='team'?'Groups':'messages'} loading...
        </p>
    </div>);  
    }
  return (
    <div className='team-channel-list'>
      <div className='team-channel-list__header'>
        <p className='team-channel-list__header__title'>
        {type==='team'?'Groups':'Direct messages'} 
        {/* {console.log(type)} */}
        </p>
        <FaPlus onClick={() => {
  setIsCreating(true);
  setCreateType(type === 'team' ? 'team' : 'messaging');
  setIsEditing(false); // Assuming you want to set editing to false, adjust as needed

  // If you need to toggle a container or set another state, uncomment and use correctly
  setToggleContainer(someValue); // Replace `someValue` with what you actually need to set
}} />
   
      </div>
      {children}
    </div>
  )
}

export default ChatChannels
