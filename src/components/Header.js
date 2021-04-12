/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../css/header.css';
import {useState, useEffect, useCallback, useRef} from 'react';

import backIconGrey from '../img/icons/backGrey.svg';
import RecentGreyIcon from '../img/icons/watch.svg';
import profileIcon from '../img/icons/profileGrey.svg';
import sideBarMenuIcon from '../img/icons/sideMenuBar.svg';

import FbImg from '../img/icons/facebook.png';
import googleImg from '../img/icons/google-plus.png';
import twitter from '../img/icons/twitter.png';
import addSign from '../img/icons/addSign.png';
import minusSign from '../img/icons/minusSign.png';

import UserImg from '../img/icons/user.png';
import LockImg from '../img/icons/lock.png';
import EmailImg from '../img/icons/email.png';
import downArrow from '../img/icons/down-arrow.png';

import phonenu from '../img/icons/phone-book.svg'

import sidebarIcon from '../img/icons/sidebar.png';
import worldIcon from '../img/icons/worldIcon.png';
import closeBtn from '../img/icons/close.png';

import LoginBanner from '../img/banners/undraw_enter_uhqk.png';
import SignUpBanner from '../img/banners/undraw_mobile_payments_vftl.png';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import TwitterLogin from "react-twitter-login";

import PinIcon from '../img/icons/blackPin.png';
import SearchIconWhite from '../img/icons/search.png';

import swal from 'sweetalert';

// date
import { DateRange } from 'react-date-range';
// import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import '../css/react_dates_overrides.css';

import { useHistory } from 'react-router-dom';

// language
import defaultMgs from '../translations/DefaultMessage';
import {FormattedMessage} from 'react-intl';

// base url
import url from '../data/urls.json';

// mobile
import SearchIconMob from '../img/icons/searchGrey.svg';

// search places
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete';

