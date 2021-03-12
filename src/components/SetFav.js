import { useState } from 'react';
import favIcon from '../img/icons/fav.svg';
import favRedIcon from '../img/icons/favRed.svg';
import url from '../data/urls.json';
export default function SetFav ({val, id, isFavid, openLogin}) {

    const [fav, setFav] = useState(val);
    
    const handleFav = val => {
        if (localStorage.getItem("token") === null) {
            openLogin();
        } else {
            if (val === false) {
                // dislike
                // alert("dislike")
                // alert(isFavid);
                // fetch(url.baseUrl+"dislike?id"+isFavid, {
                //     method: "get",
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },
                //     redirect: 'follow'
                // })
                // .then(res => res.json())
                // .then(res => {
                //     console.log(res);
                // })
                // .catch(error => console.log(error));
    
            } else {
                fetch(url.baseUrl+"like", {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "userId": JSON.parse(localStorage.getItem("token")).userId,
                        "hosting_id": id
                    }),
                    redirect: 'follow'
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                })
                .catch(error => console.log(error));
    
            }
            setFav(val);
        }
    }
        
 
    if (fav) {
        return (<div className="DetailList02Side02"><img src={favRedIcon} alt="" /></div>)
    } else {
        return (<div className="DetailList02Side02" onClick={() => handleFav(true)}><img src={favIcon} alt="" /></div>)
    }

}