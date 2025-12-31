import React from 'react';

const Section = ({ children, className = "", id = "" }) => {
    return (
        <section id={id} className={`py-16 md:py-24 ${className}`}>
            <div className="container mx-auto px-6">
                {children}
            </div>
        </section>
    );
};

export default Section;
