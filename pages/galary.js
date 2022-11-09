/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import NavMenu from './components/NavMenu';
import { API_URL } from '../config';
import GrowSpinner from './components/Spinners';

export default function Galary() {
  const [imgGalary, setImgGalary] = useState([]);
  const [gHeaderTitle, setGHeaderTitle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getGalary = () => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/api/vgalaries?populate=*`)
      .then((res) => {
        if (res?.status === 200) {
          if (res?.data?.data?.length === 0) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setImgGalary(res?.data?.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const getGalaryHeader = () => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/api/vgalaryheaders`)
      .then((res) => {
        // console.log('gHead->', res);
        if (res?.status === 200) {
          if (res?.data?.data?.length === 0) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setGHeaderTitle(res?.data);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getGalary();
    getGalaryHeader();

    return () => {};
  }, []);

  console.log('gHeaderTitle->', gHeaderTitle);

  return (
    <div className="tm-section">
      <NavMenu />
      <div className="tm-content-container">
        {isLoading ? (
          <div style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
            <GrowSpinner />
          </div>
        ) : imgGalary ? (
          <div className="tm-content tm-content-2">
            {!gHeaderTitle ? (
              <h3 style={{ textAlign: 'center' }}>No header detail found!</h3>
            ) : (
              <p>{gHeaderTitle?.data[0]?.attributes?.gheadtitle}</p>
            )}

            <div className="container-fluid">
              <div className="row tm-gallery" id="tmGallery">
                {imgGalary &&
                  imgGalary?.map((iData, indx) => (
                    <Fragment key={indx}>
                      <div className="col-sm-6 tm-gallery-item">
                        <figure className="effect-bubba">
                          <img
                            src={
                              iData?.attributes?.image?.data?.attributes?.url
                            }
                            alt={iData?.attributes?.imageName}
                            className="img-fluid"
                          />
                          <figcaption>
                            <h2>{iData?.attributes?.imageName}</h2>
                            <p>{iData?.attributes?.imageDetail}</p>
                            <Link
                              href={
                                iData?.attributes?.image?.data?.attributes?.url
                              }
                            >
                              View more
                            </Link>
                          </figcaption>
                        </figure>
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="tm-content tm-content-2">
            <h1 style={{ textAlign: 'center' }}>{'No data found!'}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
