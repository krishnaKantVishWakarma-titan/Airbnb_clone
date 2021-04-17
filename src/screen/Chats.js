/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useHistory } from 'react-router-dom';
import '../css/components.css';
import varimg from '../img/banners/ad.jpg';
import headerStyle from '../css/headerMain.module.css';
import rightArrowIcon from '../img/icons/headerMinBack.png';
import { useState, useEffect} from 'react';
import loading from '../img/icons/loading.gif';
import profilepic from '../img/icons/profile.png';


export default function Chats () {

    // const location = useLocation();
    // const {text, num} = location.state;
    // useEffect(() => {
    //     console.log(text);
    //     if (num === "") {
    //         alert("null");
    //         console.log(num);
    //     }
    //     console.log(num);

    // }, []);
    const history = useHistory();
    // const [name, setName] = useState(JSON.parse(localStorage.getItem('token')).userName);
    const [rooms, setRooms] = useState(null);

    useEffect( () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6MSwidHlwZSI6ImRldmljZSIsImlhdCI6MTYxNjU2MjM2NX0.n8dGBHbi9_I6JObUpSEa2k-fC-mcwVK-JFh920344_o");
        
        var name = JSON.parse(localStorage.getItem("token")).userId;
        console.log("userid : "+name)
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
        
          redirect: 'follow'
        };
        
        fetch("http://13.233.154.141:5000/api/listConnections/" + name ,  requestOptions)
          .then(response => response.json())
          .then(res=> {
            console.log(res);
            if (res.data === undefined){
                alert("No chat");
                setRooms([]);
            } else {
                setRooms(res.data);
            }
            console.log(res.data)}) 
          .catch(error => console.log('error', error));
    }, []);

    var named = JSON.parse(localStorage.getItem("token")).userName;
    console.log("prateek",named);

    if (!rooms) {
        return (<div style={{display: "flex", alignContent: "center", justifyContent: "center"}}><img style={{marginTop: "20%", width: "100px"}} src={loading} alt="" /></div>)
    } else {
    
  
    return (

        <>
            <div className="headerMinCont">
                <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt="" /></div>
                <div className="headerMinTitle">Chats</div>
            </div>

            <div style={{paddingBottom: '60px', float: 'left', width: '100%'}}>
                {rooms.map((currElm, index) => { return (<>
                    {currElm && (
                        <>
                            <div className="noti" key={index}>
                                <Link className="noti0" to={`/chat?name=${named}&room=${currElm.room}&username=${currElm.name}&profile=${currElm.pic||profilepic}`}>
                                    <div className="noti01">
                                        {currElm.pic ? <img src={currElm.pic} alt="" /> : <img src={profilepic} alt="" />}
                                    </div>
                                    <div className="noti02">
                                        <div className="noti021">
                                            <div className="noti0211"><span className="noti02111">{currElm.name}</span></div>
                                            <div className="noti0212">{new Date(currElm.dataChat.dattime_msg).getDate()-1} - {new Date(currElm.dataChat.dattime_msg).getMonth()+1} - {new Date(currElm.dataChat.dattime_msg).getFullYear()}</div>
                                        </div>
                                        <div className="noti022">{currElm.dataChat.message}</div>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )}
                </>)
                })}
            </div>

        </>

    );}
}