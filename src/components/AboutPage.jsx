import React from 'react';

import { Header } from './Header.jsx'
import { AboutGrid } from './AboutGrid.jsx'


export function AboutPage(props) {
    const { latest_blogs_data, latest_projects_data } = props

    return(
        <>
            <Header />
            {/* <QuoteBox /> */}
            <AboutGrid latest_blogs_data={latest_blogs_data} latest_projects_data={latest_projects_data}/>
        </>
    )
}

const QuoteBox = () => {
    const quote = "The only limit to our realization of tomorrow is our doubts of today.";
    const author = "Franklin D. Roosevelt";

    return (
        <div className="quote-container">
            <div className="quote-card">
                <div className="quote-marks top">&ldquo;</div>
                <blockquote className="quote-text">{quote}</blockquote>
                <footer className="quote-author">- {author}</footer>
                <div className="quote-marks bottom">&rdquo;</div>
            </div>
        </div>
    );
};