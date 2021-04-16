import React from 'react';

import ReactEmoji from 'react-emoji'

import './Message.css';
import profile from '../../../../img/icons/profile.png';

export const Message = ({message: { user, text }, name, profiles}) => {
    let isSentByCurrentUser = false;
    
    const trimmedName = name.trim().toLowerCase()

    if(user === trimmedName) {
        isSentByCurrentUser = true
    }

    return (
    isSentByCurrentUser
    ? (
        // <div className="messageContainer justifyEnd">
        //     {/* sender */}
        //     <p className="sentText pr-10">{trimmedName}</p>
        //     <div className="messageBox backgroundBlue">
        //         <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        //     </div>
        // </div>
        <div className="mgs01">
            <div className="mgs012">
                <div className="mgs0121">
                    <img src={JSON.parse(localStorage.getItem("token")).userProfile || profile} alt="" />
                </div>
                
                <div className="mgs0111name1">{JSON.parse(localStorage.getItem("token")).userName}</div>
                <div className="mgs0122">{ReactEmoji.emojify(text)}</div>
            </div>
        </div>
    )
    : (
        // <div className="messageContainer justifyStart">
        //     {/* receiver */}
        //     <div className="messageBox backgroundLight">
        //         <p className="messageText colorDark">{text}</p>
        //     </div>
        //     <p className="sentText pl-10">{user}</p>
        // </div>
        <div className="mgs01">
            <div className="mgs011">
                {/* <div className="mgs0111name">{user}</div> */}
                <div className="mgs0111">
                    <img src={profiles || profile} alt="" />
                </div>
                <div className="mgs0111name">{user}</div>
                <div className="mgs0112">{text}</div>
            </div>
        </div>
    ))
};