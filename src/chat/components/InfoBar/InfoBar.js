import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import s from '../../../img/icons/headerMinBack.png';

import './InfoBar.css';

export const InfoBar = ({ name, history }) => (
  <div className="infoBar">
    {/* <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div> */}
    <div className='ib0'>
      <img src={s} alt="" onClick={() => history.goBack()} />
    </div>
    <div className='ib1'>
     {name}
    </div>
  </div>
);