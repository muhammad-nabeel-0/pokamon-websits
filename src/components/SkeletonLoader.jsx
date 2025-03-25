import React from "react";
import './SkeletonLoader.css'

const SkeletonLoader = () => {
    return (
        <div className="mian-div">
        <div className="skeleton-container">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="skeleton-card">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text short"></div>
                </div>
            ))}
        </div>
            </div>
    );
};

export default SkeletonLoader;
