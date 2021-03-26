/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../css/components.css';
import varimg from '../img/demo/3.png';
import {useState, useEffect, useCallback, useRef} from 'react';
import starIcon from '../img/icons/star.svg';
// mobile
import backIconGrey from '../img/icons/backGrey.svg';
import fav from '../img/icons/fav.svg';
import userIcon from '../img/icons/user.png';
import bg from '../img/banners/ad1.jpg';
// import favRed from '../img/icons/favRed.svg';
import SetFav from '../components/SetFavHostelInfo';
import headerStyle from '../css/headerMain.module.css';
import loading from '../img/icons/loading.gif';
import closeBtn from '../img/icons/close.png';
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
import LoginBanner from '../img/banners/undraw_enter_uhqk.png';
import SignUpBanner from '../img/banners/undraw_mobile_payments_vftl.png';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import TwitterLogin from "react-twitter-login";
import { useHistory, useParams } from "react-router-dom";
import Reviews from '../components/Review';
import addSign from '../img/icons/addSign.png';
import minusSign from '../img/icons/minusSign.png';
// import v21 from '../img/demo/21.png';
// import Map from '../components/Map';
// import ImageSlider from '../components/ImageSlider';
// base url
import url from '../data/urls.json';
import Map from "../components/Map";
import swal from 'sweetalert';
// date
import { DateRange } from 'react-date-range';

