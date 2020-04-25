import React, { useRef } from 'react';
import { useScrollPosition } from '@huse/scroll-position';
import { isMobile } from "react-device-detect";

import { Profile } from "./Profile";

import "./Home.css";

export const Home = () => {
  const ref = useRef();
  const position = useScrollPosition(ref.current);

  return (
    <>
      <div ref={ref} className="top">
        {!isMobile &&
          <section className="header"/>
        }
        <section className="content">
          <Profile pagePosition={position} />
        </section>
      </div>
    </>
  )};
