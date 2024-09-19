'use client'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonialsData = [
    "/Testi02.png",
    "/Testi03.png",
    "/Testi04.png",
];

function Testimonials() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            <h1 className='text-4xl text-center my-4 mt-12'>Don't just take our words</h1>
            <div className="h-[300px] bg-white flex items-center justify-center">
                <div className="w-[70%] h-[80%]">
                    <Slider {...settings}>
                        {testimonialsData.map((image, index) => (
                            <div key={index} className="flex justify-center h-full">
                                <img
                                    src={image}
                                    alt={`Testimonial ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
}

export default Testimonials;