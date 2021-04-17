// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from '../css/profile.module.css';
import user from '../css/userProfile.module.css';

import sidebarIcon from '../img/icons/sidebar.png';
// import addButton from '../img/icons/add-user-button.svg';
// import backBtnIcon from '../img/icons/backGrey.svg';
import backIcon from '../img/icons/headerMinBack.png';
// import userIcon from '../img/icons/user.png';
import headerStyle from '../css/headerMain.module.css';
import url from '../data/urls.json';

// export default function UserProfile() {

//     const [userName, setUserName] = useState(null);
//     const [sideBar, setSideBar] = useState(false);
//     const history = useHistory();
//     const [profilePic, setProfilePic] = useState(null);
    // useEffect(() => {
    //     if (localStorage.getItem("token") === null) {
    //         history.push('/');
    //     } else {
    //         setUserName(JSON.parse(localStorage.getItem("token")).userName);
    //         setProfilePic(JSON.parse(localStorage.getItem("token")).userProfile);
    //     }
    //     // console.log(JSON.parse(localStorage.getItem("token")).userProfile)
    //     // console.log(JSON.parse(localStorage.getItem("token")).userId);
    // }, []);
    // // desktop
    // const [edit, SetEdit] = useState(false);
    // const [proPic, setProPic] = useState(false);
    // // mobile
    // const [editMob, SetEditMob] = useState(false);
    // const [proPicMob, setProPicMob] = useState(false);
    // const signOutSubmit = () => {
    //     localStorage.removeItem("token");
    //     history.push("/");
    // }
    // const fileInput = useRef(null);
    // const uploadProfilePic = e => {
    //     e.preventDefault();
        
    //     var formdata = new FormData();
    //     formdata.append("file", fileInput.current.files[0], fileInput.current.files[0].name)

    //     var requestOptions = {
    //         method: 'POST',
    //         body: formdata,
    //         redirect: 'follow'
    //     };

    //     fetch(`${url.baseUrl}/upload`, requestOptions)
    //     .then(response => response.json())
    //     .then(res => {
    //         console.log("upload api res : ");
    //         console.log(res.Data[0].Location);
    //         updateProfile(res.Data[0].Location)
    //     })
    //     .catch(error => console.log('error', error));
    // }

    // const updateProfile = image => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
        
    //     var raw = JSON.stringify({"userId":JSON.parse(localStorage.getItem("token")).userId.toString(),"profile_pic":image});
    //     var requestOptions = {
    //       method: 'POST',
    //       headers: myHeaders,
    //       body: raw,
    //       redirect: 'follow'
    //     };
    //     fetch("https://taz2ic52bc.execute-api.ap-south-1.amazonaws.com/production/api/updateProfilePic", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result.code === 200) {
    //                 console.log(result);
    //                 setProfilePic(image);

    //                 var data = {
    //                     "userId": JSON.parse(localStorage.getItem("token")).userId,
    //                     "userToken": JSON.parse(localStorage.getItem("token")).userToken,
    //                     "userName": JSON.parse(localStorage.getItem("token")).userName,
    //                     "userEmail": JSON.parse(localStorage.getItem("token")).userEmail,
    //                     "userProfile": image
    //                 }
    //                 localStorage.setItem("token", JSON.stringify(data));
    //             }
    //     })
    //     .catch(error => console.log('error', error));
    // }
//     return(
//         <>
//             <div className={styles.desk}>
//                 {/* header */}
//                 <div className={styles.header0}>

//                     <div className={user.head01} onClick={() => history.goBack()}>
//                         <img src={backIcon} alt="" />
//                     </div>

//                     <div className={styles.header02}>
//                         <Link to="/HostYourApartment" className={styles.header021}><p>Create new listing</p></Link>
//                         <div className={styles.header021}><img src={sidebarIcon} alt="" onMouseEnter={() => {setSideBar(true);}} onMouseLeave={() => setSideBar(false)} /></div>
//                     </div>

//                 </div>

//                 {/* body */}
//                 <div className={user.ud0}>
//                     <div className={user.ud01}>
//                         <img className={user.ud01img} src={profilePic} alt="" />
//                         <div className={user.ud011} onClick={() => {SetEdit(false);setProPic(true);}}>Update Photo</div>
//                         <div className={user.ud012}>
//                             <img className={user.ud0121} src={userIcon} alt="" />
//                             <div className={user.ud0122}>Identity verification</div>
//                             <div className={user.ud0123}>some Text</div>
//                             <div className={user.ud0124}>Get the badge</div>
//                         </div>
//                         <div className={user.ud013}>
//                             <div className={user.ud0131}>Krishan kant Confirmed</div>
//                             <div className={user.ud0132}>
//                                 <img className={user.ud01321} src={userIcon} alt="" />
//                                 <div className={user.ud01322}>Email Address</div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={user.ud02}>
//                         <div className={user.ud021}>Hi, I'm {userName}</div>
//                         <div className={user.ud022}>Joined in 2021</div>
//                         <div className={user.ud023} onClick={() => {SetEdit(true);setProPic(false);}}>Edit Profile</div>
                        
