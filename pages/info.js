/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import NavMenu from './components/NavMenu';
import { API_URL } from '../config';
import GrowSpinner from './components/Spinners';

export default function Intro() {
  const [homeData, setHomeData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getHomeData = () => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/api/vhomes?populate=*`)
      .then((res) => {
        // console.log('home-D->', res);
        if (res?.status === 200) {
          if (res?.data?.data?.length === 0) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setHomeData(res?.data?.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getHomeData();

    return () => {};
  }, []);

  return (
    <>
      <section className="tm-section">
        <NavMenu />

        {isLoading ? (
          <div
            className="tm-content-container"
            style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}
          >
            <GrowSpinner />
          </div>
        ) : homeData ? (
          <Fragment>
            <div className="tm-content-container">
              <figure className="mb-0">
                <img
                  src={
                    homeData[0]?.attributes?.bannerImage?.data?.attributes?.url
                  }
                  alt="Image"
                  className="img-fluid tm-img"
                />
              </figure>
              <div className="tm-content">
                <h2 className="tm-page-title">
                  {homeData[0]?.attributes?.headTitle}
                </h2>
                <p className="mb-4">{homeData[0]?.attributes?.homeDetail}</p>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className="tm-content-container">
            <h1 style={{ textAlign: 'center' }}>{'No data found!'}</h1>
          </div>
        )}
      </section>
    </>
  );
}
