import { useState, useEffect } from 'react';
import './MinimapPointer.less';
import gsap from "gsap";

const MinimapPointer = ({ isSingleColumn }) => {
    const [scrollY, setScrollY] = useState(0);
    var translateY = 0, stop_pointer = 0, restart_pointer = 0, parallax_rate = 0;
    if (window.innerWidth >= 2522) {
        stop_pointer = 4600;
        restart_pointer = 35939;
        parallax_rate = 0.09;
    } else if (window.innerWidth >= 1920) {
        stop_pointer = 3000;
        restart_pointer = 38066;
        parallax_rate = 0.09;
    } else if (window.innerWidth >= 1440) {
        stop_pointer = 3000;
        restart_pointer = 38066;
        parallax_rate = 0.09;
    } else if (window.innerWidth >= 1024) {
        stop_pointer = 2839;
        restart_pointer = 31639;
        parallax_rate = 0.085;
    } else if (window.innerWidth >= 393) {
        stop_pointer = 4600;
        restart_pointer = 35939;
        parallax_rate = 0.09;
    }

    if (scrollY < stop_pointer) {
        translateY = scrollY * parallax_rate;
    } else if (scrollY < restart_pointer) {
        translateY = stop_pointer * parallax_rate;
    } else if (scrollY >= restart_pointer) {
        translateY = (scrollY - restart_pointer + stop_pointer) * parallax_rate;
    }

    const parallaxStyle = {
        transform: `translateY(${translateY}px)`,
        transition: 'transform 0.5s ease-out',
    }

    useEffect(() => {
        const handleScroll = () => {
            console.log(window.scrollY, window.scrollY * 0.09);
            setScrollY(window.scrollY);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isSingleColumn) {
            gsap.to(".minimap-pointer", {
                opacity: 1,
                duration: 2,
                ease: "power2.out",
                delay: 2,
            });
        } else {
            gsap.to(".minimap-pointer", {
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            })
        }
    }, [isSingleColumn]);

    return (
        <>
            <div className="minimap-pointer" style={isSingleColumn ? parallaxStyle : {}}></div>
        </>
    );
};

export default MinimapPointer;