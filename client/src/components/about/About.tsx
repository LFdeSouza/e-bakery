import React from "react";

const About = () => {
  return (
    <main className="lg-p-0 mx-auto mt-24 mb-[35rem] w-11/12 p-5 sm:max-w-7xl">
      <h2 className="text-3xl font-semibold text-mainOrange">About</h2>
      <p className="mt-4 text-gray-700 mx-w-md">
        This E-commerce application was made for learining porpouses. It uses
        React/redux for the frontend, and node.js/express/ postgress for the
        backend All images were taken from https://www.pexels.com. The design
        was inspired by one of the challenges from frontendMentor.io.
      </p>
    </main>
  );
};

export default About;
