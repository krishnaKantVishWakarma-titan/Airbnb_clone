import React from "react"
import "../css/CarDetails.css.css";
import Reviews from '../components/Review';
import adminPro from '../img/banners/table-3143080_1920.png'
import ImageSlider from '../components/ImageSlider';

const Cardetails = () =>{
    return(
        <>

            <div className="hynudai">
                <div className="carInfo01">
                    <ImageSlider />
                </div>

                <div className="hydai1">
                    <h1>Hyundai Elantra 2020</h1>
                </div>
                <div className="hydai2">
                    <h2 style={{marginTop: 10}}>$ 78/day</h2>
                </div>
                <div className="hydai3">
                    <h3>5 Seats</h3><h3 className="hydai4">4 Door</h3>
                </div>
                <div className="hydai5">
                    <h3>Heated Seat</h3><h3 className="hydai6">All-wheel drive</h3>
                </div>
                <div className="hydai7">
                    <div className="hydai8"> <img src={adminPro} alt="" className="hydaiimg" /><h3>Host</h3></div>
                    <h3>John Doe</h3><p>Joined Dec 2019</p><span>4.83</span>
                </div>
                <div className="hydai9">
                    <div className="hydai10"><label style={{marginLeft:"2px"}}>Start Date</label>
                        <label style={{marginLeft:"40%"}}>Time</label>
                    </div>
                    <input type="Date" name="field1" />  
                    <input type="Time" name="field2" style={{marginLeft:"3px"}} />
                </div>
        
                <div className="hydai11">
                    <div className="hydai12">
                        <label style={{marginLeft:"2px"}}>End Date</label>
                        <label style={{marginLeft:"41%"}}>Time</label>
                    </div>
                    <input type="Date" name="field1" />
                    <input type="Time" name="field2" style={{marginLeft:"3px"}} />  
                </div>

                <div className="hydai13">Car Description</div>
                <div className="hydai14">
                    <textarea placeholder="Write from here ..." />
                </div>
                
                <div className="features"><h1>Features</h1></div>
                <div className="carInfo0"> 
                    <div className="carInfo01"> 
                        <Reviews />
                    </div>
                </div>

            </div>
        </>
    );}
export default Cardetails;