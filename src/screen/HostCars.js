/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import h from '../css/hostCar.module.css';
import countryName from '../data/countryName.json';
import backIcon from '../img/icons/headerMinBack.png'
import { Calendar } from 'react-date-range';
// import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import '../css/react_dates_overrides.css';

export default function HostCars() {

    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history.push('/');
        }
    }, []);

    const [tab1, setTab1] = useState(true);
    const [tab2, setTab2] = useState(false);
    const [tab3, setTab3] = useState(false);
    const [tab4, setTab4] = useState(false);
    const [tab5, setTab5] = useState(false);
    const [tab6, setTab6] = useState(false);
    const [tab7, setTab7] = useState(false);
    const [tab8, setTab8] = useState(false);
    const [tab9, setTab9] = useState(false);

    const [allVar, setAllVar] = useState({
        country: '0',
        address: '',
        city: '',
        state: '0',
        zip: '',
        vin: '',
        modalYear1980: false,

        mileage: '0',
        trim: '0',
        style: '0',
        check1: false,
        check2: false,
        check3: false,
        check4: false,

        drivingLicense: '',
        nationality: '0',
        licenseNumber: '',
        issuedDate: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        expirationDate: '',

        advanceNoticeBeforeBooking: '0',
        bookingAvailability: '0',
        minimumTripDuration: '0',
        maximumTripDuration: '0'

    });

    // dates
    const [dateView, setDateView] = useState(true);
    const [date, setDate] = useState(new Date());

    const [dateApplyBtn, setDateApplyBtn] = useState(false);
    // const selectionRange = {
    //     startDate: startDate,
    //     endDate: endDate,
    //     key: "selection"
    // };
    // const onDateApply = useCallback(() => {

    //     const monthNames = ["January", "February", "March", "April", "May", "June",
    //     "July", "August", "September", "October", "November", "December"
    //     ];

    //     console.log("startDate: ", startDate);
    //     // console.log("endDate: ", endDate);
    //     // localStorage.setItem("startDate", startDate);
    //     // localStorage.setItem("endDate", endDate);
    //     setDateApplyBtn(false);
        
    //     // var sdate = new Date(localStorage.getItem("startDate"));
    //     // var edate = new Date(localStorage.getItem("endDate"));
    //     // setDateA(`${sdate.getDate()} ${monthNames[sdate.getMonth()]} - ${edate.getDate()} ${monthNames[edate.getMonth()]}`);
    // }, [startDate]);
    function handleDateSelect(ranges) {
        setDate(ranges.selection);
        setDateApplyBtn(true);
    }

    const outRefDate = useRef(null);
    const inRefDate = useRef(null);
    const clickHandleDate = e => {
        if (inRefDate.current.contains(e.target)) return;
        setDateView(false);
        // searchTextDisplayDesk();
    }


    return (
        <>
        
            <div className={h.desktop}>

                {tab1 && (
                    <div className={h.d0}>
                        <div className={h.d01b}><div className={h.d01Back}><img src={backIcon} alt="" onClick={() => history.goBack()} /></div> Car Listing</div>
                        <div className={h.d02}>Car Info : Step 1</div>
                        <div className={h.d03}>
                            <select className={h.d031}>
                                <option>Select country</option>
                                {countryName.map((val, key) => <option value={val.name} key={key}>{val.name}</option>)}
                            </select>
                        </div>
                        <div className={h.d04}>
                            <input type="text" placeholder="Enter address ..." />
                        </div>
                        <div className={h.d06}>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input type="text" placeholder="Enter city ..." />
                                </div>
                            </div>
                            <div className={h.d061}>
                                <select className={h.d0612}>
                                    <option>Select State/Region/Province</option>
                                </select>
                            </div>
                        </div>
                        <div className={h.d06}>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input type="text" placeholder="Enter Zip/Postal code ..." />
                                </div>
                            </div>
                        </div>
                        <div className={h.d06}>
                            <div className={h.d08}>Car VIN</div>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input type="text" placeholder="Enter your car VIN ..." />
                                </div>
                            </div>
                            <div className={h.d061}>
                                <input type="checkbox" />
                                Car model year is 1980 or later
                            </div>
                        </div>
                        <div className={h.d07c}>
                            <button className={h.d07b} disabled>Back</button>
                            <button className={h.d07} onClick={() => {setTab1(false);setTab2(true);}}>Next</button>
                        </div>
                    </div>
                )}

                {tab2 && (
                    <div className={h.d0}>
                        <div className={h.d01}>Car Listing</div>
                        <div className={h.d02}>Car Info : Step 2</div>
                        <div className={h.d03}>
                            <select className={h.d031}>
                                <option value="0">Select car mileage ...</option>
                                <option value="0">0 – 30k miles</option>
                                <option value="0">30k – 60k miles</option>
                                <option value="0">60k – 90k miles</option>
                                <option value="0">90k – 120K miles</option>
                                <option value="0">120K +</option>
                            </select>
                        </div>
                        <div className={h.d06}>
                            <div className={h.d061}>
                                <select className={h.d0612}>
                                    <option>Select Trim (Optional)</option>
                                </select>
                            </div>
                            <div className={h.d061}>
                                <select className={h.d0612}>
                                    <option>Select Style (Optional)</option>
                                </select>
                            </div>
                        </div>
                        <div className={h.d09}>
                            <div className={h.d062}>
                                <input type="checkbox" />
                                This is my personal car
                            </div>
                            <div className={h.d062}>
                                <input type="checkbox" />
                                This car is part of a rental company
                            </div>
                            <div className={h.d062}>
                                <input type="checkbox" />
                                This car has automatic transmission
                            </div>
                            <div className={h.d062}>
                                <input type="checkbox" />
                                This car has not had any significant damage (Branded Title)
                            </div>
                        </div>
                        <div className={h.d07c}>
                            <button className={h.d07b} onClick={() => {setTab2(false);setTab1(true);}}>Back</button>
                            <button className={h.d07} onClick={() => {setTab2(false);setTab3(true);}}>Next</button>
                        </div>
                    </div>
                )}

                {tab3 && (
                    <div className={h.d0}>
                        <div className={h.d01}>Car Listing</div>
                        <input type="file" id="file" accept="image/jpg, image/jpeg, image/png" style={{display: 'none'}} />
                        <div className={h.d02}>Drive License <label htmlFor="file" className={h.d020}>Upload Drive License</label></div>
                        <div className={h.d03}>
                            <select className={h.d031}>
                                <option>Nationality</option>
                            </select>
                        </div>
                        <div className={h.d04}>
                            <input type="text" placeholder="Enter address ..." />
                        </div>
                        <div className={h.d06}>
                            <div className={h.d061}>
                                <select className={h.d0612}>
                                    <option>Select country of residence ...</option>
                                </select>
                            </div>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input type="text" placeholder="State ..." />
                                </div>
                            </div>
                        </div>
                        <div className={h.d06}>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input type="number" placeholder="Enter License Number ..." />
                                </div>
                            </div>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input type="text" placeholder="Enter Issued Date ..." />
                                </div>
                            </div>
                        </div>
                        <div className={h.d04}>
                            <input type="text" placeholder="First Name" />
                        </div>
                        <div className={h.d04}>
                            <input type="text" placeholder="Middle Name" />
                        </div>
                        <div className={h.d04}>
                            <input type="text" placeholder="Last Name" />
                        </div>
                        <div className={h.d06}>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input type="text" placeholder="Date of birth" />
                                </div>
                            </div>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input type="text" placeholder="Expiration Date" />
                                </div>
                            </div>
                        </div>
                        <div className={h.d07c}>
                            <button className={h.d07b} onClick={() => {setTab3(false);setTab2(true);}}>Back</button>
                            <button className={h.d07} onClick={() => {setTab3(false);setTab4(true);}}>Next</button>
                        </div>
                    </div>
                )}

                {tab4 && (
                    <div className={h.d0}>
                        <div className={h.d01}>Car Listing</div>
                        <div className={h.d02}>Booking Information</div>
                        <div className={h.d03}>
                            <select className={h.d031}>
                                <option value="0">Advance notice before pickup</option>
                                <option>6 Hours</option>
                                <option>12 Hours</option>
                                <option>Next day</option>
                                <option>At least 1 day</option>
                                <option>At least 2 days</option>
                            </select>
                        </div>
                        <div className={h.d03}>
                            <select className={h.d031}>
                                <option value="0">Booking Availability</option>
                                <option>All future days</option>
                                <option>12 months</option>
                                <option>9 months</option>
                                <option>3 months</option>
                                <option>1 month</option>
                                <option>1 day</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <div className={h.d06}>
                            <div className={h.d061}>
                                <select className={h.d0612}>
                                    <option value="0">Minimum trip duration</option>
                                    <option>1 day</option>
                                    <option>2 days</option>
                                    <option>3 days</option>
                                </select>
                            </div>
                            <div className={h.d061}>
                                <select className={h.d0612}>
                                    <option value="0">Maximum trip duration</option>
                                    <option>5 days</option>
                                    <option>1 week</option>
                                    <option>2 weeks</option>
                                    <option>1 month</option>
                                    <option>3 months</option>
                                    <option>6 months</option>
                                    <option>9 months</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className={h.d07c}>
                            <button className={h.d07b} onClick={() => {setTab4(false);setTab3(true);}}>Back</button>
                            <button className={h.d07} onClick={() => {setTab4(false);setTab5(true);}}>Next</button>
                        </div>
                    </div>
                )}

                {tab5 && (
                    <div className={h.d0}>
                        <div className={h.d01}>Car Listing</div>
                        <div className={h.d02}>Car features</div>
                        <div className={h.d010}>
                            <div className={h.d010_1}>
                                <div className={h.d010_11}><input type="checkbox" /><span>All-wheet drive</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Wheelchair ready</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Android Auto</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Back camera</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Aux input</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Blind spot detection</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Bluetooth</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Child seat</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Convertible</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>GPS</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Heated seats</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Keyless entry</span></div>
                            </div>
                            <div className={h.d010_1}>
                                <div className={h.d010_11}><input type="checkbox" /><span>All-wheet drive</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Wheelchair ready</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Android Auto</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Back camera</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Aux input</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Blind spot detection</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Bluetooth</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Child seat</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Convertible</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>GPS</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Heated seats</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Keyless entry</span></div>
                            </div>
                            <div className={h.d010_1}>
                                <div className={h.d010_11}><input type="checkbox" /><span>All-wheet drive</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Wheelchair ready</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Android Auto</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Back camera</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Aux input</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Blind spot detection</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Bluetooth</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Child seat</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Convertible</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>GPS</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Heated seats</span></div>
                                <div className={h.d010_11}><input type="checkbox" /><span>Keyless entry</span></div>
                            </div>
                        </div>
                        <div className={h.d07c}>
                            <button className={h.d07b} onClick={() => {setTab5(false);setTab4(true);}}>Back</button>
                            <button className={h.d07} onClick={() => {setTab5(false);setTab6(true);}}>Next</button>
                        </div>
                    </div>
                )}

                {tab6 && (
                    <div className={h.d0}>
                        <div className={h.d01}>Car Listing</div>
                        <div className={h.d02}>Car Description</div>
                        <div className={h.d02Sub}>Give guests more information about your car</div>
                        
                        <div className={h.d04}>
                            <textarea placeholder="Write from here ..." />
                        </div>

                        <div className={h.d07c}>
                            <button className={h.d07b} onClick={() => {setTab6(false);setTab5(true);}}>Back</button>
                            <button className={h.d07} onClick={() => {setTab6(false);setTab7(true);}}>Next</button>
                        </div>
                    </div>
                )}

                {tab7 && (
                    <div className={h.d0}>
                        <div className={h.d01}>Car Listing</div>
                        <div className={h.d02}>More car details</div>
                        
                        <div className={h.d04}>
                            <input type="text" placeholder="License plate number" />
                        </div>
                        <div className={h.d03}>
                            <select className={h.d031}>
                                <option value="0">Issued State/Region/Province</option>
                            </select>
                        </div>

                        <div className={h.d07c}>
                            <button className={h.d07b} onClick={() => {setTab7(false);setTab6(true);}}>Back</button>
                            <button className={h.d07} onClick={() => {setTab7(false);setTab8(true);}}>Next</button>
                        </div>
                    </div>
                )}

                {tab8 && (
                    <div className={h.d0}>
                        <div className={h.d01}>Car Listing</div>
                        <div className={h.d02}>Car photos</div>
                        <div className={h.d02Sub}>Give guests more information about your car</div>
                        
                        <div className={h.d04}>
                            <label>Take photos</label>
                        </div>
                        <div className={h.d04}>
                            <label>Select from gallery</label>
                        </div>

                        <div className={h.d07c}>
                            <button className={h.d07b} onClick={() => {setTab8(false);setTab7(true);}}>Back</button>
                            <button className={h.d07} onClick={() => {setTab8(false);setTab9(true);}}>Next</button>
                        </div>
                    </div>
                )}

                {tab9 && (
                    <div className={h.d0}>
                        <div className={h.d01}>Car Listing</div>
                        <div className={h.d02}>Pricing</div>
                        {/* <div className={h.d02Sub}>Give guests more information about your car</div> */}
                        
                        <div className={h.d04}>
                            <input type="text" placeholder="Enter listing price" />
                        </div>
                        <div className={h.d03}>
                            <select className={h.d031}>
                                <option value="0">Discount offeref to guests</option>
                                <option value="0">0 – 30k miles</option>
                                <option value="0">30k – 60k miles</option>
                                <option value="0">60k – 90k miles</option>
                                <option value="0">90k – 120K miles</option>
                                <option value="0">120K +</option>
                            </select>
                        </div>

                        <div className={h.d07c}>
                            <button className={h.d07b} onClick={() => {setTab9(false);setTab8(true);}}>Back</button>
                            <button className={h.d07} onClick={() => alert("Submit!!!")}>Submit</button>
                        </div>
                    </div>
                )}

            </div>

            {/* <div className={h.mobile}>mobile</div> */}

            {dateView && (

                <div className="dateCont0" ref={outRefDate} onClick={e => clickHandleDate(e)}>
                    <div className="dateCont01" ref={inRefDate} onClick={e => clickHandleDate(e)}>
                        {/* <DateRange
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            isOutsideRange={() => false}
                            months={2}
                            direction="horizontal"
                            ranges={[selectionRange]} 
                            onChange={handleDateSelect}
                            minDate={new Date()}
                        /> */}
                        <Calendar 
                            minDate={new Date()}
                            onChange={handleDateSelect}
                        />
                        {dateApplyBtn && (
                            <div className="dateCont01CloseBtn"><button onClick={() => {
                                setDateView(false);
                                // onDateApply();
                                // setNoOfGuest(true);
                            }}>Apply dates</button></div>
                        )}
                    </div>
                </div>

            )}
            

        </>
    );
}