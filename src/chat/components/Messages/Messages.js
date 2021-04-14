/* eslint-disable eqeqeq */
import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import ReactEmoji from 'react-emoji'

import {Message} from './Message/Message'

import './Messages.css';
import profile from '../../../img/icons/profile.png';

export const Messages = ({ messages, name, usern, prevData, profiles }) => (
    <ScrollToBottom className="messages">
        {prevData && (
            <>
                {prevData.map((item, ind) => {
                    return (
                        <>
                            <div key={ind}>
                                {item.sender.trim().toLowerCase() == usern.toLowerCase() ? (
                                    // <div className="messageContainer justifyStart">
                                    //     <div className="messageBox backgroundLight">
                                    //         <p className="messageText colorDark">{item.message}</p>
                                    //     </div>
                                    //     <p className="sentText pl-10">{usern}</p>
                                    // </div>
                                    <div className="mgs01">
                                        <div className="mgs011">
                                            <div className="mgs0111name">{usern}</div>
                                            <div className="mgs0111">
                                                <img src={profiles || profile} alt="" />
                                            </div>
                                            <div className="mgs0112">{item.message}</div>
                                        </div>
                                    </div>
                                ) : 
                                (
                                    // <div className="messageContainer justifyEnd">
                                    //     <p className="sentText pr-10">{item.sender}</p>
                                    //     <div className="messageBox backgroundBlue">
                                    //         <p className="messageText colorWhite">{ReactEmoji.emojify(item.message)}</p>
                                    //     </div>
                                    // </div>
                                    <div className="mgs01">
                                        <div className="mgs012">
                                            <div className="mgs0121">
                                                <img src={JSON.parse(localStorage.getItem("token")).userProfile || profile} alt="" />
                                            </div>
                                            <div className="mgs0111name1">{JSON.parse(localStorage.getItem("token")).userName}</div>
                                            <div className="mgs0122">{ReactEmoji.emojify(item.message)}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )
                })}
            </>
        )}
        {messages.map((message, i) => <div key={i}><Message profiles={profiles} message={message} usern={usern} name={name}/></div>)}
        
        {/* <div className="mgs01">
            <div className="mgs011">
                <div className="mgs0111">
                    <img src={profile} alt="" />
                </div>
                <div className="mgs0111name">kk</div>
                <div className="mgs0112">Some Text Some Text Some Text Some Text Some Text Some TextSome TextSome TextSome TextSome TextSome TextSome TextSome TextSome Text</div>
            </div>
        </div> */}

        {/* <div className="mgs01">
            <div className="mgs012">
                <div className="mgs0122">Some Text Some Text Some Text Some Text Some Text Some TextSome TextSome TextSome TextSome TextSome TextSome TextSome TextSome Text</div>
                <div className="mgs0121">
                    <img src={profile} alt="" />
                </div>
            </div>
        </div> */}

    </ScrollToBottom>
);