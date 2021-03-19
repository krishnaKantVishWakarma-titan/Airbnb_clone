/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '../css/components.css';
// mobile
import backIconGrey from '../img/icons/backGrey.svg';
import fav from '../img/icons/fav.svg';
import headerStyle from '../css/headerMain.module.css';
import closeBtn from '../img/icons/close.png';
import rightArrowIcon from '../img/icons/headerMinBack.png';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import b from '../css/booking.module.css';
import clockSmall from '../img/icons/clock.svg';
import ratingIcon from '../img/icons/star.svg';
import img0 from '../img/demo/10.png';
import StripeCheckout from 'react-stripe-checkout';
import PublishableKey from '../data/api_keys.json';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import loading from '../img/icons/loading.gif';
import url from '../data/urls.json';

export default function Booking () {
    const {startDate, endDate, noOfAdult, noOfChildren, noOfInfant, hostingId} = useLocation().state;
    const history = useHistory();
    // const [sideBar, setSideBar] = useState(false);
    const [places, setPlaces] = useState(null);
    const [langView, SetLAngView] = useState(false);
    const [noOfGuestView, setNoOfGuestView] = useState('');
    // run only once
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history.push("/");
        } else {
            fetch(url.baseUrl+"host/"+hostingId, {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => {
                console.log(res.data);
                setPlaces(res.data);
            })
            .catch(error => console.log(error));

            let t1 = "";
            let t2 = "";
            let t3 = "";
            if (noOfAdult > 0) {
                if (noOfChildren === 0 && noOfInfant === 0) {
                    if (noOfAdult === 1) {
                        t1 = "Adult " + noOfAdult;
                    } else {
                        t1 = "Adults " + noOfAdult;
                    }
                } else {
                    if (noOfAdult === 1) {
                        t1 = "Adult " + noOfAdult + " . ";
                    } else {
                        t1 = "Adults " + noOfAdult + " . ";
                    }
                }
            }
            if (noOfChildren > 0) {
                if (noOfInfant === 0) {
                    if (noOfChildren === 1) {
                        t2 = "Children " + noOfChildren;
                    } else {
                        t2 = "Childrens " + noOfChildren;
                    }
                } else {
                    if (noOfChildren === 1) {
                        t2 = "Children " + noOfChildren + " . ";
                    } else {
                        t2 = "Childrens " + noOfChildren + " . ";
                    }
                }
            }
            if (noOfInfant > 0) {
                if (noOfInfant === 1) {
                    t3 = "Infant " + noOfInfant;
                } else {
                    t3 = "Infants " + noOfInfant;
                }
            }
            console.log(t1+t2+t3);
            setNoOfGuestView(t1+t2+t3)
        }
    }, []);

    // const signOutSubmit = () => {
    //     localStorage.removeItem("token");
    //     history.push('/');
    // }
    const onToken = token => {
        console.log(token);

        fetch(url.baseUrl + "bookProperty", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "propertyId": hostingId,
                "userId": JSON.parse(localStorage.getItem("token")).userId,
                "fromDate": startDate,
                "toDate": endDate,
                "guests": noOfAdult + noOfChildren + noOfInfant,
                "amountPaid": places.basePrice * Math.round(Math.abs((new Date(startDate) - new Date(endDate)) / 8.64e7)) + 1.14,
                "currencyType": "₹",
                "paymentMethod": "Stripe",
                "transactionId": token.id,
                "transactionType": token.type,
                "transactionEmail": token.email,
                "cardLastNumbers": token.card.last4,
                "cardId": token.card.id,
                "cardBrand": token.card.brand,
                "cardExpMonth": token.card.exp_month,
                "cardExpYear": token.card.exp_year
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.code === 200) {
                history.push("/hosting");
            }
        })
        .catch(err => console.log(err))
    }

    if (!places) {
        return (<div style={{display: "flex", alignContent: "center", justifyContent: "center"}}><img style={{marginTop: "20%", width: "100px"}} src={loading} alt="" /></div>)
    } else {
        return (
            <>
            
                <div className="desktop">
                    <div className={headerStyle.headBody1}>
                        <div className={headerStyle.headUpNavMain}>
                            <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt=""/></div>
                            
                        </div>
                    </div>

                    {/* body */}
                    <div className={b.b0}>
                        <div className={b.b1}>

                            <div className={b.b11}>Confirm and pay</div>
                            <div className={b.b12}>Your trip</div>

                            <div className={b.b13}>
                                <div className={b.b131}>Dates</div>
                                <div className={b.b132}>{new Date(startDate).getDate()}/{new Date(startDate).getMonth()}/{new Date(startDate).getFullYear()} - {new Date(endDate).getDate()}/{new Date(endDate).getMonth()}/{new Date(endDate).getFullYear()}</div>
                                <div className={b.b133}><img src={clockSmall} width="13px" style={{paddingTop: '4.5px', float: 'left', paddingRight: '5px'}} alt="" /> Check-in : After {new Date('1970-01-01T' + places.arriveAfter + 'Z').toLocaleTimeString({},{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</div>
                            </div>
                            <div className={b.b13}>
                                <div className={b.b131}>Guests</div>
                                <div className={b.b132}>{noOfGuestView}</div>
                            </div>

                            <div className={b.b14}>Required for your trip</div>
                            <div className={b.b141}>
                                <div className={b.b1411}>Message the host</div>
                                <button>Add</button>
                            </div>

                            <div className={b.b14}>Cancellation Policy</div>
                            <div className={b.b17}>
                                <div className={b.b171}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</div>
                                <div className={b.b164}>Learn more</div>
                            </div>

                            <StripeCheckout 
                                token={onToken}
                                stripeKey={PublishableKey.stripe_publisable_key}
                                name={places.listingTitle}
                                image={places.imageList[0]}
                                email={JSON.parse(localStorage.getItem("token")).userEmail}
                                amount={(places.basePrice * Math.round(Math.abs((new Date(startDate) - new Date(endDate)) / 8.64e7)) + 1.14) * 100}
                            >
                                <button className={b.b18}>Confirm and pay</button>
                            </StripeCheckout>
                            
                        </div>

                        <div className={b.b2}>
                            <div className={b.b2E}>
                                <div className={b.b21}>
                                    <div className={b.b22}><img src={places.imageList[0]} alt="" /></div>
                                    <div className={b.b23}>
                                        <div className={b.b231}>{places.whatGuestBook} in {places.typeOfPropert} in {places.addrCity}</div>
                                        <div className={b.b232}>{places.listingTitle}</div>
                                        <div className={b.b233}>{places.noOfBed} bed . {places.baths} bath</div>
                                        <div className={b.b234}>
                                            <img src={ratingIcon} alt="" width="15px" style={{paddingTop: '2.5px', float: 'left', paddingRight: '5px'}} />
                                            5.1 (20)
                                        </div>
                                    </div>
                                </div>
                                <div className={b.b22x}>
                                    <div className={b.b22x1}>Price details</div>
                                    <div className={b.b22x2}>
                                        <div className={b.b22x21}>$ {places.basePrice} x {Math.round(Math.abs((new Date(startDate) - new Date(endDate)) / 8.64e7))} night</div>
                                        <div className={b.b22x22}>$ {places.basePrice * Math.round(Math.abs((new Date(startDate) - new Date(endDate)) / 8.64e7))}</div>
                                    </div>
                                    <div className={b.b22x2}>
                                        <div className={b.b22x23}>Service fee</div>
                                        <div className={b.b22x22}>$ 1.14</div>
                                    </div>
                                    <div className={b.b22x2}>
                                        <div className={b.b22x24}>Total (USD)</div>
                                        <div className={b.b22x22}>$ {places.basePrice * Math.round(Math.abs((new Date(startDate) - new Date(endDate)) / 8.64e7)) + 1.14}</div>
                                    </div>
                                </div>
                                <div className={b.b23x}>
                                    <div className={b.b23x1}>Free cancellation until 12:00 PM on 25 Apr</div>
                                    <div className={b.b23x2}>After that, cancel before 12:00 PM on 26 Apr and get a full refund, minus the first night and service fee.</div>
                                    <div className={b.b164}>Learn more</div>
                                </div>
                            </div>
                        </div>
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
                        <div className={b.b2E}>
                            <div className={b.b21}>
                                <div className={b.b22}><img src={img0} alt="" /></div>
                                <div className={b.b23}>
                                    <div className={b.b231}>Room in  hotel in bhopal</div>
                                    <div className={b.b232}>Title</div>
                                    <div className={b.b233}>1 bed . 1 bath</div>
                                    <div className={b.b234}>
                                        <img src={ratingIcon} alt="" width="15px" style={{paddingTop: '2.5px', float: 'left', paddingRight: '5px'}} />
                                        5.1 (20)
                                    </div>
                                </div>
                            </div>
                            <div className={b.b22x}>
                                <div className={b.b22x1}>Price details</div>
                                <div className={b.b22x2}>
                                    <div className={b.b22x21}>$ 8.09 x 1 night</div>
                                    <div className={b.b22x22}>$ 8.09</div>
                                </div>
                                <div className={b.b22x2}>
                                    <div className={b.b22x23}>Service fee</div>
                                    <div className={b.b22x22}>$ 1.14</div>
                                </div>
                                <div className={b.b22x2}>
                                    <div className={b.b22x24}>Total (USD)</div>
                                    <div className={b.b22x22}>$ 8.09</div>
                                </div>
                            </div>
                            <div className={b.b23x}>
                                <div className={b.b23x1}>Free cancellation until 12:00 PM on 25 Apr</div>
                                <div className={b.b23x2}>After that, cancel before 12:00 PM on 26 Apr and get a full refund, minus the first night and service fee.</div>
                                <div className={b.b164}>Learn more</div>
                            </div>
                        </div>

                        <div className={b.b1}>

                            <div className={b.b11}>Confirm and pay</div>
                            <div className={b.b12}>Your trip</div>

                            <div className={b.b13}>
                                <div className={b.b131}>Dates</div>
                                <div className={b.b132}>26 Mar, 2021 - 20 April, 2021</div>
                                <div className={b.b133}><img src={clockSmall} width="13px" style={{paddingTop: '4.5px', float: 'left', paddingRight: '5px'}} alt="" /> Check-in : After 1:00 PM</div>
                            </div>
                            <div className={b.b13}>
                                <div className={b.b131}>Guests</div>
                                <div className={b.b132}>1 guests</div>
                            </div>
                            
                            <div className={b.b14}>Choose how to pay</div>
                            <div className={b.b15}>
                                <div className={b.b151}>
                                    <div className={b.b1511}>
                                        <div className={b.b15111}>Pay in full</div>
                                        <div className={b.b15112}>Rs. 212 <input type="radio" /></div>
                                    </div>
                                    <div className={b.b1512}>Pay the total now and you're all set.</div>
                                </div>
                                <div className={b.b151}>
                                    <div className={b.b1511}>
                                        <div className={b.b15111}>Pay part now, part later</div>
                                        <div className={b.b15112}>Rs. 212 <input type="radio" /></div>
                                    </div>
                                    <div className={b.b1512}>Pay £70.63 now, and the rest (£70.63) will be automatically charged to the same payment method on 8 Mar 2021. No extra fees.</div>
                                </div>
                            </div>
                            
                            <div className={b.b14}>Pay with</div>
                            <div className={b.b16}>
                                
                                {/* inputs */}
                                <select className={b.b161}>
                                    <option>cards</option>
                                </select>

                                <div className={b.b162}>
                                    <div className={b.b1621}><input type="number" placeholder="Card number" /></div>
                                    <div className={b.b1622}>
                                        <div className={b.b16221}><input type="date" /></div>
                                        <div className={b.b16221}><input type="number" placeholder="CVV" /></div>
                                    </div>
                                </div>

                                <div className={b.b163}><input type="text" placeholder="Post code" /></div>

                                <select className={b.b161}>
                                    <option>Country region</option>
                                </select>

                                <div className={b.b164}>Enter a coupon</div>

                            </div>

                            <div className={b.b14}>Required for your trip</div>
                            <div className={b.b141}>
                                <div className={b.b1411}>Message the host</div>
                                <button>Add</button>
                            </div>

                            <div className={b.b14}>Cancellation Policy</div>
                            <div className={b.b17}>
                                <div className={b.b171}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</div>
                                <div className={b.b164}>Learn more</div>
                            </div>

                            <button className={b.b18}>Confirm and pay</button>
                        </div>
                    </div>
                </div>
                            
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
            
            </>
        );
    }
}