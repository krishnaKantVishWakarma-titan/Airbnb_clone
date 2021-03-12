import '../css/components.css';
import varimg from '../img/banners/ad.jpg';

export default function Photo() {
    return (
        <>
        
            {/* desktop version  */}
            <div className="container">
                <div className="heading">Photos</div>

                <div className="LiveAnyWhereCont">

                    {/* map iterator here */}
                    <div className="LiveAnyWhereSin">
                        <img src={varimg} alt="" />
                    </div>
                    <div className="LiveAnyWhereSin">
                        <img src={varimg} alt="" />
                    </div>
                    <div className="LiveAnyWhereSin">
                        <img src={varimg} alt="" />
                    </div>
                    <div className="LiveAnyWhereSin">
                        <img src={varimg} alt="" />
                    </div>

                </div>

            </div>
        
        </>
    );
}