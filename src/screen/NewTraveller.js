import { useEffect } from 'react';
import HeaderMin from '../components/HeaderMin';
import queryString from 'query-string';
import '../css/components.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';

export default function NewTraveller() {
    
    const { id, uname, room, pic } = queryString.parse(window.location.search);

    useEffect(() => {
        // alert(uname);
        if (localStorage.getItem("token") === null) {
            alert("You are not logged in. Please login first !!!");
            history.push('/');
        }
    }, []);

    const history = useHistory();


    return(

        <>

            <HeaderMin title="New Traveler" />

            <div className="NewTravCont">
                <div className="newTravTxt">Hi {uname} we found a new traveler who is also going to your destination.</div>
                <div className="newTravStat">Status</div>
            </div>
            <div className="NewTravInfoCont">
                <div className="NewTravInfoLeft">Gender :</div>
                <div className="NewTravInfoRight">Male</div>
                <div className="NewTravInfoLeft">Age Range :</div>
                <div className="NewTravInfoRight">30 - 35</div>
                <div className="NewTravInfoLeft">Joined :</div>
                <div className="NewTravInfoRight">August 19, 2020</div>

                <div className="NewTravBtnCont">
                    <span><Link className="NewTravBtn1" to={`/chat?name=${JSON.parse(localStorage.getItem('token')).userName}&room=${room}&username=${uname}&profile=${pic}`}>Connect</Link></span>
                    <span><button className="NewTravBtn2" onClick={() => history.push("/")}>Decline</button></span>
                </div>

                <div className="NewTravNote">Note :- Traveler can contact to show.</div>

            </div>
        
        </>

    );
}