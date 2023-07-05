import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="about-container">
        <h1 className="text-center mt-4 fw-bold opacity"> About Us </h1>
        <p className="text-center">Know about CHOICE</p>
        <div className="content-container mt-5">
          <div className="image-container">
            <img
              src="/images/contact.jpg"
              alt="contactus"
              className="about-image"
            />
          </div>
          <div className="text-container">
            <h1 className="fw-bold opacity">What is CHOICE?</h1>
            <p className="text-justify mt-2">
              Choice is an online platform that works as a mall for other
              ecommerce websites. Consumer will be able to search for their
              desired products and will be given results from around popular
              ecommerce sites. Consumer will have the option to only get
              products from the sites that consumer trusts. This way consumer
              can only browse those products which are offered from trusted
              sites. Not only consumer can choose the sites but also the price
              range, sort result and reviews etc. All these options will be
              filter-able. The user will be able to communicate with the
              automated Chabot for the guidance. The user will be able to not
              only browse other products from other websites but also be able to
              buy products that we are selling. The whole idea for this project
              is to make a center-point for consumers to buy their desired
              product while being on a single site without spending extra time
              and effort browsing through multiple sites.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6 ">
            {/* <h2 className="fw-bold opacity text-center">About Us</h2>
            <p className="text-center">Your Care Our Responsibility</p> */}
            <div className="text-start about">
              <div className="row">
                <h4 className="fw-bold text-center opacity">Developers</h4>
                <div className="d-flex justify-content-center mb-4">
                  {" "}
                  <hr style={{ width: "80%" }} />
                </div>

                <div className="row">
                  <div className="col-6 d-flex justify-content-center align-items-center flex-column">
                    <img
                      src="/images/Rehan.jpg"
                      // className="aboutpp rounded-circle mb-3"
                      className="aboutpp  rounded-circle mb-3"
                    />
                    <h5 className="fw-bold text-center opacity">
                      Syed Rehan Ali Shah
                    </h5>
                    <sub>MERN Stack Developer</sub>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center flex-column">
                    <img
                      src="/images/Hamza.jpg"
                      className="aboutpp  rounded-circle mb-3"
                    />
                    <h5 className="fw-bold text-center opacity">
                      Syed Hamza Imran
                    </h5>
                    <sub>Data Scientist</sub>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 ">
            <div className="text-start about">
              <div className="row">
                <h4 className="fw-bold text-center opacity">Supervisors</h4>
                <div className="d-flex justify-content-center mb-4">
                  {" "}
                  <hr style={{ width: "80%" }} />
                </div>

                <div className="row">
                  <div className="col-6 d-flex justify-content-center align-items-center flex-column">
                    <img
                      src="/images/AK.jpg"
                      className="aboutpp  rounded-circle mb-3"
                    />
                    <h5 className="fw-bold text-center opacity">
                      Mr. Abdul Karim Shahid
                    </h5>
                    <sub>Supervisor</sub>
                  </div>
                  <div className="col-6 d-flex justify-content-center align-items-center flex-column">
                    <img
                      src="/images/MM.jpg"
                      className="aboutpp  rounded-circle mb-3"
                    />
                    <h5 className="fw-bold text-center opacity">
                      Mr. Mohsin Mehdi
                    </h5>
                    <sub>Co-Supervisor</sub>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-6">
            <h2 className="fw-bold opacity text-center">FAQs</h2>
            <p className="text-center">Popular Questions</p>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default About;
