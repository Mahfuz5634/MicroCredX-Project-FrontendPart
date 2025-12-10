import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "motion/react";

import img1 from "../assets/personal-loan-2024.jpg";
import img2 from "../assets/personal-home-loan.jpg";
import img3 from "../assets/homeloan.png";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: false,
    pauseOnHover: true,
  };

  const slides = [
    {
      img: img1,
      title: "Smart approvals, trusted partners",
      text: "Build trust with every handshake – smart loan approvals for modern borrowers and managers.",
    },
    {
      img: img2,
      title: "Finance your family dreams",
      text: "Quick microloans for your family’s everyday needs with simple, flexible repayment plans.",
    },
    {
      img: img3,
      title: "Your home, your future",
      text: "Turn your dream home into reality with fast, transparent housing microfinance support.",
    },
  ];

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { duration: 0.4 } }}
      className="overflow-hidden"
    >
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} className="relative h-[260px] md:h-[460px]">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-transparent" />

            {/* caption + buttons */}
            <div className="absolute inset-0 flex items-center">
              <div className="px-6 md:px-12">
                <div className="max-w-xl rounded-xl px-5 py-4 md:px-8 md:py-6 shadow-lg">
                  <span className="inline-block h-1 w-16 rounded-full bg-emerald-400 mb-3" />
                  <h3 className="text-xl md:text-3xl font-bold text-white leading-snug">
                    {slide.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-slate-100/90 leading-relaxed">
                    {slide.text}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button className="px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-emerald-400 text-emerald-200 hover:bg-emerald-500/10 text-sm md:text-base font-medium">
                      Explore Loans
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </motion.div>
  );
};

export default Carousel;
