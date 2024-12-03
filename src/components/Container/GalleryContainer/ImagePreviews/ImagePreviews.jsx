import './ImagePreviews.less';
import React, { useEffect, useState } from 'react';
import SplitType from "split-type";
import gsap from "gsap";


const ImagePreviews = ({ isSingleColumn, imageIndexes }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [window.innerWidth]);
    useEffect(() => {
        if (isSingleColumn) {
            gsap.to(".big-img", {
                opacity: 1,
                duration: 2,
                ease: "power2.out",
                delay: 0.9,
            });

            const textElements = document.querySelectorAll(".image-previews>.col:nth-child(1)>.text_box:nth-child(1) p");
            textElements.forEach((el) => {
                const split = new SplitType(el, { types: "lines", lineClass: "line" });
                gsap.from(split.lines, {
                    opacity: 0,
                    y: "100%",
                    duration: 1,
                    ease: "power3",
                    delay: 1,
                    stagger: { each: 0.1 },
                });
            });
        }
    }, [isSingleColumn]);

    return (
        <>
            {isSingleColumn && (
                <div className="image-previews">
                    {imageIndexes
                        .map((indexes) => indexes.slice().reverse())
                        .reverse()
                        .map((indexes, rowIdx) => (
                            <div className="col" key={rowIdx}>
                                {indexes.map((index, colIdx) => (
                                    <div className="text_box image-big" key={colIdx}>
                                        <p className="text_box number">{index}</p>
                                        <p className="text_box helper_d">[Date]</p>
                                        <p className="text_box helper_d_v">06.23.2024</p>
                                        <p className="text_box helper_t">[Title, JPN / ENG ]</p>
                                        <p className="text_box helper_t_v">“Hamon, Egan” — Ripple, Smile</p>
                                        {isMobile && (
                                                    <>
                                                        <p className="text_box helper_p">[Production]</p>
                                                        <p className="text_box helper_p_v">Interior Design</p>
                                                    </>
                                                )}
                                        <div className="big-img-text">
                                            <img src={`/images/Image_${index}.jpg`} className="big-img" />
                                            <div className="text">
                                                {!isMobile && (
                                                    <>
                                                        <p className="text_box helper_p">[Production]</p>
                                                        <p className="text_box helper_p_v">Interior Design</p>
                                                    </>
                                                )}
                                                <p className="text_box helper_de">[Description]</p>
                                                <p className="text_box helper_de_v">
                                                    Gallagher’s compositions variably map and notate this
                                                    nebulous and protean in-between space. The distinct, yet
                                                    interrelated works comprising All of No Man’s Land Is Ours
                                                    demarcate a site of possibility built up through repeated
                                                    units of will. Indeed, the unit—the brushstroke.
                                                </p>
                                                <p className="text_box helper_l">[Related link]</p>
                                                <p className="text_box helper_l_v">www.toro-museum.co.jp</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                </div>
            )}
        </>
    );
};

export default ImagePreviews;