//                         {proPic && (
//                             <div className={user.ud024}>
//                                 <img className={user.ud0241} src={profilePic} alt=""/>
//                                 <div className={user.ud0242}>
//                                     <p className={user.ud02421}>Lorem Some text</p>
//                                     <input type="file" ref={fileInput} style={{display: 'none'}} accept="image/jpg, image/jpeg, image/png" id="file" onChange={e => uploadProfilePic(e)} />
//                                     <label className={user.ud02422} htmlFor="file">Upload your image</label>
//                                 </div>
//                             </div>
//                         )}

//                         {edit && (
//                             <div className={user.ud025}>
                                
//                                 <div className={user.ud0251}>Name</div>
//                                 <input className={user.ud0254} type="text" />

//                                 <div className={user.ud0251}>Location</div>
//                                 <input className={user.ud0254} type="text" />

//                                 <div className={user.ud0251}>About</div>
//                                 <textarea className={user.ud0252} />

//                                 <div className={user.ud0253}>
//                                     <div className={user.ud0255} onClick={() => SetEdit(false)}>Cancel</div>
//                                     <div className={user.ud0256} onClick={() => SetEdit(false)}>Save</div>
//                                 </div>
//                             </div>
//                         )}

//                         <div className={user.ud026}>
//                             * 0 reviews
//                         </div>
//                         <div className={user.ud027}>
//                             Reviews List
//                         </div>

//                     </div>
//                 </div>

//             </div>

//             <div className={styles.mobile}>
                
//                 <div className={styles.headerMob0}>
//                     <img className={styles.headerMob0img} style={{marginTop: "22px"}} src={backBtnIcon} alt="" onClick={() => history.goBack()} height="20px" /> 
//                     <div className={styles.headerMob01}>Hosting</div>
//                     <div className={styles.headerMob02} onClick={() => history.push("/HostYourApartment")} ><img src={addButton} className={styles.headerMob02img} alt="" /></div>
//                 </div>

//                 {/* body */}
//                 <div className={user.ud0}>
                    
//                     <div className={user.um1}>
//                         <div className={user.um11}>
//                             <div className={user.um111}>Hi, I'm {userName}</div>
//                             <div className={user.ud022}>Joined in 2021</div>
//                         </div>
//                         <div className={user.um12}>
//                             <img src={userIcon} alt="" />
//                         </div>
//                         <div className={user.um13}>
//                             <div className={user.ud0255} onClick={() => {SetEditMob(false);setProPicMob(true)}}>Edit profile</div>
//                             <div className={user.um131} onClick={() => {SetEditMob(true);setProPicMob(false)}}>Update photo</div>
//                         </div>
//                     </div>
                    
//                     {proPicMob && (
//                         <div className={user.ud024}>
//                             <div className={user.ud0242}>
//                                 <p className={user.ud02421}>Lorem Some text</p>
//                                 <div className={user.ud02422} onClick={() => {setProPicMob(false)}}>Upload new image</div>
//                             </div>
//                         </div>
//                     )}

//                     {editMob && (
//                         <div className={user.ud025}>
//                             <div className={user.ud0251}>About</div>
//                             <textarea className={user.ud0252} />

//                             <div className={user.ud0251}>Location</div>
//                             <input className={user.ud0254} type="text" />

//                             <div className={user.ud0251}>Work</div>
//                             <input className={user.ud0254} type="text" />

//                             <div className={user.ud0253}>
//                                 <div className={user.ud0255} onClick={() => {SetEditMob(false)}}>Cancel</div>
//                                 <div className={user.ud0256} onClick={() => {SetEditMob(false)}}>Save</div>
//                             </div>
//                         </div>
//                     )}

