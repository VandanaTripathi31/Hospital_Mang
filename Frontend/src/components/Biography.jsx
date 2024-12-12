import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <h1>Biography</h1>
          <h3>Who We Are</h3>
          <p>
            At Zee Care Medical Institute, we are dedicated to providing
            world-class medical care and health services with a patient-centric
            approach. Established in 2010, our institute has grown to become a
            trusted name in healthcare, known for our commitment to innovation,
            compassion, and excellence. Our team of highly skilled doctors,
            nurses, and healthcare professionals are driven by a singular goal:
            to enhance the quality of life for our patients. We utilize the
            latest advancements in medical technology and uphold the highest
            standards in every aspect of our service.
          </p>
          <h3>Our Vision</h3>
          <p>
            To create a healthier future by redefining the standards of
            healthcare through cutting-edge technology, holistic care, and
            unwavering dedication.
          </p>
          <h3>Our Mission</h3>
          <p>
            To deliver affordable and accessible healthcare to all. To foster a
            culture of innovation and continuous learning within the medical
            field. To build long-term relationships with patients by providing
            personalized and empathetic care.
          </p>
          <h5>We Believe in Excellence. We Care About You.</h5>
        </div>
      </div>
    </>
  );
};

export default Biography;
