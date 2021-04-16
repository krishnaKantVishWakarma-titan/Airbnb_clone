/* eslint-disable jsx-a11y/anchor-is-valid */
import '../css/components.css';
import varimg from '../img/demo/3.png';
import { useState, useEffect, useCallback, useRef } from 'react';
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
import profilepic from '../img/icons/profile.png';
import worldIcon from '../img/icons/blackWorldIcon.png';
import LoginBanner from '../img/banners/undraw_enter_uhqk.png';
import SignUpBanner from '../img/banners/undraw_mobile_payments_vftl.png';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import TwitterLogin from "react-twitter-login";
import { useHistory, useParams, Link } from "react-router-dom";
import Review from '../components/GetReviewsComp';
import addSign from '../img/icons/addSign.png';
import minusSign from '../img/icons/minusSign.png';
import ChatImage from "../img/icons/images1.png";
// import v21 from '../img/demo/21.png';
// import Map from '../components/Map';
// import ImageSlider from '../components/ImageSlider';
// base url
import url from '../data/urls.json';
import Map from "../components/Map";
import swal from 'sweetalert';
// date
import { DateRange } from 'react-date-range';
import ImageSlider from '../components/ImageSlider';
import V1  from "../img/demo/10.png";


export default function HotelInfo() {
    const [tab2, setTab2] = useState(false)
    const [tab1, setTab1] = useState(true)
    const [tab4, setTab4] = useState(true)

    const [tab3, setTab3] = useState(true)
    const { id, userId } = useParams();
    const [person, setPerson] = useState(null);
    const [p, setp] = useState(null);
    const [imagetab2, setImageTab2] = useState(false)
    const [imagetab1, setImageTab1] = useState(true)

    const [isSignedIn, setIsSignedIn] = useState(true);

    const [sideBar, setSideBar] = useState(false);
    const [signupPage, setSignupPage] = useState(false);
    const [signInPage, setSignInPage] = useState(false);
    const [chat, setChat] = useState(null)
    const [hostIds, setHostIds] = useState("")

    // .......................chat Connection.....................................

    const HostId = hostIds;

    console.log(HostId);




    const [langView, SetLAngView] = useState(false);
    const [userName, setUserName] = useState("null");
    const [isAdmin, setIsAdmin] = useState(true);

    const [chatName, setChatName] = useState(null);
    const [chatRoom, setChatRoom] = useState(null);
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

        fetch(url.baseUrl + "host/" + id, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                setHostIds(res.data.userId);
                console.log("hostdetail");
                console.log(res.data.userId);



                if (localStorage.getItem("token") === null) {
                    getUserDetails(res.data, res.data.userId);
                } else {
                    if (res.data.userId === JSON.parse(localStorage.getItem("token")).userId) {
                        setIsAdmin(false);
                    }
                    getUserDetails(res.data, res.data.userId);
                }
            })
            .catch(error => console.log(error));

    }, []);

    const getUserDetails = (data, hostId) => {
        fetch(url.baseUrl + "user?userId=" + data.userId, {
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
                    getUserDetailsTwo(res.data, data, hostId);
                }
            })
            .catch(error => console.log(error));
    }

    const getUserDetailsTwo = (res, data, hostId) => {
        var m_data = localStorage.getItem("token");
        var name = JSON.parse(m_data);
        fetch(url.baseUrl + "saved?userId=" + name.userId, {
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
                // setp(res);
                // setPerson(data);

                getUserDetailsThree(res, data, hostId)
            })
            .catch(error => console.log(error));
    }

    const getUserDetailsThree = (data1, data2, hostId) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6MSwidHlwZSI6ImRldmljZSIsImlhdCI6MTYxNjU2MjM2NX0.n8dGBHbi9_I6JObUpSEa2k-fC-mcwVK-JFh920344_o");

        var userid = JSON.parse(localStorage.getItem("token")).userId;
        console.log(userid);
        var requestOptions = {
            method: 'post',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify({
                "userId": userid,
                "hostId": hostId

            })
        };
        console.log("sanjeev", requestOptions);
        fetch("http://13.233.154.141:5000/api/addConnection", requestOptions)
            .then(response => response.json())
            .then(res => {
                console.log("name", res.data.name);
                setChatName(res.data.name);
                setChatRoom(res.data.room);
                console.log("room", res.data.room);

                // history.push(`/chat?name=${res.data.name}&room=${res.data.room}`)
                setChat(chat);

                setp(data1);
                setPerson(data2);
            })
            .catch(error => console.log('error', error));
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


    const history = useHistory();

    const switchToHosting = () => {
        if (localStorage.getItem("token") === null) {
            setSignInPage(true);
        } else {
            history.push("/HostYourApartment");
        }
    }

    const postHandler = () => {
        swal("Thankyou Page Have Done")
    }



    const names = JSON.parse(localStorage.getItem("token")).userId;
    console.log(names)

    if (!person) {
        return (<div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}><img style={{ marginTop: "20%", width: "100px" }} src={loading} alt="" /></div>)
    } else {
        return (

            <>


                <div className="desktop">
                    {tab4 &&(    

                        <div className={headerStyle.headBody1}>
                            <div className={headerStyle.headUpNavMain}>
                                <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt="" /></div>
                                <div className={headerStyle.headUpNav}>
                                    <a className={headerStyle.headUpNavLink} onClick={switchToHosting}><span>Become a host</span></a>
                                    <a className={headerStyle.headUpNavLink} onClick={() => SetLAngView(true)}><img src={worldIcon} alt="" /></a>
                                    <span onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                                        <img src={sidebarIcon} alt="" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    {tab1 && (
                        <div className="carInfo0Cont">

                            <div className="carInfo0">
                                {imagetab1 && (

                                    <div className="carInfo01">
                                        {person.imageList[0] ? <div className="carInfo01img1"><img src={person.imageList[0]} alt="" /></div> : <div className="carInfo01img1"><img src={bg} alt="" /></div>}
                                        <div className="carInfo01img2">
                                            <div className="carInfo01img21">
                                                {person.imageList[1] ? <img src={person.imageList[1]} alt="" /> : <img src={bg} alt="" />}
                                            </div>
                                            <div className="carInfo01img21" style={{ marginTop: '10px', height: '50%' }}>
                                                {person.imageList[2] ? <img src={person.imageList[2]} alt="" /> : <img src={bg} alt="" />}
                                            </div>

                                        </div>
                                        <div className="carInfo01img3" onClick={() => { setImageTab2(true); setImageTab1(false) }} >5+ Photos </div>
                                    </div>
                                )}

                                {imagetab2 && (
                                    <ImageSlider images={person.imageList} />
                                )}

                                <div style={{ float: "left" }}>
                                    <div style={{ width: "100%", float: "left" }}>
                                        <div className="hotelInfo0S">
                                            <div className="hotelInfo1">
                                                <div className="hotelInfo01">{person.listingTitle}</div>
                                                <div className="hotelInfo01I0">{person.addrStreet}, {person.addrCity}, {person.addrState}</div>
                                                <div style={{ marginBottom: "15px", marginTop: "5px", float: "left" }}>{person.noOfGuests} guests . {person.bedrooms} bedroom . {person.noOfBed} bed . {person.baths} bathroom</div>
                                            </div>
                                        </div>

                                        <div className="hotelInfo0S1">
                                            <div className="hotelInfo1">
                                                <div className="hotelInfo01">About Apartment</div>
                                                <div className="hotelInfo01I1">
                                                    {person.listingDescription}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hotelInfo0S1" style={{ backgroundColor: '#ECECEC', width: 'auto', padding: '10px', borderRadius: '5px' }}>
                                            <Link style={{ width: '15%', cursor: 'pointer' }} to={`/chat?name=${JSON.parse(localStorage.getItem('token')).userName}&room=${chatRoom}&username=${chatName}&profile=${p.profile_pic || profilepic}`}>
                                                <img src={ChatImage} alt="" style={{ width: '20px', float: 'left', marginLeft: '40%' }} />
                                                <div style={{ fontSize: '17px', fontWeight: '600', marginLeft: "5px", color: "black", textDecoration: 'none' }}>Message Host</div>
                                            </Link>
                                        </div>

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
                                <div className="container">
                                    <Review hostingId={id} setTab1={setTab1} userId={userId} setTab2={setTab2} />
                                </div>

                            </div>
                        </div>
                    )}
                {tab3 &&(    
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
                        </div>
                )}
                </div>
               

                <div className="mobile">
                    {/* header */}
                    <div className="placesNearMob0">
                        <div className="placesNearMob01"><img src={backIconGrey} alt="" onClick={() => history.goBack()} /></div>
                        <div className="placesNearMob02">Nearby</div>
                        <div className="placesNearMob04" style={{ float: "right", marginRight: "20px" }}><img src={fav} alt="" /></div>
                    </div>

                </div>




                {sideBar && (

                    <div className={headerStyle.headSideBar} onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                        <div className={headerStyle.headSideBar011S0}>
                            <div className={headerStyle.headSideBar011S01}><img src={JSON.parse(localStorage.getItem("token")).userProfile} alt="" /></div>
                            <div className={headerStyle.headSideBar011S02}>{userName}
                                <div className={headerStyle.headSideBar011S021} style={{ width: '100%' }}>{JSON.parse(localStorage.getItem("token")).userEmail}</div>
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
                    </div>

                )}

   {/* thankyou */}

     {tab2 && ( 
       
             <div style={{ width: "100%", textAlign: "center", backgroundColor: 'white', float: 'left', position: 'absolute', height: '100%'}}>
             <div style={{fontFamily:'sans-serif',fontSize:"50px", marginTop:90, fontWeight:300}}> 
        <h1> Thankyou </h1><br /> <h3> Your review has been Submitted </h3> </div>
        <div style={{marginTop:50}}> <Link to="/" style={{ marginTop:100, cursor: "pointer"}}>Home</Link></div>
        
          </div>

                )}

                {/* language box */}
                {langView && (
                    <div className="langCont0">
                        <div className="langCont01">
                            <div className="langCont01Close"><img src={closeBtn} onClick={() => SetLAngView(false)} alt="" /></div>
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




            </>

        );
    }
}
