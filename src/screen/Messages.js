import { useHistory } from 'react-router-dom';
import '../css/components.css';
import headerStyle from '../css/headerMain.module.css';
import rightArrowIcon from '../img/icons/headerMinBack.png';
import sendIcon from '../img/icons/sendIcon.png';

export default function Messages() {

    const history = useHistory();

    return(

        <>

            <div className="headerMinCont">
                    
                    <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt="" /></div>
                
                <div className="headerMinTitle">Messages</div>
            </div>

            <div className="MessagesCont">
                <div className="MessagesList">
                    {/* if there is no messages */}
                    <div className="NoMessages">Your message will appear here.</div>
                </div>
                <div className="MessagesInput">
                    <div className="MessagesInputCont">
                        <input type="text" placeholder="Your messages ..." />
                        <button><img src={sendIcon} alt="" /></button>
                    </div>
                </div>
            </div>
        
        </>

    );
}