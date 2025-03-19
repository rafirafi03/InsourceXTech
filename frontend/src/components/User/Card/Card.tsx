import { useState } from "react";
import Modal from "../Modal/Modal";

interface PageProps {
  title: string;
  image: string;
  content: string;
}

export default function Card({ title, image, content }: PageProps) {
  const [isModal, setModal] = useState(false);

  const onModalClose = () => {
    setModal(false);
  };

  return (
    <>
      {/* Card Component */}
      <div
        onClick={() => setModal(true)}
        className="max-w-sm bg-white/30 rounded-2xl p-5 transition-all duration-300 hover:scale-105 hover:bg-blue-200 cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <img
            alt="Bonnie image"
            height="70"
            src={image}
            width="70"
            className="mb-3 rounded-xl"
          />
          <h5 className="text-md font-extrabold text-blue-900 text-center">
            {title}
          </h5>
        </div>
      </div>

      {/* Show Modal if isModal is true */}
      {isModal && <Modal isOpen={isModal} onClose={onModalClose} title={title} image={image} content={content} />}
    </>
  );
}
