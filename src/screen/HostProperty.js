/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../css/components.css';
import varimg from '../img/demo/3.png';
import v1 from '../img/icons/notify.png';
import v2 from '../img/icons/wishlist.png';
import {useState, useEffect, useCallback} from 'react';
import loading from '../img/icons/loading.gif';
import ImageSlider from '../components/ImageSlider';

import headerStyle from '../css/headerMain.module.css';

import closeBtn from '../img/icons/close.png';
// mobile
import backIconGrey from '../img/icons/backGrey.svg';
import fav from '../img/icons/fav.svg';

import v3 from '../img/icons/bed.png';
import v4 from '../img/icons/bath.png';
import v5 from '../img/icons/year.png';

import pinIcon from '../img/icons/pin.png';
import addSign from '../img/icons/addSign.png';
import minusSign from '../img/icons/minusSign.png';

import proPic from '../img/demo/24.png';

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

import {  useHistory } from "react-router-dom";

import Reviews from '../components/Review';
// import Map from '../components/Map';

// date
import { DateRangePicker } from 'react-date-range';
// import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import '../css/react_dates_overrides.css';

// base url
import url from '../data/urls.json';

import {  useParams } from "react-router-dom";


export default function HotelInfo() {

    //user
    const history = useHistory();
    const {id} = useParams();
    const [person, setPerson] = useState(null);
    useEffect(async () => {

        if (localStorage.getItem("token") === null) {
            history.push('/');
        } else {
            const m_url = url.baseUrl+"host/"+id;
            fetch(m_url, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => {
                console.log(res.data);
                setPerson(res.data);
            })
            .catch(error => console.log(error));
        }
        
    }, []);

    // header transition
    const [topBar, setTopBar] = useState(false);
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            setTopBar(false)
        }
        console.log(window.scrollY)
    });
    const [barTab1, setBarTab1] = useState(false);
    const [barTab2, setBarTab2] = useState(false);
    const [barTab3, setBarTab3] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(true);

    const [sideBar, setSideBar] = useState(false);
    const [signupPage, setSignupPage] = useState(false);
    const [signInPage, setSignInPage] = useState(false);

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

    // const [isSignedIn, setIsSignedIn] = useState(false);

    // sign in
    const [signinval, setSigninval] = useState({
        email: "",
        password: ""
    });
    
    const [signupVal, setSignupVal] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        login_type: "",
        login_id: "",
        profile_pic: "",
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

    const signinSubmit = () => {
        // validation
        if (signinval.email === "") {
            alert("Enter email ...")
        } else if (signinval.password === "") {
            alert("Enter password ...")
        } else {
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
                    alert("Email does not exist. Please signup first !!!");
                    setSignInPage(false);
                    setSignupPage(true);
                } 
                
                if (res.code === 200) {
                    var userData = {
                        "userId": res.user.id,
                        "userToken": res.user.logintoken,
                        "userName": res.user.name
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
            fname: resp.profileObj.givenName,
            lname: resp.profileObj.familyName,
            email: resp.profileObj.email,
            password: "",
            login_type: "google0auth",
            login_id: resp.profileObj.googleId,
            profile_pic: resp.profileObj.imageUrl 
        }),
        redirect: 'follow'
        };

        fetch("http://localhost:8080/setUser", requestOptions)
        .then(response => response.text())
        .then(result => alert(result))
        .catch(error => console.log('error', error));
        // alert("success !!!")
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
                    alert("You are already register successfully !!!");
                    setSignInPage(true);
                    setSignupPage(false);
                } 
                if (res.code === 200) {
                    alert("You are successfully register !!!");
                    setSignInPage(true);
                    setSignupPage(false);
                } 
            })
            .catch(error => console.log(error));
        }
    }

    const responseFacebook = resp => {
        alert(resp)
    } 

    const switchToHosting = () => {
        if (localStorage.getItem("token") === null) {
            setSignInPage(true);
        } else {
            history.push("/HostYourApartment");
        }
    }

    if (!person) {
        return (<div style={{display: "flex", alignContent: "center", justifyContent: "center"}}><img style={{marginTop: "20%", width: "100px"}} src={loading} alt="" /></div>)
    } else {
        return (

            <>
    
                <div className="desktop">
                    <div className={headerStyle.headBody1}>
        
                        <div className={headerStyle.headUpNavMain}>

                            <div className={headerStyle.headUpNavMain1} onClick={() => history.push("/hosting")}><img src={rightArrowIcon} alt="" /></div>

                            <div className={headerStyle.headUpNav}>
                                <a className={headerStyle.headUpNavLink} onClick={switchToHosting}><span>Become a host</span></a>
                                <a className={headerStyle.headUpNavLink} onClick={() => SetLAngView(true)}><img src={worldIcon} alt="" /></a>
                                <span onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                                    <img src={sidebarIcon} alt="" />
                                </span>
                                
                                {sideBar && (
                                    isSignedIn ? 
                                    <div className={headerStyle.headSideBar} onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                                        <p>{userName}</p>
                                        <p onClick={() => history.push('/Account')}>Profile</p>
                                        <p onClick={() => history.push('/hosting')}>Listing</p>
                                        <p onClick={() => history.push('/notify')}>Notification</p>
                                        <p onClick={() => history.push('/chats')}>Messages</p>
                                        <p onClick={() => history.push('/Saved')}>Saved</p>
                                        <p onClick={() => history.push('/Trips')}>Trips</p>
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


                    <div className="carInfo0">

                        <div className="hotelInfo0">
                            <div className="hotelInfo112">
                                <img className="hotelInfo1E0" src={proPic} alt="" /> 
                                <div style={{width: "auto", float: "left", marginTop: "4px"}}>
                                    <div className="hotelInfo01">{userName}</div>
                                    <div className="hotelInfo02">$ {person.basePrice}/night</div>
                                </div>
                            </div>
                            <div className="hotelInfo03">
                                <img src={v1} alt="" />
                                <img src={v2} alt="" />
                            </div>
                        </div>

                        <div className="carInfo01">
                            <ImageSlider />
                        </div>

                        <div className="hotelInfo0S">
                            <div className="hotelInfo1">
                                <div className="hotelInfo01">{person.listingTitle}</div>
                                <div className="hotelInfo02">{person.listingDescription}</div>
                            </div>
                        </div>

                        <div className="hotelInfo0S1">
                            <div className="hotelInfo0s11">
                                <div className="hotelInfo0s111"><img src={v3} alt="" /> <div>{person.noOfBed} Beds</div></div>
                            </div>
                            <div className="hotelInfo0s11">
                                <div className="hotelInfo0s111"><img src={v4} alt="" /> <div>{person.baths} Baths</div></div>
                            </div>
                            <div className="hotelInfo0s11">
                                <div className="hotelInfo0s111"><img src={v5} alt="" /> <div>{person.noOfGuests} guests</div></div>
                            </div>
                        </div>

                        <div className="hotelInfo0S2">
                            <button>Add car to your booking</button>
                        </div>

                        <div className="hotelInfo0S1">
                            <div className="hotelInfo1">
                                <div className="hotelInfo01">Amenities</div>
                                {person.amenList.map((val,ind) => <div className="hotelInfo0198" key={ind}>{val}</div>)}
                            </div>
                        </div>

                        <div className="hotelInfo0S1">
                            <div className="hotelInfo1">
                                <div className="hotelInfo01">Some House Rules</div>
                                {person.houseRuelsList.map((val,ind) => <div className="hotelInfo0198" key={ind}>{val}</div>)}
                            </div>
                        </div>

                        <Reviews />

                        <div className="hotelInfo0S2">
                            <button>Continue to booking</button>
                        </div>

                        {/* <div className="Map00">
                            <Map />
                        </div> */}

                    </div>
                </div>

                <div className="mobile">
                    {/* header */}
                    <div className="placesNearMob0">
                        <div className="placesNearMob01"><img src={backIconGrey} alt="" onClick={() => history.goBack()} /></div>
                        <div className="placesNearMob02">Nearby</div>
                        <div className="placesNearMob04" style={{float: "right", marginRight: "20px"}}><img src={fav} alt="" /></div>
                    </div>

                    {/* body */}
                    <div className="hotelInfoMob0">

                        <div className="hotelInfoMob01">
                            <img src={varimg} alt="" /> 
                        </div>

                        <div className="hotelInfoMob02">
                            <div className="hotelInfoMob021">Name</div>
                            
                            <div className="hotelInfoMob022">
                                <div className="hotelInfoMob0221">$ 17/night</div>
                                <div className="hotelInfoMob0222">* 5.0(34)</div>
                            </div>
                            <div className="hotelInfoMob023">
                                <button>Check Availability</button>
                            </div>

                            <div className="hotelInfoMob024">Bhopal, Madhya Pradesh, India</div>

                            <div className="hotelInfoMob03">
                                <div className="hotelInfoMob031">
                                    <div className="hotelInfoMob0311">Entire bungalow</div>
                                    <div className="hotelInfoMob0312"><span>hosted by</span> Krishna kant vishwakarma</div>
                                </div>
                                <div className="hotelInfoMob032">
                                    <img src={varimg} alt="" />
                                </div>
                                <button className="hotelInfoMob033">Rents host car</button>
                            </div>

                            <div className="hotelInfoMob04">
                                <div className="hotelInfoMob041">Amenities</div>

                                <div className="hotelInfoMob042">Wifi</div>
                                <div className="hotelInfoMob042">Parking</div>
                            </div>

                            <div className="hotelInfoMob04">
                                <div className="hotelInfoMob041">Some rules</div>

                                <div className="hotelInfoMob042">Wifi</div>
                                <div className="hotelInfoMob042">Parking</div>
                            </div>

                            <Reviews />

                            {/* <div>Map</div> */}

                        
                        </div>

                    </div>
                </div>
    
                {topBar && (
                    <div className={headerStyle.topBar0}>
    
                        <div className={headerStyle.headUpNavMainT}>
    
                            <div className={headerStyle.headUpNav}>
                                <a className={headerStyle.headUpNavLink} onClick={switchToHosting}><span>Switch to hosting</span></a>
                                <a className={headerStyle.headUpNavLink} onClick={() => SetLAngView(true)}><img src={worldIcon} alt="" /></a>
                                <span onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                                    <img src={sidebarIcon} alt="" />
                                </span>
    
                                {sideBar && (
                        
                                    isSignedIn ? 
                                    <div className={headerStyle.headSideBar} onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                                        <p>{userName}</p>
                                        <p>Host your Home</p>
                                        <p>Host an experience</p>
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
                                <div className={headerStyle.headNav01T} onClick={() => {
                                    setBarTab2(false);
                                    setBarTab3(false);
                                    setBarTab1(true);
                                }}>
                                    <div className={headerStyle.headNav011T}>Location</div>
                                    <div className={headerStyle.headNav012}><input type="text" placeholder="Where are you going?" /></div>
                                </div>
                                <div className={headerStyle.headNav01T} onClick={() => {
                                    setBarTab1(false);
                                    setBarTab3(false);
                                    setBarTab2(true);
                                }}>
                                    <center><div className={headerStyle.headNav011T}>Travelling</div></center>
                                    <center><div className={headerStyle.headNav012}>Adds dates</div></center>
                                </div>
                                <div className={headerStyle.headNav01T} onClick={() => {
                                    setBarTab2(false);
                                    setBarTab1(false);
                                    setBarTab3(true);
                                }}>
                                    <div className={headerStyle.headNav0111TE}>
                                        <center><div className={headerStyle.headNav011T}>Guests</div></center>
                                        <center><div className={headerStyle.headNav012}>Add guests</div></center>
                                    </div>
                                    <div className={headerStyle.headNav1T}>
                                        <img src={serachIcon} alt="" /> 
                                    </div>
                                </div>
                            </div>
                            
                        </div>
    
                        {barTab1 && (
                            <div className={headerStyle.topBar01}>
                                
                                <div className={headerStyle.topBar011}>
                                    <img src={pinIcon} alt="" />
                                    <p>Bhopal, Madhya Pradesh</p>
                                </div>
                                <div className={headerStyle.topBar011}>
                                    <img src={pinIcon} alt="" />
                                    <p>Bhopal, Madhya Pradesh</p>
                                </div>
                                <div className={headerStyle.topBar011}>
                                    <img src={pinIcon} alt="" />
                                    <p>Bhopal, Madhya Pradesh</p>
                                </div>
                                <div className={headerStyle.topBar011}>
                                    <img src={pinIcon} alt="" />
                                    <p>Bhopal, Madhya Pradesh</p>
                                </div>
    
                            </div>
                        )}
                        
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
                                        <img src={addSign} alt="" />
                                        <span>0</span>
                                        <img src={minusSign} alt="" />
                                    </div>
                                </div>
                                <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px"}}>
                                    Children 
                                    <div className="PlacesNearYou2311">
                                        <img src={addSign} alt="" />
                                        <span>0</span>
                                        <img src={minusSign} alt="" />
                                    </div>
                                </div>
                                <div className="PlacesNearYou231" style={{marginBottom: "10px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "14px"}}>
                                    Infant 
                                    <div className="PlacesNearYou2311">
                                        <img src={addSign} alt="" />
                                        <span>0</span>
                                        <img src={minusSign} alt="" />
                                    </div>
                                </div>
                            </div>
                        )}
    
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
                                        <div className="langCont011311">???????????????</div>
                                        <div className="langCont011312">????????????</div>
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
                                    <span className="sign0222"><input type="text" placeholder="Enter your email ..." onChange={e => setSigninval({...signinval, email: e.target.value})} /></span>
                                    <span className="sign0223"><img src={downArrow} alt="" /></span>
                                </div>
                                <div className="sign022">
                                    <span className="sign0221"><img src={LockImg} alt="" /></span>
                                    <span className="sign0222"><input type="password" placeholder="Enter your password ..." onChange={e => setSigninval({...signinval, password: e.target.value})} /></span>
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