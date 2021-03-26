/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import url from '../data/urls.json';
import loading from '../img/icons/loading.gif';
import headerStyle from '../css/headerMain.module.css';
import rightArrowIcon from '../img/icons/headerMinBack.png';
import b from '../css/booking.module.css';
import clockSmall from '../img/icons/clock.svg';
import StripeCheckout from 'react-stripe-checkout';
import PublishableKey from '../data/api_keys.json';
import ratingIcon from '../img/icons/star.svg';

export default function CarBooking () {
    const {carId, sDate, eDate, sTime, eTime} = useLocation().state;
    const history = useHistory();
    const [places, setPlaces] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history.push("/");
        } else {
            fetch(url.baseUrl+"carHost/"+carId, {
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
        }
    },[]);     

    const onToken = token => {
        console.log(token);

        fetch(url.baseUrl + "bookCar", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "carId": carId,
                "userId": JSON.parse(localStorage.getItem("token")).userId,
                "fromDate": sDate,
                "toDate": eDate,
                "guests": '4',
                "amountPaid": (places.carListingPrice * Math.round(Math.abs((new Date(sDate) - new Date(eDate)) / 8.64e7)) + 1.14).toString(),
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
                                <div className={b.b132}><img src={clockSmall} width="13px" style={{paddingTop: '4.5px', float: 'left', paddingRight: '5px'}} alt="" /> {new Date(sDate).getDate()}/{new Date(sDate).getMonth()}/{new Date(sDate).getFullYear()} - {new Date(eDate).getDate()}/{new Date(eDate).getMonth()}/{new Date(eDate).getFullYear()}</div>
                                {/* <div className={b.b133}><img src={clockSmall} width="13px" style={{paddingTop: '4.5px', float: 'left', paddingRight: '5px'}} alt="" /> Check-in : After {new Date('1970-01-01T' + places.arriveAfter + 'Z').toLocaleTimeString({},{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'})}</div> */}
                            </div>
                            {/* <div className={b.b13}>
                                <div className={b.b131}>Guests</div>
                                <div className={b.b132}>k</div>
                            </div> */}

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
                                email={JSON.parse(localStorage.getItem("token")).userEmail}
                                amount={(places.carListingPrice * Math.round(Math.abs((new Date(sDate) - new Date(eDate)) / 8.64e7)) + 1.14) * 100}
                            >
                                <button className={b.b18}>Confirm and pay</button>
                            </StripeCheckout>
                            
                        </div>

                        <div className={b.b2}>
                            <div className={b.b2E}>
                                <div className={b.b21}>
                                    <div className={b.b22}><img src={places.carsImageArray[0]} alt="" /></div>
                                    <div className={b.b23}>
                                        <div className={b.b232}>{places.modelName}</div>
                                        {/* <div className={b.b233}>{places.noOfBed} bed . {places.baths} bath</div> */}
                                        <div className={b.b234}>
                                            <img src={ratingIcon} alt="" width="15px" style={{paddingTop: '2.5px', float: 'left', paddingRight: '5px'}} />
                                            5.1 (20)
                                        </div>
                                    </div>
                                </div>
                                <div className={b.b22x}>
                                    <div className={b.b22x1}>Price details</div>
                                    <div className={b.b22x2}>
                                        <div className={b.b22x21}>$ {places.carListingPrice} x {Math.round(Math.abs((new Date(sDate) - new Date(eDate)) / 8.64e7))} days</div>
                                        <div className={b.b22x22}>$ {places.carListingPrice * Math.round(Math.abs((new Date(sDate) - new Date(eDate)) / 8.64e7))}</div>
                                    </div>
                                    <div className={b.b22x2}>
                                        <div className={b.b22x23}>Service fee</div>
                                        <div className={b.b22x22}>$ 1.14</div>
                                    </div>
                                    <div className={b.b22x2}>
                                        <div className={b.b22x24}>Total (USD)</div>
                                        <div className={b.b22x22}>$ {places.carListingPrice * Math.round(Math.abs((new Date(sDate) - new Date(eDate)) / 8.64e7)) + 1.14}</div>
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
            </>
        );
    }
}