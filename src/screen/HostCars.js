/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import h from '../css/hostCar.module.css';
import countryName from '../data/countryName.json';
import currencyName from '../data/currencyName.json';
import backIcon from '../img/icons/headerMinBack.png'
import { Calendar } from 'react-date-range';
// import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import '../css/react_dates_overrides.css';
import '../css/components.css';
import url from '../data/urls.json';


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



    const [errTab, setErrTab] = useState(false);
    const [errTab2, setErrTab2] = useState(false);
    const errorDisplayTime = 4000;

    // image uploading...................................................

    const [selectedImage, setSelectedImage] = useState([]);
    const [imageList, setImageList] = useState([]);
    const uploadImageHandler = e => {

        var formdata = new FormData();
        
        for(var  j = 0; j < e.target.files.length; j++) {
            formdata.append("file", e.target.files[j], e.target.files[j].name);
        }

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };
    
            fetch(`${url.baseUrl}/upload`, requestOptions)
            .then(response => response.json())
            .then(result => {
                var imageLink = result.Data;
                console.log(result.data)
                imageLink.map(val => setImageList(prevImg => prevImg.concat(val.Location)));
            })
            .catch(error => console.log('error', error));
        
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
            setSelectedImage(prevImg => prevImg.concat(fileArray))
            Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
        }
    }
    const renderPhoto = source => {
        return source.map(photo => {
            return <div className="uploadedImage"><img src={photo} key={photo} alt="" /></div>
        })
    }
    const f1 = useRef(null);
    const f2 = useRef(null);
    const f3 = useRef(null);
    const f4 = useRef(null);
    const f5 = useRef(null);
    const f6 = useRef(null);
    const f7 = useRef(null);
    const f8 = useRef(null);
    const f9 = useRef(null);
    const f10 = useRef(null);
    const f11 = useRef(null);
 
    const [allVar, setAllVar] = useState({
        country: '0',
        address: '',
        city: '',
        selectState:"0",
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

        addressLicense:"",
        selectCountry:"0",
        stateLicense:'',
        drivingLicense: '',
        nationality: '0',
        licenseNumber: '',
        issuedDate: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        expirationDate: '',
        IssuedState:'0',

        advanceNoticeBeforeBooking: '0',
        bookingAvailability: '0',
        minimumTripDuration: '0',
        maximumTripDuration: '0',
         carDescription:"",
        licensePlateNumber:'',
        currency: "0",
        price:''
    });
    const setFinalCurrencyVal = e => {
        for (var key in currencyName) {
            if (currencyName[key].code === e.target.value) {
                console.log(currencyName[key].symbol_native);
            }
        }
    }
    const finalHostingSubmition = () => {
        console.log(allVar)
        var myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer 61cbd361e041f6fb48e3d7e87ce6c92d8c88752fe3157193afee47cc2d31d7d2221eaa1c36f475f475bdb50d376f739ce4c9eca75761da8b8f04a5d992f53bf6");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            "userId": parseInt(JSON.parse(localStorage.getItem("token")).userId),
            "country":allVar.country,
            "address":allVar.address,
            "cityName":allVar.city,
            "state":allVar.state,
            "postalCode":allVar.zip,
            "vinNumber":allVar.vin,
            "carModel1980orLater":allVar.modalYear1980,
            "mileage": allVar.mileage,
            "trim": allVar.trim,
            "style": allVar.style,
            "myPersonalCar": allVar.myPersonalCar,
            "carIsPartOfRentalCompany":allVar.carIsPartOfRentalCompany,
            "automaticTransmission":allVar.automaticTransmission,
            "carHasNotSignificantDamage": allVar.carHasNotSignificantDamage,
            "nationality":allVar.nationality,
            "addressLicense": allVar.addressLicense,
            "residenceLicense": allVar.selectCountry,
            "stateLicense": allVar.stateLicense,
            "licenseNumber": allVar.licenseNumber,
            "licenseIssuedDate": allVar.issuedDate,
            "firstName": allVar.firstName,
            "middleName": allVar.middleName,
            "lastName": allVar.lastName,
            "dateOfBirth": allVar.dateOfBirth,
            "expirationDate": allVar.expirationDate,
            "advanceNoticeBeforePickup": allVar.advanceNoticeBeforeBooking,
            "bookingAvailability":allVar.bookingAvailability,
            "minimumTripDuration":allVar.minimumTripDuration,
            "maximumTripDuration":allVar.maximumTripDuration,
            "carDescription":allVar.carDescription,
            "licensePlateNumber":allVar.licensePlateNumber,
            "IssuedState":allVar.IssuedState,
            "carsImageArray": imageList,
            "carListingPrice": allVar.price,
            "discountOfferedtToGuests": allVar.discountOfferedtToGuests
        }),
        redirect: 'follow'
        };
        fetch(url.baseUrl+ "carHost", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.code === 200) {
                history.push("/carInfo/"+result.id);
            }
        })
        .catch(error => console.log(error));

    }

    useEffect(() => {
       console.log(allVar);
    },[allVar]);
      

    return (
        <>
        
            <div className={h.desktop}>

                {tab1 && (
                
                    <div className={h.d0}>
                      
                        <div className={h.d01b}><div className={h.d01Back}><img src={backIcon} alt="" onClick={() => history.goBack()} /></div> Car Listing</div>
                        <div className={h.d02}>Car Info : Step 1</div>
                        {/* <h4>{allVar.address}{allVar.city}{allVar.vin}{allVar.zip}</h4> */}
                        <div className={h.d03}>
                            <select className={h.d031} ref={f1} value={allVar.country} onChange={e=> setAllVar({...allVar,country: e.target.value})}>
                                <option value="0">Select country</option>
                                {countryName.map((val, key) => <option value={val.name} key={key}>{val.name}</option>)}
                            </select>
                        </div>
                        <div className={h.d04}>
                            <input ref={f2} type="text" placeholder="Enter address ..." value={allVar.address} onChange={e=> setAllVar({...allVar,address: e.target.value})} />
                        </div>
                        <div className={h.d06}>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input ref={f3} type="text" placeholder="Enter city ..." value={allVar.city} onChange={e=> setAllVar({...allVar,city: e.target.value})} />
                                </div>
                            </div>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input ref={f6} type="text" placeholder="Enter state ..." value={allVar.selectState} onChange={e=> setAllVar({...allVar,selectState: e.target.value})} />
                                </div>
                            </div>
                            
                        </div>
                        <div className={h.d06}>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input ref={f4} type="text"  placeholder="Enter Zip/Postal code ..." value={allVar.zip} onChange={e=> setAllVar({...allVar,zip: e.target.value})} />
                                </div>
                            </div>
                        </div>
                        <div className={h.d06}>
                            <div className={h.d08}>Car VIN</div>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input ref={f5} type="text" placeholder="Enter your car VIN ..." value={allVar.vin} onChange={e=> setAllVar({...allVar,vin: e.target.value})} />
                                </div>
                            </div>
                            <div className={h.d061}>
                                <input type="checkbox" />
                                Car model year is 1980 or later
                            </div>
                        </div>
                        <div className={h.d07c}>
                            <button className={h.d07b} disabled>Back</button>
                            {/* <button className={h.d07} onClick={() => {setTab1(false);setTab2(true);}}>Next</button> */}
                            <button className={h.d07} onClick={() => {
                                f1.current.style.border="none";
                                f1.current.style.borderBottom="1px solid #e1e1e1";
                                f2.current.style.border="none";
                                f2.current.style.borderBottom="1px solid #e1e1e1";
                                f3.current.style.border="none";                                
                                f3.current.style.borderBottom="1px solid #e1e1e1";
                                f6.current.style.border="none";
                                f6.current.style.borderBottom="1px solid #e1e1e1";
                                f4.current.style.border="none";
                                f4.current.style.borderBottom="1px solid #e1e1e1";
                                f5.current.style.border="none";
                                f5.current.style.borderBottom="1px solid #e1e1e1";
                                if (allVar.country === "0") {
                                    f1.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                } else if (allVar.address === "") {
                                    f2.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                }else if (allVar.city===""){
                                    f3.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                  }  else if (allVar.selectState==="0"){
                                        f6.current.style.border="1px solid red";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                } else if (allVar.zip === "") {
                                    f4.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                }else if(allVar.vin === "")   {
                                    f5.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                }else {
                                    setTab1(false);
                                    setTab2(true);
                               }}}> Next</button>
                        </div>
                    </div>
                )}

                {tab2 && (
                    <div className={h.d0}>
                        <div className={h.d01}>Car Listing</div>
                        <div className={h.d02}>Car Info : Step 2</div>
                        <div className={h.d03}>
                            <select className={h.d031} ref={f1} value={allVar.mileage} onChange={e=> setAllVar({...allVar,mileage: e.target.value})} >
                                <option value="0">Select car mileage ...</option>
                                <option value="1">0 – 30k miles</option>
                                <option value="2">30k – 60k miles</option>
                                <option value="3">60k – 90k miles</option>
                                <option value="4">90k – 120K miles</option>
                                <option value="5">120K +</option>
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
                                <input type="checkbox" value={allVar.myPersonalCar} onChange={e=> setAllVar({...allVar,myPersonalCar: e.target.value})}/>
                                This is my personal car
                            </div>
                            <div className={h.d062}>
                                <input type="checkbox" value={allVar.carIsPartOfRentalCompany} onChange={e=> setAllVar({...allVar,carIsPartOfRentalCompany: e.target.value})}/>
                                This car is part of a rental company
                            </div>
                            <div className={h.d062}>
                                <input type="checkbox" value={allVar.automaticTransmission} onChange={e=> setAllVar({...allVar,automaticTransmission: e.target.value})}/>
                                This car has automatic transmission
                            </div>
                            <div className={h.d062}>
                                <input type="checkbox" value={allVar.carHasNotSignificantDamage} onChange={e=> setAllVar({...allVar,carHasNotSignificantDamage: e.target.value})}/>
                                This car has not had any significant damage (Branded Title)
                            </div>
                        </div>
                        <div className={h.d07c}>
                            <button className={h.d07b} onClick={() => {setTab2(false);setTab1(true);}}>Back</button>
                          
                            <button className={h.d07}onClick={() =>{
                                f1.current.style.border="none";
                                f1.current.style.borderBottom="1px solid #e1e1e1";
                             if(allVar.mileage==="0"){
                                 f1.current.style.border="1px solid red"
                             }else{
                                setTab2(false);
                                setTab3(true);
                                
                             }
                               }}> Next</button>

                        </div>
                    </div>
                )}
                    
                    {tab3 && (
                    <div className={h.d0}>
                     
                        <div className={h.d01}>Car Listing</div>
                          
                        <input type="file" id="file" accept="image/jpg, image/jpeg, image/png" style={{display: 'none'}} />
                        <div className={h.d02}>Drive License <label htmlFor="file" className={h.d020}>Upload Drive License</label></div>
                        {/* <h4>{allVar.state}{allVar.drivingLicense}{allVar.licenseNumber}{allVar.issuedDate}{allVar.firstName}{allVar.middleName}
 {allVar.firstName}{allVar.lastName}{allVar.dateOfBirth}{allVar.expirationDate}{allVar.address}</h4>    */}
                       
                       
                        <div className={h.d03}>
                            <select className={h.d031} ref={f1} value={allVar.nationality} onChange={e=> setAllVar({...allVar,nationality:e.target.value})}>
                                <option value="0">Nationality</option>
                                <option value="1">Indian</option>
            </select>
                        </div>
                        <div className={h.d04}>
                            <input type="text" ref={f2} placeholder="Enter address ..." value={allVar.addressLicense} onChange={e=> setAllVar({...allVar,addressLicense: e.target.value})}/>
                        </div>
                        <div className={h.d06}>
                            <div className={h.d061}>
                                <select ref={f11} className={h.d0612} value={allVar.selectCountry} onChange={e=> setAllVar({...allVar,selectCountry: e.target.value})}>    
                                    <option value="0">Select country of residence ...</option>  
                                    <option>Select country </option>
                                </select>
                            </div>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input ref={f3} type="text" placeholder="State ..." value={allVar.stateLicense} onChange={e=> setAllVar({...allVar,stateLicense: e.target.value})} />
                                </div>
                            </div>
                        </div>
                        <div className={h.d06}>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input ref={f4} type="text" placeholder="Enter License Number ..." value={allVar.licenseNumber} onChange={e=> setAllVar({...allVar,licenseNumber: e.target.value})} />
                                </div>
                            </div>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input ref={f5} type="Date"  placeholder="Enter Issued Date ..." value={allVar.issuedDate} onChange={e=> setAllVar({...allVar,issuedDate: e.target.value})} />
                                </div>
                            </div>
                        </div>
                        <div className={h.d04}>
                            <input ref={f6} type="text"  placeholder="First Name" value={allVar.firstName} onChange={e=> setAllVar({...allVar,firstName: e.target.value})} />
                        </div>
                        <div className={h.d04}>
                            <input ref={f7} type="text"  placeholder="Middle Name" value={allVar.middleName} onChange={e=> setAllVar({...allVar,middleName: e.target.value})} />
                        </div>
                        <div className={h.d04}>
                            <input ref={f8} type="text"  placeholder="Last Name" value={allVar.lastName} onChange={e=> setAllVar({...allVar,lastName: e.target.value})} />
                        </div>
                        <div className={h.d06}>
                            <h4>Date of Birth</h4><h4 style={{float:"Right", marginTop:"-22px",marginRight:"34%"}}>Expiration Date</h4>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input ref={f9} type="date"  placeholder="Date of birth" value={allVar.dateOfBirth} onChange={e=> setAllVar({...allVar,dateOfBirth: e.target.value})} />
                                </div>
                            </div>
                            <div className={h.d061}>
                                <div className={h.d0611}>
                                    <input ref={f10} type="date"  placeholder="Expiration Date" value={allVar.expirationDate} onChange={e=> setAllVar({...allVar,expirationDate: e.target.value})} />
                                </div>
                            </div>
                        </div>
                        <div className={h.d07c}>
                            <button className={h.d07b} onClick={() => {setTab3(false);setTab2(true);}}>Back</button>
                            {/* <button className={h.d07} onClick={() => {setTab3(false);setTab4(true);}}>Next</button> */}
                            <button className={h.d07} onClick={() => {
                               f1.current.style.border="none";
                                 f1.current.style.borderBottom="1px solid #e1e1e1";
                                 f2.current.style.border="none";
                                 f2.current.style.borderBottom="1px solid #e1e1e1";
                                 f11.current.style.border="none";
                                 f11.current.style.borderBottom="1px solid #e1e1e1";
                                 f3.current.style.border="none";                                
                                 f3.current.style.borderBottom="1px solid #e1e1e1";
                                 f4.current.style.border="none";
                                 f4.current.style.borderBottom="1px solid #e1e1e1";
                                 f5.current.style.border="none";
                                 f5.current.style.borderBottom="1px solid #e1e1e1";
                                 f6.current.style.border="none";
                                 f6.current.style.borderBottom="1px solid #e1e1e1";
                                 f7.current.style.border="none";
                                 f7.current.style.borderBottom="1px solid #e1e1e1";
                                 f8.current.style.border="none";
                                 f8.current.style.borderBottom="1px solid #e1e1e1";
                                 f9.current.style.border="none";
                                 f9.current.style.borderBottom="1px solid #e1e1e1";
                                 f10.current.style.border="none";
                                 f10.current.style.borderBottom="1px solid #e1e1e1";
                                   if (allVar.nationality === "0") {
                                    f1.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                } else if (allVar.addressLicense === "") {
                                    f2.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                  }  else if (allVar.selectCountry === "0") {
                                        f11.current.style.border="1px solid red";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                }else if (allVar.stateLicense===""){
                                    f3.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                } else if (allVar.licenseNumber === "") {
                                    f4.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                }else if(allVar.issuedDate === "")   {
                                    f5.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                }else if(allVar.firstName === "")   {
                                    f6.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                } else if(allVar.middleName === "")   {
                                    f7.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                } else if(allVar.lastName === "")   {
                                    f8.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                } else if(allVar.dateOfBirth === "")   {
                                    f9.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                } else if(allVar.expirationDate === "")   {
                                    f10.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                }
                                    else {
                                 
                                    setTab3(false);
                                    setTab4(true);
                                    
                                    
                               }   }}> Next</button>
                             </div>
                    </div>
                )}

                {tab4 && (
                    <div className={h.d0}>
                        <div className={h.d01}>Car Listing</div>
                        <div className={h.d02}>Booking Information</div>
                        <div className={h.d03}>
                            <select className={h.d031} ref={f1} value={allVar.advanceNoticeBeforeBooking} onChange={e=> setAllVar({...allVar,advanceNoticeBeforeBooking:e.target.value})}>
                                <option value="0">Advance notice before pickup</option>
                                <option>6 Hours</option>
                                <option>12 Hours</option>
                                <option>Next day</option>
                                <option>At least 1 day</option>
                                <option>At least 2 days</option>
                            </select>
                        </div>
                        <div className={h.d03}>
                            <select className={h.d031} ref={f2} value={allVar.bookingAvailability} onChange={e=> setAllVar({...allVar,bookingAvailability:e.target.value})}>
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
                                <select className={h.d0612} ref={f3} value={allVar.minimumTripDuration} onChange={e=> setAllVar({...allVar,minimumTripDuration:e.target.value})}>
                                    <option value="0">Minimum trip duration</option>
                                    <option>1 day</option>
                                    <option>2 days</option>
                                    <option>3 days</option>
                                </select>
                            </div>
                            <div className={h.d061}>
                                <select className={h.d0612} ref={f4} value={allVar.maximumTripDuration} onChange={e=> setAllVar({...allVar,maximumTripDuration:e.target.value})}>
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
                            {/* <button className={h.d07} onClick={() => {setTab4(false);setTab5(true);}}>Next</button> */}
                            <button className={h.d07} onClick={() => {
                               f1.current.style.border="none";
                                 f1.current.style.borderBottom="1px solid #e1e1e1";
                                 f2.current.style.border="none";
                                 f2.current.style.borderBottom="1px solid #e1e1e1";
                                 f3.current.style.border="none";                                
                                 f3.current.style.borderBottom="1px solid #e1e1e1";
                                 f4.current.style.border="none";
                                 f4.current.style.borderBottom="1px solid #e1e1e1";
                                    if (allVar.advanceNoticeBeforeBooking === "0") {
                                    f1.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                } else if (allVar.bookingAvailability === "0") {
                                    f2.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                }else if (allVar.minimumTripDuration==="0"){
                                    f3.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                } else if (allVar.maximumTripDuration === "0") {
                                    f4.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                }
                                else {
                                 
                                    setTab4(false);
                                    setTab5(true);   }   }}> Next</button>
                                    
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
                            <textarea placeholder="Write from here ..." value={allVar.carDescription} onChange={e=> setAllVar({...allVar,carDescription:e.target.value})} />
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
                        <input ref={f1} type="text"  placeholder="License Plate Number" value={allVar.licensePlateNumber} onChange={e=> setAllVar({...allVar,licensePlateNumber: e.target.value})} />
                          
                        </div>
                        <div className={h.d03}>
                            <select ref={f2} className={h.d031} value={allVar.IssuedState} onChange={e=> setAllVar({...allVar,IssuedState: e.target.value})} >
                             <option value="0">Issued State/Region/Province</option>
                                <option>Issued State</option>
                            </select>
                        </div>

                        <div className={h.d07c}>
                            <button className={h.d07b} onClick={() => {setTab7(false);setTab6(true);}}>Back</button>
                            <button className={h.d07} onClick={() => {
                                 f1.current.style.border="none";
                                 f1.current.style.borderBottom="1px solid #e1e1e1";
                                 f2.current.style.border="none";
                                 f2.current.style.borderBottom="1px solid #e1e1e1";
                                 if (allVar.licensePlateNumber === "") {
                                  f1.current.style.border="1px solid red";
                                  setErrTab(true);
                                  setInterval(() => setErrTab(false), errorDisplayTime);
                                 }else if (allVar.IssuedState === "0") {
                                    f2.current.style.border="1px solid red";
                                    setErrTab(true);
                                    setInterval(() => setErrTab(false), errorDisplayTime);
                                 }else{
                                setTab7(false);setTab8(true);}}}>Next</button>
                        </div>
                    </div>
                )}

                {tab8 && (
                    <div className={h.d0}>
                        <div className={h.d01}>Car Listing</div>
                        <div className={h.d02}>Car photos</div>
                        <div className={h.d02Sub}>Give guests more information about your car</div>
                        
                        <div className={h.d04}>
                            <label>Take photo
                        <input type="file"  accept="image/jpg, image/jpeg, image/png" onChange={e => uploadImageHandler(e)} multiple style={{display: "none"}} />
</label>
                        </div> 
                          <div className="uploadedImageContHostCar">
                                {renderPhoto(selectedImage)}
                            </div>
                        {/* <div className={h.d04}>
                            <label>Select from gallery</label>
                        </div> */}

                        <div className={h.d07c}>
                            <button className={h.d07b} onClick={() => {setTab8(false);setTab7(true);}}>Back</button>
                            <button className={h.d07} onClick={() => {
                                    if (selectedImage.length === 0) {
                                        setErrTab2(true);
                                        setInterval(() => setErrTab2(false), errorDisplayTime);
                                    } else {
                                        setTab8(false);
                                        setTab9(true);
                                    }
                                }}>Next</button>
                        </div>
                    </div>
                )}

                {tab9 && (
                    <div className={h.d0}>
                        <div className={h.d01}>Car Listing</div>
                        {/* <div className="HostYourApartment212"> */}
                                    <div className={h.d02}>Currency</div>

                                    <div className={h.d03}>
                           <select className={h.d031} ref={f1} value={allVar.currency} onChange={e => {setAllVar({...allVar, currency: e.target.value});setFinalCurrencyVal(e)}}>
                                        <option value="0">Select currency</option>
                                        {
                                            currencyName.sort(function(a, b) {
                                                if(a.name < b.name) return -1;
                                                if(a.name > b.name) return 1;
                                                return 0;
                                            })
                                            .map(val => <option value={val.symbol_native}>{val.name} ({val.symbol_native})</option>)
                                        }
                                    </select>
                                    </div>
                                {/* </div> */}
                        <div className={h.d02}>Pricing</div>
                        {/* <div className={h.d02Sub}>Give guests more information about your car</div> */}
                        
                        <div className={h.d04}>
     <input type="text" ref={f2} placeholder="Enter Listing price" value={allVar.price} onChange={e=> setAllVar({...allVar,price: e.target.value})}/>
                        
                           
                                                   </div>
                        <div className={h.d03}>
                            <select className={h.d031} value={allVar.discountOfferedtToGuests} onChange={e=> setAllVar({...allVar,discountOfferedtToGuests: e.target.value})}>
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
                            <button className={h.d07} onClick={() => {
                             f1.current.style.border="none";
                               f1.current.style.borderBottom="1px solid #e1e1e1";
                               f2.current.style.border="none";
                               f2.current.style.borderBottom="1px solid #e1e1e1";
                               if (allVar.currency === "0") {
                                f1.current.style.border="1px solid red";
                                setErrTab(true);
                                setInterval(() => setErrTab(false), errorDisplayTime);
                               }else  if (allVar.price === "") {
                                f2.current.style.border="1px solid red";
                                setErrTab(true);
                                setInterval(() => setErrTab(false), errorDisplayTime);
                               }else{
                                    finalHostingSubmition();
                               }
                             } }>Next</button>
                               </div>

                            </div>
                                    
                )}

            {/* <div className={h.mobile}>mobile</div> */}

            {/* {dateView && (

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
                        {/* <Calendar 
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

            )} */}


{errTab && (
                <div className="HostYourApartmentError0">Please enter the field!!!</div>
            )}{errTab2 && (
                <div className="HostYourApartmentError0">You must select atleast one Image!!!</div>
            )}
            
         </div>
       


        
   </> );

            }
