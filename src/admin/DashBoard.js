import React, { useState } from 'react';
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

export default function DashBoard() {

    const [sidePro, setSidePro] = useState(false);

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

                <Tabs>
                    <TabList>
                        <Tab>Apartment hosting</Tab>
                        <Tab>Car hosting</Tab>
                        <Tab>Inbox</Tab>
                        <Tab>Reservations</Tab>
                    </TabList>

                    <TabPanel>
                        <div className={ds.d2}>
                            {/* <div className={ds.d20}>New Apartment Owners</div> */}

                            {/* table */}
                            <table className={ds.d20t}>
                                <tr className={ds.d20th}>
                                    <th className={ds.d20th1}>No</th>
                                    <th className={ds.d20th2}>Apartment owner's</th>
                                    <th className={ds.d20th3}>Registration date</th>
                                    <th className={ds.d20th4}>No. of Reservation's</th>
                                    <th className={ds.d20th5}>City</th>
                                    <th className={ds.d20th6}>Country</th>
                                    <th className={ds.d20th7}>Status</th>
                                </tr>

                                <tr className={ds.d20tr} onClick={() => setSidePro(true)}>
                                    <td className={ds.d20td1}>1</td>
                                    <td className={ds.d20td2}>
                                        <div className={ds.d20td2Img}><img src={adminPro} alt="" /></div>
                                        <span>Nicholas Warren</span>
                                    </td>
                                    <td className={ds.d20td3}>23-01-2021</td>
                                    <td className={ds.d20td4}>12</td>
                                    <td className={ds.d20td5}>Indore</td>
                                    <td className={ds.d20td6}>India</td>
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
                                    <th className={ds.d20th4}>No. of Reservation's</th>
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
                                    <td className={ds.d20td4}>2</td>
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
        
        </>
    );
}