import React, { useState , useEffect } from "react";
// import HeaderMin from '../components/HeaderMin';
import '../css/header.css';
import '../css/components.css';
import serachIcon from '../img/icons/searchIcon.png';
import headerStyle from '../css/headerMain.module.css';
import { Link, useHistory } from 'react-router-dom';
import backIconGrey from '../img/icons/backGrey.svg';
import starIcon from '../img/icons/star.png';
import rightArrowIcon from '../img/icons/headerMinBack.png';
import v1 from '../img/demo/16.png';
import ImageSlider from '../components/ImageSlider';
import url from '../data/urls.json';
export default function CarList () {
   
    const [CarLists, setCarLists] = useState(null);
    useEffect( () => {
     mainUrl()
    }, []);

    const mainUrl = () => {
        
            fetch(url.baseUrl+"carHost", {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res=> {setCarLists(res.data);
                console.log(res.data)}) 
              
            .catch(error => console.log(error));
            }


    const history = useHistory();

    return (

        <>
            <div className="desktop">

                {/* <HeaderMin /> */}
                <div className="headerMinCont">
                
                    <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt="" /></div>

                    <div className={headerStyle.headNavEMinCarList}>

                        <div className={headerStyle.headNav0}>
                            <input type="text" placeholder="Search here cars ..." />
                        </div>
                        <div className="headNav1">
                            <img src={serachIcon} alt="" /> 
                        </div>

                    </div>

                </div>

               
                <div className="DetailListCont">
                    {/* single container */}

                    {CarLists ? (
                        <>
                            {CarLists.map((carElm, indx)=>{ return(
                                <>
                                    <div className="DetailList0" key={indx}>
                                        <div className="DetailList01">
                                            <ImageSlider images={carElm.carsImageArray}/>
                                        </div>
                                        <div className="DetailList02">
                                            <div className="DetailList021" onClick={() => history.push(`/carInfo/${carElm.id}`)}>{carElm.modelName}</div>
                                            <div className="DetailList022" onClick={() => history.push(`/carInfo/${carElm.id}`)}>car</div>
                                            <div className="DetailList023">2 guests . Studio . 2 beds . 1 bathroom</div>
                                            <div className="DetailList024">{`$ ${carElm.carListingPrice}`}</div>
                                        </div>
                                    </div>        
                                </>
                            )})}
                        </>
                        ):(
                            <div>loaded</div>
                        )
                    }
                </div> 
            </div>

            <div className="mobile">

                {/* header */}
                <div className="placesNearMob0">
                    <div className="placesNearMob01"><img src={backIconGrey} alt="" onClick={() => history.goBack()} /></div>
                    <div className="placesNearMob02">Nearby</div>
                </div>

                {/* main body */}
                <div className="placesNearMob1">
                    <div className="placesNearMob11">Places to stay near you</div>
                    <div className="placesNearMob12">

                            <Link to={{pathname: `/carInfo`}}  className="placesNearMob121">
                                <img src={v1} alt="" />
                                <div className="placesNearMob1211">Name</div>
                                <div className="placesNearMob1212">2 guests, 3 beds, 4 bathroom</div>
                                <div className="placesNearMob1213"><img src={starIcon} alt="" /> 5.4 <span>(30)</span></div>
                                <div className="placesNearMob1214"><span>$ 3</span> / night</div>
                            </Link>

                    </div>
                </div>

            </div>

        </>

    );
}