import { useHistory } from 'react-router-dom';
import '../css/components.css';
import ImageSlider from '../components/ImageSlider';
import starIcon from '../img/icons/star.svg';
import headerStyle from '../css/headerMain.module.css';
import Reviews from '../components/Review';
import rightArrowIcon from '../img/icons/headerMinBack.png';

export default function CarInfo () {

    const history = useHistory();

    return (

        <>
            <div className="headerMinCont">
                <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt="" /></div>
            </div>

            <div className="carInfo0">
                <div className="carInfo01">
                    <ImageSlider />
                </div>
                
                <div style={{float: "left", marginBottom: "50px"}}>
                    <div style={{width: "60%", float: "left"}}>
                        <div className="hotelInfo0S">
                            <div className="hotelInfo1">
                                <div className="hotelInfo01">Title</div>
                                <div style={{marginBottom: "15px", marginTop: "5px", float: "left"}}>2 guests . 4 bedroom . 5 bed . 10 bathroom</div>
                            </div>
                        </div>

                        <div className="hotelInfo0S1">
                            <div className="hotelInfo1">
                                <div className="hotelInfo01">Amenities</div>
                                <div className="hotelInfo0198">5</div>
                            </div>
                        </div>

                    </div>
                    <div style={{float: "left", marginTop: "20px", width: "35%", marginLeft: "3%"}}>
                        <div className="hotelInfoE0">
                            <div className="hotelInfoE01">
                                <div className="hotelInfoE011">$ 200</div>
                                <div className="hotelInfoE012"><img src={starIcon} alt="" />4.4 <span>(24)</span></div>
                            </div>
                            <div className="hotelInfoE02">
                                Number of guests
                            </div>
                            <div className="hotelInfoE02">
                                Apply dates
                            </div>
                            <div className="hotelInfoE03">Check availability</div>
                        </div>
                    </div>
                </div>

                <Reviews />

            </div>
            
        </>

    );
}