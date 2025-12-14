import React from 'react';
import Carousel from './Carousel';
import AvailableLoans from './AvailableLoans';
import HowItWorks from './HowItWorks';
import CustomerFeedback from './Review';
import WhyChoose from './ChooseUs';
import LoanCategories from './LoanCat';
import CoreBankingServices from './Corebanking';

const Home = () => {
    return (
        <div>
            <title>MicroCredX-Home</title>
            <Carousel></Carousel>
           <CoreBankingServices></CoreBankingServices>
            <AvailableLoans></AvailableLoans>
            <HowItWorks></HowItWorks>
            
            <WhyChoose></WhyChoose>
            <CustomerFeedback></CustomerFeedback>
           
        </div>
    );
};

export default Home;