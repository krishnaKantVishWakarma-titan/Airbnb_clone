/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../css/components.css';
import DetailsList from '../components/DetailsList';
import {useState, useEffect} from 'react';
import loading from '../img/icons/loadingHostingList.gif';

import React from 'react';
import v1 from '../img/demo/16.png';
import starIcon from '../img/icons/star.png';
import userIcon from '../img/icons/user.png';
import trips from '../css/trips.module.css';
import favRed from '../img/icons/favRed.svg';
import styles from '../css/profile.module.css';
import backIconGrey from '../img/icons/backGrey.svg';

import headerStyle from '../css/headerMain.module.css';

import FbImg from '../img/icons/facebook.png';
import googleImg from '../img/icons/google-plus.png';
import twitter from '../img/icons/twitter.png';

import UserImg from '../img/icons/user.png';
import LockImg from '../img/icons/lock.png';
import EmailImg from '../img/icons/email.png';
import downArrow from '../img/icons/down-arrow.png';
import closeBtn from '../img/icons/close.png';

import rightArrowIcon from '../img/icons/headerMinBack.png';

import sidebarIcon from '../img/icons/sidebar.png';
import worldIcon from '../img/icons/blackWorldIcon.png';

import LoginBanner from '../img/banners/undraw_enter_uhqk.png';
import SignUpBanner from '../img/banners/undraw_mobile_payments_vftl.png';


import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import TwitterLogin from "react-twitter-login";

import { useHistory } from "react-router-dom";
// base url
import url from '../data/urls.json';

// tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../css/tabs_style.css';

