import { useState, useEffect } from 'react';
import './MinimapPointer.less';
import gsap from "gsap";

const MinimapPointer = ({ isSingleColumn }) => {
    const [scrollY, setScrollY] = useState(0);

    let parallaxStyle
    if (scrollY < 4600) {
        parallaxStyle = {
            transform: `translateY(${scrollY * 0.09}px)`,
            transition: 'transform 0.5s ease-out',
        }
    } else if (scrollY >= 4600 && scrollY < 35939) {
        parallaxStyle = {
            transform: `translateY(${414}px)`,
            transition: 'transform 0.5s ease-out',
        }
    } else if (scrollY >= 35939) {
        parallaxStyle = {
            transform: `translateY(${414 + (scrollY - 35939) * 0.09}px)`,
            transition: 'transform 0.5s ease-out',
        }
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