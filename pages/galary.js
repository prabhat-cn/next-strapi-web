import axios from 'axios';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import NavMenu from './components/NavMenu';
import { API_URL } from '../config';

export default function Galary() {
  const [imgGalary, setImgGalary] = useState([]);
  const [gHeaderTitle, setGHeaderTitle] = useState();
  const getGalary = () => {
    axios
      .get(`${API_URL}/api/vgalaries?populate=*`)
      .then((res) => {
        if (res?.status === 200) {
          setImgGalary(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGalaryHeader = () => {
    axios
      .get(`${API_URL}/api/vgalaryheaders`)
      .then((res) => {
        // console.log('gHead->', res);
        if (res?.status === 200) {
          setGHeaderTitle(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getGalary();
    getGalaryHeader();

    return () => {};
  }, []);

  return (
    <div className="tm-section">
      <NavMenu />
      <div className="tm-content-container">
        <div className="tm-content tm-content-2">
          <p>{gHeaderTitle?.data[0]?.attributes?.gheadtitle}</p>

          <div className="container-fluid">
            <div className="row tm-gallery" id="tmGallery">
              {imgGalary &&
                imgGalary?.data?.map((iData, indx) => (
                  <Fragment key={indx}>
                    <div className="col-sm-6 tm-gallery-item">
                      <figure className="effect-bubba">
                        <img
                          src={iData?.attributes?.image?.data?.attributes?.url}
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
              {/* <div className="col-sm-6 tm-gallery-item">
                  <figure className="effect-bubba">
                    <img
                      src="/assets/img/gallery/gallery-img-02.jpg"
                      alt="Gallery item"
                      className="img-fluid"
                    />
                    <figcaption>
                      <h2>
                        Fresh <span>Bubba</span>
                      </h2>
                      <p>Bubba likes to appear out of thin air.</p>
                      <Link href="/assets/img/gallery/gallery-img-02.jpg">
                        View more
                      </Link>
                    </figcaption>
                  </figure>
                </div>
                <div className="col-sm-6 tm-gallery-item">
                  <figure className="effect-bubba">
                    <img
                      src="/assets/img/gallery/gallery-img-03.jpg"
                      alt="Gallery item"
                      className="img-fluid"
                    />
                    <figcaption>
                      <h2>
                        Fresh <span>Bubba</span>
                      </h2>
                      <p>Bubba likes to appear out of thin air.</p>
                      <Link href="/assets/img/gallery/gallery-img-03.jpg">
                        View more
                      </Link>
                    </figcaption>
                  </figure>
                </div>
                <div className="col-sm-6 tm-gallery-item">
                  <figure className="effect-bubba">
                    <img
                      src="/assets/img/gallery/gallery-img-04.jpg"
                      alt="Gallery item"
                      className="img-fluid"
                    />
                    <figcaption>
                      <h2>
                        Fresh <span>Bubba</span>
                      </h2>
                      <p>Bubba likes to appear out of thin air.</p>
                      <Link href="/assets/img/gallery/gallery-img-04.jpg">
                        View more
                      </Link>
                    </figcaption>
                  </figure>
                </div>
                <div className="col-sm-6 tm-gallery-item">
                  <figure className="effect-bubba">
                    <img
                      src="/assets/img/gallery/gallery-img-05.jpg"
                      alt="Gallery item"
                      className="img-fluid"
                    />
                    <figcaption>
                      <h2>
                        Fresh <span>Bubba</span>
                      </h2>
                      <p>Bubba likes to appear out of thin air.</p>
                      <Link href="/assets/img/gallery/gallery-img-05.jpg">
                        View more
                      </Link>
                    </figcaption>
                  </figure>
                </div>
                <div className="col-sm-6 tm-gallery-item">
                  <figure className="effect-bubba">
                    <img
                      src="/assets/img/gallery/gallery-img-06.jpg"
                      alt="Gallery item"
                      className="img-fluid"
                    />
                    <figcaption>
                      <h2>
                        Fresh <span>Bubba</span>
                      </h2>
                      <p>Bubba likes to appear out of thin air.</p>
                      <Link href="/assets/img/gallery/gallery-img-06.jpg">
                        View more
                      </Link>
                    </figcaption>
                  </figure>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