export default function Header() {

    // searches
    const [searchTab, setSearchTab] = useState(false);

    // places api
    const [searchTextDesk, setSearchTextDesk] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [address, setAddress] = useState("");
    // mobile handler
    const handleAddressChange = async value => {
        const result = await geocodeByAddress(value);
        setSearchKeyword(result[0].address_components[0].long_name);
        console.log(result[0].address_components[0].long_name);
        setSearchTab1(false);
        setSearchTab2(true);
        setSearchTextDesk(result[0].address_components[0].long_name)
        searchTextDisplayDesk();
    }

    const handleAddressChangeDesk = async value => {
        const result = await geocodeByAddress(value);
        console.log(result[0].address_components[0].long_name);
        setSearchKeyword(result[0].address_components[0].long_name)
        setSearchTab(false);
        setDateView(true);
        setSearchTextDesk(result[0].address_components[0].long_name);
        searchTextDisplayDesk();
    }
    const searchTextDisplayDesk = () => {
        if (searchKeyword === "") {
            setSearchTextDesk("Where are you going?");
        } else {
            setSearchTextDesk(searchKeyword);
        }
    }

    const [sideBar, setSideBar] = useState(false);
    const [signupPage, setSignupPage] = useState(false);
    const [signInPage, setSignInPage] = useState(false);

    const [isSignedIn, setIsSignedIn] = useState(false);

    // sign in
    const [signinval, setSigninval] = useState({
        email: "",
        password: ""
    });

    const [langView, SetLAngView] = useState(false);
    
    const [userName, setUserName] = useState("null"); 

    // no. of guest
    const [noOfGuest,setNoOfGuest] = useState(false);

    // mobile
    const [searchTab1, setSearchTab1] = useState(false);
    const [searchTab2, setSearchTab2] = useState(false);
    const [searchTab3, setSearchTab3] = useState(false);
    const [searchTab4, setSearchTab4] = useState(false);
    const [searchTabMenuMain, setSearchTabMenuMain] = useState(false);

    // guest no.
    const [guestAdult, setGuestAdult] = useState(1);
    const [guestChild, setGuestChild] = useState(0);
    const [guestInfant, setGuestInfant] = useState(0);
    const guestVal = sign => {

        if (sign === "+") {
            if (guestAdult >= 0) {
                setGuestAdult(preV => preV + 1);
                console.log("+"+(guestAdult+1));
                // guestSetText("+");
            }
        } else {
            if (guestAdult > 0) {
                setGuestAdult(preV => preV - 1);
                console.log("-"+(guestAdult-1));
                // guestSetText("-");
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
        // guestSetText(null);
        searchTextDisplayDesk();
        
    }, []);


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

    // apple dates on btns
    const [dateA, setDateA] = useState("Apply dates");
    
    // dates
    const [dateView, setDateView] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // useEffect(() => {
    //     if (localStorage.getItem("startDate") != null) {
    //         setStartDate(new Date(localStorage.getItem("startDate")));
    //         setEndDate(new Date(localStorage.getItem("endDate")));
    //     }
    // }, [startDate, endDate]);

    const [dateApplyBtn, setDateApplyBtn] = useState(false);
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    };
    const onDateApply = useCallback(() => {

        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

        console.log("startDate: ", startDate);
        console.log("endDate: ", endDate);
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
        setDateApplyBtn(false);
        
        var sdate = new Date(localStorage.getItem("startDate"));
        var edate = new Date(localStorage.getItem("endDate"));
        setDateA(`${sdate.getDate()} ${monthNames[sdate.getMonth()]} - ${edate.getDate()} ${monthNames[edate.getMonth()]}`);
    }, [startDate, endDate]);
    function handleDateSelect(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
        setDateApplyBtn(true);
    }
    function handleDateSelectMob(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
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

    // sign up
    const [signupVal, setSignupVal] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        login_type: "",
        login_id: "",
        profile_pic: "",
        otp: ''
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
        console.log("google: "+resp.profileObj)

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
        // console.log(resp);
    }

    const authHandler = (err, data) => {
        console.log(err, data);
    };

    // sign up sub tabs
    const [subTab1, setSubTab1] = useState(true);
    const [subTab2, setSubTab2] = useState(false);

    // debug code
    useEffect(() => {
        console.log(signupVal);
    }, [signupVal]);

    const SignUpSubmit = () => {

        // validation
        if (signupVal.firstName === "") {  // full name
            alert("Enter full name ...")
        } else if (signupVal.lastName === "") {  //  mobile number 
            alert("Enter mobile no. ...")
        } else if (signupVal.email === "") {  // email
            alert("Enter email ...")
        } else if (signupVal.password === "") {  // password
            alert("Enter password ...")
        } else {
            setSignupVal({...signupVal, login_type: "normal"});
            console.log(signupVal)

            fetch(url.baseUrl + "sendVerificationCode", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //make sure to serialize your JSON body
                body: JSON.stringify({
                    phone: signupVal.lastName
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log("flag 1");
                console.log(res);
                if (res.code === 200) {
                    setSubTab1(false);
                    setSubTab2(true);
                }
            })
            .catch(error => console.log(error));
        }
    }
    //its working

    const SignUpVerfiyOTP = () => {
        if (signupVal.otp === "") {
            alert("Enter otp !!!");
        } else {
            fetch(url.baseUrl + "verifyCode", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //make sure to serialize your JSON body
                body: JSON.stringify({
                    phone: signupVal.lastName,
                    code: signupVal.otp
                })
            })
            .then(res => res.json())
            .then(res => { 
                console.log("flag 2");
                console.log(signupVal);
                console.log(res);
                if (res.status === 'pending') {
                    alert("Otp do not passed");
                } else if (res.status === 'approved') {
                    // setSubTab1(true);
                    // setSubTab2(false);
                    signupfinalcall();
                }
            })
            .catch(error => console.log(error));
        }
    }

    const signupfinalcall = () => {
        console.log(signupVal)
        fetch(url.baseUrl + "register", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                name: signupVal.firstName,
                email: signupVal.email,
                password: signupVal.password,
                phone: signupVal.otp,
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log("flag 4");
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
                    setSubTab1(false);
                    setSubTab2(false);
                    setSignupPage(false);
                    setIsSignedIn(true);
                } else {
                    alert("Storage error")
                }
            } 

        })
        .catch(error => console.log(error));
    }

    const responseFacebook = resp => {
        alert("Signed In"+ resp)
    } 

    const history = useHistory();

    const switchToHosting = () => {
        if (localStorage.getItem("token") === null) {
            setSignInPage(true);
        } else {
            history.push("/HostYourApartment");
        }
    }

    const goToHomesScreen = () => {
        history.push("/homes", {
            searchKey: searchKeyword,
            noAdult: guestAdult,
            noChild: guestChild,
            noInfant: guestInfant
        });
    }

    // modal boxes
    // search
    const outRefSearch = useRef(null);
    const inRefSearch = useRef(null);
    const clickHandleSearch = e => {
        if (inRefSearch.current.contains(e.target)) return;
        setSearchTab(false);
        searchTextDisplayDesk();
    }
    // date
    const outRefDate = useRef(null);
    const inRefDate = useRef(null);
    const clickHandleDate = e => {
        if (inRefDate.current.contains(e.target)) return;
        setDateView(false);
        searchTextDisplayDesk();
    }
    // Guest
    const outRefGuest = useRef(null);
    const inRefGuest = useRef(null);
    const clickHandleGuest = e => {
        if (inRefGuest.current.contains(e.target)) return;
        setNoOfGuest(false);
    }

    return (
        <>                
            {/* desktop version  */}
            <div className="header">
                <div className="headUpTxt">
                    <FormattedMessage 
                        id="covidTitle"
                        defaultMessage={defaultMgs.Mgs.covidTitle}
                    />
                </div>
                <div className="headBody">
                    <div className="headUpNavMain">
                        <div className="headUpNav1">
                            <a className="headUpNavLink1" onClick={switchToHosting}><span>
                            <FormattedMessage 
                                id="switchHosting"
                                defaultMessage={defaultMgs.Mgs.switchHosting}
                            />    
                            </span></a>
                            <a className="headUpNavLink1" onClick={() => SetLAngView(true)}><img src={worldIcon} alt="" /></a>
                            <span onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                                <img src={sidebarIcon} alt="" />
                            </span>

                        </div>
                    </div>

                    <div className="headBodyExplore">
                        <div className="headBodyExpl1">
                            <div className="headBodyTxt1">
                                {/* <div className="headBodyTxt">
                                <FormattedMessage 
                                    id="checkIn"
                                    defaultMessage={defaultMgs.Mgs.checkIn}
                                />    
                                </div>
                                <div className="headBodyTxt">
                                <FormattedMessage 
                                    id="toyourDesired"
                                    defaultMessage={defaultMgs.Mgs.toyourDesired}
                                />    
                                </div>
                                <div className="headBodyTxt">
                                <FormattedMessage 
                                    id="Apartments"
                                    defaultMessage={defaultMgs.Mgs.Apartments}
                                />    
                                </div> */}
                                <div className="headBodyTxt">
                                    Check into your <br /> desired Apartments  
                                </div>
                            </div>
                        </div>
                        <div className="headBodyExpl1">
                                
                            <div className="headBodyExpl11">

                                <div className="headBodyExpl111">
                                    <div className="headBodyExpl1111"><img src={PinIcon} alt="" /></div>
                                    <div className="headBodyExpl1112">
                                        {/* <FormattedMessage  id="input1" defaultMessage="input1">
                                            {placeholder => }
                                        </FormattedMessage>     */}
                                        {/* searchTextDesk */}
                                        <input type="text" placeholder={searchTextDesk} onClick={() => setSearchTab(true)} />
                                    </div>
                                </div>

                                <div className="headBodyExpl111">
                                    <div className="headBodyExpl1111"><img src={UserImg} alt="" /></div>
                                    <div className="headBodyExpl1112">
                                        <input type="text" placeholder={dateA} onClick={() => setDateView(true)} />
                                    </div>
                                </div>
                                
                                <div className="headBodyExpl111">
                                    <div className="headBodyExpl1111"><img src={UserImg} alt="" /></div>
                                    <div className="headBodyExpl1112">
                                    <FormattedMessage  id="noOFGuest" defaultMessage="noOFGuest">
                                        {placeholder => <input type="text" placeholder={placeholder} onClick={() => setNoOfGuest(true)} />}
                                    </FormattedMessage>    
                                    </div>
                                </div>

                                <div className="headBodyExpl114">
                                    <button className="headBodyExpl1141" onClick={() => goToHomesScreen()}><img src={SearchIconWhite} alt="" /> 
                                    <FormattedMessage 
                                        id="search"
                                        defaultMessage={defaultMgs.Mgs.search}
                                    />    
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* mobile versions */}
            <div className="headingMobile0">
                <div className="headingMobile02">
                    {/* main outter container */}
                    <div className="headingMobile021">

                        {/* main container */}
                        <div className="headingMobile0211">
                                
                            <div className="headingMobile0211Sid0">
                                <div className="headingMobile0211Sid01" onClick={() => setSearchTabMenuMain(true)}>
                                    <img src={sideBarMenuIcon} alt="" onClick={() => setSearchTabMenuMain(true)} />
                                </div>
                                <div className="headingMobile02111" onClick={() => setSearchTab1(true)}>
                                    <img src={SearchIconMob} alt="" />
                                    <div>Where are you going ?</div>
                                </div>
                            </div>

                            <div className="headingMobile02112">
                                <div>Check in to your Desired Apartment</div>

                                <button onClick={() => history.push("/homes", {
                                    searchKey: "",
                                    noAdult: 0,
                                    noChild: 0,
                                    noInfant: 0
                                })}>Explore nearby stays</button>
                            </div>

                        </div>

                    </div>
                </div>

                {searchTabMenuMain && (
                    <div className="headingMobile05">

                        {isSignedIn ? 
                            <div className="headingMobile051">
                                <div className="headingMobile0511" onClick={() => history.push("/Account")}>
                                    <img src={profileIcon} alt="" />
                                    <p>Profile</p>
                                </div>
                                <div className="headingMobile0511" onClick={() => history.push("/hosting")}>
                                    <img src={profileIcon} alt="" />
                                    <p>Listing</p>
                                </div>
                                <div className="headingMobile0511" onClick={() => history.push("/notify")}>
                                    <img src={profileIcon} alt="" />
                                    <p>Notification</p>
                                </div>
                                <div className="headingMobile0511" onClick={() => history.push("/chats")}>
                                    <img src={profileIcon} alt="" />
                                    <p>Messages</p>
                                </div>
                                <div className="headingMobile0511" onClick={() => history.push("/Saved")}>
                                    <img src={profileIcon} alt="" />
                                    <p>Saved</p>
                                </div>
                                <div className="headingMobile0511" onClick={() => history.push("/Trips")}>
                                    <img src={profileIcon} alt="" />
                                    <p>Trips</p>
                                </div>
                                <div className="headingMobile0511" onClick={() => history.push("/HostYourApartment")}>
                                    <img src={profileIcon} alt="" />
                                    <p>Host your apartment</p>
                                </div>
                                <div className="headingMobile0511" onClick={() => history.push("/Account")}>
                                    <img src={profileIcon} alt="" />
                                    <p>Profile</p>
                                </div>

                                <div className="headingMobile0511" onClick={signOutSubmit}>
                                    <img src={profileIcon} alt="" />
                                    <p>Sign out</p>
                                </div>
                            </div> : 
                            <div className="headingMobile051">
                                <div className="headingMobile0511" onClick={openSignInPage}>
                                    <img src={profileIcon} alt="" />
                                    <p>Login</p>
                                </div>
                                <div className="headingMobile0511" onClick={openSignUpPage}>
                                    <img src={profileIcon} alt="" />
                                    <p>Register</p>
                                </div>
                            </div>
                        }

                        <div className="headingMobile052" onClick={() => setSearchTabMenuMain(false)}></div>
                    </div>
                )}

                {searchTab1 && (
                    <div className="headingMobile04">
                        <div className="headingMobile042">
                            <div className="headingMobile0421">

                                <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleAddressChange} >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

                                    <>
                                        <div className="headingMobile04211">
                                            <img src={backIconGrey} alt="" onClick={() => setSearchTab1(false)} />
                                            <input {...getInputProps({placeholder: "Search ..."})} />
                                        </div>

                                        <div className="headingMobile04211ContScroll">

                                            {loading ? <div>Loading ... </div> : null}
                                            <ul className="headBodyExpl1112SearchTabUl">
                                                {suggestions.map(suggestion => {
                                                    // const style = {
                                                    //     backgroundColor: suggestion.active ? "#565656" : "#fff"
                                                    // };
                                                    return <div className="headingMobile04212" {...getSuggestionItemProps(suggestion)}><img src={RecentGreyIcon} alt="" /><p className="headingMobile042121">{suggestion.description}</p></div>;
                                                })}
                                            </ul>

                                        </div>
                                    </>

                                    )}
                                </PlacesAutocomplete>

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
                                    <div>Set value</div>
                                </div>

                                <div className="headingMobile04211ContScroll" style={{marginTop: "20px"}}>

                                    <div className="headingMobile04212" style={{marginTop: "20px"}} onClick={() => {
                                        setSearchTab2(false);
                                        setSearchTab3(true)
                                    }}>
                                        <img src={RecentGreyIcon} alt="" />
                                        <p className="headingMobile042121">Entire Places</p>
                                    </div>
                                    <div className="headingMobile04212" style={{marginTop: "20px"}} onClick={() => {
                                        setSearchTab2(false);
                                        setSearchTab3(true)
                                    }}>
                                        <img src={RecentGreyIcon} alt="" />
                                        <p className="headingMobile042121">Shared spaces</p>
                                    </div>
                                    <div className="headingMobile04212" style={{marginTop: "20px"}} onClick={() => {
                                        setSearchTab2(false);
                                        setSearchTab3(true)
                                    }}>
                                        <img src={RecentGreyIcon} alt="" />
                                        <p className="headingMobile042121">Private room</p>
                                    </div>

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
                                    <div>When will you be there</div>
                                </div>

                                <div className="headingMobile04211ContScroll" style={{marginTop: "20px"}}>

                                    <div className="headingMobile06">

                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={handleDateSelectMob}
                                        moveRangeOnFirstSelection={false}
                                        ranges={[selectionRange]}
                                    />

                                    </div>

                                </div>

                                <div className="headingMobile061">
                                    <div className="headingMobile0611" onClick={() => {
                                        setSearchTab3(false);
                                        setSearchTab4(true);
                                    }}>Skip</div>
                                    <div className="headingMobile0612"><button onClick={() => {
                                        setSearchTab3(false);
                                        setSearchTab4(true);
                                        onDateMobApply();
                                    }}>Next</button></div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {searchTab4 && (
                    <div className="headingMobile04">
                        <div className="headingMobile042">
                            <div className="headingMobile0421">
                                <div className="headingMobile04211">
                                    <img src={backIconGrey} alt="" onClick={() => {
                                        setSearchTab4(false);
                                        setSearchTab3(true);
                                    }} />
                                    <div>No. of guests</div>
                                </div>
                                <div className="headingMobile04211ContScroll" style={{marginTop: "20px"}}>
                                    <div className="headingMobile06E4">
                                        <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px", width: "95%"}}>
                                            Adults 
                                            <div className="PlacesNearYou2311">
                                                <img src={minusSign} alt="" onClick={() => guestVal("-")} />
                                                <span>{guestAdult}</span>
                                                <img src={addSign} alt="" onClick={() => guestVal("+")} />
                                            </div>
                                        </div>
                                        <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px", width: "95%"}}>
                                            Children 
                                            <div className="PlacesNearYou2311">
                                            <img src={minusSign} alt="" onClick={() => childVal("-")} />
                                                <span>{guestChild}</span>
                                            <img src={addSign} alt="" onClick={() => childVal("+")} />
                                            </div>
                                        </div>
                                        <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px", width: "95%"}}>
                                            Infant 
                                            <div className="PlacesNearYou2311">
                                                <img src={minusSign} alt="" onClick={() => infantVal("-")} />
                                                <span>{guestInfant}</span>
                                                <img src={addSign} alt="" onClick={() => infantVal("+")} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="headingMobile061">
                                    <div className="headingMobile0611">Skip</div>
                                    <div className="headingMobile0612"><button onClick={() => {setSearchTab4(false);goToHomesScreen()}}>Next</button></div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </div> 

            {/* date */}
            {dateView && (

                <div className="dateCont0" ref={outRefDate} onClick={e => clickHandleDate(e)}>
                    <div className="dateCont01" ref={inRefDate} onClick={e => clickHandleDate(e)}>
                        <DateRange
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            isOutsideRange={() => false}
                            months={2}
                            direction="horizontal"
                            ranges={[selectionRange]} 
                            onChange={handleDateSelect}
                            minDate={new Date()}
                        />
                        {dateApplyBtn && (
                            <div className="dateCont01CloseBtn"><button onClick={() => {
                                setDateView(false);
                                onDateApply();
                                setNoOfGuest(true);
                            }}>Apply dates</button></div>
                        )}
                    </div>
                </div>
                
            )}

            {searchTab && (
                <div className="dateCont0" ref={outRefSearch} onClick={e => clickHandleSearch(e)}>
                    <div className="deskSearch0" ref={inRefSearch} onClick={e => clickHandleSearch(e)}>

                        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleAddressChangeDesk} >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <>
                                    <div className="deskSearch01">
                                        <img src={SearchIconMob} alt="" />
                                        <input {...getInputProps({placeholder: "Search ..."})} />
                                    </div>

                                    <div className="deskSearch02">
                                        {loading ? <div>Loading ... </div> : null}
                                            {suggestions.map(suggestion => {
                                                return <div className="deskSearch021" {...getSuggestionItemProps(suggestion)}><img src={RecentGreyIcon} alt="" /><div className="deskSearch0211">{suggestion.description}</div></div>
                                            })}
                                    </div>
                                </>
                            )}
                        </PlacesAutocomplete>

                        {/* next button */}
                        <div className="deskSearch03">
                            <button onClick={() => {
                                setSearchTab(false);
                                setDateView(true);
                            }}>Next</button>
                        </div>

                    </div>
                </div>
            )}

            {noOfGuest && (
                <div className="dateCont0" ref={outRefGuest} onClick={e => clickHandleGuest(e)}>
                    <div className="deskSearch0N" ref={inRefGuest} onClick={e => clickHandleGuest(e)}>

                        <div className="deskSearch0N1">

                            <div className="deskSearch0N1head">No. of guests</div>
                            
                            <div className="deskSearch0N10">
                                <div className="deskSearch0N101">Adults</div>
                                <div className="deskSearch0N102">
                                    <img src={minusSign} alt="" onClick={() => guestVal("-")} />
                                    <div className="deskSearch0N1021">{guestAdult}</div>
                                    <img src={addSign} alt="" onClick={() => guestVal("+")} /> 
                                </div>
                            </div>

                            <div className="deskSearch0N10">
                                <div className="deskSearch0N101">Childrens</div>
                                <div className="deskSearch0N102">
                                    <img src={minusSign} alt="" onClick={() => childVal("-")} />
                                    <div className="deskSearch0N1021">{guestChild}</div>
                                    <img src={addSign} alt="" onClick={() => childVal("+")} /> 
                                </div>
                            </div>

                            <div className="deskSearch0N10">
                                <div className="deskSearch0N101">Infants</div>
                                <div className="deskSearch0N102">
                                    <img src={minusSign} alt="" onClick={() => infantVal("-")} />
                                    <div className="deskSearch0N1021">{guestInfant}</div>
                                    <img src={addSign} alt="" onClick={() => infantVal("+")} /> 
                                </div>
                            </div>

                        </div>

                        {/* next button */}
                        <div className="deskSearch03" style={{marginTop: "25px"}}>
                            <button onClick={() => {
                                if (searchKeyword === "") {
                                    setNoOfGuest(false);
                                    setSearchTab(true);
                                } else {
                                    goToHomesScreen();
                                }
                            }}>Search</button>
                        </div>

                    </div>
                </div>
            )}

            {/* side bar */}
            {sideBar && (
                isSignedIn ? 
                    <div className="headSideBar" onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                        <div className="headSideBar011S0">
                            <div className="headSideBar011S01"><img src={JSON.parse(localStorage.getItem("token")).userProfile} alt="" /></div>
                            <div className="headSideBar011S02">{userName}
                                <div className="headSideBar011S021" style={{width: '100%'}}>{JSON.parse(localStorage.getItem("token")).userEmail}</div>
                            </div>
                        </div>
                        <div className="headSideBar011S1"><button onClick={() => history.push('/Account')}>View Profile</button></div>
                        <p onClick={() => history.push('/hosting')}>Listing</p>
                        <p onClick={() => history.push('/notify')}>Notification</p>
                        <p onClick={() => history.push('/chats')}>Messages</p>
                        <p onClick={() => history.push('/Saved')}>Saved</p>
                        <p onClick={() => history.push('/Trips')}>Trips</p>
                        <p onClick={() => history.push('/hostCars')}>Host your cars</p>
                        <p onClick={() => history.push('/HostYourApartment')}>Host your apartment</p>
                        <p onClick={signOutSubmit}>Signout</p>
                    </div> : 
                    <div className="headSideBar" onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                        <p onClick={openSignUpPage}>Sign Up</p>
                        <p onClick={openSignInPage}>Login</p>
                        <hr/>
                        <p>Host your Home</p>
                        <p>Host an experience</p>
                        <p>Help</p>
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
                                <span className="sign0222"><input type="text" onChange={e => setSigninval({...signinval, email: e.target.value})} placeholder="Enter your email ..." /></span>
                                <span className="sign0223"><img src={downArrow} alt="" /></span>
                            </div>
                            <div className="sign022">
                                <span className="sign0221"><img src={LockImg} alt="" /></span>
                                <span className="sign0222"><input type="password" onChange={e => setSigninval({...signinval, password: e.target.value})} placeholder="Enter your password ..." /></span>
                                <span className="sign0223"><img src={downArrow} alt="" /></span>
                            </div>
                            <div className="sign023">
                                <span className="sign0231"><input type="checkbox" /></span>
                                <span className="sign0232">Remember me</span>
                            </div>
                            <div className="sign023"><button onClick={signinSubmit}>Log In</button></div>

                            <div className="sign024For1" onClick={() => history.push("/EmailValidation")}>Forget password</div>

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
                                    <FacebookLogin
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
                                    />
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

                            {subTab1 && (
                                <>
                                    {/* 2nd row */}
                                    <div className="sign021Ex">Sign Up</div>
                                    <div className="sign022">
                                        <span className="sign0221"><img src={UserImg} alt="" /></span>
                                        <span className="sign0222"><input type="text" placeholder="Full name ..." onChange={e => setSignupVal({...signupVal, firstName: e.target.value})} /></span>
                                        <span className="sign0223"><img src={downArrow} alt="" /></span>
                                    </div>
                                    <div className="sign022">
                                        <span className="sign0221"><img src={phonenu} alt="" /></span>
                                        <span className="sign0222"><input type="text" placeholder="Mobile no. (+91 7697114202)" onChange={e => setSignupVal({...signupVal, lastName: e.target.value})} /></span>
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
                                    {/* <div className="sign023">
                                        <span className="sign0231"><input type="checkbox" /></span>
                                        <span className="sign0232">Remember me</span>
                                    </div> */}
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

                                </>
                            )}

                            {subTab2 && (
                                <>
                                
                                    <div className="sign021Ex">Enter OTP</div>
                                    <div className="sign022" style={{marginTop: '50px'}}>
                                        <span className="sign0221"><img src={UserImg} alt="" /></span>
                                        <span className="sign0222"><input type="text" placeholder="Enter OTP ..." onChange={e => setSignupVal({...signupVal, otp: e.target.value})} /></span>
                                        <span className="sign0223"><img src={downArrow} alt="" /></span>
                                    </div>
                                    <div className="sign023"><button style={{marginTop: '10px'}} onClick={SignUpVerfiyOTP}>Verify</button></div>


                                </>
                            )}
                            


                        </div>
                    </div>
                </div>
            )}

        </>

    );
}