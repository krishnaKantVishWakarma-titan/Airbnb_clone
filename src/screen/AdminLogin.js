import SignUpBanner from '../img/banners/undraw_mobile_payments_vftl.png';
import LockImg from '../img/icons/lock.png';
import EmailImg from '../img/icons/email.png';
import downArrow from '../img/icons/down-arrow.png';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert';

export default function AdminLogin () {
    const history = useHistory();
    const [allVar, setAllVar] = useState({
        email: '',
        secretKey: '',
        pass: ''
    })
    const finalSubmit = () => {
        // if (allVar.email === '') {
        //     swal("", "Please fill email !!!", 'info');
        // } else if (allVar.secretKey === '') {
        //     swal("", "Please fill secret key !!!", 'info');
        // } else if (allVar.pass === '') {
        //     swal("", "Please fill password !!!", 'info');
        // } else {
        //     if (allVar.email === 'admin@gmail.com') {
        //         swal("", "Email not match !!!", 'error');
        //     } else if (allVar.secretKey === 'qwerty987') {
        //         swal("", "Secret key not match !!!", 'error');
        //     } else if (allVar.pass === '987654') {
        //         swal("", "Password not match !!!", 'error');
        //     } else {
                history.push("/Dashboard");
        //     }
        // }
    }
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
                            <span className="sign0222"><input type="text" placeholder="Email ..." onChange={e => setAllVar({...allVar, email: e.target.value})} /></span>
                            <span className="sign0223"><img src={downArrow} alt="" /></span>
                        </div>
                        <div className="sign022">
                            <span className="sign0221"><img src={LockImg} alt="" /></span>
                            <span className="sign0222"><input type="password" placeholder="Secret key ..." onChange={e => setAllVar({...allVar, secretKey: e.target.value})} /></span>
                            <span className="sign0223"><img src={downArrow} alt="" /></span>
                        </div>
                        <div className="sign022">
                            <span className="sign0221"><img src={LockImg} alt="" /></span>
                            <span className="sign0222"><input type="password" placeholder="Password ..." onChange={e => setAllVar({...allVar, pass: e.target.value})} /></span>
                            <span className="sign0223"><img src={downArrow} alt="" /></span>
                        </div>
                        <div className="sign023">
                            <span className="sign0231"><input type="checkbox" /></span>
                            <span className="sign0232">Remember me</span>
                        </div>
                        <div className="sign023"><button onClick={() => finalSubmit()}>Sign Up</button></div>
                    </div>
                </div>
            </div>
        </>
    );
}