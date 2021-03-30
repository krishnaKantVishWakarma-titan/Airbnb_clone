/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams,} from 'react-router-dom';
import '../css/components.css';
import ImageSlider from '../components/ImageSliderCarlist';
// import starIcon from '../img/icons/star.svg';
import headerStyle from '../css/headerMain.module.css';
import starIcon from '../img/icons/star.svg';
import rightArrowIcon from '../img/icons/headerMinBack.png';
// import proPic from '../img/demo/24.png';
// import Reviews from '../components/Review';
// import adminPro from '../img/demo/24.png';
import loading from '../img/icons/loading.gif';
import d from '../css/carInfo.module.css';
import Footer from '../components/Footer';
import url from '../data/urls.json';

export default function CarInfo () {
    const { id } = useParams();
    const [CarInfo, setCarInfo] = useState(null);
    const [p, setp] = useState(null);
    const [isAdmin, setIsAdmin] = useState(true);
    const history = useHistory();
    useEffect( () => {
     mainUrl()
    }, []);
    const mainUrl = () => {
        fetch(url.baseUrl + "carHost/" + id  , {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res=> {
            if (res.data.userId === parseInt(JSON.parse(localStorage.getItem("token")).userId)) {
                setIsAdmin(false);
            }
            getUserDetails(res.data);
        })    
        .catch(error => console.log(error));
    }

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
            console.log(data)
            setp(res.data);
            setCarInfo(data);
        })
        .catch(error => console.log(error));
    }

    const [errTab, setErrTab] = useState(false);
    const errorDisplayTime = 3000;
    const [sDate, setSDate] = useState("");
    const [eDate, setEDate] = useState("");
    const [sTime, setSTime] = useState("");
    const [eTime, setETime] = useState("");
    const i1 = useRef(null);
    const i2 = useRef(null);
    const i3 = useRef(null);
    const i4 = useRef(null);
    const carBookingFinal = () => {
        i1.current.style.border = "1px solid grey";
        i2.current.style.border = "1px solid grey";
        i3.current.style.border = "1px solid grey";
        i4.current.style.border = "1px solid grey";
        if (sDate === "") {
            i1.current.style.border = "1px solid red";
            setErrTab(true);
            setInterval(() => setErrTab(false), errorDisplayTime);
        } else if (sTime === "") {
            i2.current.style.border = "1px solid red";
            setErrTab(true);
            setInterval(() => setErrTab(false), errorDisplayTime);
        } else if (eDate === "") {
            i3.current.style.border = "1px solid red";
            setErrTab(true);
            setInterval(() => setErrTab(false), errorDisplayTime);
        } else if (eTime === "") {
            i4.current.style.border = "1px solid red";
            setErrTab(true);
            setInterval(() => setErrTab(false), errorDisplayTime);
        } else {
            // alert("submit");
            history.push('/carBooking', {
                carId: id,
                sDate: sDate,
                eDate: eDate,
                sTime: sTime,
                eTime: eTime
            });
        }
    }

    if (!CarInfo) {
        return (<div style={{display: "flex", alignContent: "center", justifyContent: "center"}}><img style={{marginTop: "20%", width: "100px"}} src={loading} alt="" /></div>)
    } else {
        return (

            <>
                
                <div className="desktop">
                    {/* header */}
                    <div className={headerStyle.headBody1}>
                        <div className={headerStyle.headUpNavMain}>
                            <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt=""/></div>
                        </div>
                    </div>
                    {/* body */}
                    <div className="carInfo0Cont">
                        <div className="carInfo0">
                            <div className="carInfo01">
                                <ImageSlider images={CarInfo.carsImageArray} />
                            </div>

                            <div style={{float: "left"}}>
                                <div style={{width: "100%", float: "left"}}>
                                    <div className="hotelInfo0S">

                                        <div className={d.c0}>
                                            <div className={d.c01}>{CarInfo.modelName}</div>
                                            <div className={d.c02}>$ {CarInfo.carListingPrice}/day</div>
                                        </div>
                                        <div className={d.c1}>
                                            <div className={d.c11}>
                                                <div className={d.c111}>
                                                    <div className={d.c1111}><b>Mileage</b> : {CarInfo.mileage}</div>
                                                    <div className={d.c1111}><b>Trim</b> : {CarInfo.trim}</div>
                                                </div>
                                                <div className={d.c111}>
                                                    <div className={d.c1111}><b>Min. trip duration</b> : {CarInfo.minimumTripDuration}</div>
                                                    <div className={d.c1111}><b>Max. trip duration</b> : {CarInfo.maximumTripDuration}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={d.c2}>
                                            <div className={d.c21}>
                                                <div className={d.c211}>Start Date</div>
                                                <input type="date" value={sDate} ref={i1} onChange={e => setSDate(e.target.value)} />
                                            </div>
                                            <div className={d.c21}>
                                                <div className={d.c211}>Start Time</div>
                                                <input type="time" value={sTime} ref={i2} onChange={e => setSTime(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className={d.c2}>
                                            <div className={d.c21}>
                                                <div className={d.c211}>End Date</div>
                                                <input type="date" value={eDate} ref={i3} onChange={e => setEDate(e.target.value)} />
                                            </div>
                                            <div className={d.c21}>
                                                <div className={d.c211}>End Date</div>
                                                <input type="time" value={eTime} ref={i4} onChange={e => setETime(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className={d.c3}>
                                            <div className={d.c31}>Car Description</div>
                                            <div className={d.c32}>{CarInfo.carDescription}</div>
                                        </div>

                                        <div className={d.c3} style={{marginBottom: 50}}>
                                            <div className={d.c31}>Features</div>
                                            <div className={d.c33}>All-wheel drive</div>
                                        </div>

                                        {/* <Reviews /> */}

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="carInfo1">
                        <div className="carInfo10">
                            <div className="carInfo101">$ {CarInfo.carListingPrice}/night</div>
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
                            <div className="carInfo17"><button onClick={carBookingFinal}>Add car to booking</button></div>
                        )}

                    </div>

                    {/* <Footer /> */}
                </div>

                {errTab && (
                    <div className="HostYourApartmentError0">Please enter the field!!!</div>
                )}
            </>
        );
    }
}























