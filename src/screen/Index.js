import '../css/index.css';
import PopularDestination from '../components/PopularDestination';
import BestDeals from '../components/BestDeals';
import LiveAnyWhere from '../components/LiveAnyWhere';
import JoinMillionsOfHosts from '../components/JoinMillionsOfHosts';
import Footer from '../components/Footer';
import { Component } from 'react';
import Header from '../components/Header';

export default class Index extends Component {

  // async componentDidMount() {
  //   const resp = await fetch("http://localhost:8080/");
  //   const data = await resp.json();
  //   console.log(data);
  // }

  render() {
    return (
    
      <>
      
        <Header />
        <PopularDestination />
        <BestDeals />
        <LiveAnyWhere />
        <JoinMillionsOfHosts />
        <Footer />
      
      </>
  
    );
  }
  
}
