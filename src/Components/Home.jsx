import React from 'react';
import Carousel from './Carousel';
import AvailableLoans from './AvailableLoans';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <AvailableLoans></AvailableLoans>
        </div>
    );
};

export default Home;