export default function Trips() {


    const [sideBar, setSideBar] = useState(false);
    const [signupPage, setSignupPage] = useState(false);
    const [signInPage, setSignInPage] = useState(false);

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
            history.push("/");
        } else {
            // get their value and check the token
            var data = localStorage.getItem("token");
            var name = JSON.parse(data);
            setUserName(name.userName);
            activateReservationList();
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
        history.push("/");
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

    const history = useHistory();

    const switchToHosting = () => {
        if (localStorage.getItem("token") === null) {
            setSignInPage(true);
        } else {
            history.push("/HostYourApartment");
        }
    }

    const [reserList, setReserList] = useState(null);
    const activateReservationList = () => {
        fetch(url.baseUrl+"getListofBookings", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userId": parseInt(JSON.parse(localStorage.getItem("token")).userId)
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data);
            setReserList(res.data);
        })
        .catch(error => console.log(error));
    }

    const [finishList, setFinishList] = useState(null);
    const activateFinishedList = () => {
        fetch(url.baseUrl+"getListofBookings", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userId": parseInt(JSON.parse(localStorage.getItem("token")).userId)
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data);
            setFinishList(res.data);
        })
        .catch(error => console.log(error));
    }

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

                </div>
                <div className="PlacesNearYou0">
                    <div className="PlacesNearYou02" style={{marginBottom: '20px'}}>Trips</div>
                </div>

                <Tabs>
                    <TabList>
                        {/* <Tab>Favorites</Tab> */}
                        <Tab>Upcoming</Tab>
                        <Tab onClick={activateFinishedList()}>Finished</Tab>
                    </TabList>

                    <TabPanel>
                        {reserList ? (
                            <>
                                <div className="DetailListCont">
                                    {reserList.map((host, key) => {return (
                                        <>
                                            {/* single container */}
                                            <div className="DetailList0" key={key}>
                                                <div className="DetailList01"><img src={host.imageList[0]} alt="" /></div>
                                                <div className="DetailList02">
                                                    <div className="DetailList021">{host.guests}</div>
                                                    <div className="DetailList022">{host.listingTitle}</div>
                                                    <div className="DetailList023">2 guests . Studio . 2 beds . 1 bathroom</div>
                                                    <div className="DetailList024">$ {host.amountPaid} / night</div>
                                                </div>
                                            </div>
                                        </>
                                    )})}
                                </div>
                            </>
                                    
                        ) : (
                            <div className={styles.loading0}><img className={styles.loading01} src={loading} alt="" /></div>
                        )}
                    </TabPanel>
                    <TabPanel>
                        {finishList ? (
                            <>
                                <div className="DetailListCont">
                                    {finishList.map((host, key) => {return (
                                        <>
                                            {/* single container */}
                                            <div className="DetailList0" key={key}>
                                                <div className="DetailList01"><img src={v1} alt="" /></div>
                                                <div className="DetailList02">
                                                    <div className="DetailList021" >{host.guests}</div>
                                                    <div className="DetailList022">{host.listingTitle}</div>
                                                    <div className="DetailList023">2 guests . Studio . 2 beds . 1 bathroom</div>
                                                    <div className="DetailList024">$ {host.amountPaid} / night</div>
                                                </div>
                                            </div>
                                        </>
                                    )})}
                                </div>
                            </>
                                    
                        ) : (
                            <div className={styles.loading0}><img className={styles.loading01} src={loading} alt="" /></div>
                        )}
                    </TabPanel>
                </Tabs>

            </div>

            <div className="mobile">
                <div className="placesNearMob0">
                    <div className="placesNearMob01"><img src={backIconGrey} alt="" onClick={() => history.goBack()} /></div>
                    <div className="placesNearMob02">Favorites</div>
                </div>

                <div className="PlacesNearYou0">
                    <div className="PlacesNearYou02" style={{marginBottom: '20px'}}>Trips</div>
                </div>

                <Tabs>
                    <TabList>
                        <Tab>Favorites</Tab>
                        <Tab>Finished</Tab>
                        <Tab>Upcoming</Tab>
                    </TabList>

                    <TabPanel>

                        <div className={trips.const}> 
                            
                            <div className={trips.t1}>
                                <div className={trips.t11}>
                                    <img className={trips.t111} src={v1} alt="" />
                                    <img className={trips.t112} src={favRed} alt="" />
                                </div>
                                <div className={trips.t12}>
                                    <img src={starIcon} alt="" /><span> 4.29 (7)</span>
                                </div>
                                <div className={trips.t13}>Entire apartment . Bhopal</div>
                                <div className={trips.t14}>$ 7 / night</div>
                                <div className={trips.t15}>Check avalability</div>
                            </div>

                            <div className={trips.t1}>
                                <div className={trips.t11}>
                                    <img className={trips.t111} src={v1} alt="" />
                                    <img className={trips.t112} src={favRed} alt="" />
                                </div>
                                <div className={trips.t12}>
                                    <img src={starIcon} alt="" /><span> 4.29 (7)</span>
                                </div>
                                <div className={trips.t13}>Entire apartment . Bhopal</div>
                                <div className={trips.t14}>$ 7 / night</div>
                                <div className={trips.t15}>Check avalability</div>
                            </div>

                        </div>

                    </TabPanel>
                    <TabPanel>
                        <div className={trips.const}> 
                            
                            <div className={trips.t1}>
                                <div className={trips.t11}>
                                    <img className={trips.t111} src={v1} alt="" />
                                    <img className={trips.t112} src={favRed} alt="" />
                                </div>
                                <div className={trips.t12}>
                                    <img src={starIcon} alt="" /><span> 4.29 (7)</span>
                                </div>
                                <div className={trips.t13}>Entire apartment . Bhopal</div>
                                <div className={trips.t14}>$ 7 / night</div>
                                <div className={trips.t15}>Check avalability</div>
                            </div>

                            <div className={trips.t1}>
                                <div className={trips.t11}>
                                    <img className={trips.t111} src={v1} alt="" />
                                    <img className={trips.t112} src={favRed} alt="" />
                                </div>
                                <div className={trips.t12}>
                                    <img src={starIcon} alt="" /><span> 4.29 (7)</span>
                                </div>
                                <div className={trips.t13}>Entire apartment . Bhopal</div>
                                <div className={trips.t14}>$ 7 / night</div>
                                <div className={trips.t15}>Check avalability</div>
                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className={trips.const}> 
                            
                            <div className={trips.t1}>
                                <div className={trips.t11}>
                                    <img className={trips.t111} src={v1} alt="" />
                                    <img className={trips.t112} src={favRed} alt="" />
                                </div>
                                <div className={trips.t12}>
                                    <img src={starIcon} alt="" /><span> 4.29 (7)</span>
                                </div>
                                <div className={trips.t13}>Entire apartment . Bhopal</div>
                                <div className={trips.t14}>$ 7 / night</div>
                                <div className={trips.t15}>Check avalability</div>
                            </div>

                            <div className={trips.t1}>
                                <div className={trips.t11}>
                                    <img className={trips.t111} src={v1} alt="" />
                                    <img className={trips.t112} src={favRed} alt="" />
                                </div>
                                <div className={trips.t12}>
                                    <img src={starIcon} alt="" /><span> 4.29 (7)</span>
                                </div>
                                <div className={trips.t13}>Entire apartment . Bhopal</div>
                                <div className={trips.t14}>$ 7 / night</div>
                                <div className={trips.t15}>Check avalability</div>
                            </div>

                        </div>
                    </TabPanel>
                </Tabs>

            </div>

            {sideBar && (
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
                        <p onClick={() => history.push('/hostCars')}>Host your cars</p>
                        <p onClick={() => history.push('/HostYourApartment')}>Host your apartment</p>
                        <p onClick={signOutSubmit}>Signout</p>
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