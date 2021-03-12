import LoginBanner from '../img/banners/undraw_enter_uhqk.png';
import downArrow from '../img/icons/down-arrow.png';
import LockImg from '../img/icons/lock.png';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import checkEmail from '../img/undraw/check_your _email.jpg';
import Url from '../data/urls.json';
import swal from 'sweetalert';

export default function EmailValidation() {

    const history = useHistory();
    const inputEmail = useRef(null);
    const errorText = useRef(null);

    const [tab1, setTab1] = useState(true);
    const [tab2, setTab2] = useState(false);

    const submitEmail = () => {
        if (inputEmail.current.value === "") {
            inputEmail.current.focus();
            errorText.current.style.display = "block";
        } else {
            fetch(Url.baseUrl + "forgot", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail.current.value
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.code === 200) {
                    setTab1(false);
                    setTab2(true);
                } else {
                    swal("Try again", "Invalid Email", "error");
                }
            })
            .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        errorText.current.style.display = "none";
    }, []);

    return(
        <>
        
                
            <div className="signupPage">
                <div className="sign0">

                    {tab1 && (
                        <>
                        
                            <div className="sign01">
                                {/* 1st row */}
                                <div className="sign011"><img style={{marginTop: '80px'}} src={LoginBanner} alt="" /></div>
                            </div>
                            <div className="sign02">
                                <div className="Closebtn">
                                    <div onClick={() => history.goBack()}>Back</div>
                                </div>

                                <div className="sign021" style={{marginTop: '100px'}}>Reset Your Password</div>
                                    <div className="sign022">
                                        <span className="sign0221"><img src={LockImg} alt="" /></span>
                                        <span className="sign0222"><input type="email" ref={inputEmail} placeholder="Enter email address ..." /></span>
                                        <span className="sign0223"><img src={downArrow} alt="" /></span>
                                    </div>
                                    <div className="sign0223Error" ref={errorText}>* please fill your email</div>
                                <div className="sign023"><button style={{marginTop: '30px'}} onClick={submitEmail}>Submit</button></div>
                                    
                            </div>
                        
                        </>
                    )}

                    {tab2 && (
                        <>

                            <img className="sign0Check0" src={checkEmail} alt="" />
                            <div className="sign0Check1" onClick={() => history.push("/")}>Go to home</div>
                        
                        </>
                    )}

                </div>
            </div>


        </>
    );
}