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
    <img src="profile_image.jpg" alt="my face" height="100" width="100" />
    <p>Computer Science graduate and 3D designer.</p>
    <h4>Main things:</h4>
    <ul>
      <li>
        - Graduated from Durham University with First Class Honors in Computer
        Science
      </li>
      <li>
        - Worked part time as a 3D visualiser in the high-end jewellery industry
        for over 5 years
      </li>
    </ul>
  </>
);
