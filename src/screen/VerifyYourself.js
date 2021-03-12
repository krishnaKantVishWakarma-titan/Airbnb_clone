/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import LoginBanner from '../img/banners/undraw_enter_uhqk.png';
import downArrow from '../img/icons/down-arrow.png';
import LockImg from '../img/icons/lock.png';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Url from '../data/urls.json';
import swal from 'sweetalert';

export default function VerifyYourself() {

    const history = useHistory();
    const {id} = useParams();

    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    useEffect(() => {
        fetch(Url.baseUrl + "verifyOtp", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                otp: id
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.code === 200) {
                setEmail(res.data);
            } else if (res.code === 206) {
                swal("Link Expired", "Try again !!!", "error");
                history.push("/EmailValidation")
            }
        })
        .catch(err => console.log(err));
    }, []);

    const changePassHandle = () => {

        if (pass1 !== pass2) {
            swal("Try again !!!", "Confirm password should be same.", "error");
        } else {
            fetch(Url.baseUrl + "resetPassword", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: pass1,
                    otp: id
                })
            })
            .then(res => res.json())
            .then(res => {
                alert(res);
                if (res.code === 200) {
                    swal("Password Updated", "Successfully! You can login", "success");
                    history.push("/");
                }
            })
            .catch(err => console.log(err));
        }
    }

    return(
        <> 
            <div className="signupPage">
                <div className="sign0">
                    <div className="sign01">
                        {/* 1st row */}
                        <div className="sign011"><img style={{marginTop: '80px'}} src={LoginBanner} alt="" /></div>
                    </div>
                    <div className="sign02">
                        <div className="Closebtn">
                            <div onClick={() => history.push("/")}>Home</div>
                        </div>
                            {/* 2nd row */}
                            <div className="sign021" style={{marginTop: '100px'}}>Reset Your Password</div>
                                <div className="sign022">
                                    <span className="sign0221"><img src={LockImg} alt="" /></span>
                                    <span className="sign0222"><input type="password" placeholder="Enter password ..." onChange={e => setPass1(e.target.value)} /></span>
                                    <span className="sign0223"><img src={downArrow} alt="" /></span>
                                </div>
                                {/* <div className="sign0223Error">* please fill your email</div> */}
                                <div className="sign022">
                                    <span className="sign0221"><img src={LockImg} alt="" /></span>
                                    <span className="sign0222"><input type="password" placeholder="Enter confirm password ..." onChange={e => setPass2(e.target.value)} /></span>
                                    <span className="sign0223"><img src={downArrow} alt="" /></span>
                                </div>
                            {/* <div className="sign0223Error">* please fill your email</div> */}
                            <div className="sign023"><button style={{marginTop: '30px'}} onClick={changePassHandle}>Submit</button></div>
                    </div>
                </div>
            </div>
        </>
    );
}