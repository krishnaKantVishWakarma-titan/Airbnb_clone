import '../css/components.css';

import v2 from '../img/demo/5.png';
// import v3 from '../img/demo/1.png';
import fullStarIcon from '../img/icons/fullstar.png';
import halfStarIcon from '../img/icons/halfstar.png';
import pinIcon from '../img/icons/pin.png';
import loading from '../img/icons/loadingHostingList.gif';


import defaultMgs from '../translations/DefaultMessage';
import {FormattedMessage} from 'react-intl';
import { useEffect, useState } from 'react';
import url from '../data/urls.json';
import { useHistory } from 'react-router-dom';

export default function BestDeals() {

    const [places, setPlaces] = useState(null);
    const history = useHistory();
    useEffect(() => {
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
            setPlaces(res.data);
        })
        .catch(error => console.log(error));
        
    }, []);

    return (

        <>

            {/* desktop version  */}
            <div className="containerM">
                <div className="heading">
                <FormattedMessage 
                    id="BestDeals"
                    defaultMessage={defaultMgs.Mgs.BestDeals}
                />
                </div>

                <div className="BestDealsCont">

                    {places ? 
                        places.map((val, index) => {return (

                            <div  onClick={() => history.push(`/hotelInfo/${val.id}`)} key={index} className="BestDealsSin">
                                <img src={val.imageList[0]} alt="" />
                                <p className="BestSinP1">{val.listingTitle}</p>
                                <p className="BestSinP2">
                                {/* <FormattedMessage 
                                    id="Wembly"
                                    defaultMessage={defaultMgs.Mgs.Wembly}
                                />, 
                                <FormattedMessage 
                                    id="London"
                                    defaultMessage={defaultMgs.Mgs.London}
                                /> */}
                                {val.addrCity}, {val.countryName}
                                </p>
                                <div className="BestDealsTxt0">
                                    <div className="BestDealsTxt01">
                                        <p className="BestSinP3">
                                            <img src={pinIcon} alt="" />
                                            2.0 
                                            <FormattedMessage 
                                                id="kmToCity"
                                                defaultMessage={defaultMgs.Mgs.kmToCity}
                                            /></p>
                                        <p className="BestSinP4">
                                            <span>
                                                <img src={fullStarIcon} alt="" />
                                                <img src={fullStarIcon} alt="" />
                                                <img src={fullStarIcon} alt="" />
                                                <img src={fullStarIcon} alt="" />
                                                <img src={halfStarIcon} alt="" />
                                            </span>
                                        </p>
                                    </div>
                                    <div className="BestDealsTxt02">
                                        <p className="BestSinP5">$ {val.basePrice}</p>
                                        <p className="BestSinP6">/
                                        <FormattedMessage 
                                            id="perNight"
                                            defaultMessage={defaultMgs.Mgs.perNight}
                                        />
                                        </p>
                                    </div>
                                </div>
                            </div>

                        )})
                    : (
                        <div style={{float: 'left', width: '100%'}}><img style={{width: "50px", marginLeft: "50%", transform: "translateX(-50%)"}} src={loading} alt="Loading" /></div>
                    )}

                </div>

            </div>

        </>

    );
}