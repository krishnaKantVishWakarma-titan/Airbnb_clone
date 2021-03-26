/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from '../css/profile.module.css';
import user from '../css/userProfile.module.css';

import sidebarIcon from '../img/icons/sidebar.png';
import addButton from '../img/icons/add-user-button.svg';
import backBtnIcon from '../img/icons/backGrey.svg';
import backIcon from '../img/icons/headerMinBack.png';
import userIcon from '../img/icons/user.png';
import headerStyle from '../css/headerMain.module.css';
import url from '../data/urls.json';

export default function UserProfile() {

    const [userName, setUserName] = useState(null);
    const [sideBar, setSideBar] = useState(false);
    const history = useHistory();
    const [profilePic, setProfilePic] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history.push('/');
        } else {
            setUserName(JSON.parse(localStorage.getItem("token")).userName);
            setProfilePic(JSON.parse(localStorage.getItem("token")).userProfile);
        }
        // console.log(JSON.parse(localStorage.getItem("token")).userProfile)
        // console.log(JSON.parse(localStorage.getItem("token")).userId);
    }, []);
    // desktop
    const [edit, SetEdit] = useState(false);
    const [proPic, setProPic] = useState(false);
    // mobile
    const [editMob, SetEditMob] = useState(false);
    const [proPicMob, setProPicMob] = useState(false);
    const signOutSubmit = () => {
        localStorage.removeItem("token");
        history.push("/");
    }
    const fileInput = useRef(null);
    const uploadProfilePic = e => {
        e.preventDefault();
        
        var formdata = new FormData();
        formdata.append("file", fileInput.current.files[0], fileInput.current.files[0].name)

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${url.baseUrl}/upload`, requestOptions)
        .then(response => response.json())
        .then(res => {
            console.log("upload api res : ");
            console.log(res.Data[0].Location);
            updateProfile(res.Data[0].Location)
        })
        .catch(error => console.log('error', error));
    }

    const updateProfile = image => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"userId":JSON.parse(localStorage.getItem("token")).userId.toString(),"profile_pic":image});
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        fetch("https://taz2ic52bc.execute-api.ap-south-1.amazonaws.com/production/api/updateProfilePic", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.code === 200) {
                    console.log(result);
                    setProfilePic(image);

                    var data = {
                        "userId": JSON.parse(localStorage.getItem("token")).userId,
                        "userToken": JSON.parse(localStorage.getItem("token")).userToken,
                        "userName": JSON.parse(localStorage.getItem("token")).userName,
                        "userEmail": JSON.parse(localStorage.getItem("token")).userEmail,
                        "userProfile": image
                    }
                    localStorage.setItem("token", JSON.stringify(data));
                }
        })
        .catch(error => console.log('error', error));
    }
    return(
        <>
            <div className={styles.desk}>
                {/* header */}
                <div className={styles.header0}>

                    <div className={user.head01} onClick={() => history.goBack()}>
                        <img src={backIcon} alt="" />
                    </div>

                    <div className={styles.header02}>
                        <Link to="/HostYourApartment" className={styles.header021}><p>Create new listing</p></Link>
                        <div className={styles.header021}><img src={sidebarIcon} alt="" onMouseEnter={() => {setSideBar(true);}} onMouseLeave={() => setSideBar(false)} /></div>
                    </div>

                </div>

                {/* body */}
                <div className={user.ud0}>
                    <div className={user.ud01}>
                        <img className={user.ud01img} src={profilePic} alt="" />
                        <div className={user.ud011} onClick={() => {SetEdit(false);setProPic(true);}}>Update Photo</div>
                        <div className={user.ud012}>
                            <img className={user.ud0121} src={userIcon} alt="" />
                            <div className={user.ud0122}>Identity verification</div>
                            <div className={user.ud0123}>some Text</div>
                            <div className={user.ud0124}>Get the badge</div>
                        </div>
                        <div className={user.ud013}>
                            <div className={user.ud0131}>Krishan kant Confirmed</div>
                            <div className={user.ud0132}>
                                <img className={user.ud01321} src={userIcon} alt="" />
                                <div className={user.ud01322}>Email Address</div>
                            </div>
                        </div>
                    </div>
                    <div className={user.ud02}>
                        <div className={user.ud021}>Hi, I'm {userName}</div>
                        <div className={user.ud022}>Joined in 2021</div>
                        <div className={user.ud023} onClick={() => {SetEdit(true);setProPic(false);}}>Edit Profile</div>
                        
                        {proPic && (
                            <div className={user.ud024}>
                                <img className={user.ud0241} src={profilePic} alt=""/>
                                <div className={user.ud0242}>
                                    <p className={user.ud02421}>Lorem Some text</p>
                                    <input type="file" ref={fileInput} style={{display: 'none'}} accept="image/jpg, image/jpeg, image/png" id="file" onChange={e => uploadProfilePic(e)} />
                                    <label className={user.ud02422} htmlFor="file">Upload your image</label>
                                </div>
                            </div>
                        )}

                        {edit && (
                            <div className={user.ud025}>
                                
                                <div className={user.ud0251}>Name</div>
                                <input className={user.ud0254} type="text" />

                                <div className={user.ud0251}>Location</div>
                                <input className={user.ud0254} type="text" />

                                <div className={user.ud0251}>About</div>
                                <textarea className={user.ud0252} />

                                <div className={user.ud0253}>
                                    <div className={user.ud0255} onClick={() => SetEdit(false)}>Cancel</div>
                                    <div className={user.ud0256} onClick={() => SetEdit(false)}>Save</div>
                                </div>
                            </div>
                        )}

                        <div className={user.ud026}>
                            * 0 reviews
                        </div>
                        <div className={user.ud027}>
                            Reviews List
                        </div>

                    </div>
                </div>

            </div>

            <div className={styles.mobile}>
                
                <div className={styles.headerMob0}>
                    <img className={styles.headerMob0img} style={{marginTop: "22px"}} src={backBtnIcon} alt="" onClick={() => history.goBack()} height="20px" /> 
                    <div className={styles.headerMob01}>Hosting</div>
                    <div className={styles.headerMob02} onClick={() => history.push("/HostYourApartment")} ><img src={addButton} className={styles.headerMob02img} alt="" /></div>
                </div>

                {/* body */}
                <div className={user.ud0}>
                    
                    <div className={user.um1}>
                        <div className={user.um11}>
                            <div className={user.um111}>Hi, I'm {userName}</div>
                            <div className={user.ud022}>Joined in 2021</div>
                        </div>
                        <div className={user.um12}>
                            <img src={userIcon} alt="" />
                        </div>
                        <div className={user.um13}>
                            <div className={user.ud0255} onClick={() => {SetEditMob(false);setProPicMob(true)}}>Edit profile</div>
                            <div className={user.um131} onClick={() => {SetEditMob(true);setProPicMob(false)}}>Update photo</div>
                        </div>
                    </div>
                    
                    {proPicMob && (
                        <div className={user.ud024}>
                            <div className={user.ud0242}>
                                <p className={user.ud02421}>Lorem Some text</p>
                                <div className={user.ud02422} onClick={() => {setProPicMob(false)}}>Upload new image</div>
                            </div>
                        </div>
                    )}

                    {editMob && (
                        <div className={user.ud025}>
                            <div className={user.ud0251}>About</div>
                            <textarea className={user.ud0252} />

                            <div className={user.ud0251}>Location</div>
                            <input className={user.ud0254} type="text" />

                            <div className={user.ud0251}>Work</div>
                            <input className={user.ud0254} type="text" />

                            <div className={user.ud0253}>
                                <div className={user.ud0255} onClick={() => {SetEditMob(false)}}>Cancel</div>
                                <div className={user.ud0256} onClick={() => {SetEditMob(false)}}>Save</div>
                            </div>
                        </div>
                    )}

                    <div>
                        <div className={user.ud012}>
                            <img className={user.ud0121} src={userIcon} alt="" />
                            <div className={user.ud0122}>Identity verification</div>
                            <div className={user.ud0123}>some Text</div>
                            <div className={user.ud0124}>Get the badge</div>
                        </div>
                        <div className={user.ud013}>
                            <div className={user.ud0131}>Krishan kant Confirmed</div>
                            <div className={user.ud0132}>
                                <img className={user.ud01321} src={userIcon} alt="" />
                                <div className={user.ud01322}>Email Address</div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>


            {/* end mobile view */}
            {sideBar && (
                <div className={headerStyle.headSideBar} onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
                        <div className={headerStyle.headSideBar011S0}>
                            <div className={headerStyle.headSideBar011S01}><img src={JSON.parse(localStorage.getItem("token")).userProfile} alt="" /></div>
                            <div className={headerStyle.headSideBar011S02}>{userName} 
                                <div className={headerStyle.headSideBar011S021}>{JSON.parse(localStorage.getItem("token")).userEmail}</div>
                            </div>
                        </div>
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
        
        
        </>

    );
}