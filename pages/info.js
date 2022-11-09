import axios from 'axios';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import NavMenu from './components/NavMenu';
import { API_URL } from '../config';

export default function Intro() {
  const [homeData, setHomeData] = useState();
  const getHomeData = () => {
    axios
      .get(`${API_URL}/api/vhomes?populate=*`)
      .then((res) => {
        // console.log('home-D->', res);
        if (res?.status === 200) {
          setHomeData(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
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
        {homeData && homeData?.data ? (
          <Fragment>
            <div className="tm-content-container">
              <figure className="mb-0">
                <img
                  src={
                    homeData?.data[0]?.attributes?.bannerImage?.data?.attributes
                      ?.url
                  }
                  alt="Image"
                  className="img-fluid tm-img"
                />
              </figure>
              <div className="tm-content">
                <h2 className="tm-page-title">
                  {homeData?.data[0]?.attributes?.headTitle}
                </h2>
                <p className="mb-4">
                  {homeData?.data[0]?.attributes?.homeDetail}
                </p>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className="tm-content-container">
            <h1 style={{ textAlign: 'center' }}>No data found!</h1>
          </div>
        )}
      </section>
    </>
  );
}
