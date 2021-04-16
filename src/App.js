import {Chat, Join} from './chat/components/index';
import NewTraveller from './screen/NewTraveller';
import Messages from './screen/Messages';
import HotelInfo from './screen/HotelInfo';
import Notification from './screen/Notification';
import Chats from './screen/Chats';
import CarInfo from './screen/CarInfo';
import CarList from './screen/CarList';
import PlacesNearYou from './screen/PlacesNearYou';
import HostYourApartment from './screen/HostYourApartment';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './screen/Index';
import AdminLogin from './screen/AdminLogin';
import DashBoard from './admin/DashBoard';
import HostProperty from './screen/HostProperty';
import InvalidHostProperty from './screen/InvalidHostProperty'
import EmailValidation from './screen/EmailValidation';
import Trips from './screen/Trips';
import Examples from './screen/Examples';
import Saved from './screen/Saved';
import Homes from './screen/Homes';
import Profile from './screen/profile';
import UserProfile from './screen/UserProfile';
import VerifyYourself from './screen/VerifyYourself.js';
import HostCars from './screen/HostCars';
import Booking from './screen/Booking';
import CarBooking from './screen/CarBooking';
import React, { useEffect, useState } from 'react';
import {IntlProvider} from 'react-intl';
import English from './translations/en.json';
import Hindi from './translations/hi.json';
import MetaTags from 'react-meta-tags';
import Profiles from "./screen/Profiles";
import GetReviews from './screen/GetReviews';

function App() {

  const [locale, setLocale] = useState('en');
  const [lang, setLang] = useState(English);

  useEffect(() => {
    if (localStorage.getItem("locale") === null) {
        localStorage.setItem("locale", "en");
    } else {
        setLocale(localStorage.getItem("locale"));
        switch(localStorage.getItem("locale")) {
            case 'en':
                setLang(English);
                break;
            case 'hi':
                setLang(Hindi);
                break;
            default: 
                setLang(English);
        }
    }

    // get user location
    // fetch("http://ip-api.com/json", {
    //   method: "get",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    // })
    // .then(res => res.json())
    // .then(res => console.log(res))
    // .catch(err => console.log(err))

  }, []);

  return (
    
    <>

      <MetaTags>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </MetaTags>

      <IntlProvider locale={locale} messages={lang}>
        <BrowserRouter>
          <Switch>

            <Route exact path="/">
              <Index />
            </Route>
            <Route exact path="/getReviews/:id/:userId">
              <GetReviews />
            </Route>
            <Route path="/Dashboard">
              <DashBoard />
            </Route>
            <Route exact path="/hotelInfo/:id/">
              <HotelInfo />
            </Route>
            <Route exact path="/NewTraveller">
              <NewTraveller />
            </Route>
            <Route exact path="/messages">
              <Messages data="krishna" />
            </Route>
            <Route exact path="/notify">
              <Notification data="krishna" />
            </Route>
            <Route exact path="/chats">
              <Chats data="krishna" />
            </Route>
            <Route exact path="/carInfo/:id">
              <CarInfo data="krishna" />
            </Route>
            <Route exact path="/CarBooking">
              <CarBooking />
            </Route>
            <Route exact path="/carsList">
              <CarList data="krishna" />
            </Route>
            <Route exact path="/hostCars">
              <HostCars data="krishna" />
            </Route>

            <Route path="/PlacesNearYou">
              <PlacesNearYou data="krishna" />
            </Route>
            <Route path="/hosting">
              <Profile data="krishna" />
            </Route>
            <Route path="/Homes">
              <Homes />
            </Route>
            <Route path="/Booking">
              <Booking />
            </Route>
            <Route path="/Account">
              <UserProfile />
            </Route>

            <Route exact path="/HostYourApartment">
              <HostYourApartment />
            </Route>

            <Route path="/resetPassword/:id">
              <VerifyYourself />
            </Route>

            <Route exact path="/AdminLogin">
              <AdminLogin data="krishna" />
            </Route>
            
            <Route exact path="/Trips">
              <Trips data="krishna" />
            </Route>
            <Route exact path="/Saved">
              <Saved data="krishna" />
            </Route>
            

            <Route exact path="/Examples">
              <Examples data="krishna" />
            </Route>
            
            <Route exact path="/Profiles">
              <Profiles data="krishna" />
            </Route>

            {/* images */}
            <Route exact path="/HostProperty">
              <InvalidHostProperty/>
            </Route>
            <Route exact path="/HostProperty/:id">
              <HostProperty data="krishna" />
            </Route>

            <Route exact path="/EmailValidation">
              <EmailValidation data="krishna" />
            </Route>
            <Route path="/chat/">
              <Chat />
            </Route>
            <Route path="/join">
              <Join />
            </Route>
            

          </Switch>
        </BrowserRouter>
      </IntlProvider>
    
    </>

  );
}

export default App;
