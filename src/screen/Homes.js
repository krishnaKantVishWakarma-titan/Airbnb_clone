/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../css/components.css';
import {useState, useEffect, useCallback} from 'react';

// mobile
import backIconGrey from '../img/icons/backGrey.svg';
import RecentGreyIcon from '../img/icons/watch.svg';
import filterIconBlack from '../img/icons/filterBlack.svg';
import userIcon from '../img/icons/user.png';
import closeIcon from '../img/icons/close.png';

// import Slideshow from 'react-slidez';x
// import vd1 from '../img/demo/1.png';
// import vd2 from '../img/banners/ad.jpg';

import loading from '../img/icons/loading.gif';
import SetFav from '../components/SetFav'; 

import { Link, useLocation } from 'react-router-dom';
import v1 from '../img/demo/16.png';
import starIcon from '../img/icons/star.png';

import {Slider} from '@material-ui/core';
import React from 'react';

import headerStyle from '../css/headerMain.module.css';

import addSign from '../img/icons/addSign.png';
import minusSign from '../img/icons/minusSign.png';
import closeBtn from '../img/icons/close.png';
import pinIcon from '../img/icons/pin.png';

import FbImg from '../img/icons/facebook.png';
import googleImg from '../img/icons/google-plus.png';
import twitter from '../img/icons/twitter.png';

import UserImg from '../img/icons/user.png';
import LockImg from '../img/icons/lock.png';
import EmailImg from '../img/icons/email.png';
import downArrow from '../img/icons/down-arrow.png';

import rightArrowIcon from '../img/icons/headerMinBack.png';

import sidebarIcon from '../img/icons/sidebar.png';
import worldIcon from '../img/icons/blackWorldIcon.png';
import serachIcon from '../img/icons/searchIcon.png';

import LoginBanner from '../img/banners/undraw_enter_uhqk.png';
import SignUpBanner from '../img/banners/undraw_mobile_payments_vftl.png';


import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import TwitterLogin from "react-twitter-login";
import swal from 'sweetalert';

import searchIcon from '../img/icons/searchSmallStrips.svg';

// import 'pure-react-carousel/dist/react-carousel.es.css';
import ImageSlider from '../components/ImageSlider';

// date
import { DateRangePicker,DateRange } from 'react-date-range';
// import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import '../css/react_dates_overrides.css';

import { useHistory } from "react-router-dom";
// base url
import url from '../data/urls.json';

import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete';

