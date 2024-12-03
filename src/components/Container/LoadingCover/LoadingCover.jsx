import './LoadingCover.less';
import { useState, useEffect } from 'react';
import gsap from 'gsap';

const LoadingCover = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        let progressInterval;
        if (loading) {
            progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 99) {
                        clearInterval(progressInterval);
                        setTimeout(() => {
                            gsap.timeline()
                                .to(".loading-overlay .piece.top", {
                                    y: "-100%",
                                    duration: 1.5,
                                    ease: "power2.inOut",
                                })
                                .to(
                                    ".loading-overlay .piece.bottom",
                                    {
                                        y: "100%",
                                        duration: 1.5,
                                        ease: "power2.inOut",
                                        onComplete: () => {
                                            setLoading(false);
                                        },
                                    },
                                    "<"
                                );
                        }, 500);
                    }
                    return prev + 1;
                });
            }, 30);
        }
        return () => clearInterval(progressInterval);
    }, [loading]);
    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <div className="piece top"></div>
                    <div className="piece bottom"></div>
                    <div className="loading-text">
                        <p className="loading-text-label">Hiromi <br /> Tomiyasu</p>
                        <p className="loading-text-progress">{progress}%</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoadingCover