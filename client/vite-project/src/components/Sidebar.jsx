import React,{useState} from 'react';
import Cookies from "universal-cookie";
import { RiLogoutBoxLine } from "react-icons/ri";
import {ChannelList, useChatContext} from "stream-chat-react";
import ChatChannels from './ChatChannels';
import Search from "./Search";
//import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import ChatPreview from "./ChatPreview";
const cookies= new Cookies();
const SidebarElements = ({logout}) => {
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1_inner">
            <img src="" alt="" />
        </div>

      </div>
      <div className='channel-list__sidebar__icon2'>
        <div className='icon1__inner' onClick={logout}>
        <RiLogoutBoxLine  />
        </div>
      </div>
    </div>
  )
}
const teamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}

const messagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
}
const Sidebarcontent=({isCreating,setIsCreating,setCreateType,setIsEditing,setToggleContainer})=>{
  //const [toggleContainer, setToggleContainer] = useState(false);
  const { client } = useChatContext();
  const logOut=()=>{
    cookies.remove('token');
     cookies.remove('userId');
     cookies.remove('username');
     cookies.remove('fullName');
     cookies.remove('avatarURL');
     cookies.remove('hashedPassword');
     cookies.remove('phoneNumber');

     window.location.reload();
  }
  const filters = { members: { $in: [client.userID] } };
return(
  <>

  <SidebarElements logout={logOut} />
  <div className="channel-list__list__wrapper">
  
            <div className="channel-list__list__wrapper">
            <div className="channel-list__header">
        <p className="channel-list__header__text">Text me</p>
    </div>
    <Search/>
                {/* <ChannelSearch setToggleContainer={setToggleContainer} /> */}
                <ChannelList className="h-[180px] bg-[#FC819E]"
                    filters={filters}
                    channelRenderFilterFn={teamFilter}
                    List={(listProps) => (
                        <ChatChannels 
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <ChatPreview 
                            {...previewProps}
                            setToggleContainer={setToggleContainer}
                            //setToggleContainer={setToggleContainer}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            type="team"
                        />
                    )}
                />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={messagingFilter}
                    List={(listProps) => (
                        <ChatChannels
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <ChatPreview 
                            {...previewProps}
                            setToggleContainer={setToggleContainer}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            type="messaging"
                        />
                    )}
                />
            </div>
            </div>
        </>
)
}
const Sidebar = ({ setCreateType, setIsCreating, setIsEditing }) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
      <>
          <div className="channel-list__container">
            <Sidebarcontent 
              setIsCreating={setIsCreating} 
              setCreateType={setCreateType} 
              setIsEditing={setIsEditing} 
            />
          </div>

          <div className="channel-list__container-responsive"
              style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
          >
              <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
              </div>
              <Sidebarcontent 
              setIsCreating={setIsCreating} 
              setCreateType={setCreateType} 
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          </div>
      </>
  )

}

export default Sidebar;
