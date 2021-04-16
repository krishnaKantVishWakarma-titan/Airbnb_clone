import adminPro from "../img/demo/24.png";
import "../css/Profile.css"
import React, { useEffect, useState } from "react";
// import profile from "../img/icons/profile.png";
import Verification from "../img/icons/user-verification.svg";
import ds from '../css/Dashboard.module.css';
import setting from "../img/icons/settingsIcon.svg";
import Right from "../img/icons/right.png";
import Check from "../img/icons/check.png";
import Image from "../img/icons/image.png";
import loading from '../img/icons/loadingHostingList.gif';
import url from '../data/urls.json';

export default function Profiles() {

    const [tab1, setTab1] = useState(true);
    const [tab2, setTab2] = useState(false);
    const [tab3, setTab3] = useState(false);
    const [mainLoad, setmainLoad] = useState(false);

    var data = localStorage.getItem("token");
    var name = JSON.parse(data);
    console.log(name.userId);
    const profile = JSON.parse(localStorage.getItem("token")).userProfile;
    console.log(profile);
    var Email = JSON.parse(localStorage.getItem("token")).userEmail;
    console.log(Email);

    useEffect(() => {
        setmainLoad(true);
        
    }, []);


    return (
        <>
            <div style={{ width: "100%", height: "100%" }}>


                <div className="Profile">


                    <div className="p1" onClick={() => { setTab1(true); setTab2(false); setTab3(false) }}>
                        <div className="profile_pic">
                            <img className="img" src={profile} alt="" />
                        </div>
                        <p style={{ marginRight: "89px" }}> Profile</p>
                    </div>
                    <div className="p2" onClick={() => { setTab2(true); setTab1(false); setTab3(false) }} >
                        <div className="profile_pic">
                            <img className="img" src={Verification} alt="" />
                        </div>
                        <p style={{ marginRight:'28px'}}>  Verifications </p> 
                    </div>
                    <div className="p3" onClick={() => { setTab2(false); setTab1(false); setTab3(true) }}>
                        <div className="profile_pic">
                            <img className="img" src={setting} alt="" />
                        </div>
                        <p style={{ marginRight: "70px" }}> Settings</p> 
                    </div>

                </div>
                {tab1 && (

                    <div className="div_0">
                        <h1 className="p5"> Profile</h1>
                        <div className="p4">
                            <img src={JSON.parse(localStorage.getItem("token")).userProfile} alt="" /> </div>
                        <div style={{ marginLeft: "38%", marginTop: "-22px" }}>
                            <img style={{ width: '30px', height: '20px', borderRadius: "20px" }} src={Image} alt="" />
                        </div>


                        <p className="p6">{JSON.parse(localStorage.getItem("token")).userName}</p>
                        <div className="p8">
                            <textarea placeholder="About yourself" className="p7"></textarea></div>
                        <div className="p8">
                            <input className="p8_1" type="text" placeholder="Your Location" /></div>
                        <div className="p8">  <input className="p8_2" type="Email " placeholder="Your Email Address" />
                        </div> <button className="p9">Save</button>
                        <hr className="hr" />
                        <h1 className="Review"> Reviews</h1>

                        <div className="Reviews0">
                            <div className="Reviews01">
                                <div className="p4_1">
                                    <img src={adminPro} alt="" /> </div></div>
                            <div className="Reviews02">
                                <div className="Reviews021" >Mensa Kumar</div>
                                <div className="Reviews022">Booked Jan, 2021</div>
                                <div className="Review023 ">This is a great location to stay. Linda was very generous to give me a ride back tot he aiport.</div>
                                <div className="Reviews0222">Posted:01/23/2021</div>
                            </div>

                        </div>
                        <div className="Reviews0">
                            <div className="Reviews01">
                                <div className="p4_1">
                                    <img src={adminPro} alt="" /> </div></div>
                            <div className="Reviews02">
                                <div className="Reviews021" >Mensa Kumar</div>
                                <div className="Reviews022">Booked Jan, 2021</div>
                                <div className="Review023 ">This is a great location to stay. Linda was very generous to give me a ride back tot he aiport.</div>
                                <div className="Reviews0222">Posted:01/23/2021</div>
                            </div>

                        </div>
                        <div className="Reviews0">
                            <div className="Reviews01">
                                <div className="p4_1">
                                    <img src={adminPro} alt="" /> </div></div>
                            <div className="Reviews02">
                                <div className="Reviews021" >Mensa Kumar</div>
                                <div className="Reviews022">Booked Jan, 2021</div>
                                <div className="Review023 ">This is a great location to stay. Linda was very generous to give me a ride back tot he aiport.</div>
                                <div className="Reviews0222">Posted:01/23/2021</div>
                            </div>

                        </div>
                        <div style={{ margin: "10px 0 10px 32%", fontSize: "14px", fontWeight: "bold", }} >View all reviews</div>


                    </div>

                )}



                {tab2 && (
                    <div className="div_1">
                        <div className="div_02">
                            <h1 className="p5"> Verifications  </h1>
                            <p className="p6_1">{JSON.parse(localStorage.getItem("token")).userEmail}</p>
                            <div className="Icons0">
                                <img style={{ width: '20px', height: '20px' }} src={Right} alt="" />
                            </div>
                            <p className="p6_1">+1-234-567-8900</p>
                            <div className="Icons0">
                                <img style={{ width: '20px', height: '20px' }} src={Right} alt="" />
                            </div>
                            <h3 className="p6_3">Government ID</h3>
                            <button className="p9-1">Upload</button> </div>
                    </div>
                )}

                {tab3 && (
                    <div className="div_0">
                        <div className="p10">
                            <h1 className="p5"> Settings </h1>
                            <div>
                                <button className="p9_1">Reset Password</button>
                            </div>
                            <h2 className="p6_2">Social Connection</h2>
                            <p className="p6_4">Always available to connect</p>
                            <div className="Icons1">
                                <img style={{ width: '20px', height: '20px' }} src={Check} alt="" />
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {mainLoad && (
                <div className={ds.mainLoad}><img className={ds.mainLoad0} src={loading} alt="" /></div>
            )}
        </>)
}