//                     <div>
//                         <div className={user.ud012}>
//                             <img className={user.ud0121} src={userIcon} alt="" />
//                             <div className={user.ud0122}>Identity verification</div>
//                             <div className={user.ud0123}>some Text</div>
//                             <div className={user.ud0124}>Get the badge</div>
//                         </div>
//                         <div className={user.ud013}>
//                             <div className={user.ud0131}>Krishan kant Confirmed</div>
//                             <div className={user.ud0132}>
//                                 <img className={user.ud01321} src={userIcon} alt="" />
//                                 <div className={user.ud01322}>Email Address</div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>


//             </div>


//             {/* end mobile view */}
//             {sideBar && (
//                 <div className={headerStyle.headSideBar} onMouseEnter={() => setSideBar(true)} onMouseLeave={() => setSideBar(false)}>
//                         <div className={headerStyle.headSideBar011S0}>
//                             <div className={headerStyle.headSideBar011S01}><img src={JSON.parse(localStorage.getItem("token")).userProfile} alt="" /></div>
//                             <div className={headerStyle.headSideBar011S02}>{userName} 
//                                 <div className={headerStyle.headSideBar011S021}>{JSON.parse(localStorage.getItem("token")).userEmail}</div>
//                             </div>
//                         </div>
//                         <p onClick={() => history.push('/')}>Home</p>
//                         <p onClick={() => history.push('/hosting')}>Listing</p>
//                         <p onClick={() => history.push('/notify')}>Notification</p>
//                         <p onClick={() => history.push('/chats')}>Messages</p>
//                         <p onClick={() => history.push('/Saved')}>Saved</p>
//                         <p onClick={() => history.push('/Trips')}>Trips</p>
//                         <p onClick={() => history.push('/hostCars')}>Host your cars</p>
//                         <p onClick={() => history.push('/HostYourApartment')}>Host your apartment</p>
//                         <p onClick={signOutSubmit}>Signout</p>
//                 </div>
//             )}
        
        
//         </>

//     );
// }




// ...............................................................................................

import adminPro from "../img/demo/24.png";
import "../css/Profile.css"
import profile from "../img/icons/profile.png";
import Verification from "../img/icons/user-verification.svg";
import setting from "../img/icons/settingsIcon.svg";
import Right from "../img/icons/right.png";
import Check from "../img/icons/check.png";
import Image from "../img/icons/image.png";
import loading from '../img/icons/loadingHostingList.gif';

import ds from '../css/Dashboard.module.css';
import swal from 'sweetalert';

