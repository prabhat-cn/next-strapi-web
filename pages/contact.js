/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import NavMenu from './components/NavMenu';
import { API_URL } from '../config';

export default function Contact() {
  const [contactBanner, setContactBanner] = useState();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const [contact, setContact] = useState({
    cname: '',
    cemail: '',
    cmessage: '',
  });

  const { cname, cemail, cmessage } = contact;

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cname || !cemail || !cmessage) {
      setMessage('Please fill all the fields!');
      setError(true);
      setTimeout(() => {
        setMessage('');
      }, 2000);
    } else {
      const formData = {
        cname,
        cemail,
        cmessage,
      };
      console.log('formData->', formData);

      axios
        .post(`${API_URL}/api/vcontactfields`, { data: formData })
        .then((resPost) => {
          console.log('resPost->', resPost);
          if (resPost?.status === 200) {
            setMessage('Form sumitted success!');
            setError(false);
            setTimeout(() => {
              setMessage('');
              setContact({
                cname: '',
                cemail: '',
                cmessage: '',
              });
            }, 2000);
          } else {
            setMessage('Something went wrong!');
            setError(true);
            setTimeout(() => {
              setMessage('');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log('errPost->', err);
          setMessage('Server error!');
          setError(true);
          setTimeout(() => {
            setMessage('');
          }, 2000);
        });
    }
  };

  const getContactData = () => {
    axios
      .get(`${API_URL}/api/vcontactbanners?populate=*`)
      .then((res) => {
        // console.log('con-D->', res);
        if (res?.status === 200) {
          setContactBanner(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getContactData();
    return () => {};
  }, []);

  return (
    <>
      <section className="tm-section">
        <NavMenu />
        <div className="tm-content-container">
          <div className="mb-0 tm-img-overlay-wrap">
            {contactBanner && contactBanner?.data ? (
              <Fragment>
                <div className="tm-img-overlay"></div>
                <div className="tm-img-overlay-text text-white p-5">
                  <h4 className="mb-4">
                    {contactBanner?.data[0]?.attributes?.contactheadertext}
                  </h4>
                  <p className="tm-small">
                    {contactBanner?.data[0]?.attributes?.contactheaderdetail}
                  </p>
                </div>
              </Fragment>
            ) : (
              <h1
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                No data found!
              </h1>
            )}
          </div>
          <div className="tm-content">
            <form onSubmit={handleSubmit} className="tm-contact-form">
              <div className="form-group">
                <input
                  type="text"
                  id="cname"
                  name="cname"
                  value={cname}
                  className="form-control rounded-0 border-top-0 border-right-0 border-left-0"
                  placeholder="Name"
                  required=""
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="cemail"
                  name="cemail"
                  value={cemail}
                  className="form-control rounded-0 border-top-0 border-right-0 border-left-0"
                  placeholder="Email"
                  required=""
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <textarea
                  rows="6"
                  id="cmessage"
                  name="cmessage"
                  value={cmessage}
                  className="form-control rounded-0 border-top-0 border-right-0 border-left-0"
                  placeholder="Message..."
                  required=""
                  onChange={handleInputChange}
                />
              </div>
              <div className="row">
                <div className="form-group text-left col-md-6">
                  <h3
                    className="message-cls"
                    style={{ color: error ? 'red' : 'green' }}
                  >
                    {message}
                  </h3>
                </div>

                <div className="form-group text-right col-md-6">
                  <button type="submit" className="btn btn-primary rounded-0">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <style>{customCss}</style>
      </section>
    </>
  );
}

const customCss = `

h3.message-cls {
  font-size: 14px;
}

`;
