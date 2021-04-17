/* eslint-disable react-hooks/exhaustive-deps */
import '../css/components.css';
import '../css/utils.css';
import ds from '../css/Dashboard.module.css';
import ImageSlider from '../components/ImageSlider';
import sidePic from '../img/demo/19.png';
import headerStyle from '../css/headerMain.module.css';
import rightArrowIcon from '../img/icons/headerMinBack.png';
import lightBulbIcon from '../img/icons/lightbulb.svg';
import v1 from '../img/undraw/1.png';
import v2 from '../img/undraw/2.png';
import v3 from '../img/undraw/3.png';
import v4 from '../img/undraw/4.png';
import v5 from '../img/undraw/5.png';
import v6 from '../img/undraw/6.png';
import v7 from '../img/undraw/7.png';
import v8 from '../img/undraw/8.png';
import url from '../data/urls.json';
import PlacesAutocomplete, { geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {GoogleMap, Marker} from '@react-google-maps/api';
import {useCallback, useEffect, useRef, useState} from 'react';
import currencyName from '../data/currencyName.json';
import { useHistory } from 'react-router-dom';
import Switch from "react-switch";
import Delete from "../img/icons/delete.png"
import swal from 'sweetalert';
import bg from '../img/banners/ad1.jpg';

import Map from "../components/Map";
import loading from '../img/icons/loading.gif';
// import "../css/reviews.css";

const mapContainerStyle = {
    width: "100%",
    height: "100%"
};
const option = {
    disableDefaultUI: true,
    zoomControl: true
};

// const config = {
//     bucketName: 'checkin-images-upload',
//     region: 'ap-south-1',
//     accessKeyId: 'AKIASYXDSNXSLCU3MSKO',
//     secretAccessKey: '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'
//   };
// //   const ReactS3Client = new S3(config);

export default function HostYourApartment() {
    const [imagetab2, setImageTab2]=useState(false)
    const [imagetab1, setImageTab1]=useState(true)

    const [mainLoad, setmainLoad] = useState(false);
    
    const [docStatus, setDocStatus] = useState(null);
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            history.push('/');
        } else {
            setmainLoad(true)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            fetch(`${url.baseUrl}isDocVerified/`+JSON.parse(localStorage.getItem("token")).userId, requestOptions)
            .then(response => response.json())
            .then(res => {
                console.log(res);
                console.log(res.data[0].isDocVerified);
                if (res.data[0].isDocVerified === 0) {
                    setDocStatus(res.data[0].isDocVerified);
                } else if (res.data[0].isDocVerified === 1) {
                    setDocStatus(res.data[0].isDocVerified);
                } else if (res.data[0].isDocVerified === 2) {
                    swal("Your profile is pending verification", "Please wait while Your profile is verify !!!", "error");
                    history.push('/');
                } else if (res.data[0].isDocVerified === 4) {
                    swal("Your profile is rejected", "Please contact with our support !!!", "error");
                    alert("Rejected !!!")
                    history.push('/');
                }
                setmainLoad(false);
            })
            .catch(error => console.log('error', error));
        }
    }, []);

    // tab states
    const [tab0, setTab0] = useState(true);
    const [tab1, setTab1] = useState(false);
    const [tab2, setTab2] = useState(false);
    const [tab3, setTab3] = useState(false);
    const [tab4, setTab4] = useState(false);
    const [tab5, setTab5] = useState(false);
    const [tab6, setTab6] = useState(false);
    const [tab7, setTab7] = useState(false);
    const [tab8, setTab8] = useState(false);
    const [tab9, setTab9] = useState(false);
    const [tab10, setTab10] = useState(false);
    const [tab11, setTab11] = useState(false);
    const [tab12, setTab12] = useState(false);
    const [tab13, setTab13] = useState(false);
    const [tab14, setTab14] = useState(false);
    const [tab15, setTab15] = useState(false);

    const [errTab, setErrTab] = useState(false);
    const [errTab1, setErrTab1] = useState(false);
    const [errTab2, setErrTab2] = useState(false);
    const [errTab3, setErrTab3] = useState(false);
    const [errTab4, setErrTab4] = useState(false);
    const [errTab5, setErrTab5] = useState(false);
    const [errTab6, setErrTab6] = useState(false);
    const errorDisplayTime = 4000;

    // res
    const p11 = useRef(null);
    const p12 = useRef(null);
    const p13 = useRef(null);
    const p14 = useRef(null);

    const p21 = useRef(null);

    const p32 = useRef(null);

    const p91 = useRef(null);
    const p92 = useRef(null);
    const p93 = useRef(null);
    const p94 = useRef(null);
    const p95 = useRef(null);
    const p96 = useRef(null);
    const p97 = useRef(null);

    const p10_1 = useRef(null);
    const p10_2 = useRef(null);
    const p10_3 = useRef(null);

    const p13_1 = useRef(null);
    const p13_2 = useRef(null);
    const p13_3 = useRef(null);
    const p13_4 = useRef(null);

    // upload video to s3
    // const [videoUploading, setvideoUploading] = useState(false);
    // const [videoList, updateVideoList] = useState([]);
    // const fileInput = useRef();
    // const handleClickUploadImage = e => {
    //     e.preventDefault();
    //     console.log(fileInput.current);
    //     let file = fileInput.current.files[0];
    //     setvideoUploading(true);
        
    //     uploadFile(file, config)
    //         .then(res => {
    //             updateVideoList([...videoList, res.location]);
    //             console.log(res)
    //             setvideoUploading(false);
    //         })
    //         .catch(e => console.log(e))
    // }

    // images
   const handleClickUploadImage=()=>{
//     var formdata = new FormData();
        
//     for(var  j = 0; j < e.target.files.length; j++) {
//         formdata.append("file", e.target.files[j], e.target.files[j].name);
//     }

//     var requestOptions = {
//     method: 'POST',
//     body: formdata,
//     redirect: 'follow'
//     };
//     console.log("falg1")
//     fetch(`${url.baseUrl}/upload`, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//         console.log("falg2")
//         console.log(result.Data)
//         var imageLink = result.Data;
//         console.log(result.Data)
//     })
//     .catch(error => console.log('error', error));
    

   }









    const [imageList, setImageList] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const uploadImageHandler = e => {

        var formdata = new FormData();
        
        for(var  j = 0; j < e.target.files.length; j++) {
            formdata.append("file", e.target.files[j], e.target.files[j].name);
        }

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };
        console.log("falg1")
        fetch(`${url.baseUrl}/upload`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("falg2")
            console.log(result.Data)
            var imageLink = result.Data;
            console.log(result.Data)
            imageLink.map(val => setImageList(prevImg => prevImg.concat(val.Location)));
        })
        .catch(error => console.log('error', error));
        
    
        if (e.target.files) {
            const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
            setSelectedImage(prevImg => prevImg.concat(fileArray))
            Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
        }
        console.log("image list")
    }
    const renderPhoto = source => {
        return source.map((photo, key) => {
            return ( <>
            <div className="uploadedImage"><img src={photo} key={key} alt="" />
            <img src={Delete} alt=""  style={{width: '10%', margin: '-50% 0px 0px 65px'}}/>
            </div> </>)
        })
    }

    // image government id
    const [imageGovList, setImageGovList] = useState(null);
    const [selectedGovImage, setSelectedGovImage] = useState(null);
    const uploadGovImageHandler = e => {

        var formdata = new FormData();
        formdata.append("file", e.target.files[0], e.target.files[0].name)

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${url.baseUrl}/upload`, requestOptions)
        .then(response => response.json())
        .then(result => {
            setImageGovList(result.Data[0].Location)
        })
        .catch(error => console.log('error', error));
    
        if (e.target.files[0]) {
            setSelectedGovImage(URL.createObjectURL(e.target.files[0]))
            Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
        }
    }

    // face photo image
    const [imageFaceList, setImageFaceList] = useState([]);
    const [selectedFaceImage, setSelectedFaceImage] = useState([]);
    const uploadFaceImageHandler = e => {

        var formdata = new FormData();
        formdata.append("file", e.target.files[0], e.target.files[0].name)

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        fetch(`${url.baseUrl}/upload`, requestOptions)
        .then(response => response.json())
        .then(result => {
            setImageFaceList(result.Data[0].Location)
        })
        .catch(error => console.log('error', error));
        
    
        if (e.target.files[0]) {
            setSelectedFaceImage(URL.createObjectURL(e.target.files[0]))
            Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
        }
    }
    useEffect(() => {
        console.log('image list')
        console.log(imageList)
        console.log(imageGovList)
    }, [imageList, imageGovList, imageFaceList])

    // map
    const [center, setCenter] = useState({
        lat: 43,
        lng: 43
    });
    const [address, setAddress] = useState('');
    const [markers, setMarkers] = useState([]);
    const onMapClick = useCallback(e => {
        console.log(e.latLng.lat(), e.latLng.lng())
        setMarkers([{
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        }]);
    }, []);
    const mapRef = useRef();
    const onMapLoad = useCallback(map => {
        mapRef.current = map;
    }, []);

    // states variables
    const [allVar, setAllVar] = useState({
        countryName: "0",
        typeOfProperty: "0",
        whatGuestBook: "0",
        forGuestOnly: "0",

        bedRooms: "0",
        noOfBeds: "1",
        bedType: "Single",
        baths: "1",
        noOfGuests: "1",

        listingTitle: "",
        listingDescription: "",

        amenEssentials: true,
        amenWifi: false,
        amenLapFriendlyWorkSpace: false,
        amenTV: false,
        amenKitchen: false,
        amenParking: false,
        amenHotWater: false,
        amenHeating: false,
        amenAirConditioner: false,
        amenGym: false,
        amenElevator: false,
        amenIndoorFirePlace: false,
        amenHangers: false,
        amenPool: false,
        amenHotTab: false,
        amenWasher: false,
        amenDryer: false,
        amenShampoo: false,
        amenHairDryer: false,
        amenBreakfast: false,
        amenSafetyAndPrivacy: false,
        amenSmokeDetector: false,
        amenCarbonMonoxide: false,
        amenFirstAidKit: false,
        amenFireExtinguisher: false,
        amenPrivateEntrance: false,

        additionalHouseRules: "",
        specifiecDetailsForGuests: "",

        addrHouseNumber: "",
        addrStreet: "",
        addrCity: "",
        addrState: "",

        noticeBeforeGuestArrial: "0",
        BookingAvailability: "0",
        arriveBefore: "",
        arriveAfter: "",
        leaveBefore: "",
        minStayInNight: "",
        maxStayInNight: "",

        currency: "0",
        basePrice: "",
        discountOfferedToGuest: "0",

        governmentID: imageGovList,
        facePhoto: imageFaceList
    });

    useEffect(() => {
        console.log(allVar);
    }, [allVar]);

    const handleSelect = async address => {
        
        const result = await geocodeByAddress(address);
        console.log(result[0].formatted_address);
        const placeArr = result[0].formatted_address.split(/\s/).join('').replace(/[0-9]/g, '').split(",");
        console.log(placeArr);
        if (placeArr.length >=  3 ) {
            setAllVar({
                ...allVar, 
                countryName: placeArr[placeArr.length-1],
                addrState: placeArr[placeArr.length-2],
                addrCity: placeArr[placeArr.length-3]
            });
        } else if (placeArr.length === 2) {
            setAllVar({
                ...allVar, 
                countryName: placeArr[placeArr.length-1],
                addrState: placeArr[placeArr.length-2]
            });
        } else if (placeArr.length === 1) {
            setAllVar({...allVar, countryName: placeArr[placeArr.length-1]});
        }
        
        setAddress(address);
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            setCenter({
                lat: latLng.lat,
                lng: latLng.lng
            });
            console.log('Success', latLng);
        })
        .catch(error => console.error('Error', error));
    };

    const [stateRule1, setStateRule1] = useState({ checked: false });
    const [stateRule2, setStateRule2] = useState({ checked: false });
    const [stateRule3, setStateRule3] = useState({ checked: false });
    const [stateRule4, setStateRule4] = useState({ checked: false });
    
    const handleChangeRule1 = checked => {
        setStateRule1({ checked });
        console.log("Switch: "+checked);
        console.log("rule : "+stateRule1);
    }
    const handleChangeRule2 = checked => {
        setStateRule2({ checked });
    }
    const handleChangeRule3 = checked => {
        setStateRule3({ checked });
    }
    const handleChangeRule4 = checked => {
        setStateRule4({ checked });
    }

    const getHouseRulesList = () => {
        let houseRulesList = [];

        if (stateRule1.checked === true) {
            houseRulesList.push("Suitable for kids");
        }
        if (stateRule2.checked === true) {
            houseRulesList.push("Pets Allowed");
        }
        if (stateRule3.checked === true) {
            houseRulesList.push("Smoking Allowed");
        }
        if (stateRule4.checked === true) {
            houseRulesList.push("Events and Parties");
        }

        return houseRulesList;
    }

    const getAmenList = () => {
        let amenList = [];

        if (allVar.amenEssentials === true) {
            amenList.push("Essentials");
        }
        if (allVar.amenWifi === true) {
            amenList.push("Wifi");
        }
        if (allVar.amenLapFriendlyWorkSpace === true) {
            amenList.push("Laptop friendly work space");
        }
        if (allVar.amenTV === true) {
            amenList.push("TV");
        }
        if (allVar.amenKitchen === true) {
            amenList.push("Kitchen");
        }
        if (allVar.amenParking === true) {
            amenList.push("Parking");
        }
        if (allVar.amenHotWater === true) {
            amenList.push("Hot water");
        }
        if (allVar.amenHeating === true) {
            amenList.push("Heating");
        }
        if (allVar.amenAirConditioner === true) {
            amenList.push("Air conditioner");
        }
        if (allVar.amenGym === true) {
            amenList.push("Gym");
        }
        if (allVar.amenElevator === true) {
            amenList.push("Elevator");
        }
        if (allVar.amenIndoorFirePlace === true) {
            amenList.push("Indoor Fire Place");
        }
        if (allVar.amenHangers === true) {
            amenList.push("Hangers");
        }
        if (allVar.amenPool === true) {
            amenList.push("Pool");
        }
        if (allVar.amenHotTab === true) {
            amenList.push("Hot tab");
        }
        if (allVar.amenWasher === true) {
            amenList.push("Washer");
        }
        if (allVar.amenDryer === true) {
            amenList.push("Dryer");
        }
        if (allVar.amenShampoo === true) {
            amenList.push("Shampoo");
        }
        if (allVar.amenHairDryer === true) {
            amenList.push("Hair Dryer");
        }
        if (allVar.amenBreakfast === true) {
            amenList.push("Breakfast");
        }
        if (allVar.amenSafetyAndPrivacy === true) {
            amenList.push("Safety and Privacy");
        }
        if (allVar.amenSmokeDetector === true) {
            amenList.push("Smoke Detector");
        }
        if (allVar.amenCarbonMonoxide === true) {
            amenList.push("Carbon Monoxide Detector");
        }
        if (allVar.amenFirstAidKit === true) {
            amenList.push("First Aid Kit");
        }
        if (allVar.amenFireExtinguisher === true) {
            amenList.push("Fire Extinguisher");
        }
        if (allVar.amenPrivateEntrance === true) {
            amenList.push("Private");
        }

        return amenList;
    }

    // final submission
    const finalHostingSubmition = () => {

        const houseRulesList = getHouseRulesList();
        const amenList = getAmenList();
        // data submittion request
        console.log(allVar)
        var myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer 61cbd361e041f6fb48e3d7e87ce6c92d8c88752fe3157193afee47cc2d31d7d2221eaa1c36f475f475bdb50d376f739ce4c9eca75761da8b8f04a5d992f53bf6");
        myHeaders.append("Content-Type", "application/json");

        // "forGuestOnly": allVar.forGuestOnly,
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({

            "userId": JSON.parse(localStorage.getItem("token")).userId,
            "countryName":allVar.countryName,
            "typeOfPropert":allVar.typeOfProperty,
            "whatGuestBook":allVar.whatGuestBook,
            "bedrooms":allVar.bedRooms,
            "noOfBed":allVar.noOfBeds,
            "bedType":allVar.bedType,
            "baths":allVar.baths,
            "noOfGuests":allVar.noOfGuests,
            "listingTitle":allVar.listingTitle,
            "listingDescription":allVar.listingDescription,
            "amenList":amenList,
            "houseRuelsList":houseRulesList,
            "imageList":imageList,
            "additionalHouseRules":allVar.additionalHouseRules,
            "specificDetails":allVar.specifiecDetailsForGuests,
            "noticeBeforeGuestArrival":allVar.noticeBeforeGuestArrial,
            "BookingAvailablity":allVar.BookingAvailability,
            "arriveBefore":allVar.arriveBefore,
            "arriveAfter":allVar.arriveAfter,
            "leaveBefore":allVar.leaveBefore,
            "minStayInNight":allVar.minStayInNight,
            "maxStayInNight":allVar.maxStayInNight,
            "currencyType":allVar.currency,
            "basePrice":allVar.basePrice,
            "discount":allVar.discountOfferedToGuest,
            
            "govermentId":"n",
            "profilePic":"1",
            "addrHouseNumber":allVar.addrHouseNumber,
            "addrStreet":allVar.addrStreet,
            "addrCity":allVar.addrCity,
            "addrState":allVar.addrState,

            "lat": markers[0].lat,
            "lng": markers[0].lng,
            "forGuestOnly": "",
            "video": null
        }),
        redirect: 'follow'
        };

        fetch(url.baseUrl+ "host", requestOptions)
        .then(response => response.json())
        .then(result => history.push("/hotelInfo/"+result.id))
        .catch(error => console.log(error));
    }

    // currency setup
    const setFinalCurrencyVal = e => {
        for (var key in currencyName) {
            if (currencyName[key].code === e.target.value) {
                console.log(currencyName[key].symbol_native);
            }
        }
    }
    let history = useHistory();
    return(

        <>

            {/* tab root */}
            {tab0 && (
                
                <div className="HostYourApartment0M">
                    
                    <div className="headerMinCont">
                    
                            <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt="" /></div>
                    
                    </div>

                    <div className="HostYourApartment2First">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                
                                <div>Hi, {JSON.parse(localStorage.getItem("token")).userName}</div>
                                <h1>Ready to host?</h1>

                                <p style={{width: "80%", fontSize: "13px", marginTop: "30px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                
                                <button onClick={() => {
                                    setTab0(false);
                                    setTab1(true);
                                }}>Get started</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <img src={v1} alt="" />
                        </div>
                    </div>
                </div>

            )}

            {/* tab 1 */}
            {tab1 && (
                
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 1: Start with the basics</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '6.66%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">What kind of place are you listing?</div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Where’s your place located?</div>

                                    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect} >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div className="HostYourApartment21Map11">
                                            <input {...getInputProps({placeholder: "Search ..."})} ref={p11} />

                                            <div className="HostYourApartment21Map111">
                                                {loading ? <div>Loading ... </div> : null}

                                                {suggestions.map((suggestion, key) => {
                                                    const style = {
                                                        backgroundColor: suggestion.active ? "#e5e5e5" : "#fff"
                                                    };

                                                    return <div  className="HostYourApartment21Map1111" {...getSuggestionItemProps(suggestion, {style})} key={key}>{suggestion.description}</div>
                                                })}    
                                            </div>
                                        </div>
                                        )}
                                    </PlacesAutocomplete>

                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Type of property</div>
                                    <select ref={p12} value={allVar.typeOfProperty} onChange={e => setAllVar({...allVar, typeOfProperty: e.target.value})}>
                                        <option value="0">Select type of property</option>
                                        <option value="Guest house">Guest house</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Condonminium">Condonminium</option>
                                        <option value="Loft">Loft</option>
                                        <option value="Serviced Apartment">Serviced Apartment</option>
                                        <option value="House">House</option>
                                        <option value="Townhouse">Townhouse</option>
                                        <option value="Bungalow">Bungalow</option>
                                        <option value="Cabin">Cabin</option>
                                        <option value="Chalet">Chalet</option>
                                        <option value="Cottage">Cottage</option>
                                        <option value="Dome house">Dome house</option>
                                        <option value="Farm stay">Farm stay</option>
                                        <option value="Houseboat">Houseboat</option>
                                        <option value="Earth house">Earth house</option>
                                        <option value="Hut">Hut</option>
                                        <option value="Light house">Light house</option>
                                        <option value="Tiny house">Tiny house</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Hotel">Hotel</option>
                                        <option value="Barn">Barn</option>
                                        <option value="Bus">Bus</option>
                                        <option value="Camper">Camper</option>
                                        <option value="Campsite">Campsite</option>
                                        <option value="Castle">Castle</option>
                                        <option value="Cave">Cave</option>
                                        <option value="Igloo">Igloo</option>
                                        <option value="Island">Island</option>
                                        <option value="Plane">Plane</option>
                                        <option value="Tent">Tent</option>
                                        <option value="Tipi">Tipi</option>
                                        <option value="Tree house">Tree house</option>
                                        <option value="Yurt">Yurt</option>
                                        <option value="Nature Lodge">Plane</option>
                                    </select>
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">What guests book</div>
                                    <select ref={p13} value={allVar.whatGuestBook} onChange={e => setAllVar({...allVar, whatGuestBook: e.target.value})}>
                                        <option value="0">Select what guests book</option>
                                        <option value="Shared Spaces">Shared Spaces</option>
                                        <option value="Entire place">Entire place</option>
                                        <option value="Private Room">Private Room</option>
                                    </select>
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">For guests only?</div>
                                    <select ref={p14} value={allVar.forGuestOnly} onChange={e => setAllVar({...allVar, forGuestOnly: e.target.value})}>
                                        <option value="0">Select the option</option>
                                        <option value="Yes, it's primarily set up for guests">Yes, it's primarily set up for guests</option>
                                        <option value="No, I keep my personal belongings here">No, I keep my personal belongings here</option>
                                    </select>
                                </div>

                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" disabled>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    p11.current.style.border="none";
                                    p11.current.style.borderRadius="40px";
                                    p12.current.style.border="none";
                                    p12.current.style.borderBottom="1px solid #e1e1e1";
                                    p13.current.style.border="none";
                                    p13.current.style.borderBottom="1px solid #e1e1e1";
                                    p14.current.style.border="none";
                                    p14.current.style.borderBottom="1px solid #e1e1e1";
                                    if (p11.current.value === "") {
                                        p11.current.style.border="1px solid red";
                                        p11.current.style.borderRadius="40px";
                                        p11.current.focus();
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if (allVar.typeOfProperty === "0") {
                                        p12.current.style.border="1px solid red";
                                        p12.current.style.borderRadius="4px";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if (allVar.whatGuestBook === "0") {
                                        p13.current.style.border="1px solid red";
                                        p13.current.style.borderRadius="4px";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if (allVar.forGuestOnly === "0") {
                                        p14.current.style.border="1px solid red";
                                        p14.current.style.borderRadius="4px";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else {
                                        setTab1(false);
                                        setTab2(true);
                                    }

                                }}>Next</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <div className="HostYourApartment2E21">
                                <div className="HostYourApartment2E21Img"><img src={lightBulbIcon} alt="" /></div>
                                <div className="HostYourApartment2E211">
                                    <div className="HostYourApartment2E2111">Your personal belongings</div>
                                    <div className="HostYourApartment2E2112">Guests like to know if they'll use personal things like pictures or clothes, when they're staying in your place.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* tab 2 */}
            {tab2 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 2: Some room informations</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '13.32%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">Room information</div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Bedrooms</div>
                                    <select ref={p21} value={allVar.bedRooms} onChange={e => setAllVar({...allVar, bedRooms: e.target.value})}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">No. of beds</div>
                                    <select value={allVar.noOfBeds} onChange={e => setAllVar({...allVar, noOfBeds: e.target.value})}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                    </select>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Bed type</div>
                                    <select value={allVar.bedType} onChange={e => setAllVar({...allVar, bedType: e.target.value})}>
                                        <option value="Single">Single</option>
                                        <option value="Double">Double</option>
                                        <option value="King">King</option>
                                        <option value="Queen">Queen</option>
                                        <option value="Sofa Bed">Sofa Bed</option>
                                        <option value="Couch">Couch</option>
                                        <option value="Air mattress">Air mattress</option>
                                        <option value="Floor mattress">Floor mattress</option>
                                        <option value="Bunk Bed">Bunk Bed</option>
                                        <option value="Toddler Bed">Toddler Bed</option>
                                        <option value="Crib">Crib</option>
                                        <option value="Water Bed">Water Bed</option>
                                        <option value="Hammock">Hammock</option>
                                    </select>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Baths</div>
                                    <select value={allVar.baths} onChange={e => setAllVar({...allVar, baths: e.target.value})}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10+">10+</option>
                                    </select>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">No. of guests</div>
                                    <select value={allVar.noOfGuests} onChange={e => setAllVar({...allVar, noOfGuests: e.target.value})}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21+">21+</option>
                                    </select>
                                </div>

                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    setTab2(false);
                                    setTab1(true);
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    p21.current.style.border="none";
                                    p21.current.style.borderBottom="1px solid #e1e1e1";
                                    if (allVar.bedRooms === "0") {
                                        p21.current.style.border="1px solid red";
                                        p21.current.style.borderRadius="4px";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else {
                                        setTab2(false);
                                        setTab3(true);
                                    }
                                }}>Next</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <div className="HostYourApartment2E21">
                                <div className="HostYourApartment2E21Img"><img src={lightBulbIcon} alt="" /></div>
                                <div className="HostYourApartment2E211">
                                    <div className="HostYourApartment2E2112">The number and type of beds you have determines. How many guests on stay comfortably. Sleeping arrangements help guests understand what the sleeing arrangments are like.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* tab 3 */}
            {tab3 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 3: Familiar your spaces</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '19.98%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">Describe your space</div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Listing title</div>
                                    <input ref={p32} type="text" placeholder="Enter the title ..." value={allVar.listingTitle} onChange={e => setAllVar({...allVar, listingTitle: e.target.value})} />
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Listing description (Optional)</div>
                                    <textarea placeholder="Enter the description ..." value={allVar.listingDescription} onChange={e => setAllVar({...allVar, listingDescription: e.target.value})} ></textarea>
                                </div>

                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    setTab3(false);
                                    setTab2(true);
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    p32.current.style.border="1px solid #e1e1e1";
                                    if (allVar.listingTitle === "") {
                                        p32.current.style.border="1px solid red";
                                        p32.current.focus();
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else {
                                        setTab3(false);
                                        setTab4(true);
                                    }
                                }}>Next</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <img src={v2} alt="" />
                        </div>
                    </div>
                </div>
            )}

            {/* tab 4 */}
            {tab4 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 4: Select amenities</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '26.64%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">Amenities</div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Essentials (Towels, bed sheets, soap, toilet paper, pillows etc.)</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenEssentials} onChange={e => setAllVar({...allVar, amenEssentials: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Wifi</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenWifi} onChange={e => setAllVar({...allVar, amenWifi: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Laptop friendly workspace</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenLapFriendlyWorkSpace} onChange={e => setAllVar({...allVar, amenLapFriendlyWorkSpace: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">TV</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenTV} onChange={e => setAllVar({...allVar, amenTV: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Kitchen</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenKitchen} onChange={e => setAllVar({...allVar, amenKitchen: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Free parking</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenParking} onChange={e => setAllVar({...allVar, amenParking: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Hot water</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenHotWater} onChange={e => setAllVar({...allVar, amenHotWater: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Heating</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenHeating} onChange={e => setAllVar({...allVar, amenHeating: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Air conditioning</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenAirConditioner} onChange={e => setAllVar({...allVar, amenAirConditioner: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Gym</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenGym} onChange={e => setAllVar({...allVar, amenGym: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Elevator</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenElevator} onChange={e => setAllVar({...allVar, amenElevator: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Indoor fire place</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenIndoorFirePlace} onChange={e => setAllVar({...allVar, amenIndoorFirePlace: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Hangers</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenHangers} onChange={e => setAllVar({...allVar, amenHangers: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Pool</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenPool} onChange={e => setAllVar({...allVar, amenPool: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Hot tub</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenHotTab} onChange={e => setAllVar({...allVar, amenHotTab: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Washer</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenWasher} onChange={e => setAllVar({...allVar, amenWasher: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Dryer</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenDryer} onChange={e => setAllVar({...allVar, amenDryer: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Shampoo</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenShampoo} onChange={e => setAllVar({...allVar, amenShampoo: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Hair Dryer</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenHairDryer} onChange={e => setAllVar({...allVar, amenHairDryer: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Breakfast</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenBreakfast} onChange={e => setAllVar({...allVar, amenBreakfast: e.target.checked})} /></div>
                                </div>

                                <div className="HostYourApartment211" style={{marginTop: "30px"}}>Important Amenities</div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Safety and Privacy</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenSafetyAndPrivacy} onChange={e => setAllVar({...allVar, amenSafetyAndPrivacy: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Smoke detector</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenSmokeDetector} onChange={e => setAllVar({...allVar, amenSmokeDetector: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Carbon monoxide detector</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenCarbonMonoxide} onChange={e => setAllVar({...allVar, amenCarbonMonoxide: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">First aid kit</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenFirstAidKit} onChange={e => setAllVar({...allVar, amenFirstAidKit: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Fire extinguisher</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenFireExtinguisher} onChange={e => setAllVar({...allVar, amenFireExtinguisher: e.target.checked})} /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Private entrance</div>
                                    <div className="HostYourApartment2122"><input type="checkbox" checked={allVar.amenPrivateEntrance} onChange={e => setAllVar({...allVar, amenPrivateEntrance: e.target.checked})} /></div>
                                </div>

                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    setTab4(false);
                                    setTab3(true);
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    if (getAmenList().length === 0) {
                                        setErrTab1(true);
                                        setInterval(() => setErrTab1(false), errorDisplayTime);
                                    } else {
                                        setTab4(false);
                                        setTab5(true);
                                    }
                                }}>Next</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <div className="HostYourApartment2E21">
                                <div className="HostYourApartment2E21Img"><img src={lightBulbIcon} alt="" /></div>
                                <div className="HostYourApartment2E211">
                                    <div className="HostYourApartment2E2112">Providing the essential help guests feels at home in your places. <br /><br />Some hosts provide breakfast or just coffee and tea. None of these things are required but sometimes they add a nice touch to help guests feel welcome.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* tab 5 */}
            {tab5 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0" style={{fontSize: "14px"}}>Step 5: Describe your house using photos</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '33.33%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">Photos and Video</div>
                                <input type="file" id="file" accept="image/jpg, image/jpeg, image/png" onChange={e => uploadImageHandler(e)} multiple style={{display: "none"}} />

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Share photos and a short video of your listing with guests.</div>
                                    <label htmlFor="file">Take Picture</label>
                                </div>

                                {/* result */}
                                <div className="uploadedImageCont">
                                    {renderPhoto(selectedImage)}
                                </div>

                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    setTab5(false);
                                    setTab4(true);
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    if (selectedImage.length === 0) {
                                        setErrTab2(true);
                                        setInterval(() => setErrTab2(false), errorDisplayTime);
                                    } else {
                                        setTab5(false);
                                        setTab7(true);
                                    }
                                }}>Next</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <img src={v3} alt="" />
                        </div>
                    </div>
                </div>
            )}

            {/* tab 6 */}
             {/* {tab6 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 6: Add photos</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '39.96%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21"> 

                        
                                 <div className="HostYourApartment212">
                                    <form onSubmit={handleClickUploadImage}>
                             <input type="file" accept="video/*" />
                             <label htmlFor="file">Select video</label>
                                        {/* {videoUploading && <div>Uploading ...</div>} */}
                                       
                                        {/* <button type="submit">Upload Video</button>
                                    </form>
                                </div>  */}

                                {/* {videoList.length > 0 ? (<div>t<div>) : (<div>f</div>)} */}

                             {/* </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    setTab6(false);
                                    setTab5(true);
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    setTab6(false);
                                    setTab7(true);
                                }}>Continue to listing</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <img src={v4} alt="" />
                        </div>
                    </div>
                </div>
            )}  */}

            {/* tab 7 */}
            {tab7 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 7: Some house rules</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '46.62%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">Some house rules</div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Suitable for kids (1-12)</div>
                                    <div className="HostYourApartment2122">
                                    <Switch 
                                        onChange={handleChangeRule1} 
                                        checked={stateRule1.checked}
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={30} />
                                    </div>
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Pets allowed</div>
                                    <div className="HostYourApartment2122">
                                    <Switch 
                                        onChange={handleChangeRule2} 
                                        checked={stateRule2.checked}
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={30} />
                                    </div>
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Smoking allowed</div>
                                    <div className="HostYourApartment2122">
                                    <Switch 
                                        onChange={handleChangeRule3} 
                                        checked={stateRule3.checked}
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={30} />
                                    </div>
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Events/Parties allowed</div>
                                    <div className="HostYourApartment2122">
                                    <Switch 
                                        onChange={handleChangeRule4} 
                                        checked={stateRule4.checked}
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={30} />
                                    </div>
                                </div>

                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    setTab7(false);
                                    setTab5(true);
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    setTab7(false);
                                    setTab8(true);
                                }}>Next</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <img src={v5} alt="" />
                        </div>
                    </div>
                </div>
            )}

            {/* tab 8 */}
            {tab8 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 8: Additional rules</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '53.28%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">Addition house rules</div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Additional rules</div>
                                    <textarea placeholder="Enter the rules ..." value={allVar.additionalHouseRules} onChange={e => setAllVar({...allVar, additionalHouseRules: e.target.value})}></textarea>
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Specific details guests must know about your space</div>
                                    <textarea placeholder="Enter the specific details ..." value={allVar.specifiecDetailsForGuests} onChange={e => setAllVar({...allVar, specifiecDetailsForGuests: e.target.value})}></textarea>
                                </div>

                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    setTab8(false);
                                    setTab7(true);
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    setTab8(false);
                                    setTab9(true);
                                }}>Next</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <img src={v6} alt="" />
                        </div>
                    </div>
                </div>
            )}

            {/* tab 9 */}
            {tab9 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 9: Booking informations</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '59.94%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">Booking information</div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Notice before guest arrival</div>
                                    <select ref={p91} value={allVar.noticeBeforeGuestArrial} onChange={e => setAllVar({...allVar, noticeBeforeGuestArrial: e.target.value})}>
                                        <option value="0">Select the time</option>
                                        <option value="1 day">At least 1 day</option>
                                        <option value="2 day">At least 2 days</option>
                                        <option value="3 day">At least 3 days</option>
                                        <option value="4 day">At least 4 days</option>
                                        <option value="5 day">At least 5 days</option>
                                    </select>
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Booking availability</div>
                                    <select ref={p92} value={allVar.BookingAvailability} onChange={e => setAllVar({...allVar, BookingAvailability: e.target.value})}>
                                        <option value="0">Select the time</option>
                                        <option value="All">All future dates</option>
                                        <option value="12m">12 months in advance</option>
                                        <option value="9m">9 months in advance</option>
                                        <option value="6m">6 months in advance</option>
                                        <option value="3m">3 months in advance</option>
                                        <option value="1m">1 month in advance</option>
                                    </select>
                                </div>

                                <div className="HostYourApartment12345">
                                    <div className="HostYourApartment212121">Arrive before</div>
                                    {/* <input ref={p93} value={allVar.arriveBefore} type="time" step="3600" onChange={e => setAllVar({...allVar, arriveBefore: e.target.value})} /> */}
                                    <select style={{outline: 'none', width: '60%', border: 'none', borderBottom:' 1px solid #e1e1e1', color: '#818181',
                                  padding: '6px 8px', fontFamily: ' sansSerif', marginTop: '8px'}}
                                  ref={p93} value={allVar.arriveBefore} onChange={e => setAllVar({...allVar, arriveBefore: e.target.value})}>
                                        <option value="0">Select the hours</option>
                                        <option value="All">1</option>
                                        <option value="12m">2</option>
                                        <option value="9m">3</option>
                                        <option value="6m">4</option>
                                        <option value="3m">5</option>
                                        <option value="1m">6</option>
                                        <option value="All1">7</option>
                                        <option value="12m1">8</option>
                                        <option value="9m1">9</option>
                                        <option value="6m1">10</option>
                                        <option value="3m1">11</option>
                                        <option value="1m1">12</option>
                                    </select>
                                    <select style={{outline: 'none', width: '30%', border: 'none', borderBottom:' 1px solid #e1e1e1', color: '#818181',
                                  padding: '6px 8px', fontFamily: ' sansSerif', marginTop: '8px'}}  ref={p93} value={allVar.arriveBeforeAmpm} onChange={e => setAllVar({...allVar, arriveBeforeAmpm: e.target.value})}>
                                        <option value="0">Select the hours</option>
                                        <option value="All">AM</option>
                                        <option value="12m">PM</option></select>
                                </div>

                                <div className="HostYourApartment12345">
                                    <div className="HostYourApartment212121">Arrive after</div>
                                    {/* <input ref={p94} value={allVar.arriveAfter} type="time" onChange={e => setAllVar({...allVar, arriveAfter: e.target.value})} /> */}
                                    <select style={{outline: 'none', width: '60%', border: 'none', borderBottom:' 1px solid #e1e1e1', color: '#818181',
                                  padding: '6px 8px', fontFamily: ' sansSerif', marginTop: '8px'}} ref={p94} value={allVar.arriveAfter} onChange={e => setAllVar({...allVar, arriveAfter: e.target.value})}>
                                        <option value="0">Select the hours</option>
                                        <option value="All">1</option>
                                        <option value="12m">2</option>
                                        <option value="9m">3</option>
                                        <option value="6m">4</option>
                                        <option value="3m">5</option>
                                        <option value="1m">6</option>
                                        <option value="All1">7</option>
                                        <option value="12m1">8</option>
                                        <option value="9m1">9</option>
                                        <option value="6m1">10</option>
                                        <option value="3m1">11</option>
                                        <option value="1m1">12</option>
                                    </select>
                                    <select style={{outline: 'none', width: '30%', border: 'none', borderBottom:' 1px solid #e1e1e1', color: '#818181',
                                  padding: '6px 8px', fontFamily: ' sansSerif', marginTop: '8px'}} ref={p94} value={allVar.leaveBeforeAmpm} onChange={e => setAllVar({...allVar, leaveBeforeAmpm: e.target.value})}>
                                        <option value="0">Select the hours</option>
                                        <option value="All">AM</option>
                                        <option value="12m">PM</option></select>
                                </div>

                                <div className="HostYourApartment12345">
                                    <div className="HostYourApartment212121">Leave before</div>
                                    {/* <input ref={p95} value={allVar.leaveBefore} type="time" onChange={e => setAllVar({...allVar, leaveBefore: e.target.value})} /> */}
                                    <select style={{outline: 'none', width: '60%', border: 'none', borderBottom:' 1px solid #e1e1e1', color: '#818181',
                                  padding: '6px 8px', fontFamily: ' sansSerif', marginTop: '8px'}} ref={p95} value={allVar.leaveBefore} onChange={e => setAllVar({...allVar, leaveBefore: e.target.value})}>.
                                        <option value="0">Select the hours</option>
                                        <option value="All">1</option>
                                        <option value="12m">2</option>
                                        <option value="9m">3</option>
                                        <option value="6m">4</option>
                                        <option value="3m">5</option>
                                        <option value="1m">6</option>
                                        <option value="All1">7</option>
                                        <option value="12m1">8</option>
                                        <option value="9m1">9</option>
                                        <option value="6m1">10</option>
                                        <option value="3m1">11</option>
                                        <option value="1m1">12</option>
                                    </select>
                                    <select style={{outline: 'none', width: '30%', border: 'none', borderBottom:' 1px solid #e1e1e1', color: '#818181',
                                  padding: '6px 8px', fontFamily: ' sansSerif', marginTop: '8px'}} ref={p94} value={allVar.arriveAfter} onChange={e => setAllVar({...allVar, arriveAfter: e.target.value})}>
                                        <option value="0">Select the hours</option>
                                        <option value="All">AM</option>
                                        <option value="12m">PM</option></select>
                            </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Minimum stay in nights</div>
                                    <input ref={p96} value={allVar.minStayInNight} type="number" min="1" max="999" placeholder="Enter here ..." onChange={e => {
                                        if (e.target.value < 0) {
                                            setErrTab4(true);
                                            setInterval(() => setErrTab4(false), errorDisplayTime);
                                        } else if (e.target.value > 999) {
                                            setErrTab5(true);
                                            setInterval(() => setErrTab5(false), errorDisplayTime);
                                        } else {
                                            setAllVar({...allVar, minStayInNight: e.target.value})
                                        }
                                    }} />
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Maximum stay in nights</div>
                                    <input ref={p97} value={allVar.maxStayInNight} type="number" min="1" max="999" placeholder="Enter here ..." onChange={e => {
                                        if (e.target.value < 0) {
                                            setErrTab4(true);
                                            setInterval(() => setErrTab4(false), errorDisplayTime);
                                        } else if (e.target.value > 999) {
                                            setErrTab5(true);
                                            setInterval(() => setErrTab5(false), errorDisplayTime);
                                        } else {
                                            setAllVar({...allVar, maxStayInNight: e.target.value})
                                        }
                                    }} />
                                </div>

                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    setTab9(false);
                                    setTab8(true);
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    p91.current.style.border="none";
                                    p91.current.style.borderBottom="1px solid #e1e1e1";
                                    p92.current.style.border="none";
                                    p92.current.style.borderBottom="1px solid #e1e1e1";
                                    p93.current.style.border="1px solid #e1e1e1";
                                    p94.current.style.border="1px solid #e1e1e1";
                                    p95.current.style.border="1px solid #e1e1e1";
                                    p96.current.style.border="1px solid #e1e1e1";
                                    p97.current.style.border="1px solid #e1e1e1";
                                    if(allVar.noticeBeforeGuestArrial === "0") {
                                        p91.current.style.border="none";
                                        p91.current.style.borderRadius="4px";
                                        p91.current.style.border="1px solid red";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if(allVar.BookingAvailability === "0") {
                                        p92.current.style.border="none";
                                        p92.current.style.borderRadius="4px";
                                        p92.current.style.border="1px solid red";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if(allVar.arriveBefore === "") {
                                        p93.current.style.border="1px solid red";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if(allVar.arriveAfter === "") {
                                        p94.current.style.border="1px solid red";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if(allVar.leaveBefore === "") {
                                        p95.current.style.border="1px solid red";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if(allVar.minStayInNight === "") {
                                        p96.current.style.border="1px solid red";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if(allVar.maxStayInNight === "") {
                                        p97.current.style.border="1px solid red";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else {
                                        setTab9(false);
                                        setTab10(true);
                                    }
                                }}>Next</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <img src={v8} alt="" />
                        </div>
                    </div>
                </div>
            )}

            {/* tab 10 */}
            {tab10 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 10: Your pricing</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '66.6%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">Pricing</div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Currency</div>
                                    <select ref={p10_1} value={allVar.currency} onChange={e => {setAllVar({...allVar, currency: e.target.value});setFinalCurrencyVal(e)}}>
                                        <option value="0">Select currency</option>
                                        {
                                            currencyName.sort(function(a, b) {
                                                if(a.name < b.name) return -1;
                                                if(a.name > b.name) return 1;
                                                return 0;
                                            })
                                            .map(val => <option value={val.symbol_native}>{val.name} ({val.symbol_native})</option>)
                                        }
                                    </select>
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121" style={{color: "black", fontSize: "17px"}}>Base price</div>
                                    <input ref={p10_2} value={allVar.basePrice} type="number" style={{borderColor: "grey", color: "black", boxShadow: "3px 3px 5px #9E9E9E"}} placeholder="Enter the price ..." onChange={e => setAllVar({...allVar, basePrice: e.target.value})} />
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Discount offered to guests</div>
                                    <select ref={p10_3} value={allVar.discountOfferedToGuest} onChange={e => setAllVar({...allVar, discountOfferedToGuest: e.target.value})}>
                                        <option value="0">None</option>
                                        <option value="5">5%</option>
                                        <option value="10m">10%</option>
                                        <option value="15">15%</option>
                                        <option value="20">20%</option>
                                        <option value="25">25%</option>
                                    </select>
                                </div>

                                {/* <div>
                                    <span>$</span>
                                    <span>70.00 / night</span>
                                    <span><s>7.00 $</s></span>
                                </div> */}

                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    setTab10(false);
                                    setTab9(true);
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    p10_1.current.style.border="none";
                                    p10_1.current.style.borderBottom="1px solid #e1e1e1";
                                    p10_2.current.style.border="1px solid #e1e1e1";
                                    p10_3.current.style.border="none";
                                    p10_3.current.style.borderBottom="1px solid #e1e1e1";
                                    if (allVar.currency === "0") {
                                        p10_1.current.style.border="none";
                                        p10_1.current.style.borderRadius="4px";
                                        p10_1.current.style.border="1px solid red";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if (allVar.basePrice === "") {
                                        p10_2.current.style.border="1px solid red";
                                        p10_2.current.focus();
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if (allVar.discountOfferedToGuest === "0") {
                                        p10_3.current.style.border="none";
                                        p10_3.current.style.borderRadius="4px";
                                        p10_3.current.style.border="1px solid red";
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else {
                                        setTab10(false);
                                        setTab11(true);
                                    }
                                }}>Next</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <img src={v7} alt="" />
                        </div>
                    </div>
                </div>
            )}

            {/* tab 11 */}
            {tab11 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 11: State laws</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '73.26%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">State Laws</div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121Para">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing.
                                    </div>
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121Para">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing.
                                    </div>
                                </div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121Para">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing.
                                    </div>
                                </div>

                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    setTab11(false);
                                    setTab10(true);
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    console.log(docStatus)
                                    if (docStatus === 0) {
                                        setTab11(false);
                                        setTab12(true);
                                    } else {
                                        setTab11(false);
                                        setTab13(true);
                                    }
                                }}>Next</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <img src={v8} alt="" />
                        </div>
                    </div>
                </div>
            )}

            {/* tab12  */}
            {tab12 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 12: Your government ID's</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '79.92%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">Wrapping up</div>

                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121Para">
                                        Provide a government-issued ID and a face photo of yourself    
                                    </div>
                                </div>

                                <div className="HostApart90">
                                    <input type="file" id="gov" accept="image/jpg, image/jpeg, image/png" onChange={e => uploadGovImageHandler(e)} style={{display: "none"}} />
                                    <div className="HostApart901">Government Id</div>
                                    <label className="HostApart902" htmlFor="gov">Add</label>
                                </div>
                                <div className="HostApart90">
                                    <input type="file" id="face" accept="image/jpg, image/jpeg, image/png" onChange={e => uploadFaceImageHandler(e)} style={{display: "none"}} />
                                    <div className="HostApart901">Face Photo</div>
                                    <label className="HostApart902" htmlFor="face">Add</label>
                                </div>
                                
                                {/* result */}
                                {selectedGovImage && (
                                    <div className="uploadedImageCont">
                                        <div className="uploadedImage"><img src={selectedGovImage} alt="" /></div>
                                    </div>
                                )}
                                {selectedFaceImage && (
                                    <div className="uploadedImageCont">
                                        <div className="uploadedImage"><img src={selectedFaceImage} alt="" /></div>
                                    </div>
                                )}

                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    setTab12(false);
                                    setTab11(true);
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    if (selectedGovImage === null) {
                                        setErrTab6(true);
                                        setInterval(() => setErrTab6(false), errorDisplayTime);
                                    } else if (selectedFaceImage === null) {
                                        setErrTab6(true);
                                        setInterval(() => setErrTab6(false), errorDisplayTime);
                                    } else {
                                        var myHeaders = new Headers();
                                        myHeaders.append("Content-Type", "application/json");
                                        var raw = JSON.stringify({
                                            "photo_id_url": selectedFaceImage,
                                            "doc_url": selectedGovImage,
                                            "userId": JSON.parse(localStorage.getItem("token")).userId
                                        });
                                        var requestOptions = {
                                          method: 'POST',
                                          headers: myHeaders,
                                          body: raw,
                                          redirect: 'follow'
                                        };
                                        fetch(`${url.baseUrl}updateDocs`, requestOptions)
                                            .then(response => response.json())
                                            .then(res => {
                                                console.log(res);
                                                if (res.code === 200) {
                                                    setTab12(false);
                                                    setTab13(true);
                                                }
                                            })
                                            .catch(error => console.log('error', error));
                                    }
                                }}>Next</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <img src={sidePic} alt="" />
                        </div>
                    </div>
                </div>
            )}

            {/* tab 13 */}
            {tab13 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 13: Enter full address</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '86.58%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">Enter address</div>

                                <div className="HostYourApartment212Addres">

                                    <div className="HostYourApartment212">
                                        <div className="HostYourApartment2121" style={{width: "100%"}}>House no.</div>
                                        <input ref={p13_1} value={allVar.addrHouseNumber} type="number" style={{width: "100px"}} placeholder="Enter the house number ..."  onChange={e => setAllVar({...allVar, addrHouseNumber: e.target.value})}/>
                                    </div>

                                    <div className="HostYourApartment212">
                                        <div className="HostYourApartment2121">Street</div>
                                        <input ref={p13_2} value={allVar.addrStreet} type="text" placeholder="Enter the street name ..."  onChange={e => setAllVar({...allVar, addrStreet: e.target.value})}/>
                                    </div>

                                    <div className="HostYourApartment212">
                                        <div className="HostYourApartment2121">City</div>
                                        <input ref={p13_3} value={allVar.addrCity} type="text" placeholder="Enter the city name ..."  onChange={e => setAllVar({...allVar, addrCity: e.target.value})}/>
                                    </div>

                                    <div className="HostYourApartment212">
                                        <div className="HostYourApartment2121">State</div>
                                        <input ref={p13_4} value={allVar.addrState} type="text" placeholder="Enter your state ..."  onChange={e => setAllVar({...allVar, addrState: e.target.value})}/>
                                    </div>

                                </div>


                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    if (docStatus === 0) {
                                        setTab13(false);
                                        setTab12(true);
                                    } else {
                                        setTab13(false);
                                        setTab11(true);
                                    }
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={() => {
                                    p13_1.current.style.border="1px solid #e1e1e1";
                                    p13_2.current.style.border="1px solid #e1e1e1";
                                    p13_3.current.style.border="1px solid #e1e1e1";
                                    p13_4.current.style.border="1px solid #e1e1e1";
                                    if (allVar.addrHouseNumber === "") {
                                        p13_1.current.style.border="1px solid red";
                                        p13_1.current.focus();
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if (allVar.addrStreet === "") {
                                        p13_2.current.style.border="1px solid red";
                                        p13_2.current.focus();
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if (allVar.addrCity === "") {
                                        p13_3.current.style.border="1px solid red";
                                        p13_3.current.focus();
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else if (allVar.addrState === "") {
                                        p13_4.current.style.border="1px solid red";
                                        p13_4.current.focus();
                                        setErrTab(true);
                                        setInterval(() => setErrTab(false), errorDisplayTime);
                                    } else {
                                        setTab13(false);
                                        setTab14(true);
                                    }
                                }}>Next</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <div className="HostYourApartment2E21">
                                <div className="HostYourApartment2E21Img"><img src={lightBulbIcon} alt="" /></div>
                                <div className="HostYourApartment2E211">
                                    <div className="HostYourApartment2E2112">Your exact address will only be shared with confirmed guests.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* tab 14 */}
            {tab14 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 14: Map your location</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '93.24%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        
                        <div className="HostYourApartment21" style={{width: '95%'}}>
                            <div className="HostYourApartment21Map2">

                                <GoogleMap 
                                    mapContainerStyle={mapContainerStyle} 
                                    zoom={14} 
                                    center={center} 
                                    options={option}
                                    onClick={e => onMapClick(e)}
                                    onLoad={onMapLoad}
                                >

                                    {markers.map(marker => (<Marker key={marker.lat} position={{lat: marker.lat, lng: marker.lng}} />))}

                                </GoogleMap>

                            </div>
                        </div>

                        <div className="HostYourApartment22">
                            <button className="HostYourApartment221" onClick={() => {
                                setTab14(false);
                                setTab13(true);
                            }}>Back</button>
                            <button className="HostYourApartment222" onClick={() => {
                                if (markers.length === 0) {
                                    setErrTab3(true);
                                    setInterval(() => setErrTab3(false), errorDisplayTime);
                                } else {
                                    setTab14(false);
                                    setTab15(true);
                                }
                            }}>Preview</button>
                        </div>
                    </div>
                </div>
            )}

            {/* tab 15
            {tab15 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 15: Preview your inputs</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '100%'}}></div>
                    </div>
                    <div className="HostYourApartment2">
                        <div className="HostYourApartment2E1">
                            <div className="HostYourApartment21">
                                <div className="HostYourApartment211">Previews</div>

                                <div className="uploadedImageCont1">
                                    {renderPhoto(selectedImage)}
                                </div>

                                {/* <div>
                                    <span>{allVar.currency}</span>
                                    <span>{allVar.basePrice} / per night</span>
                                    <span>{allVar.discountOfferedToGuest}</span>
                                </div> */}

                                {/* <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Title - <span>{allVar.listingTitle}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Country - <span>{allVar.countryName}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>           
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Type of property - <span>{allVar.typeOfProperty}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">What guests book - <span>{allVar.whatGuestBook}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Number of bedrooms - <span>{allVar.bedRooms}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Number of beds - <span>{allVar.noOfBeds}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Bed type - <span>{allVar.bedType}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Number of bathrooms - <span>{allVar.baths}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Number of guests - <span>{allVar.noOfGuests}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">House no. - <span>{allVar.addrHouseNumber}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Street name - <span>{allVar.addrStreet}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">City - <span>{allVar.addrCity}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">State - <span>{allVar.addrState}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Notice before guest arrival - <span>{allVar.noticeBeforeGuestArrial}</span></div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <div className="HostYourApartment212">
                                    <div className="HostYourApartment2121">Amenties</div>
                                    <div className="HostYourApartment2123"><img src={CheckGreenIcon} alt="" /></div>
                                </div>
                                <ul style={{marginBottom: '10px', float: 'left', width: '100%'}}>
                                    {getAmenList().map((item, key) => {
                                        return(
                                            <li key={key} style={{fontSize: '14px'}}>{key+1}. {item}</li>
                                        );
                                    })}
                                </ul>

                            </div>
                            <div className="HostYourApartment22">
                                <button className="HostYourApartment221" onClick={() => {
                                    setTab15(false);
                                    setTab14(true);
                                }}>Back</button>
                                <button className="HostYourApartment222" onClick={finalHostingSubmition}>Submit</button>
                            </div>
                        </div>
                        <div className="HostYourApartment2E2">
                            <img src={v8} alt="" />
                        </div>
                    </div>
                </div>
            )} */} 


{/* ...................................................................................................................... */}

{tab15 && (
                <div className="HostYourApartment0M">
                    <div className="HostYourApartment0">Step 15: Preview your inputs</div>
                    <div className="HostYourApartment1">
                        <div className="HostYourApartment11" style={{width: '100%'}}></div> 
                   
                    <div className="carInfo0Cont">
                        
                        <div className="reviews0">
                            {imagetab1 &&(

                                <div className="carInfo01">     
                                {imageList[0] ? <div className="carInfo01img1"><img src={imageList[0]} alt="" /></div> : <div className="carInfo01img1"><img src={bg} alt="" /></div>}
                                <div className="carInfo01img2">
                                    <div className="carInfo01img21">
                                        {imageList[1] ? <img src={imageList[1]} alt="" /> : <img src={bg} alt="" />}
                                    </div>
                                    <div className="carInfo01img21" style={{marginTop: '10px', height: '50%'}}>
                                        {imageList[2] ? <img src={imageList[2]} alt="" /> : <img src={bg} alt="" />}
                                    </div>
                                    
                                </div>
                                <div className="carInfo01img3" onClick={() => {setImageTab2(true); setImageTab1(false)}} >5+ Photos </div>
                                </div>
                                )}

                                {imagetab2 &&(
                                    <ImageSlider images={imageList} />
                                )}

                            <div style={{float: "left"}}>
                                <div className="hotelsinfoo1">
                                    <div className="hotelInfo0S">
                                        <div className="hotelInfo1">
                                            <div className="hotelInfo01">{allVar.listingTitle}</div>
                                            <div className="hotelInfo01I0">{allVar.addrStreet}, {allVar.addrCity}, {allVar.addrState}</div>
                                            <div style={{marginBottom: "15px", marginTop: "5px", float: "left"}}>{allVar.noOfGuests} guests . {allVar.bedrooms} bedroom . {allVar.noOfBed} bed . {allVar.baths} bathroom</div>
                                        </div>
                                    </div>

                                     <div className="hotelInfo0S1">
                                        <div className="hotelInfo1">
                                            <div className="hotelInfo01">About Apartment</div>
                                            <div className="hotelInfo01I1">
                                                {allVar.listingDescription}
                                            </div>
                                        </div>
                                    </div>
                                    
                            
                        
                                       <div className="hotelInfo0S1">
                                      <div className="reviews10 ">
                                          <div className="hotelInfo01">Amenities</div>
                                          {getAmenList().map((item, key) => <div className="hotelInfo0198" >{key+1}. {item}</div>)}
                                      </div>
                                  </div>   </div>
                                      </div>
        
                            <div className="hotelInfo0S1">
                                <div className="hotelInfo1">
                                    <div className="reviews0111">Map</div>
                                </div>
                            </div>
                            <div className="Map00">
                                <Map lat={markers[0].lat} lng={markers[0].lng} />
                            </div>
                        </div>
                    </div>
                    <div className="HostYourApartment22"> 
                                <button className="HostYourApartment321" onClick={() => {
                                    setTab15(false);
                                    setTab14(true);
                                }}>Back</button>
                                <button className="HostYourApartment123" onClick={finalHostingSubmition}>Publish</button>
                            </div>
 
                    <div className="reviews">
                        <div className="carInfo10">
                            <div className="carInfo101">$ {allVar.basePrice}/night</div>
                          
                        </div>
                        <div className="carInfo11">
                            <img src={JSON.parse(localStorage.getItem("token")).userProfile}alt="" />
                        </div>
                        <div className="carInfo12">
                        {JSON.parse(localStorage.getItem("token")).userName}
                            </div>
                        
                            <div className="carInfo13">(Host)</div>
                   
                        <div className="carInfo14">
                            <span className="carInfo141">
                                4.7 <span className="carInfo1411"><img src="" alt="" /></span>
                                . 68 Reviews
                            </span>
                        </div>
                       
                    </div> 
                     
                </div>

                

                    </div>
                )
    }



































            {/* Errors */}
            {errTab && (
                <div className="HostYourApartmentError0">Please enter the field!!!</div>
            )}
            {errTab1 && (
                <div className="HostYourApartmentError0">You must select atleast one Amenity!!!</div>
            )}
            {errTab2 && (
                <div className="HostYourApartmentError0">You must select atleast one Image!!!</div>
            )}
            {errTab3 && (
                <div className="HostYourApartmentError0">You must select your position!!!</div>
            )}
            {errTab4 && (
                <div className="HostYourApartmentError0">You must input positive values!!!</div>
            )}
            {errTab5 && (
                <div className="HostYourApartmentError0">You must input below 999!!!</div>
            )}
            {errTab6 && (
                <div className="HostYourApartmentError0">You must upload documents !!!</div>
            )}

            {mainLoad && (
                <div className={ds.mainLoad}><img className={ds.mainLoad0} src={loading} alt="" /></div>
            )}

        </>

    );
}