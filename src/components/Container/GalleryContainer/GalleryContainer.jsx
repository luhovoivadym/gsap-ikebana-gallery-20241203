import './GalleryContainer.less';
import Gallery from './Gallery/Gallery';
import ImagePreviews from './ImagePreviews/ImagePreviews';
import MinimapPointer from './MinimapPointer/MinimapPointer';
import { useEffect, useState } from 'react';

const GalleryContainer = ({ isSingleColumn }) => {
    const countOfImages = [5, 6, 6, 6, 5, 4];
    const imageIndexes = [];
    let sum = 0;
    for (let i = 0; i < countOfImages.length; i++) {
        const indexes = [];
        for (let j = 0; j < countOfImages[i]; j++) {
            indexes.push(sum + j + 1);
        }
        imageIndexes.push(indexes);
        sum += countOfImages[i];
    }

    const [showImageName, setShowImageName] = useState(false);
    const [hoveredImageName, setHoveredImageName] = useState("");

    return (
        <>
            <div className="gallery-container">
                <Gallery isSingleColumn={isSingleColumn} imageIndexes={imageIndexes} setShowImageName={setShowImageName} setHoveredImageName={setHoveredImageName} />
                {isSingleColumn && (<ImagePreviews isSingleColumn={isSingleColumn} imageIndexes={imageIndexes} />)}
                <MinimapPointer isSingleColumn={isSingleColumn} />
                {showImageName && !isSingleColumn && (
                    <div className="image-name">
                        <p>{hoveredImageName}</p>
                        <svg width="300" height="32" viewBox="0 0 300 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="283.5" cy="15.5" r="11" stroke="black" />
                            <path d="M285.114 9.21517L289.614 9.21479L289.614 13.2148" stroke="black" />
                            <path d="M283.982 19.9361L279.705 19.9376L279.705 16" stroke="black" />
                            <path d="M280 20L289.5 9.5" stroke="black" />
                        </svg>
                    </div>
                )}
            </div>
        </>
    );
};

export default GalleryContainer;