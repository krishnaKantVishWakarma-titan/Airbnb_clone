import React from 'react';
// import UserImg from '../img/icons/user.png';

// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
// import { DateRangePicker } from 'react-dates';

import PinIcon from '../img/icons/blackPin.png';
import SearchIconWhite from '../img/icons/search.png';
import UserImg from '../img/icons/user.png';


import { useState } from "react";
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';



import '../css/react_dates_overrides.css';

export default function DatePicker() {
    
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    return(

        <>
        
            <div className="headBodyExpl11">

                <div className="headBodyExpl111">
                    <div className="headBodyExpl1111"><img src={PinIcon} alt="" /></div>
                    <div className="headBodyExpl1112"><input type="text" placeholder="Where are you gogin to ?" /></div>
                </div>

                {/* <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                /> */}

                {/* <DateRange
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    className="datePicker"
                /> */}

                <div className="headBodyExpl111">
                    <div className="headBodyExpl1111"><img src={UserImg} alt="" /></div>
                    <div className="headBodyExpl1112"><input type="text" placeholder="2 adult | 0 children | 1 room" /></div>
                </div>

                <div className="headBodyExpl114">
                    <button className="headBodyExpl1141"><img src={SearchIconWhite} alt="" /> Search</button>
                </div>
            

            </div>

        </>

    );
}