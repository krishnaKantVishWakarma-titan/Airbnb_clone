import HeaderMin from '../components/HeaderMin';
import '../css/components.css';

export default function NewTraveller() {
    return(

        <>

            <HeaderMin title="New Traveler" />

            <div className="NewTravCont">
                <div className="newTravTxt">Hi Aman we found a new traveler who is also going to your destination.</div>
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
                    <span><button className="NewTravBtn1">Connect</button></span>
                    <span><button className="NewTravBtn2">Decline</button></span>
                </div>

                <div className="NewTravNote">Note :- Traveler can contact to show.</div>

            </div>
        
        </>

    );
}