export default function Homes() {

    const {searchKey, noAdult, noChild, noInfant} = useLocation().state;

    // search places api
    const [address, setAddress] = useState("");
    const [searchWord, setSearchWord] = useState(null);
    const handleAddressDeskOverChange = async value => {
        const result = await geocodeByAddress(value);
        console.log(result[0].address_components);
        console.log(result[0].address_components[0].long_name);
        setSearchWord(result[0].address_components[0].long_name);
        // alert("select");
        TopBarCall(result[0].address_components[0].long_name);
        setTopBar(false);
    }

    const TopBarCall = (val) => {
        // alert(val);
        mainTopUrl(val);
    }

    const [places, setPlaces] = useState(null);
    useEffect(async () => {
        mainUrl();
        
    }, []);

    const [heading, setHeading] = useState(null);

    const placesNearby = (no, val) => {
        if (no === 1) {
            if (searchKey === "") {
                setHeading("Places near you");
            } else {
                setHeading(searchKey);
            }
        } else {
            if (val === "") {
                setHeading("Places near you");
            } else {
                setHeading(val);
            }
        }
    }

    // guest no.
    const [guestAdult, setGuestAdult] = useState(noAdult);
    const [guestChild, setGuestChild] = useState(noChild);
    const [guestInfant, setGuestInfant] = useState(noInfant);
    const guestVal = sign => {

        if (sign === "+") {
            if (guestAdult >= 0) {
                setGuestAdult(preV => preV + 1);
            }
        } else {
            if (guestAdult > 0) {
                setGuestAdult(preV => preV - 1);
            }
        }
    }
    const childVal = sign => {

        if (sign === "+") {
            if (guestChild >= 0) {
                setGuestChild(preV => preV + 1);
            }
        } else {
            if (guestChild > 0) {
                setGuestChild(preV => preV - 1);
            }
        }
    }
    const infantVal = sign => {

        if (sign === "+") {
            if (guestInfant >= 0) {
                setGuestInfant(preV => preV + 1);
            }
        } else {
            if (guestInfant > 0) {
                setGuestInfant(preV => preV - 1);
            }
        }
    }

    const mainUrl = () => {
        console.log("searc keyword: "+searchKey);
        if (searchKey === "") {
            console.log("1");
            fetch(url.baseUrl+"host", {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => {
                placesNearby(1, "");
                if (localStorage.getItem("token") === null) {
                    console.log(res.data)
                    setPlaces(res.data);
                } else {
                    console.log(res.data)
                    getSavedList(JSON.parse(localStorage.getItem("token")).userId, res.data);
                }
                // getSavedList(JSON.parse(localStorage.getItem("token")).userId, res.data);
            })
            .catch(error => console.log(error));
        } else {
            console.log("2");
            fetch(url.baseUrl+"search/"+searchKey, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => {
                console.log(res.result);
                placesNearby(1, "");
                if (localStorage.getItem("token") === null) {
                    setPlaces(res.result);
                } else {
                    getSavedList(JSON.parse(localStorage.getItem("token")).userId, res.result);
                }
                // getSavedList(JSON.parse(localStorage.getItem("token")).userId, res.result);
            })
            .catch(error => console.log(error));
        }
    }
    
    const mainTopUrl = (val) => {
        fetch(url.baseUrl+"search/"+val, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            // console.log("main result")
            // console.log(res.result);
            placesNearby(2, val);
            if (localStorage.getItem("token") === null) {
                setPlaces(res.result);
            } else {
                getSavedList(JSON.parse(localStorage.getItem("token")).userId, res.result);
            }
        })
        .catch(error => console.log(error));
    }

    const getSavedList = (userid, data) => {
        fetch(url.baseUrl+"saved?userId="+userid, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res.data);
            for (var has in data) {
                for (var key in res.data) {

                    //search id
                    // console.log(data[has].id)
                    // console.log(res.data[key].hosting_id)

                    if (data[has].id === res.data[key].hosting_id) {
                        // console.log("keishna")
                        data[has].isFav = true;
                        data[has].isFavid = res.data[key].Id
                    }
                }
            }
            // console.log(data);
            setPlaces(data);
        })
        .catch(error => console.log(error));
    }

    // header transition
    const [topBar, setTopBar] = useState(false);
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            setTopBar(false)
        }
        console.log(window.scrollY)
    });
    const [barTab2, setBarTab2] = useState(false);
    const [barTab3, setBarTab3] = useState(false);

    const [filterPopup, setFilterPopup] = useState(false);
    const [sliderValuePath, setSliderValuePath] = useState([30, 40]);
    const [slideSingleVal, setSlideSingleVal] = useState(30);

    const [isSignedIn, setIsSignedIn] = useState(true);

    const [sideBar, setSideBar] = useState(false);
    const [signupPage, setSignupPage] = useState(false);
    const [signInPage, setSignInPage] = useState(false);

    // mobile
    const [searchTab1, setSearchTab1] = useState(false);
    const [searchTab2, setSearchTab2] = useState(false);
    const [searchTab3, setSearchTab3] = useState(false);

    const onFilter = () => {
        setFilterPopup(true);
    }

    const updateRange = (e, val) => {
        setSliderValuePath(val);
    }

    const singleSliderHandle = (e, val) => {
        setSlideSingleVal(val);
    }

    // types of places dropdown
    const [typeOfPlacesDD, setTypeOfPlacesDD] = useState(false);

    // sign in
    const [signinval, setSigninval] = useState({
        email: "",
        password: ""
    });
    
    const [langView, SetLAngView] = useState(false);
    
    const [userName, setUserName] = useState("null"); 

    // run only once
    useEffect(() => {

        if (localStorage.getItem("token") === null) {
            setIsSignedIn(false);
        } else {
            // get their value and check the token
            var data = localStorage.getItem("token");
            var name = JSON.parse(data);
            setUserName(name.userName);
            setIsSignedIn(true);
        }
        
    }, []);

    // dates
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    };
    const onDateApply = useCallback(() => {
        console.log("startDate: ", startDate);
        console.log("endDate: ", endDate);
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
    }, [startDate, endDate]);
    function handleDateSelect(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
        onDateApply();
    }
    const onDateMobApply = useCallback(() => {

        // const monthNames = ["January", "February", "March", "April", "May", "June",
        // "July", "August", "September", "October", "November", "December"
        // ];

        console.log("startDate: ", startDate);
        console.log("endDate: ", endDate);
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
        // setDateApplyBtn(false);s
        
        // var sdate = new Date(localStorage.getItem("startDate"));
        // var edate = new Date(localStorage.getItem("endDate"));
        // setDateA(`${sdate.getDate()} ${monthNames[sdate.getMonth()]} - ${edate.getDate()} ${monthNames[edate.getMonth()]}`);
    }, [startDate, endDate]);

    const signinSubmit = () => {
        // validation
        if (signinval.email === "") {
            alert("Enter email ...")
        } else if (signinval.password === "") {
            alert("Enter password ...")
        } else {

            console.log(signinval)
            fetch(url.baseUrl + "login", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    email: signinval.email,
                    password: signinval.password
                })
            })
            .then(res => res.json())
            .then(res => { 
                console.log(res);
                if (res.code === 206) {
                    swal("", "Email not found !!!", "error");
                    setSignInPage(false);
                    setSignupPage(true);
                } 
                
                if (res.code === 204) {
                    swal("Try again", "Email and password does not match !!!", "error");
                } 
                
                if (res.code === 200) {
                    var userData = {
                        "userId": res.user.id,
                        "userToken": res.user.logintoken,
                        "userName": res.user.name,
                        "userEmail": res.user.email,
                        "userProfile": res.user.profile_pic
                    }
                    if (localStorage.getItem("token") === null) {
                        localStorage.setItem("token", JSON.stringify(userData));
                        setUserName(res.user.name);
                        setSignInPage(false);
                        setIsSignedIn(true);

                    } else {
                        alert("Storage error")
                    }
                }

            })
            .catch(error => alert(error));

        }
    }

    const [signupVal, setSignupVal] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        login_type: "",
        login_id: "",
        profile_pic: "",
    });

    const signOutSubmit = () => {
        localStorage.removeItem("token");
        setIsSignedIn(false);
    }

    const openSignUpPage = () => {
        setSignupPage(true)
    }

    const openSignInPage = () => {
        setSignInPage(true)
    }

    // google authentications
    const responseGoogle = resp => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            name: resp.profileObj.givenName + " " + resp.profileObj.familyName,
            email: resp.profileObj.email,
            login_type: "google"
        }),
        redirect: 'follow'
        };

        fetch(url.baseUrl+"socialAuth", requestOptions)
        .then(response => response.json())
        .then(res => {
            if (res.code === 206) {
                swal("", "Email not found !!!", "error");
                setSignInPage(false);
                setSignupPage(true);
            }
            if (res.code === 200) {
                var userData = {
                    "userId": res.user.id,
                    "userToken": res.user.logintoken,
                    "userName": res.user.name,
                    "userEmail": res.user.email,
                    "userProfile": res.user.profile_pic
                }
                if (localStorage.getItem("token") === null) {
                    localStorage.setItem("token", JSON.stringify(userData));
                    setUserName(res.user.name);
                    setSignInPage(false);
                    setIsSignedIn(true);

                } else {
                    alert("Storage error")
                }
            }
        })
        .catch(error => alert("not able to login"));
    }
    const responseGoogleFail = resp => {
        console.log("Google auth fail : "+resp);
        alert("Google auth fails !")
    }

    const authHandler = (err, data) => {
        console.log(err, data);
    };

    const SignUpSubmit = () => {

        // validation
        if (signupVal.firstName === "") {
            alert("Enter first name ...")
        } else if (signupVal.lastName === "") {
            alert("Enter last name ...")
        } else if (signupVal.email === "") {
            alert("Enter email ...")
        } else if (signupVal.password === "") {
            alert("Enter password ...")
        } else {
            setSignupVal({...signupVal, login_type: "normal"})
            console.log(signupVal);

            var name = signupVal.firstName + " " + signupVal.lastName

            fetch(url.baseUrl + "register", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    name: name,
                    email: signupVal.email,
                    password: signupVal.password,
                })
            })
            .then(res => res.json())
            .then(res => { 
                console.log(res);
                if (res.code === 205) {
                    swal("Already register", "You are already register !!!", "info");
                    setSignInPage(true);
                    setSignupPage(false);
                } 
                if (res.code === 200) {
                    swal("Good job!", "You are successfully register !!!", "success");
                    var userData = {
                        "userId": res.user.id,
                        "userToken": res.user.logintoken,
                        "userName": res.user.name,
                        "userEmail": res.user.email,
                        "userProfile": res.user.profile_pic
                    }
                    if (localStorage.getItem("token") === null) {
                        localStorage.setItem("token", JSON.stringify(userData));
                        setUserName(res.user.name);
                        setSignInPage(false);
                        setIsSignedIn(true);

                    } else {
                        alert("Storage error")
                    }
                } 

            })
            .catch(error => console.log(error));
        }
    }

    const responseFacebook = resp => {
        alert(resp)
    } 

    const history = useHistory();

    const switchToHosting = () => {
        if (localStorage.getItem("token") === null) {
            setSignInPage(true);
        } else {
            history.push("/HostYourApartment");
        }
    }

    // mobile
    const [editMobOption, setEditMobOption] = useState(false);
    const [filterOption, setFilterOption] = useState(false);

    // filters
    const [filter1, setFilter1] = useState(true);
    const [filter2, setFilter2] = useState(true);
    const [filter3, setFilter3] = useState(true);

    if (!places) {
        return (<div style={{display: "flex", alignContent: "center", justifyContent: "center"}}><img style={{marginTop: "20%", width: "100px"}} src={loading} alt="" /></div>)
    } else {
        return (

            <>
    
                <div className="desktop">
                    <div className={headerStyle.headBody1}>
                        
                        <div className={headerStyle.headUpNavMain}>

                            <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt="" /></div>

                            <div className={headerStyle.headUpNav}>
                                <a className={headerStyle.headUpNavLink} onClick={switchToHosting}><span>Switch to hosting</span></a>
                                <a className={headerStyle.headUpNavLink} onClick={() => SetLAngView(true)}><img src={worldIcon} alt="" /></a>
                                <span onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                                    <img src={sidebarIcon} alt="" />
                                </span>

                            </div>

                        </div>


                        <div className={headerStyle.headNavE} onClick={() => setTopBar(true)}>

                            <div className={headerStyle.headNav0}>
                                <div className={headerStyle.headNav01}>
                                    <div className={headerStyle.headNav011} style={{color: 'black'}}>Select map area</div>
                                </div>
                                <div className={headerStyle.headNav01}>
                                    <center><div className={headerStyle.headNav011}>Add dates</div></center>
                                </div>
                                <div className={headerStyle.headNav0111}>
                                    <center><div className={headerStyle.headNav011}>Guests</div></center>
                                </div>
                            </div>
                            <div className={headerStyle.headNav1}>
                                <img src={serachIcon} alt="" /> 
                            </div>

                        </div>

                    </div>

                    <div className="PlacesNearYou0">
                        <div className="PlacesNearYou01">{places.length} Stays</div>
                        <div className="PlacesNearYou02">{heading}</div>

                        <div className="PlacesNearYou03">
                            <div className="PlacesNearYou031" onMouseEnter={() => setTypeOfPlacesDD(true)} onMouseLeave={() => setTypeOfPlacesDD(false)}>Type of place</div>
                            <div className="PlacesNearYou031">Price</div>
                            <div className="PlacesNearYou031">Instant Book</div>
                            <div className="PlacesNearYou031" onClick={onFilter}>More filters</div>
                        </div>
                    </div>

                    {/* hosting list */}
                    <div className="DetailListCont">

                        {places
                        // .filter(item => item.whatGuestBook == filter1)
                        .map((val, ind) => {return (
                            <div className="DetailList0" key={ind}>
                                <div className="DetailList01">
                                    <ImageSlider images={val.imageList} />
                                </div>
                                <div className="DetailList02">
                                    <div className="DetailList02Side0">
                                        <div className="DetailList02Side01">
                                            <div className="DetailList021" onClick={() => history.push(`/hotelInfo/${val.id}`)}>{val.whatGuestBook}</div>
                                            <div className="DetailList022" onClick={() => history.push(`/hotelInfo/${val.id}`)}>{val.listingTitle}</div>
                                        </div>
                                        <SetFav val={val.isFav} id={val.id} isFavid={val.isFavid} openLogin={() => setSignInPage(true)} />
                                    </div>
                                    <div className="DetailList023">{val.noOfGuests} guests . Studio . {val.noOfBed} beds . {val.baths} bathroom</div>
                                    <div className="DetailList024">$ {val.basePrice}/night</div>
                                </div>
                            </div>
                        )})}

                    </div>
                </div>

                <div className="mobile">

                    {/* header */}
                    <div className="placesNearMob0">
                        <div className="placesNearMob01"><img src={backIconGrey} alt="" onClick={() => history.goBack()} /></div>
                        <div className="placesNearMob02">Nearby</div>
                        <button className="placesNearMob03" onClick={() => setEditMobOption(true)}>Add dates</button>
                        <button className="placesNearMob04"><img src={filterIconBlack} alt="" onClick={() => setFilterOption(true)} /></button>
                    </div>

                    {/* main body */}
                    <div className="placesNearMob1">
                        <div className="placesNearMob11">{heading}</div>
                        <div className="placesNearMob12">

                            {places.map((val, ind) => {return (

                                <Link to={{pathname: `/hotelInfo/${val.id}`}} key={ind}  className="placesNearMob121">
                                    <img src={v1} alt="" />
                                    <div className="placesNearMob1211">Name {val.userId}</div>
                                    <div className="placesNearMob1212">{val.noOfGuests} guests, {val.noOfBed} beds, {val.baths} bathroom</div>
                                    <div className="placesNearMob1213"><img src={starIcon} alt="" /> 5.4 <span>(30)</span></div>
                                    <div className="placesNearMob1214"><span>$ {val.basePrice}</span> / night</div>
                                </Link>

                            )})}

                        </div>
                    </div>

                    

                    {/* mobile over values */}
                    {editMobOption && (
                        <div className="placesNearMob3">
                            
                            {/* header */}
                            <div className="placesNearMob0">
                                <div className="placesNearMob01"><img src={closeIcon} style={{width: "13px", marginLeft: "2px"}} onClick={() => setEditMobOption(false)} alt="" /></div>
                                <div className="placesNearMob02" style={{width: "72%", textAlign: "center"}}>Edit your search</div>
                                <button className="placesNearMob04"><img src={filterIconBlack} alt="" onClick={() => setFilterOption(true)}  /></button>
                            </div>

                            {/* edit body */}
                            <div className="placesNearMob31">
                                <div className="placesNearMob311">
                                    <img src={searchIcon} alt="" />
                                    <input type="text" placeholder="Search" onClick={() => setSearchTab1(true)} />
                                </div>
                                <div className="placesNearMob312" onClick={() => setSearchTab2(true)}>
                                    Add date
                                </div>
                                <div className="placesNearMob312" onClick={() => setSearchTab3(true)}>
                                    Add guest
                                </div>
                            </div>

                        </div>
                    )}

                    {searchTab1 && (
                        <div className="headingMobile04">
                            <div className="headingMobile042">
                                <div className="headingMobile0421">
                                    
                                    <div className="headingMobile04211">
                                        <img src={backIconGrey} alt="" onClick={() => setSearchTab1(false)} />
                                        <input type="text" placeholder="Search ..." />
                                    </div>

                                    <div className="headingMobile04211ContScroll">

                                        <div className="headingMobile04211Heading">RECENT SEARCHES</div>
                                        <div className="headingMobile04212" onClick={() => {
                                            setSearchTab1(false);
                                            setSearchTab2(true)
                                            }}>
                                            <img src={RecentGreyIcon} alt="" />
                                            <p className="headingMobile042121">Bhopal</p>
                                        </div>
                                        <div className="headingMobile04212">
                                            <img src={RecentGreyIcon} alt="" />
                                            <p className="headingMobile042121">Bhopal</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    {searchTab2 && (
                        <div className="headingMobile04">
                            <div className="headingMobile042">
                                <div className="headingMobile0421">
                                    
                                    <div className="headingMobile04211">
                                        <img src={backIconGrey} alt="" onClick={() => setSearchTab2(false)} />
                                        <div>When will you be there</div>
                                    </div>

                                    <div className="headingMobile04211ContScroll" style={{marginTop: "20px"}}>

                                        <div className="headingMobile06">

                                        <DateRange
                                            editableDateInputs={true}
                                            onChange={handleDateSelect}
                                            moveRangeOnFirstSelection={false}
                                            ranges={[selectionRange]}
                                        />

                                        </div>

                                    </div>

                                    <div className="headingMobile061">
                                        <div className="headingMobile0611" onClick={() => setSearchTab2(false)} >Cancel</div>
                                        <div className="headingMobile0612"><button onClick={() => {
                                            setSearchTab3(false);
                                            onDateMobApply();
                                        }}>Next</button></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    {searchTab3 && (
                        <div className="headingMobile04">
                            <div className="headingMobile042">
                                <div className="headingMobile0421">
                                    
                                    <div className="headingMobile04211">
                                        <img src={backIconGrey} alt="" onClick={() => setSearchTab3(false)} />
                                        <div>Who's coming ?</div>
                                    </div>

                                    <div className="headingMobile04211ContScroll" style={{marginTop: "20px"}}>

                                        <div className="headingMobile06E4">


                                            <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px", width: "95%"}}>
                                                Adults 
                                                <div className="PlacesNearYou2311">
                                                    <img src={minusSign} alt="" />
                                                    <span>0</span>
                                                    <img src={addSign} alt="" />
                                                </div>
                                            </div>
                                            <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px", width: "95%"}}>
                                                Children 
                                                <div className="PlacesNearYou2311">
                                                    <img src={minusSign} alt="" />
                                                    <span>0</span>
                                                    <img src={addSign} alt="" />
                                                </div>
                                            </div>
                                            <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px", width: "95%"}}>
                                                Infant 
                                                <div className="PlacesNearYou2311">
                                                    <img src={minusSign} alt="" />
                                                    <span>0</span>
                                                    <img src={addSign} alt="" />
                                                </div>
                                            </div>



                                        </div>

                                    </div>

                                    <div className="headingMobile061">
                                        <div className="headingMobile0611" onClick={() => setSearchTab3(false)} >Cancel</div>
                                        <div className="headingMobile0612"><button onClick={() => alert("djh")}>Next</button></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    

                    {/* mobile filter */}
                    {filterOption && (
                        <div className="placesNearMob4">
                            
                            {/* header */}
                            <div className="placesNearMob0">
                                <div className="placesNearMob01"><img src={closeIcon} style={{width: "13px", marginLeft: "2px"}} onClick={() => setFilterOption(false)} alt="" /></div>
                                <div className="placesNearMob02" style={{width: "72%", textAlign: "center"}}>Edit your search</div>
                                <button className="placesNearMob04" style={{textDecoration: "underline", paddingTop: "5px"}} onClick={() => alert("Clear all")}>Clear</button>
                            </div>

                            {/* body */}
                            <div className="placesNearMob51">

                                <div className="placesNearMob511">
                                    <input type="checkbox" />
                                    <div className="placesNearMob5111">Entire house</div>
                                </div>
                                <div className="placesNearMob511">
                                    <input type="checkbox" />
                                    <div className="placesNearMob5111">Entire house</div>
                                </div>
                                <div className="placesNearMob511">
                                    <input type="checkbox" />
                                    <div className="placesNearMob5111">Entire house</div>
                                </div>

                                <div className="placesNearMob512">
                                    <div className="placesNearMob5121">Prices</div>
                                    <div className="placesNearMob5122">
                                        <Slider 
                                            value={sliderValuePath}
                                            onChange={updateRange}
                                        />
                                    </div>
                                </div>

                                <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px", width: "90%"}}>
                                    Adults 
                                    <div className="PlacesNearYou2311">
                                        <img src={minusSign} alt="" />
                                        <span>0</span>
                                        <img src={addSign} alt="" />
                                    </div>
                                </div>
                                <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px", width: "90%"}}>
                                    Childrens 
                                    <div className="PlacesNearYou2311">
                                        <img src={minusSign} alt="" />
                                        <span>0</span>
                                        <img src={addSign} alt="" />
                                    </div>
                                </div>
                                <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px", width: "90%"}}>
                                    Infants 
                                    <div className="PlacesNearYou2311">
                                        <img src={minusSign} alt="" />
                                        <span>0</span>
                                        <img src={addSign} alt="" />
                                    </div>
                                </div>

                            </div>

                            {/* bottom buttom */}
                            <div className="placesNearMob41">
                                <button>Show results</button>
                            </div>

                        </div>
                    )}


                </div>

                {sideBar && (
                        
                    isSignedIn ? 
                        <div className={headerStyle.headSideBar} onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                            <div className={headerStyle.headSideBar011S0}>
                                <div className={headerStyle.headSideBar011S01}><img src={userIcon} alt="" /></div>
                                <div className={headerStyle.headSideBar011S02}>{userName} 
                                    <div className={headerStyle.headSideBar011S021} style={{width: '100%'}}>{JSON.parse(localStorage.getItem("token")).userEmail}</div>
                                </div>
                            </div>
                            <div className={headerStyle.headSideBar011S1}><button onClick={() => history.push('/Account')}>View Profile</button></div>
                            <p onClick={() => history.push('/')}>Home</p>
                            <p onClick={() => history.push('/hosting')}>Listing</p>
                            <p onClick={() => history.push('/notify')}>Notification</p>
                            <p onClick={() => history.push('/chats')}>Messages</p>
                            <p onClick={() => history.push('/Saved')}>Saved</p>
                            <p onClick={() => history.push('/Trips')}>Trips</p>
                            <p onClick={() => history.push('/hostCars')}>Host your cars</p>
                            <p onClick={() => history.push('/HostYourApartment')}>Host your apartment</p>
                            <p onClick={signOutSubmit}>Signout</p>
                        </div> : 
                        <div className={headerStyle.headSideBar} onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                            <p onClick={openSignUpPage}>Sign Up</p>
                            <p onClick={openSignInPage}>Login</p>
                            <hr/>
                            <p>Host your Home</p>
                            <p>Host an experience</p>
                            <p>Help</p>
                        </div>

                )}
    
                {typeOfPlacesDD && (
                    <div className="PlacesNearYou9">
                        <div className="PlacesNearYou91" onMouseEnter={() => setTypeOfPlacesDD(true)} onMouseLeave={() => setTypeOfPlacesDD(false)}>
                            <div className="PlacesNearYou911">
    
                                <div className="PlacesNearYou9111">
                                    <div className="PlacesNearYou91111"><input type="checkbox" checked={filter1} onChange={e => setFilter1(e.target.checked)} /></div>
                                    <div className="PlacesNearYou91112">
                                        <div className="PlacesNearYou911111">Entire place</div>
                                        <div className="PlacesNearYou911112">Have a place to your self</div>
                                    </div>
                                </div>
                                <div className="PlacesNearYou9111">
                                    <div className="PlacesNearYou91111"><input type="checkbox"  checked={filter2} onChange={e => setFilter2(e.target.checked)} /></div>
                                    <div className="PlacesNearYou91112">
                                        <div className="PlacesNearYou911111">Shared spaces</div>
                                        <div className="PlacesNearYou911112">Stay in a shared space, like a common room</div>
                                    </div>
                                </div>
                                {/* <div className="PlacesNearYou9111">
                                    <div className="PlacesNearYou91111"><input type="checkbox" checked /></div>
                                    <div className="PlacesNearYou91112">
                                        <div className="PlacesNearYou911111">Private room</div>
                                        <div className="PlacesNearYou911112">Have your own room and share some common spaces</div>
                                    </div>
                                </div> */}
                                <div className="PlacesNearYou9111">
                                    <div className="PlacesNearYou91111"><input type="checkbox"  checked={filter3} onChange={e => setFilter3(e.target.checked)} /></div>
                                    <div className="PlacesNearYou91112">
                                        <div className="PlacesNearYou911111">Hotel room</div>
                                        <div className="PlacesNearYou911112">Have a private or shared room in a boutique hotel, hostel, and more</div>
                                    </div>
                                </div>
    
                            </div>
                            {/* <div className="PlacesNearYou912">
                                <button>Apple</button>
                            </div> */}
                        </div>
                    </div>
                )}
    
                {topBar && (
                    <>
                        <div className={headerStyle.topBar0}>
        
                            <div className={headerStyle.headUpNavMainT}>
        
                                <div style={{float: "left", width: "16px", marginTop: "25px", marginLeft: "25px", cursor: "pointer"}} onClick={() => setTopBar(false)}><img style={{width: "100%"}} src={closeBtn} alt="" /></div>

                                <div className={headerStyle.headUpNav}>
                                    <a className={headerStyle.headUpNavLink} onClick={switchToHosting}><span>Switch to hosting</span></a>
                                    <a className={headerStyle.headUpNavLink} onClick={() => SetLAngView(true)}><img src={worldIcon} alt="" /></a>
                                    <span onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                                        <img src={sidebarIcon} alt="" />
                                    </span>
        
                                    {sideBar && (
                                        isSignedIn ? 
                                            <div className={headerStyle.headSideBar} onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                                                <div className="headSideBar011S0">
                                                <div className="headSideBar011S01"><img src={JSON.parse(localStorage.getItem("token")).userProfile} alt="" /></div>
                                                <div className="headSideBar011S02">{userName} 
                                                    <div className="headSideBar011S021" style={{width: '100%'}}>{JSON.parse(localStorage.getItem("token")).userEmail}</div>
                                                </div>
                                            </div>
                                            <div className="headSideBar011S1"><button onClick={() => history.push('/Account')}>View Profile</button></div>
                                            <p onClick={() => history.push('/')}>Home</p>
                                            <p onClick={() => history.push('/hosting')}>Listing</p>
                                            <p onClick={() => history.push('/notify')}>Notification</p>
                                            <p onClick={() => history.push('/chats')}>Messages</p>
                                            <p onClick={() => history.push('/Saved')}>Saved</p>
                                            <p onClick={() => history.push('/Trips')}>Trips</p>
                                            <p onClick={() => history.push('/hostCars')}>Host your cars</p>
                                            <p onClick={() => history.push('/HostYourApartment')}>Host your apartment</p>
                                            <p onClick={signOutSubmit}>Signout</p>
                                            </div> : 
                                            <div className={headerStyle.headSideBar} onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                                                <p onClick={openSignUpPage}>Sign Up</p>
                                                <p onClick={openSignInPage}>Login</p>
                                                <hr/>
                                                <p>Host your Home</p>
                                                <p>Host an experience</p>
                                                <p>Help</p>
                                            </div>
                                    )}
        
                                </div>
        
                            </div>
        
                            <div className={headerStyle.headNavET}>
        
                                <div className={headerStyle.headNav0T}>
                                    <div className={headerStyle.headNav01T}>
                                        <div className={headerStyle.headNav011T} onClick={() => {setBarTab3(false); setBarTab2(false)}}>Location</div>

                                        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleAddressDeskOverChange} >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                <>
                                                    <div className={headerStyle.headNav012}><input {...getInputProps({placeholder: "Where are you going?"})} onClick={() => {setBarTab3(false); setBarTab2(false)}} /></div>

                                                    <div className={headerStyle.headNav012Over}>
                                                        {loading ? <div>Loading ... </div> : null}
                                                        {suggestions.map((suggestion,ind) => {
                                                            return <div className={headerStyle.topBar011} {...getSuggestionItemProps(suggestion)} key={ind}><img src={pinIcon} alt="" /><p>{suggestion.description}</p></div>
                                                        })}
                                                    </div>
                                                </>
                                            )}
                                        </PlacesAutocomplete>

                                    </div>
                                    <div className={headerStyle.headNav01T} onClick={() => {
                                        setBarTab3(false);
                                        setBarTab2(true);
                                    }}>
                                        <center><div className={headerStyle.headNav011T}>Travelling</div></center>
                                        <center><div className={headerStyle.headNav012}>Adds dates</div></center>
                                    </div>
                                    <div className={headerStyle.headNav01T} onClick={() => {
                                        setBarTab2(false);
                                        setBarTab3(true);
                                    }}>
                                        <div className={headerStyle.headNav0111TE}>
                                            <center><div className={headerStyle.headNav011T}>Guests</div></center>
                                            <center><div className={headerStyle.headNav012}>Add guests</div></center>
                                        </div>
                                        <div className={headerStyle.headNav1T}>
                                            <img src={serachIcon} alt="" onClick={() => {mainTopUrl(searchWord);setTopBar(false);}} /> 
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
        
                            {barTab2 && (
                                <div className={headerStyle.topBar01DAte}>
                                    <div className="dateCont01">
                                    <DateRangePicker
                                        showSelectionPreview={true}
                                        moveRangeOnFirstSelection={false}
                                        months={2}
                                        direction="horizontal"
                                        ranges={[selectionRange]} 
                                        onChange={handleDateSelect}
                                    />
                                    </div>
                                </div>
                            )}
        
                            {barTab3 && (
                                <div className={headerStyle.topBar01}>
                                    <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px"}}>
                                        Adults
                                        <div className="PlacesNearYou2311">
                                            <img src={minusSign} alt="" onClick={() => guestVal("-")} />
                                            <span>{guestAdult}</span>
                                            <img src={addSign} alt="" onClick={() => guestVal("+")} />
                                        </div>
                                    </div>
                                    <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px"}}>
                                        Children 
                                        <div className="PlacesNearYou2311">
                                            <img src={minusSign} alt="" onClick={() => childVal("-")} />
                                            <span>{guestChild}</span>
                                            <img src={addSign} alt="" onClick={() => childVal("+")} />
                                        </div>
                                    </div>
                                    <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px"}}>
                                        Infant 
                                        <div className="PlacesNearYou2311">
                                            <img src={minusSign} alt="" onClick={() => infantVal("-")} />
                                            <span>{guestInfant}</span>
                                            <img src={addSign} alt="" onClick={() => infantVal("+")} />
                                        </div>
                                    </div>
                                </div>
                            )}
        
                        </div>

                    </>

                )}
    
                {filterPopup && (
    
                    <div className="signupPageFilter">
                        <div className="sign0Filter">
                            
                            <div className="PlacesNearYou1">
                                <img src={closeBtn} alt="" onClick={() => setFilterPopup(false)} />
                                <p>More Filters</p>
                            </div>
    
                            <div className="PlacesNearYou2">
                                <div className="PlacesNearYou20">Price (for 1 night)</div>
                                <div className="PlacesNearYou21">
                                <Slider 
                                    value={sliderValuePath}
                                    onChange={updateRange}
                                />
                                </div>
                            </div>
    
                            <div className="PlacesNearYou2">
                                <div className="PlacesNearYou22">Rooms and beds</div>
                                <div className="PlacesNearYou23">
                                    <div className="PlacesNearYou231">
                                        Beds 
                                        <div className="PlacesNearYou2311">
                                            <img src={addSign} alt="" />
                                            <span>0</span>
                                            <img src={minusSign} alt="" />
                                        </div>
                                    </div>
                                    <div className="PlacesNearYou231">
                                        Bedrooms 
                                        <div className="PlacesNearYou2311">
                                            <img src={addSign} alt="" />
                                            <span>0</span>
                                            <img src={minusSign} alt="" />
                                        </div>
                                    </div>
                                    <div className="PlacesNearYou231">
                                        Bathrooms 
                                        <div className="PlacesNearYou2311">
                                            <img src={addSign} alt="" />
                                            <span>0</span>
                                            <img src={minusSign} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className="PlacesNearYou2">
                                <div className="PlacesNearYou20">Price (for 1 night)</div>
                                <div className="PlacesNearYou21">
                                <Slider value={slideSingleVal} onChange={singleSliderHandle} aria-labelledby="continuous-slider" />
                                </div>
                            </div>
    
                            <div className="PlacesNearYou2">
                                <div className="PlacesNearYou22"><center>Type of Accomocation</center></div>
                                <div className="PlacesNearYou23">
                                    <div className="PlacesNearYou231">
                                        All 
                                        <div className="PlacesNearYou2311">
    
                                        </div>
                                    </div>
                                    <div className="PlacesNearYou231">
                                        Apartment 
                                        <div className="PlacesNearYou2311">
    
                                        </div>
                                    </div>
                                    <div className="PlacesNearYou231">
                                        Home 
                                        <div className="PlacesNearYou2311">
    
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className="PlacesNearYou2">
                                <div className="PlacesNearYou22">
                                    <button className="PlacesNearYou221">Clear All</button>
                                    <button className="PlacesNearYou222">Show 300+ stays</button>
                                </div>
                            </div>
    
    
    
                        </div>
                    </div>
    
                )}
    
                {/* language box */}
                {langView && (
                    <div className="langCont0">
                        <div className="langCont01">
                            <div  className="langCont01Close"><img src={closeBtn} onClick={() => SetLAngView(false)} alt="" /></div>
                            <div className="langCont011">
                                <div className="langCont0111">
                                    <span className="langCont01111">
                                        Language and region
                                        {/* <FormattedMessage 
                                            id="title"
                                            defaultMessage={defaultMgs.Mgs.titles}
                                        /> */}
                                    </span>
                                    <span className="langCont01112">Currency</span>
                                </div>
                                <div className="langCont0112">Suggested languages and regions</div>
                                <div className="langCont0113">
                                    
                                    <div className="langCont01131" onClick={() => {
                                        localStorage.setItem('locale', 'en');
                                        window.location.reload(); 
                                    }}>
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
                                    <div className="langCont01131" onClick={() => {
                                        localStorage.setItem('locale', 'hi');
                                        window.location.reload(); 
                                    }}>
                                        <div className="langCont011311">हिंदी</div>
                                        <div className="langCont011312">भारत</div>
                                    </div>
    
                                </div>
                                <div className="langCont0112">Suggested language and region</div>
                                <div className="langCont0113">
                                    
                                    <div className="langCont01131">
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
                                    <div className="langCont01131">
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
                                    <div className="langCont01131">
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
                                    <div className="langCont01131">
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
                                    <div className="langCont01131">
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
                                    <div className="langCont01131">
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
                                    <div className="langCont01131">
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
                                    <div className="langCont01131">
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
                                    <div className="langCont01131">
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
                                    <div className="langCont01131">
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
                                    <div className="langCont01131">
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
                                    <div className="langCont01131">
                                        <div className="langCont011311">English</div>
                                        <div className="langCont011312">United state</div>
                                    </div>
    
                                </div>
    
                            </div>
                        </div>
                    </div>
                )}
    
                {/* Login view */}
                {signInPage && (
    
                    <div className="signupPage">
                        <div className="sign0">
                            <div className="sign01">
                                {/* 1st row */}
                                <div className="sign011"><img src={LoginBanner} alt="" /></div>
                                <div className="sign012" onClick={() => {
                                    setSignInPage(false);
                                    setSignupPage(true);
                                }}>Create an account</div>
                            </div>
                            <div className="sign02">
                                <div className="Closebtn">
                                    <div onClick={() => setSignInPage(false)}>Close</div>
                                </div>
    
                                {/* 2nd row */}
                                <div className="sign021">Log In</div>
                                <div className="sign022">
                                    <span className="sign0221"><img src={UserImg} alt="" /></span>
                                    <span className="sign0222"><input type="text" onChange={e => setSigninval({...signinval, email: e.target.value})}  placeholder="Enter your email ..." /></span>
                                    <span className="sign0223"><img src={downArrow} alt="" /></span>
                                </div>
                                <div className="sign022">
                                    <span className="sign0221"><img src={LockImg} alt="" /></span>
                                    <span className="sign0222"><input type="password" onChange={e => setSigninval({...signinval, password: e.target.value})}  placeholder="Enter your password ..." /></span>
                                    <span className="sign0223"><img src={downArrow} alt="" /></span>
                                </div>
                                <div className="sign023">
                                    <span className="sign0231"><input type="checkbox" /></span>
                                    <span className="sign0232">Remember me</span>
                                </div>
                                <div className="sign023"><button onClick={signinSubmit}>Log In</button></div>
                                <div className="sign024">
                                    <span className="sign0241">Or Login with</span>
                                    <div className="sign0242">
                                        <GoogleLogin
                                            clientId="712330131270-mbt3jl3i2ohaqsuk3cqvm6gkpf2qaefo.apps.googleusercontent.com"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogleFail}
                                            render={renderProp => (
                                                <button onClick={renderProp.onClick} className="GoogleBtn">
                                                    <img src={googleImg} alt="" />
                                                </button>
                                            )}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                    </div>
                                    <div className="sign0242">
                                        <TwitterLogin
                                            authCallback={authHandler}
                                            consumerKey="oY4NkDIMi7E3iLlmr0JXZn0oZ"
                                            consumerSecret="swRWHCK1JOUSK8TzORMzUfzxAcEG8Pk17B4Hv0FYwpFkYY7Csz"
                                        >
                                            <button className="GoogleBtn">
                                                <img src={twitter} alt="" />
                                            </button>
                                        </TwitterLogin>
                                    </div>
                                    <div className="sign0242">
                                        {/* <FacebookLogin
                                            appId="225590285712276"
                                            autoLoad={false}
                                            fields="name,email,picture"
                                            cookie={true}
                                            callback={responseFacebook} 
                                            render={renderProp => (
                                                <button onClick={renderProp.onClick} className="GoogleBtn">
                                                    <img src={FbImg} alt="" />
                                                </button>
                                            )}
                                        /> */}
                                    </div>
                                </div>
    
                            </div>
                        </div>
                    </div>
    
                    )}
    
                    {/* reigster view */}
                    {signupPage && (
                    <div className="signupPage">
                        <div className="sign0">
                            <div className="sign01">
    
                                {/* 1st row */}
                                <div className="sign011"><img src={SignUpBanner} alt="" /></div>
                                <div className="sign012" onClick={() => {
                                    setSignupPage(false);
                                    setSignInPage(true);
                                }}>Login</div>
                            </div>
                            <div className="sign02">
                                <div className="Closebtn">
                                    <div onClick={() => setSignupPage(false)}>Close</div>
                                </div>
                                {/* 2nd row */}
                                <div className="sign021Ex">Sign Up</div>
                                <div className="sign022">
                                    <span className="sign0221"><img src={UserImg} alt="" /></span>
                                    <span className="sign0222"><input type="text" placeholder="First name ..." onChange={e => setSignupVal({...signupVal, firstName: e.target.value})} /></span>
                                    <span className="sign0223"><img src={downArrow} alt="" /></span>
                                </div>
                                <div className="sign022">
                                    <span className="sign0221"><img src={UserImg} alt="" /></span>
                                    <span className="sign0222"><input type="text" placeholder="Last name ..." onChange={e => setSignupVal({...signupVal, lastName: e.target.value})} /></span>
                                    <span className="sign0223"><img src={downArrow} alt="" /></span>
                                </div>
                                <div className="sign022">
                                    <span className="sign0221"><img src={EmailImg} alt="" /></span>
                                    <span className="sign0222"><input type="text" placeholder="Email ..." onChange={e => setSignupVal({...signupVal, email: e.target.value})} /></span>
                                    <span className="sign0223"><img src={downArrow} alt="" /></span>
                                </div>
                                <div className="sign022">
                                    <span className="sign0221"><img src={LockImg} alt="" /></span>
                                    <span className="sign0222"><input type="password" placeholder="Password ..."  onChange={e => setSignupVal({...signupVal, password: e.target.value})} /></span>
                                    <span className="sign0223"><img src={downArrow} alt="" /></span>
                                </div>
                                <div className="sign023">
                                    <span className="sign0231"><input type="checkbox" /></span>
                                    <span className="sign0232">Remember me</span>
                                </div>
                                <div className="sign023"><button onClick={SignUpSubmit}>Sign Up</button></div>
    
    
                                <div className="sign024Ex">
                                    <span className="sign0241">Or Sign Up with</span>
                                    <div className="sign0242">
                                        <GoogleLogin
                                            clientId="712330131270-mbt3jl3i2ohaqsuk3cqvm6gkpf2qaefo.apps.googleusercontent.com"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogleFail}
                                            render={renderProp => (
                                                <button onClick={renderProp.onClick} className="GoogleBtn">
                                                    <img src={googleImg} alt="" />
                                                </button>
                                            )}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                    </div>
                                    <div className="sign0242">
                                        <TwitterLogin
                                            authCallback={authHandler}
                                            consumerKey="oY4NkDIMi7E3iLlmr0JXZn0oZ"
                                            consumerSecret="swRWHCK1JOUSK8TzORMzUfzxAcEG8Pk17B4Hv0FYwpFkYY7Csz"
                                        >
                                            <button className="GoogleBtn">
                                                <img src={twitter} alt="" />
                                            </button>
                                        </TwitterLogin>
                                    </div>
                                    <div className="sign0242">
                                        <FacebookLogin
                                            appId="225590285712276"
                                            autoLoad={false}
                                            status={true}
                                            xfbml={true}
                                            fields="name,email,picture"
                                            callback={responseFacebook} 
                                            render={renderProp => (
                                                <button onClick={renderProp.onClick} className="GoogleBtn">
                                                    <img src={FbImg} alt="" />
                                                </button>
                                            )}
                                        />
                                    </div>
                                </div>
    
                            </div>
                        </div>
                    </div>
                )}
    
            </>
    
        );
    }
}