export default function HotelInfo() {

    const {id} = useParams();
    const [person, setPerson] = useState(null);
    const [p, setp] = useState(null);

    const [isSignedIn, setIsSignedIn] = useState(true);

    const [sideBar, setSideBar] = useState(false);
    const [signupPage, setSignupPage] = useState(false);
    const [signInPage, setSignInPage] = useState(false);

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
    const [isAdmin, setIsAdmin] = useState(true);
    // run only once
    useEffect(() => {

        localStorage.removeItem("startDate");
        localStorage.removeItem("endDate");

        if (localStorage.getItem("token") === null) {
            setIsSignedIn(false);
        } else {
            // get their value and check the token
            var data = localStorage.getItem("token");
            var name = JSON.parse(data);
            setUserName(name.userName);
            setIsSignedIn(true);
        }

        fetch(url.baseUrl+"host/"+id, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log("hostdetail");
            console.log(res.data);
            if (res.data.userId === parseInt(JSON.parse(localStorage.getItem("token")).userId)) {
                setIsAdmin(false);
            }
            getUserDetails(res.data);

        })
        .catch(error => console.log(error));
        
    }, []);

    const getUserDetails = (data) => {
        fetch(url.baseUrl+"user?userId="+data.userId, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data)
            if (localStorage.getItem("token") === null) {
                setp(res.data);
                setPerson(data);
            } else {
                getUserDetailsTwo(res.data, data);
            }
        })
        .catch(error => console.log(error));
    }

    const getUserDetailsTwo = (res, data) => {
        var m_data = localStorage.getItem("token");
        var name = JSON.parse(m_data);
        fetch(url.baseUrl+"saved?userId="+name.userId, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log("Saved");
            // console.log(resp.data);
            if (resp.data.length === 0) {

            } else {
                for (var key in resp.data) {
                    if (data.id === resp.data[key].hosting_id) {
                        data.isFav = true;
                        data.isFavid = resp.data[key].Id
                    }
                }
            }
            console.log("host");
            console.log(data);
            setp(res);
            setPerson(data);
        })
        .catch(error => console.log(error));
    }

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
                    alert("You are already register successfully !!!");
                    setSignInPage(true);
                    setSignupPage(false);
                } 
                if (res.code === 200) {
                    alert("You are successfully register !!!");
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
    
    // date
    const outRefDate = useRef(null);
    const inRefDate = useRef(null);
    const clickHandleDate = e => {
        if (inRefDate.current.contains(e.target)) return;
        setDateView(false);
    }
    // Guest
    const outRefGuest = useRef(null);
    const inRefGuest = useRef(null);
    const clickHandleGuest = e => {
        if (inRefGuest.current.contains(e.target)) return;
        setNoOfGuest(false);
    }
    const [noOfGuest,setNoOfGuest] = useState(false);
    const [guestAdult, setGuestAdult] = useState(0);
    const [guestChild, setGuestChild] = useState(0);
    const [guestInfant, setGuestInfant] = useState(0);
    const guestVal = sign => {

        if (sign === "+") {
            if (guestAdult+1 <= 6) {
                if (guestAdult >= 0) {
                    setGuestAdult(preV => preV + 1);
                    console.log("+"+(guestAdult+1));
                }
            }
        } else {
            if (guestAdult > 0) {
                setGuestAdult(preV => preV - 1);
                console.log("-"+(guestAdult-1));
            }
        }
    }
    const childVal = sign => {

        if (sign === "+") {
            if (guestChild+1 <= 6) {
                if (guestChild >= 0) {
                    setGuestChild(preV => preV + 1);
                }
            }
        } else {
            if (guestChild > 0) {
                setGuestChild(preV => preV - 1);
            }
        }
    }
    const infantVal = sign => {

        if (sign === "+") {
            if (guestInfant+1 <= 6) {
                if (guestInfant >= 0) {
                    setGuestInfant(preV => preV + 1);
                }
            }
        } else {
            if (guestInfant > 0) {
                setGuestInfant(preV => preV - 1);
            }
        }
    }
    
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
        console.log("startDate: ", startDate);
        console.log("endDate: ", endDate);
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
    }, [startDate, endDate]);
    function handleDateSelect(ranges) {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
        setDateApplyBtn(true);
    }
    const bookingHandle = () => {
        if (localStorage.getItem("token") === null) {
            setSignInPage(true);
        } else {
            if (localStorage.getItem("startDate") === null) {
                setDateView(true);
            } else {
                setNoOfGuest(true);
            }
        }
    }
    const finalHandle = () => {
        history.push('/Booking', {
            startDate: localStorage.getItem("startDate"),
            endDate: localStorage.getItem("endDate"),
            noOfAdult: guestAdult,
            noOfChildren: guestChild,
            noOfInfant: guestInfant,
            hostingId: person.id
        });
    }
    if(!person) {
        return (<div style={{display: "flex", alignContent: "center", justifyContent: "center"}}><img style={{marginTop: "20%", width: "100px"}} src={loading} alt="" /></div>)
    } else {
        return (

            <>
    
                <div className="desktop">
                    <div className={headerStyle.headBody1}>
                        <div className={headerStyle.headUpNavMain}>
                            <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt=""/></div>
                            <div className={headerStyle.headUpNav}>
                                <a className={headerStyle.headUpNavLink} onClick={switchToHosting}><span>Become a host</span></a>
                                <a className={headerStyle.headUpNavLink} onClick={() => SetLAngView(true)}><img src={worldIcon} alt="" /></a>
                                <span onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                                    <img src={sidebarIcon} alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="carInfo0Cont">

                        <div className="carInfo0">

                            <div className="carInfo01">
                                
                                
                                {person.imageList[0] ? <div className="carInfo01img1"><img src={person.imageList[0]} alt="" /></div> : <div className="carInfo01img1"><img src={bg} alt="" /></div>}
                                <div className="carInfo01img2">
                                    {person.imageList[1] ? <img src={person.imageList[1]} alt="" /> : <img src={bg} alt="" />}
                                    {person.imageList[2] ? <img src={person.imageList[2]} alt="" /> : <img src={bg} alt="" />}
                                    {/* <img src={bg} alt="" /> */}
                                </div>
                                <div className="carInfo01img3">5+ Photos</div>

                            </div>

                            <div style={{float: "left"}}>
                                <div style={{width: "100%", float: "left"}}>
                                    <div className="hotelInfo0S">
                                        <div className="hotelInfo1">
                                            <div className="hotelInfo01">{person.listingTitle}</div>
                                            <div className="hotelInfo01I0">{person.addrStreet}, {person.addrCity}, {person.addrState}</div>
                                            <div style={{marginBottom: "15px", marginTop: "5px", float: "left"}}>{person.noOfGuests} guests . {person.bedrooms} bedroom . {person.noOfBed} bed . {person.baths} bathroom</div>
                                        </div>
                                    </div>

                                    {/* <div className="hotelInfo0S1">
                                        <div className="hotelInfo1">
                                            <div className="hotelInfo01">About Apartment</div>
                                            <div className="hotelInfo01I1">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque repellat nisi voluptatum repellendus! Repudiandae, maiores laudantium esse doloribus blanditiis nihil aliquam enim ea doloremque saepe quis provident eaque cum ratione?
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque repellat nisi voluptatum repellendus! Repudiandae, maiores laudantium esse doloribus blanditiis nihil aliquam enim ea doloremque saepe quis provident eaque cum ratione?
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque repellat nisi voluptatum repellendus! Repudiandae, maiores laudantium esse doloribus blanditiis nihil aliquam enim ea doloremque saepe quis provident eaque cum ratione?
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="hotelInfo0S1">
                                        <div className="hotelInfo1">
                                            <div className="hotelInfo01">Amenities</div>
                                            {person.amenList.map((val, ind) => <div className="hotelInfo0198" key={ind}>{val}</div>)}
                                        </div>
                                    </div>

                                    <div className="hotelInfo0S1">
                                        <div className="hotelInfo1">
                                            <div className="hotelInfo01">Some House Rules</div>
                                            {person.houseRuelsList.map((val, ind) => <div className="hotelInfo0198" key={ind}>{val}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Reviews hostingId={id} />
                            <div className="hotelInfo0S1">
                                <div className="hotelInfo1">
                                    <div className="hotelInfo01">Map</div>
                                </div>
                            </div>
                            <div className="Map00">
                                <Map lat={person.lat} lng={person.lng} />
                            </div>
                        </div>
                    </div>

                    <div className="carInfo1">
                        <div className="carInfo10">
                            <div className="carInfo101">$ {person.basePrice}/night</div>
                            {isAdmin && (
                                <div className="hotelInfo03">
                                    <SetFav val={person.isFav} id={person.id} isFavid={person.isFavid} openLogin={() => setSignInPage(true)} />
                                </div>
                            )}
                        </div>
                        <div className="carInfo11">
                            <img src={p.profile_pic} alt="" />
                        </div>
                        <div className="carInfo12">{p.name}</div>
                        {isAdmin && (
                            <div className="carInfo13">(Host)</div>
                        )}
                        <div className="carInfo14">
                            <span className="carInfo141">
                                4.7 <span className="carInfo1411"><img src={starIcon} alt="" /></span>
                                . 68 Reviews
                            </span>
                        </div>
                        {isAdmin && (
                            <>
                                <div className="carInfo15"><button onClick={bookingHandle}>Book Now</button></div>
                                <div className="carInfo16">OR</div>
                                <div className="carInfo17"><button onClick={() => history.push('/carsList')}>Add car to booking</button></div>
                            </>
                        )}
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
                            <Reviews hostingId={id} />
                        </div>
                    </div>
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
                                <button onClick={finalHandle}>Book</button>
                            </div>

                        </div>
                    </div>
                )}

                {sideBar && (
                    isSignedIn ? 
                    <div className={headerStyle.headSideBar} onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                            <div className={headerStyle.headSideBar011S0}>
                                <div className={headerStyle.headSideBar011S01}><img src={JSON.parse(localStorage.getItem("token")).userProfile} alt="" /></div>
                                <div className={headerStyle.headSideBar011S02}>{userName} 
                                    <div className={headerStyle.headSideBar011S021}>{JSON.parse(localStorage.getItem("token")).userEmail}</div>
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