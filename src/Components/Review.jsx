import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { image } from "motion/react-client";
import img1 from "../assets/TvnrQijz.jpg"
import img2 from "../assets/MV5BYTIwZjJmMTAtZjhkMC00ZmZiLWE4YTUtZDMzYjc4NjFkNmMyXkEyXkFqcGc@._V1_.jpg"
import img3 from "../assets/images.jfif"
import img4 from "../assets/images (1).jfif"
import img5 from "../assets/u5aqBy5G323lj3ergBkR9XChiEd.webp"
import ScrollReveal from "./ScrollReveal";


const feedbacks = [
  {
    id: 1,
    name: "Rahim Uddin",
    role: "Small Shop Owner",
    message:
      "Got a quick business loan with clear terms. The dashboard makes it easy to follow every update.",
    rating: 5,
    avatar: img1,
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "University Student",
    message:
      "The education loan helped me pay semester fees on time. The process was simple and fully online.",
    rating: 4,
    avatar:img3
  },
  {
    id: 3,
    name: "Kamrul Hasan",
    role: "Service Holder",
    message:
      "Used a salary loan during an emergency. Repayment schedule is transparent and easy to track.",
    rating: 5,
    avatar: img2
  },
  {
    id: 4,
    name: "Sharmin Akter",
    role: "Home Maker",
    message:
      "Home appliance loan let us upgrade our fridge and washing machine with comfortable monthly EMIs.",
    rating: 4,
    avatar: img4
  },
  {
    id: 5,
    name: "Imran Hossain",
    role: "Farmer",
    message:
      "Agriculture microloan helped me buy better seeds and fertilizer. Repayment after harvest is very helpful.",
    rating: 5,
    avatar: img5
  }
];

const CustomerFeedback = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6500,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <ScrollReveal>
        <section className="mt-16 mb-8">
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Customer feedback
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
          Borrowers who trust MicroCredX
        </h2>
        <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
          Short stories from customers who used MicroCredX to manage education,
          business, and emergency microloans. [file:9]
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Slider {...settings}>
          {feedbacks.map((item) => (
            <div key={item.id} className="px-2">
              <div className="relative rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm px-5 py-6 md:px-6 md:py-7 shadow-sm h-full flex flex-col">
                {/* quote mark */}
                <span className="absolute -top-4 -left-1 text-5xl text-slate-100 select-none">
                  “
                </span>

                <p className="relative text-sm text-slate-700 leading-relaxed flex-1">
                  {item.message}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
                          {item.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">{item.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-lime-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx}>{idx < item.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
    </ScrollReveal>
  );
};

export default CustomerFeedback;
