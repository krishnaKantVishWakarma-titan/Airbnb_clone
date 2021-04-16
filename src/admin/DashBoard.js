import React, { useState, useEffect } from 'react';
import ds from '../css/Dashboard.module.css';

// import search from '../img/icons/searchGrey.svg';
import message from '../img/icons/messageGrey.svg';
import notification from '../img/icons/bellGrey.svg';
import adminPro from '../img/demo/24.png';
import callGrey from '../img/icons/callGrey.svg';
import pinGrey from '../img/icons/pinGrey.svg';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../css/adminTab.css';
import loading from '../img/icons/loadingHostingList.gif';
import url from '../data/urls.json';
import swal from 'sweetalert';
// import moreIcon from '../img/icons/more.svg';
// import styles from '../css/profile.module.css';

export default function DashBoard() {

    const [mainLoad, setmainLoad] = useState(false);
    const [sidePro, setSidePro] = useState(false);
    // apartment listing
    
    const [sideUserPro, setSideUsertPro] = useState(false);
    const [userSide, setUserSide] = useState({
        userProf: '',
        userName: '',
        userAddr: '',
        userEmail: '',
        userCity: '',
        arriveAfter: '',
        arriveBefore: '',
        isDocVerified: "",
        userId: ''
    });
    const userSideBarHandle = (id) => {
        setmainLoad(true);
        fetch(url.baseUrl+"user?userId="+id, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log("user info")
            console.log(res.data)
            setUserSide({...apartSide, 
                userProf: res.data.profile_pic,
                userName: res.data.name,
                userEmail: res.data.email,
                isDocVerified: res.data.isDocVerified,
                userId: id
            });
            setSideUsertPro(true);
            setmainLoad(false);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        activateUsersList()
    }, []);
    const [users, setUsers] = useState(null);
    const activateUsersList = () => {
        fetch(url.baseUrl+"getAllUsers", {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data);
            setUsers(res.data);
        })
        .catch(error => console.log(error));
    }
    
    const [sideApartPro, setSideApartPro] = useState(false);
    const [apartSide, setApartSide] = useState({
        userProf: '',
        userName: '',
        userAddr: '',
        userEmail: '',
        userCity: '',
        arriveAfter: '',
        arriveBefore: ''
    });
    const apartSideBarHandle = (id, country, city, state, street, houseNo, after, before) => {
        setmainLoad(true);
        fetch("https://taz2ic52bc.execute-api.ap-south-1.amazonaws.com/production/api/user?userId="+id, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log("user info")
            console.log(res.data)
            setApartSide({...apartSide, 
                userProf: res.data.profile_pic,
                userName: res.data.name,
                userEmail: res.data.email,
                userAddr: `${houseNo}, ${street}, ${city}`,
                userCity: city,
                arriveAfter: after,
                arriveBefore: before
            });
            setSideApartPro(true);
            setmainLoad(false);
        })
        .catch(error => console.log(error));
    }

    // car listing
    const [sideCarPro, setSideCarListPro] = useState(false);
    const [carSide, setCarSide] = useState({
        userProf: '',
        userName: '',
        userAddr: '',
        userEmail: '',
        userCity: '',
        arriveAfter: '',
        arriveBefore: '',
        model: ''
    });
    const carSideBarHandle = (id, country, city, state, street, mint, maxt, model) => {
        setmainLoad(true);
        fetch("https://taz2ic52bc.execute-api.ap-south-1.amazonaws.com/production/api/user?userId="+id, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log("user info")
            console.log(res.data)
            setCarSide({...carSide, 
                userProf: res.data.profile_pic,
                userName: res.data.name,
                userEmail: res.data.email,
                userAddr: `${street}, ${city}, ${state}`,
                userCity: city,
                arriveAfter: mint,
                arriveBefore: maxt,
                model: model
            });
            setSideCarListPro(true);
            setmainLoad(false);
        })
        .catch(error => console.log(error));
    }

    



    const [hosting, setHosting] = useState(null);
    const activateListing = () => {
        fetch(url.baseUrl+"host", {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data);
            setHosting(res.data);
        })
        .catch(error => console.log(error));
    }
    const [carhosting, setCarHosting] = useState(null);
    const activateCarListing = () => {
        fetch(url.baseUrl+"carHost/", {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.data);
            setCarHosting(res.data);
        })
        .catch(error => console.log(error));
    }

    const changeDocType = (e, id) => {
        setmainLoad(true);
        console.log(e.target.value)
        console.log(typeof e.target.value)
        fetch(url.baseUrl+"changeHostDocStatus", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: id,
                status: parseInt(e.target.value)
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log('updated')
            console.log(res);
            if (res.code === 200) {
                swal("Well done!", "Document status updated successfully!!", 'success');
                // activateUsersList();
                setTimeout(() => activateUsersList(), 3000);
                setSideUsertPro(false);
                setmainLoad(false);
            }
        })
        .catch(error => console.log(error));
    }

    return(
        <>
        
            {/* header */}
            <div className={ds.d0}>
                <span>Dashboard</span>
                <div className={ds.d01}>
                    {/* <div className={ds.d011}>
                        <img src={search} alt="" />
                    </div> */}
                    <div className={ds.d011}>
                        <img src={message} alt="" />
                    </div>
                    <div className={ds.d011}>
                        <img src={notification} alt="" />
                    </div>
                    <div className={ds.d012}>
                        <img src={adminPro} alt="" />
                        <div>Admin</div>
                    </div>

                </div>
            </div>

            {/* body */}
            <div className={ds.d1}>

                {/* <div className={ds.dd1}>

                    <div className={ds.dd11}>
                        <div className={ds.dd121}>Total User</div>
                        <div className={ds.dd122}>$ 250,00.00</div>
                    </div>
                    <div className={ds.dd12}>
                        <div className={ds.dd111}>Total Apartments</div>
                        <div className={ds.dd112}>$ 250,00.00</div>
                    </div>
                    <div className={ds.dd12}>
                        <div className={ds.dd111}>Total Apartment Owner</div>
                        <div className={ds.dd112}>$ 250,00.00</div>
                    </div>
                    <div className={ds.dd12}>
                        <div className={ds.dd111}>Reservations</div>
                        <div className={ds.dd112}>$ 250,00.00</div>
                    </div>
                    <div className={ds.dd12}>
                        <div className={ds.dd111}>Car Owner</div>
                        <div className={ds.dd112}>$ 250,00.00</div>
                    </div>

                </div> */}

                <Tabs>
                    <TabList>
                        <Tab>All user's </Tab>
                        <Tab onClick={() => activateListing()}>Apartment hosting</Tab>
                        <Tab onClick={() => activateCarListing()}>Car hosting</Tab>
                        {/* <Tab>Inbox</Tab>
                        <Tab>Reservations</Tab> */}
                    </TabList>

                    <TabPanel>
                        <div className={ds.d2}>
                            {users ? (
                                <>
                                    <table className={ds.d20t}>
                                        <tbody>
                                            <tr className={ds.d20th}>
                                                <th className={ds.d20th1}>No</th>
                                                <th className={ds.d20th2}>Users</th>
                                                <th className={ds.d20th3}>Email</th>
                                                <th className={ds.d20th4}>Location</th>
                                                <th className={ds.d20th5}>Work</th>
                                                <th className={ds.d20th6}>About</th>
                                                <th className={ds.d20th7}>Doc status</th>
                                            </tr>
                                                    
                                            {users.map((host, key) => {return (
                                                <>
                                                    <tr className={ds.d20tr} key={key} onClick={() => userSideBarHandle(host.id)}>
                                                        <td className={ds.d20td1}>{key+1}</td>
                                                        <td className={ds.d20td2}>
                                                            <div className={ds.d20td2Img}><img src={host.profile_pic} alt="" /></div>
                                                            <span>{host.name}</span>
                                                        </td>
                                                        <td className={ds.d20td3}>{host.email}</td>
                                                        <td className={ds.d20td4}>{host.location}</td>
                                                        <td className={ds.d20td5}>{host.work}</td>
                                                        <td className={ds.d20td6}>{host.about}</td>
                                                        <td className={ds.d20td7}>
                                                            {host.isDocVerified === 0 && "Not Uploaded"}
                                                            {host.isDocVerified === 1 && "Verified"}
                                                            {host.isDocVerified === 2 && "Pending"}
                                                            {host.isDocVerified === 3 && "Rejected"}
                                                        </td>
                                                    </tr>
                                                </>
                                            )})}
                                        </tbody>
                                    </table>
                                    
                                </>
                            ) : (
                                <div style={{width: '100%',float: 'left'}}><img style={{marginLeft: '50%', transform: 'translateX(-50%)', width: 40}} src={loading} alt="" /></div>
                            )}
                        </div>

                        {sideUserPro && (
                            <>
                                <div className={ds.d4} onClick={() => setSideUsertPro(false)}></div>
                                <div className={ds.d3}>
                                    <div className={ds.d30}><img src={userSide.userProf} alt="" /></div>
                                    <div className={ds.d31}>{userSide.userName}</div>
                                    {/* <div className={ds.d32}>{userSide.userCity}</div> */}
                                    
                                    <div className={ds.d33} style={{marginTop: '10px'}}>
                                        <div className={ds.d331}>{userSide.userEmail}</div>
                                        <div className={ds.d332}><img src={message} alt="" /></div>
                                    </div>
                                    {/* <div className={ds.d33}>
                                        <div className={ds.d331}><b>{userSide.userAddr}</b></div>
                                        <div className={ds.d332}><img src={pinGrey} alt="" /></div>
                                    </div> */}
                                    {/* <div className={ds.d33} style={{marginTop: "20px"}}>
                                        <div className={ds.d331}><b>Arrival after :</b> {userSide.arriveAfter}</div><br />
                                        <div className={ds.d331}><b>Arrival before :</b> {userSide.arriveBefore}</div>
                                    </div> */}

                                    <select value={userSide.isDocVerified} onChange={e => changeDocType(e, userSide.userId)} style={{width: '90%', marginLeft: '5%', marginTop: '15px'}}>
                                        <option value="0">Not Verified</option>
                                        <option value="1">Verified</option>
                                        <option value="2">Pending for verification</option>
                                        <option value="3">Rejected</option>
                                    </select>
                                    <div className={ds.d33} style={{marginTop: "20px"}}>
                                        <div className={ds.d331}>Current Status</div>
                                    </div>
                                    <div className={ds.d341}>
                                        Remove User
                                    </div>
                                </div>
                            </>
                        )}

                    </TabPanel>

                    <TabPanel>
                        <div className={ds.d2}>
                            {hosting ? (
                                <>
                                    <table className={ds.d20t}>
                                        <tbody>
                                            <tr className={ds.d20th}>
                                                <th className={ds.d20th1}>No</th>
                                                <th className={ds.d20th2}>Apartment owner's</th>
                                                <th className={ds.d20th3}>Last Modified</th>
                                                <th className={ds.d20th4}>Bedrooms</th>
                                                <th className={ds.d20th5}>Beds</th>
                                                <th className={ds.d20th6}>Bathrooms</th>
                                                <th className={ds.d20th7}>Status</th>
                                            </tr>
                                                    
                                            {hosting.map((host, key) => {return (
                                                <>
                                                    <tr className={ds.d20tr} key={key} onClick={() => apartSideBarHandle(host.userId, host.countryName, host.addrCity, host.addrState, host.addrStreet, host.addrHouseNumber, host.arriveAfter, host.arriveBefore)}>
                                                        <td className={ds.d20td1}>{key+1}</td>
                                                        <td className={ds.d20td2}>
                                                            <div className={ds.d20td2Img}><img src={host.imageList[0]} alt="" /></div>
                                                            <span>{host.listingTitle}</span>
                                                        </td>
                                                        <td className={ds.d20td3}>23-01-2021</td>
                                                        <td className={ds.d20td4}>{host.bedrooms}</td>
                                                        <td className={ds.d20td5}>{host.noOfBed}</td>
                                                        <td className={ds.d20td6}>{host.baths}</td>
                                                        <td className={ds.d20td7}>Active</td>
                                                    </tr>
                                                </>
                                            )})}
                                        </tbody>
                                    </table>
                                    
                                </>
                            ) : (
                                <div style={{width: '100%',float: 'left'}}><img style={{marginLeft: '50%', transform: 'translateX(-50%)', width: 40}} src={loading} alt="" /></div>
                            )}
                        </div>

                        {sideApartPro && (
                            <>
                                <div className={ds.d4} onClick={() => setSideApartPro(false)}></div>
                                <div className={ds.d3}>
                                    <div className={ds.d30}><img src={apartSide.userProf} alt="" /></div>
                                    <div className={ds.d31}>{apartSide.userName}</div>
                                    <div className={ds.d32}>{apartSide.userCity}</div>
                                    <div className={ds.d33}>
                                        <div className={ds.d331}>{apartSide.userEmail}</div>
                                        <div className={ds.d332}><img src={message} alt="" /></div>
                                    </div>
                                    <div className={ds.d33}>
                                        <div className={ds.d331}><b>{apartSide.userAddr}</b></div>
                                        <div className={ds.d332}><img src={pinGrey} alt="" /></div>
                                    </div>
                                    <div className={ds.d33} style={{marginTop: "20px"}}>
                                        <div className={ds.d331}><b>Arrival after :</b> {apartSide.arriveAfter}</div><br />
                                        <div className={ds.d331}><b>Arrival before :</b> {apartSide.arriveBefore}</div>
                                    </div>
                                    <div className={ds.d33} style={{marginTop: "20px"}}>
                                        <div className={ds.d331}>Current Status</div>
                                    </div>
                                    <div className={ds.d341}>
                                        Remove User
                                    </div>
                                </div>
                            </>
                        )}

                    </TabPanel>

                    <TabPanel>
                    <div className={ds.d2}>
                            {/* <div className={ds.d20}>New Apartment Owners</div> */}


                            {carhosting ? (
                                <>

                                    {/* table */}
                                    <table className={ds.d20t}>
                                        <tr className={ds.d20th}>
                                            <th className={ds.d20th1}>No</th>
                                            <th className={ds.d20th2}>Owner Name</th>
                                            <th className={ds.d20th3}>Expiration date</th>
                                            <th className={ds.d20th4}>Minimum trip duration</th>
                                            <th className={ds.d20th5}>Maximum trip duration</th>
                                            <th className={ds.d20th6}>State License</th>
                                            <th className={ds.d20th7}>Status</th>
                                        </tr>                                            
                                        {carhosting.map((host, key) => {return (
                                            <tr className={ds.d20tr} onClick={() => carSideBarHandle(host.userId, host.country, host.cityName, host.state, host.address, host.maximumTripDuration, host.minimumTripDuration, host.modelName)}>
                                                <td className={ds.d20td1}><div style={{float: 'left', paddingTop: 8}}>{key+1}</div></td>
                                                <td className={ds.d20td2}>
                                                    <div className={ds.d20td2Img}><img src={host.carsImageArray[0]} alt="" /></div>
                                                    <span>{host.firstName} {host.middleName} {host.lastName}</span>
                                                </td>
                                                <td className={ds.d20td3}>{host.expirationDate}</td>
                                                <td className={ds.d20td4}>{host.minimumTripDuration}</td>
                                                <td className={ds.d20td5}>{host.maximumTripDuration}</td>
                                                <td className={ds.d20td6}>{host.stateLicense}</td>
                                                <td className={ds.d20td7}>Active</td>
                                            </tr>
                                        )})}
                                    </table>
                                </>
                            ) : (
                                <div style={{width: '100%',float: 'left'}}><img style={{marginLeft: '50%', transform: 'translateX(-50%)', width: 40}} src={loading} alt="" /></div>
                            )}
                        </div>

                        {sideCarPro && (
                            <>
                                <div className={ds.d4} onClick={() => setSideCarListPro(false)}></div>
                                <div className={ds.d3}>
                                    <div className={ds.d30}><img src={carSide.userProf} alt="" /></div>
                                    <div className={ds.d31}>{carSide.userName}</div>
                                    <div className={ds.d32}>{carSide.userCity}</div>
                                    <div className={ds.d32}><b>Model : </b>{carSide.model}</div>
                                    <div className={ds.d33}>
                                        <div className={ds.d331}>{carSide.userEmail}</div>
                                        <div className={ds.d332}><img src={message} alt="" /></div>
                                    </div>
                                    <div className={ds.d33}>
                                        <div className={ds.d331}><b>{carSide.userAddr}</b></div>
                                        <div className={ds.d332}><img src={pinGrey} alt="" /></div>
                                    </div>
                                    <div className={ds.d33} style={{marginTop: "20px"}}>
                                        <div className={ds.d331}><b>Arrival after :</b> {carSide.arriveAfter}</div><br />
                                        <div className={ds.d331}><b>Arrival before :</b> {carSide.arriveBefore}</div>
                                    </div>
                                    <div className={ds.d33} style={{marginTop: "20px"}}>
                                        <div className={ds.d331}>Current Status</div>
                                    </div>
                                    <div className={ds.d341}>
                                        Remove User
                                    </div>
                                </div>
                            </>
                        )}
                    </TabPanel>

                    <TabPanel>
                    <div className={ds.d2}>
                            {/* <div className={ds.d20}>New Apartment Owners</div> */}

                            {/* table */}
                            <table className={ds.d20t}>
                                <tr className={ds.d20th}>
                                    <th className={ds.d20th1}>No</th>
                                    <th className={ds.d20th2}>Sender Name</th>
                                    <th className={ds.d20th3}>Date</th>
                                    <th className={ds.d20th4}>Model</th>
                                    <th className={ds.d20th5}>Engine Number</th>
                                    <th className={ds.d20th6}>Booking Time</th>
                                    <th className={ds.d20th7}>Status</th>
                                </tr>

                                <tr className={ds.d20tr} onClick={() => setSidePro(true)}>
                                    <td className={ds.d20td1}>1</td>
                                    <td className={ds.d20td2}>
                                        <div className={ds.d20td2Img}><img src={adminPro} alt="" /></div>
                                        <span>Nicholas Warren</span>
                                    </td>
                                    <td className={ds.d20td3}>23-01-2021</td>
                                    <td className={ds.d20td4}>789456123456</td>
                                    <td className={ds.d20td5}>123456</td>
                                    <td className={ds.d20td6}>08:05 PM</td>
                                    <td className={ds.d20td7}>Active</td>
                                </tr>
                                <tr className={ds.d20tr}>
                                    <td className={ds.d20td1}>2</td>
                                    <td className={ds.d20td2}>
                                        <div className={ds.d20td2Img}><img src={adminPro} alt="" /></div>
                                        <span>Nicholas Warren</span>
                                    </td>
                                    <td className={ds.d20td3}>23-01-2021</td>
                                    <td className={ds.d20td4}>789456123456</td>
                                    <td className={ds.d20td5}>123456</td>
                                    <td className={ds.d20td6}>08:05 PM</td>
                                    <td className={ds.d20td7}>Active</td>
                                </tr>
                                <tr className={ds.d20tr}>
                                    <td className={ds.d20td1}>3</td>
                                    <td className={ds.d20td2}>
                                        <div className={ds.d20td2Img}><img src={adminPro} alt="" /></div>
                                        <span>Nicholas Warren</span>
                                    </td>
                                    <td className={ds.d20td3}>23-01-2021</td>
                                    <td className={ds.d20td4}>789456123456</td>
                                    <td className={ds.d20td5}>123456</td>
                                    <td className={ds.d20td6}>08:05 PM</td>
                                    <td className={ds.d20td7}>Active</td>
                                </tr>

                            </table>
                        </div>

                        {sidePro && (
                            <>
                                <div className={ds.d4} onClick={() => setSidePro(false)}></div>
                                <div className={ds.d3}>
                                    <div className={ds.d30}><img src={adminPro} alt="" /></div>
                                    <div className={ds.d31}>Nicholas Warren</div>
                                    <div className={ds.d32}>London</div>
                                    <div className={ds.d33}>
                                        <div className={ds.d331}>krishna@gmail.com</div>
                                        <div className={ds.d332}><img src={message} alt="" /></div>
                                    </div>
                                    <div className={ds.d33}>
                                        <div className={ds.d331}>968754624</div>
                                        <div className={ds.d332}><img src={callGrey} alt="" /></div>
                                    </div>
                                    <div className={ds.d33}>
                                        <div className={ds.d331}>Address</div>
                                        <div className={ds.d332}><img src={pinGrey} alt="" /></div>
                                    </div>
                                    <div className={ds.d33} style={{marginTop: "20px"}}>
                                        <div className={ds.d331}>Booking Times</div>
                                        <div className={ds.d333}>
                                            <span>12:55</span>
                                            <span>15:44</span>
                                        </div>
                                    </div>
                                    <div className={ds.d33}>
                                        <div className={ds.d331}>Destination</div>
                                        <div className={ds.d3321}>Destination</div>
                                    </div>
                                    <div className={ds.d34}>Track</div>
                                    <div className={ds.d33} style={{marginTop: "20px"}}>
                                        <div className={ds.d331}>Current Status</div>
                                    </div>
                                    <div className={ds.d341}>
                                        Remove User
                                    </div>
                                </div>
                            </>
                        )}
                    </TabPanel>

                    <TabPanel>
                    <div className={ds.d2}>
                            {/* <div className={ds.d20}>New Apartment Owners</div> */}

                            {/* table */}
                            <table className={ds.d20t}>
                                <tr className={ds.d20th}>
                                    <th className={ds.d20th1}>No</th>
                                    <th className={ds.d20th2}>Owner Name</th>
                                    <th className={ds.d20th3}>Registration date</th>
                                    <th className={ds.d20th4}>Model</th>
                                    <th className={ds.d20th5}>Engine Number</th>
                                    <th className={ds.d20th6}>Booking Time</th>
                                    <th className={ds.d20th7}>Status</th>
                                </tr>

                                <tr className={ds.d20tr} onClick={() => setSidePro(true)}>
                                    <td className={ds.d20td1}>1</td>
                                    <td className={ds.d20td2}>
                                        <div className={ds.d20td2Img}><img src={adminPro} alt="" /></div>
                                        <span>Nicholas Warren</span>
                                    </td>
                                    <td className={ds.d20td3}>23-01-2021</td>
                                    <td className={ds.d20td4}>789456123456</td>
                                    <td className={ds.d20td5}>123456</td>
                                    <td className={ds.d20td6}>08:05 PM</td>
                                    <td className={ds.d20td7}>Active</td>
                                </tr>
                                <tr className={ds.d20tr}>
                                    <td className={ds.d20td1}>2</td>
                                    <td className={ds.d20td2}>
                                        <div className={ds.d20td2Img}><img src={adminPro} alt="" /></div>
                                        <span>Nicholas Warren</span>
                                    </td>
                                    <td className={ds.d20td3}>23-01-2021</td>
                                    <td className={ds.d20td4}>789456123456</td>
                                    <td className={ds.d20td5}>123456</td>
                                    <td className={ds.d20td6}>08:05 PM</td>
                                    <td className={ds.d20td7}>Active</td>
                                </tr>
                                <tr className={ds.d20tr}>
                                    <td className={ds.d20td1}>3</td>
                                    <td className={ds.d20td2}>
                                        <div className={ds.d20td2Img}><img src={adminPro} alt="" /></div>
                                        <span>Nicholas Warren</span>
                                    </td>
                                    <td className={ds.d20td3}>23-01-2021</td>
                                    <td className={ds.d20td4}>789456123456</td>
                                    <td className={ds.d20td5}>123456</td>
                                    <td className={ds.d20td6}>08:05 PM</td>
                                    <td className={ds.d20td7}>Active</td>
                                </tr>

                            </table>
                        </div>

                        {sidePro && (
                            <>
                                <div className={ds.d4} onClick={() => setSidePro(false)}></div>
                                <div className={ds.d3}>
                                    <div className={ds.d30}><img src={adminPro} alt="" /></div>
                                    <div className={ds.d31}>Nicholas Warren</div>
                                    <div className={ds.d32}>London</div>
                                    <div className={ds.d33}>
                                        <div className={ds.d331}>krishna@gmail.com</div>
                                        <div className={ds.d332}><img src={message} alt="" /></div>
                                    </div>
                                    <div className={ds.d33}>
                                        <div className={ds.d331}>968754624</div>
                                        <div className={ds.d332}><img src={callGrey} alt="" /></div>
                                    </div>
                                    <div className={ds.d33}>
                                        <div className={ds.d331}>Address</div>
                                        <div className={ds.d332}><img src={pinGrey} alt="" /></div>
                                    </div>
                                    <div className={ds.d33} style={{marginTop: "20px"}}>
                                        <div className={ds.d331}>Booking Times</div>
                                        <div className={ds.d333}>
                                            <span>12:55</span>
                                            <span>15:44</span>
                                        </div>
                                    </div>
                                    <div className={ds.d33}>
                                        <div className={ds.d331}>Destination</div>
                                        <div className={ds.d3321}>Destination</div>
                                    </div>
                                    <div className={ds.d34}>Track</div>
                                    <div className={ds.d33} style={{marginTop: "20px"}}>
                                        <div className={ds.d331}>Current Status</div>
                                    </div>
                                    <div className={ds.d341}>
                                        Remove User
                                    </div>
                                </div>
                            </>
                        )}
                    </TabPanel>
                </Tabs>
                
            </div>
                            
            {mainLoad && (
                <div className={ds.mainLoad}><img className={ds.mainLoad0} src={loading} alt="" /></div>
            )}
        
        </>
    );
}