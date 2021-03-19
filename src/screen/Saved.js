/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useHistory } from 'react-router-dom';
import headerStyle from '../css/headerMain.module.css';
import rightArrowIcon from '../img/icons/headerMinBack.png';
import sidebarIcon from '../img/icons/sidebar.png';
import worldIcon from '../img/icons/blackWorldIcon.png';
import { useEffect, useState } from 'react';
import trips from '../css/trips.module.css';
import v1 from '../img/demo/16.png';
import starIcon from '../img/icons/star.png';
import favRed from '../img/icons/favRed.svg';
import backIconGrey from '../img/icons/backGrey.svg';
import url from '../data/urls.json';

import userIcon from '../img/icons/user.png';
export default function Saved () {

    const history = useHistory();
    const [list , setList] = useState(null);
    const [counter, setCounter] = useState(null);
    const [sideBar, setSideBar] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history.push("/");
        }
        displayHosting();
    }, []);

    const deleteHost = id => {
        fetch(url.baseUrl+"dislike?id="+id, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res.code === 200) {
                displayHosting();
            }
        })
        .catch(error => console.log(error));
    }

    const displayHosting = () => {
        fetch(url.baseUrl+"host", {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            displaySavedHosting(JSON.parse(localStorage.getItem("token")).userId ,res.data);
        })
        .catch(error => console.log(error));
    }

    const displaySavedHosting = (userid, data) => {
        fetch(url.baseUrl + "saved?userId=" + userid, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data);
            if (res.data.length === 0) {
                setCounter(false);
            } else {
                for (var has in data) {
                    for (var key in res.data) {
                        if (data[has].id === res.data[key].hosting_id) {
                            data[has].isFav = true;
                            data[has].isFavId = res.data[key].Id;
                        }
                    }
                }
                setCounter(true);
                setList(data);
                console.log("data : ");
                console.log(data);
            }
        })
        .catch(error => alert(error));
    }

    const signOutSubmit = () => {
        localStorage.removeItem("token");
        history.push("/");
    }

    return (
        <>
        
            <div className="desktop">
                <div className={headerStyle.headBody1}>
                    <div className={headerStyle.headUpNavMain}>
                        <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt="" /></div>

                        <div className={headerStyle.headUpNav}>
                            <a className={headerStyle.headUpNavLink} onClick={() => history.push("/HostYourApartment")}><span>Switch to hosting</span></a>
                            <a className={headerStyle.headUpNavLink}><img src={worldIcon} alt="" /></a>
                            <span onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                                <img src={sidebarIcon} alt="" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mobile">

                <div className="placesNearMob0">
                    <div className="placesNearMob01"><img src={backIconGrey} alt="" onClick={() => history.goBack()} /></div>
                    <div className="placesNearMob02">Favorites</div>
                </div>

            </div>

            <div className="PlacesNearYou0">
                <div className="PlacesNearYou02" style={{marginBottom: '20px'}}>Saved</div>
            </div>

            <div className={trips.const}> 
                {counter ? (
                    <>
                        {list && (
                            <>
                                {list.length === 0 ? <div>empty</div> : null}
                                {list.map((val, ind) => {return (
                                    <div key={ind}>
                                        {val.isFav && (
                                            <>
                                                <div className={trips.t1} key={ind}>
                                                    <div className={trips.t11}>
                                                        <img className={trips.t111} src={v1} alt="" />
                                                        <img className={trips.t112} src={favRed} alt="" onClick={() => deleteHost(val.isFavId)} />
                                                    </div>
                                                    <div className={trips.t12}>
                                                        <img src={starIcon} alt="" /><span> 4.29 (7)</span>
                                                    </div>
                                                    <div className={trips.t16} onClick={() => history.push(`/hotelInfo/${val.id}`)}>{val.listingTitle}</div>
                                                    <div className={trips.t13} onClick={() => history.push(`/hotelInfo/${val.id}`)}>{val.whatGuestBook} . {val.addrCity}</div>
                                                    <div className={trips.t14}>$ {val.basePrice} / night</div>
                                                    <div className={trips.t15}>Check avalability</div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )})}
                            </>
                        )}
                        </>
                ) : (
                    <div style={{float: "left", width: "100%", textAlign: "center", marginTop: "150px"}}>No saved Apartment</div>
                )}
            </div>


            {sideBar && (
                <div className={headerStyle.headSideBar} onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                        <div className={headerStyle.headSideBar011S0}>
                            <div className={headerStyle.headSideBar011S01}><img src={JSON.parse(localStorage.getItem("token")).userProfile} alt="" /></div>
                            <div className={headerStyle.headSideBar011S02}>{JSON.parse(localStorage.getItem("token")).userName} 
                                <div className={headerStyle.headSideBar011S021}>{JSON.parse(localStorage.getItem("token")).userEmail}</div>
                            </div>
                        </div>
                        
                        <div className={headerStyle.headSideBar011S1}><button onClick={() => history.push('/Account')}>View Profile</button></div>
                        <p onClick={() => history.push('/')}>Home</p>
                        <p onClick={() => history.push('/hosting')}>Listing</p>
                        <p onClick={() => history.push('/notify')}>Notification</p>
                        <p onClick={() => history.push('/chats')}>Messages</p>
                        <p onClick={() => history.push('/Trips')}>Trips</p>
                        <p onClick={() => history.push('/hostCars')}>Host your cars</p>
                        <p onClick={() => history.push('/HostYourApartment')}>Host your apartment</p>
                        <p onClick={signOutSubmit}>Signout</p>
                </div>
            )}
        </>
    );
}