export default function UserProfile() {

    const [mainLoad, setmainLoad] = useState(false);
    let history = useHistory();
    const [docStatus, setDocStatus] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history.push('/');
        } else {
            setmainLoad(true);
            getUserInfo();
            checkGov();
        }
    }, []);

    const checkGov = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch(`${url.baseUrl}isDocVerified/`+JSON.parse(localStorage.getItem("token")).userId, requestOptions)
        .then(response => response.json())
        .then(res => {
            console.log(res);
            console.log(res.data[0].isDocVerified);
            if (res.data[0].isDocVerified === 0) {
                setDocStatus(res.data[0].isDocVerified);
            } else if (res.data[0].isDocVerified === 1) {
                setDocStatus(res.data[0].isDocVerified);
            } else if (res.data[0].isDocVerified === 2) {
                swal("Your profile is pending verification", "Please wait while Your profile is verify !!!", "error");
                
            } else if (res.data[0].isDocVerified === 4) {
                swal("Your profile is rejected", "Please contact with our support !!!", "error");
                
            }
            setmainLoad(false);
        })
        .catch(error => console.log('error', error));
    }

    const [about, setAbout] = useState({
        about: '',
        work: '',
        location: ''
    });
    const [userInfo, setUserInfo] = useState(null);
    const getUserInfo = () => {
        fetch(url.baseUrl+"user?userId="+JSON.parse(localStorage.getItem("token")).userId, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setUserInfo(res.data);
            setAbout({
                about: res.data.about,
                work: res.data.work,
                location: res.data.location
            })
        })
        .catch(error => console.log(error));
    }

     // image government id
     const [imageGovList, setImageGovList] = useState(null);
     const [selectedGovImage, setSelectedGovImage] = useState(null);
     const uploadGovImageHandler = e => {
 
         var formdata = new FormData();
         formdata.append("file", e.target.files[0], e.target.files[0].name)
 
         var requestOptions = {
             method: 'POST',
             body: formdata,
             redirect: 'follow'
         };
 
         fetch(`${url.baseUrl}/upload`, requestOptions)
         .then(response => response.json())
         .then(result => {
             console.log(result.Data[0].Location);
             setImageGovList(result.Data[0].Location);
             updateGov(result.Data[0].Location);
         })
         .catch(error => console.log('error', error));
     
         if (e.target.files[0]) {
             setSelectedGovImage(URL.createObjectURL(e.target.files[0]))
             Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
         }
    }
    
    const updateGov = val => {

        var requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                govt_id: val,
                userId: JSON.parse(localStorage.getItem("token")).userId,
            }),
            redirect: 'follow'
        };

        fetch(`${url.baseUrl}updateGovtId`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("user id");
            console.log(result);
            if (result.code === 200) {
                swal("Good job!", "You are successfully Upload your government ID !!!", "success");
                checkGov();
            }
        })
        .catch(error => console.log('error', error));
    }

    const [tab1, setTab1] = useState(true);
    const [tab2, setTab2] = useState(false);
    const [tab3, setTab3] = useState(false);
    const [sideBar, setSideBar] = useState(false);
    const [userName, setUserName] = useState(null);
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
// // desktop
// const [edit, SetEdit] = useState(false);
// const [proPic, setProPic] = useState(false);
// // mobile
// const [editMob, SetEditMob] = useState(false);
// const [proPicMob, setProPicMob] = useState(false);
const [progress, setProgress] = useState(false);
const fileInput = useRef(null);
const uploadProfilePic = e => {
    e.preventDefault();
    setProgress(true);
    
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
    fetch(url.baseUrl+"updateProfilePic", requestOptions)
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
            setProgress(false);
    })
    .catch(error => console.log('error', error));
}


    const signOutSubmit = () => {
                localStorage.removeItem("token");
                history.push("/");
            }

    const [resetVar, setResetVar] = useState({
        oldpass: '',
        newpass: ''
    });

    useEffect(() => console.log(resetVar), [resetVar]);

    const resetSubmission = () => {
        if (resetVar.oldpass === "") {
            swal("Enter Fields", "Must enter old password first!!", "info");
        } else if (resetVar.newpass === "") {
            swal("Enter Fields", "Must enter new password first!!", "info");
        } else {
            
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "old_password": resetVar.oldpass,
                "new_password": resetVar.newpass,
                "userId": JSON.parse(localStorage.getItem("token")).userId
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("http://13.233.154.141:5000/api/changePassword", requestOptions)
            .then(response => response.json())
            .then(result => {

                if (result.code === 200) {
                    swal("Success", "Your password successfully changed !!!", "success");
                } else {
                    swal("Something wrong", "Must enter correct information!!", "error");
                }
            })
            .catch(error => console.log('error', error));

        }
    }

    // work, location, about
    
    useEffect(() => {
        console.log(about);
    }, [about])
    const aboutSubmit = () => {
        if (about.about === '') {
            swal("Enter Fields", "Must enter old password first!!", "info");
        } else if (about.work === '') {
            swal("Enter Fields", "Must enter old password first!!", "info");
        } else if (about.location === '') {
            swal("Enter Fields", "Must enter old password first!!", "info");
        } else {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "work": about.work,
                "about": about.about,
                "location": about.location,
                "userId": JSON.parse(localStorage.getItem("token")).userId
            });
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            fetch(url.baseUrl+"updateProfile", requestOptions)
            .then(response => response.json())
            .then(() => {
                swal("Updated", "Your successfully updated !!!", "success");
            })
            .catch(error => console.log('error', error));

        }
    }



    if (!userInfo) {
        return (<div>j</div>)
    } else {
        return (
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
                  
                  
                  </div>
                   
    
                <div style={{ width: "100%", height: "100%" }}>
    
    
                    <div className="Profile">
    
    
                        <div className="p1" onClick={() => { setTab1(true); setTab2(false); setTab3(false) }}>
                            <div className="profile_pic">
                                <img className="img" src={profile} alt="" />
                            </div>
                            <p style={{ marginRight: "89px",  color: "dimgray" }}> Profile</p></div>
                        <div className="p2" onClick={() => { setTab2(true); setTab1(false); setTab3(false) }} >
                            <div className="profile_pic">
                                <img className="img" src={Verification} alt="" />
                            </div>
                            <p style={{ marginRight:'28px',color: "dimgray"}}>  Verifications </p> </div>
                        <div className="p3" onClick={() => { setTab2(false); setTab1(false); setTab3(true) }}>
                            <div className="profile_pic">
                                <img className="img" src={setting} alt="" />
                            </div>
                            <p style={{ marginRight: "70px",color: "dimgray" }}> Settings</p> </div>
    
                    </div>
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
            
                    {tab1 && (
    
                        <div className="div_0" style={{paddingTop: '30px'}}>
                            <h1 className="p5"> Profile</h1>
                            <div className="p4">
                                <img src={profilePic} alt="" /> </div>
                            <div style={{ marginLeft: "38%", marginTop: "-22px" }}>
                                <label htmlFor="file">
                                    <img style={{ width: '30px', height: '20px', borderRadius: "20px" }} src={Image} alt="" />
                                </label>
                                
                                {progress && (<span style={{fontSize: '10px'}}>Uploading profile pic, Please wait</span>)}
                            </div>
    
    
                            <p className="p6">{userName}</p>
                            
    
                                <input type="file" ref={fileInput} style={{display: 'none'}} accept="image/jpg, image/jpeg, image/png" id="file" onChange={e => uploadProfilePic(e)} />
                                {/* <label className="p9-1" style={{backgroundColor: 'grey', color: 'white'}} htmlFor="file">Update profile pic</label> */}
    
                            {/* <button className="p9-1">Upload</button> */}
                            
                            <div className="p8">
                                <textarea placeholder="About yourself" className="p7" value={about.about} onChange={e => setAbout({...about, about: e.target.value})}></textarea>
                            </div>
                            <div className="p8">
                                <input className="p8_1" type="text" placeholder="Your Location" value={about.location} onChange={e => setAbout({...about, location: e.target.value})} />
                            </div>
                            <div className="p8">
                            <input className="p8_2" type="Email " placeholder="Your Email Address" value={about.work} onChange={e => setAbout({...about, work: e.target.value})} />
                            </div> <button className="p9" onClick={aboutSubmit}>Save</button>
                            <hr className="hr" />
                            <h1 className="Review"> Reviews</h1>
    
                            <div className="Reviews0">
                                <div className="Reviews01">
                                    <div className="p4_1">
                                        <img src={adminPro} alt="" />
                                    </div>
                                </div>
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
                        <div className="div_1" style={{paddingTop: '30px'}}>
                            <div className="div_02">
                                <h1 className="p5"> Verifications  </h1>
                                <p className="p6_1">{JSON.parse(localStorage.getItem("token")).userEmail}</p>
                                <div className="Icons0">
                                    <img style={{ width: '20px', height: '20px' }} src={Right} alt="" />
                                </div>
                                {userInfo.phone && (
                                    <p className="p6_1">{userInfo.phone}</p>
                                )}
                                <div className="Icons0">
                                    <img style={{ width: '20px', height: '20px' }} src={Right} alt="" />
                                </div>
    
                                {docStatus === 0 && (
                                    <>
                                    
                                        <h3 className="p6_3">Government ID</h3><br/>
                                        <label htmlFor="gov" className="p9-1" style={{backgroundColor: 'lightgrey', marginBottom: '100px'}}><span style={{backgroundColor: 'lightgrey', marginTop: '100px'}}>Upload</span></label>
                                        <input type="file" id="gov" accept="image/jpg, image/jpeg, image/png" onChange={e => uploadGovImageHandler(e)} style={{display: "none"}} />
    
                                        {selectedGovImage && (
                                            <div className="uploadedImageCont" style={{marginLeft: '400px'}}>
                                                <div className="uploadedImage"><img src={selectedGovImage} alt="" /></div>
                                            </div>
                                        )}
                                    
                                    </>
                                )}

                                {docStatus === 1 && (
                                    <p className="p6_1">Your Government Id is verified</p>
                                )}

                                {docStatus === 2 && (
                                    <p className="p6_1">Your Government Id is pending for verification</p>
                                )}

                                {docStatus === 3 && (
                                    <p className="p6_1">Your Government Id is Rejected !!</p>
                                )}
    
                                {/* <h3 className="p6_3">Government ID</h3>
                                <label><button className="p9-1">Upload</button></label>  */}
                                </div>
                        </div>
                    )}
    
                    {tab3 && (
                        <div className="div_0" style={{paddingTop: '30px'}}>
                            <div className="p10">
                                <h1 className="p5"> Settings </h1>
                                <div>
                                <div className="p8">
                                    <input className="p8_1" type="password" placeholder="Enter old password" value={resetVar.oldpass} onChange={e => setResetVar({...resetVar, oldpass: e.target.value})} />
                                    <input className="p8_1" type="password" placeholder="Enter new password" value={resetVar.newpass} onChange={e => setResetVar({...resetVar, newpass: e.target.value})} style={{marginTop: '15px', marginBottom: '10px'}} />
                                    
                                </div>
                                    <button className="p9_1" onClick={() => resetSubmission()}>Reset Password</button>
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

    
}

