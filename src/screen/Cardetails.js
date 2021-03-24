
import React, { useEffect, useState } from "react"
import img from "../img/banners/undraw_enter_uhqk.png";
import "../css/CarDetails.css.css";
import adminPro from '../img/demo/24.png';
import Reviews from '../components/Review';
import ImageSlider from '../components/ImageSlider';
import headerStyle from '../css/headerMain.module.css';
import { useHistory } from 'react-router-dom';
import rightArrowIcon from '../img/icons/headerMinBack.png';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import url from '../data/urls.json';
import loading from '../img/icons/loading.gif';
const Cardetails = () =>{
    const history = useHistory();
    const [car, setCar] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        getCarsData();
    }, []);

    const getCarsData = () => {
        var requestOptions = {
            method: 'get',
            redirect: 'follow'
        };

        fetch(`${url.baseUrl}/carHost/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.data);
            setCar(result.data);
        })
        .catch(error => console.log('error', error));
    }

    if (!car) {
        return (<div style={{display: "flex", alignContent: "center", justifyContent: "center"}}><img style={{marginTop: "20%", width: "100px"}} src={loading} alt="" /></div>)
    } else {
        return(
            <>
                <div className="headerMinCont">
                    <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt="" /></div>
                </div>
                <div className="carInfo0" style={{maxWidth: 900, flaot: 'left', marginLeft: '50%', transform: 'translateX(-50%)'}}>
                    <div className="carInfo01">
                        <ImageSlider images={car.carsImageArray} />
                    </div>
                </div>

<div className="hynudai">
<div className="hydai1">
<h1>Hyundai Elantra 2020</h1>
</div>
<div className="hydai2">
    <h2 style={{marginTop:"-11px"}}>$ 78/day</h2></div>
    <div className="hydai3">
        <h3>5 Seats</h3><h3 className="hydai4">4 Door</h3>
    </div>
    <div className="hydai5">
    <h3>Heated Seat</h3><h3 className="hydai6">All-wheel drive</h3>
    </div>
    <div className="hydai7">
    <div className="hydai8"> <img src={adminPro} alt="" className="hydaiimg" /><h3>Host</h3></div>
    <h3>John Doe</h3><p>Joined Dec 2019</p><span>4.83</span></div>
    <div className="hydai9"><div className="hydai10"><label style={{marginLeft:"2px"}}>Start Date</label>
     <label style={{marginLeft:"40%"}}>Time</label></div>
    <input type="Date" name="field1" />  <input type="Time" name="field2" style={{marginLeft:"3px"}} /> </div>
   
    <div className="hydai11"><div className="hydai12"><label style={{marginLeft:"2px"}}>End Date</label>
     <label style={{marginLeft:"41%"}}>Time</label></div>
    <input type="Date" name="field1" />  <input type="Time" name="field2" style={{marginLeft:"3px"}} />  </div>

    <div className="hydai13">Car Description</div>
    <div className="hydai14">
     <textarea placeholder="Write from here ..." />
     </div>
    
    <div className="features"><h1>Features</h1></div>
    {/* {person.amenList.map((val, ind) => <div className="hotelInfo0198" key={ind}>{val}</div>)} */}
            <div className="carInfo0" style={{maxWidth: 900, flaot: 'left', marginLeft: '50%', transform: 'translateX(-50%)'}}> 
                <div className="carInfo01"> 
                    <Reviews />
                </div>
            </div>

    </div>
</>);
}
}
export default Cardetails;