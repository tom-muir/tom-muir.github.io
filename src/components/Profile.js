import React from 'react';
import { isMobile } from "react-device-detect";

import "./Profile.css";

function createScrollMessage() {return {__html: 'Scroll for more </br> &#8964;'}};

const PROFILE_POSITION = 500;

const Title = (props) => {
  const scrollPosition = props.pagePosition.y;

  return (
  <div className='title'>
    <h2 className='name'>Tom Muir</h2>
    {scrollPosition < PROFILE_POSITION && !isMobile && <div className='scroll' dangerouslySetInnerHTML={createScrollMessage()}/>}
    <h2 className='links'><a rel="noopener noreferrer" target="_blank"  href="https://github.com/tom-muir">Github</a> - <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/thomas-muir-468ba5145/">LinkedIn</a></h2>
  </div>
)};

export const Profile = (props) => (
  <>
    <Title pagePosition={props.pagePosition}/>
    <img src="profile-image.jpg" alt="my face" height="350" width="200" />
    <h2>Computer Science graduate and 3D designer.</h2>
    <p>Currently employed as full stack web developer at Tripadvisor, previously worked as a
    3D CAD artist for a highend diamond jeweller. Graduated from Durham university with a
    bachelor's degree in computer science, achieving a first.</p>
    <p>If you want to read some trash, go to my <a rel="noopener noreferrer" target="_blank"  href="https://github.com/tom-muir">Github</a> (Disclaimer: my personal
      projects do not reflect what I consider to be production code, I swear...)</p>
  </>
);
