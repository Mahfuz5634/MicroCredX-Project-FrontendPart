import React from 'react';
import Carousel from './Carousel';
import AvailableLoans from './AvailableLoans';
import HowItWorks from './HowItWorks';
import CustomerFeedback from './Review';
import WhyChoose from './ChooseUs';
import LoanCategories from './LoanCat';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
             <LoanCategories></LoanCategories>
            <AvailableLoans></AvailableLoans>
            <HowItWorks></HowItWorks>
            
            <WhyChoose></WhyChoose>
            <CustomerFeedback></CustomerFeedback>
           
        </div>
    );
};

export default Home;