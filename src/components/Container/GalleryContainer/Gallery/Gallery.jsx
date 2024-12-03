import './Gallery.less';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import gsap from "gsap";

gsap.registerPlugin(Flip);

const Gallery = ({ isSingleColumn, imageIndexes, setShowImageName, setHoveredImageName }) => {
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
        stop_pointer = 3300;
        restart_pointer = 41507;
        parallax_rate = 0.032;
    }
    if (scrollY < stop_pointer) {
        translateY = 0;
    } else if (scrollY < restart_pointer) {
        translateY = (-(scrollY - stop_pointer)) * parallax_rate;
    } else if (scrollY >= restart_pointer) {
        translateY = (-(restart_pointer - stop_pointer)) * parallax_rate;
    }

    const parallaxStyle = {
        transform: `translateY(${translateY}px)`,
        transition: 'transform 0.5s ease-out',
    }

    const scopeRef = useRef();
    const mapcoverRef = useRef(); // Reference for the mapcover div

    const [layout, setLayout] = useState({
        state: null,
        flipClass: "",
    });

    const [isAnimating, setIsAnimating] = useState(false);
    const [transform, setTransform] = useState({ x: 0, y: 0 });

    const q = gsap.utils.selector(scopeRef);
    const { context } = useGSAP(
        () => {
            if (layout.state && q("img").length) {
                setIsAnimating(true);

                // Start the GSAP timeline for the flip animation
                const tl = gsap.timeline({
                    onComplete: () => {
                        setIsAnimating(false);
                    },
                });

                // Animate the images with Flip.from()
                tl.add(
                    Flip.from(layout.state, {
                        absolute: true,
                        ease: "power1.inOut",
                        targets: q("img"),
                        scale: true,
                        simple: true,
                        duration: 2,
                        onStart: () => setTransform({ x: 0, y: 0 }),
                    })
                );

                // Animate the mapcover's size and position from the current state to the target state
                const currentWidth = mapcoverRef.current ? mapcoverRef.current.offsetWidth : 2000;
                const currentHeight = mapcoverRef.current ? mapcoverRef.current.offsetHeight : 2000;
                const currentLeft = mapcoverRef.current ? parseInt(mapcoverRef.current.style.left) : 0;
                const currentTop = mapcoverRef.current ? parseInt(mapcoverRef.current.style.top) : 0;
                const currentColor = mapcoverRef.current ? getComputedStyle(mapcoverRef.current).backgroundColor : "rgb(255, 255, 255)";

                let targetWidth, targetHeight, targetLeft, targetTop = 0;
                let targetColor = "rgba(210, 210, 210, 0.25)";
                if (screenWidth >= 2522) {
                    targetWidth = isSingleColumn ? 98 : 2800;
                    targetHeight = isSingleColumn ? 960 : 3248;
                    targetLeft = isSingleColumn ? 2280 : 0;
                    targetTop = isSingleColumn ? 232 : 0;
                    targetColor = isSingleColumn ? "rgba(210, 210, 210, 0.25)" : "white";
                } else if (screenWidth >= 1920 && screenWidth < 2522) {
                    targetWidth = isSingleColumn ? 98 : 2522;
                    targetHeight = isSingleColumn ? 600 : 3248;
                    targetLeft = isSingleColumn ? 1780 : 0;
                    targetTop = isSingleColumn ? 371 : 0;
                    targetColor = isSingleColumn ? "rgba(210, 210, 210, 0.25)" : "white";
                } else if (screenWidth >= 1440 && screenWidth < 1920) {
                    targetWidth = isSingleColumn ? 98 : 2522;
                    targetHeight = isSingleColumn ? 600 : 3248;
                    targetLeft = isSingleColumn ? 1313 : 0;
                    targetTop = isSingleColumn ? 374 : 0;
                    targetColor = isSingleColumn ? "rgba(210, 210, 210, 0.25)" : "white";
                } else if (screenWidth >= 1024 && screenWidth < 1440) {
                    targetWidth = isSingleColumn ? 76 : 2000;
                    targetHeight = isSingleColumn ? 550 : 2900;
                    targetLeft = isSingleColumn ? 930 : 0;
                    targetTop = isSingleColumn ? 248 : 0;
                    targetColor = isSingleColumn ? "rgba(210, 210, 210, 0.25)" : "white";
                } else if (screenWidth >= 393 && screenWidth < 1024) {
                    targetWidth = isSingleColumn ? 42 : 2000;
                    targetHeight = isSingleColumn ? 249 : 2150;
                    targetLeft = isSingleColumn ? 338 : 0;
                    targetTop = isSingleColumn ? 564 : 0;
                    targetColor = isSingleColumn ? "rgba(210, 210, 210, 0.25)" : "white";
                } else if (screenWidth < 393) {
                    targetWidth = isSingleColumn ? 42 : 2000;
                    targetHeight = isSingleColumn ? 249 : 2150;
                    targetLeft = isSingleColumn ? 338 : 0;
                    targetTop = isSingleColumn ? 564 : 0;
                    targetColor = isSingleColumn ? "rgba(210, 210, 210, 0.25)" : "white";
                }

                // Animate the transition of the mapcover smoothly from the current to the target state
                tl.add(
                    gsap.fromTo(
                        mapcoverRef.current,
                        {
                            width: currentWidth,
                            height: currentHeight,
                            left: currentLeft,
                            top: currentTop,
                            backgroundColor: currentColor,
                        },
                        {
                            duration: 2,
                            width: targetWidth,
                            height: targetHeight,
                            left: targetLeft,
                            top: targetTop,
                            backgroundColor: targetColor,
                            ease: "power1.inOut",
                        }
                    ),
                    0
                );
            }
        },
        {
            scope: scopeRef,
            dependencies: [layout],
        }
    );

    useEffect(() => {
        const flipState = Flip.getState(q("img"));
        setLayout(() => ({
            state: flipState,
            flipClass: isSingleColumn ? "single-column" : "multiple-columns",
        }));
    }, [isSingleColumn]);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [window.innerWidth]);

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const timeoutRef = useRef(null);
    const handleMouseOver = useCallback(
        (index, imageName) => {
            if (isAnimating) return;
            setHoveredIndex(index);
            setHoveredImageName(imageName);
            setCursor("small-cursor");
            timeoutRef.current = setTimeout(() => setShowImageName(true), 1000);
        }, [isAnimating]);

    const handleMouseOut = useCallback(() => {
        setHoveredIndex(null);
        setShowImageName(false);
        setCursor("big-cursor");
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const [cursor, setCursor] = useState("big-cursor");
    const transformStyle = {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: 'transform 0.5s ease-out',
    }
    useEffect(() => {
        const handleMouseMove = (event) => {
            const cursor = document.querySelector(".custom-cursor");
            const gallery = document.querySelector(".gallery");
            if (cursor && gallery) {
                const galleryRect = gallery.getBoundingClientRect();
                cursor.style.left = `${event.clientX - galleryRect.left}px`;
                cursor.style.top = `${event.clientY - galleryRect.top}px`;
                let transX = - (event.clientX * (galleryRect.width - window.innerWidth) / window.innerWidth);
                let transY = - (event.clientY * (galleryRect.height - window.innerHeight) / window.innerHeight);
                setTransform({ x: transX, y: transY })
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className='mapcover' ref={mapcoverRef}>
            <div
                className={`gallery ${layout.flipClass}`}
                ref={scopeRef}
                style={isSingleColumn ? parallaxStyle : (!isAnimating ? transformStyle : {})}
            >
                {!isSingleColumn && (
                    <div
                        className={`custom-cursor ${cursor === "small-cursor" ? "small" : ""}`}
                        style={{ backgroundImage: `url(/svgs/${cursor}.svg)` }}
                    />
                )}
                {imageIndexes
                    .map((indexes) => indexes.slice().reverse()) // Reverse each row of images
                    .reverse() // Reverse the order of rows
                    .map((indexes, rowIndex) => (
                        <div className={'col'} key={rowIndex}>
                            {indexes.map((index, colIndex) => (
                                <div
                                    className={`image ${hoveredIndex === index ? "hovered" : hoveredIndex !== null ? "dimmed" : ""}`}
                                    key={colIndex}
                                    onMouseOver={() => {
                                        if (!isSingleColumn) {
                                            handleMouseOver(index, `Image ${index}`);
                                        }
                                    }}
                                    onMouseOut={handleMouseOut}
                                >
                                    <img src={`/images/Image_${index}.jpg`} alt={`/images/Image_${index}.jpg`} />
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        </div>

    );
};

export default Gallery;
