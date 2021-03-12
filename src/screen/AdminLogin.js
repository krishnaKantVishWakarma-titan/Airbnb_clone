import SignUpBanner from '../img/banners/undraw_mobile_payments_vftl.png';
import LockImg from '../img/icons/lock.png';
import EmailImg from '../img/icons/email.png';
import downArrow from '../img/icons/down-arrow.png';
import { useHistory } from 'react-router-dom';

export default function AdminLogin () {
    const history = useHistory();
    return (
        <>
            <div className="signupPage">
                <div className="sign0">
                    <div className="sign01">
                        {/* 1st row */}
                        <div className="sign011"><img src={SignUpBanner} alt="" /></div>
                        <div className="sign012">Home</div>
                    </div>
                    <div className="sign02">
                        {/* 2nd row */}
                        <div className="sign021Ex" style={{marginTop: '80px'}}>Login here</div>
                        <div className="sign022">
                            <span className="sign0221"><img src={EmailImg} alt="" /></span>
                            <span className="sign0222"><input type="text" placeholder="Email ..." /></span>
                            <span className="sign0223"><img src={downArrow} alt="" /></span>
                        </div>
                        <div className="sign022">
                            <span className="sign0221"><img src={LockImg} alt="" /></span>
                            <span className="sign0222"><input type="password" placeholder="Secret key ..." /></span>
                            <span className="sign0223"><img src={downArrow} alt="" /></span>
                        </div>
                        <div className="sign022">
                            <span className="sign0221"><img src={LockImg} alt="" /></span>
                            <span className="sign0222"><input type="password" placeholder="Password ..." /></span>
                            <span className="sign0223"><img src={downArrow} alt="" /></span>
                        </div>
                        <div className="sign023">
                            <span className="sign0231"><input type="checkbox" /></span>
                            <span className="sign0232">Remember me</span>
                        </div>
                        <div className="sign023"><button onClick={() => history.push("/Dashboard")}>Sign Up</button></div>
                    </div>
                </div>
            </div>
        </>
    );
}