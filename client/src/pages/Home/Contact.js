import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
  const { loading, portfolioData } = useSelector((state) => state.root);

  const { contact } = portfolioData;

  return (
    <div>
      <SectionTitle title="Say Hello" />
      <div className="flex sm:flex-col items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-white">{"{"}</h1>
          {Object.keys(contact).map(
            (key, index) =>
              key !== "_id" && (
                <h1 key={index} className="ml-5">
                  <span className="text-tertiary">{key}: </span>
                  <span className="text-white">{contact[key].toString()}</span>
                </h1>
              )
          )}
          <h1 className="text-white">{"}"}</h1>
        </div>
        <div className="h-[400px] ml-auto sm:ml-2">
          <dotlottie-player
            src="https://lottie.host/201b0d48-2e30-4512-a1cd-4f9737a4b74e/YKhWvz2IdP.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
  );
}

export default Contact;
