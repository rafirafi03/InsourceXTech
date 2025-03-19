interface pageProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  content: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  image,
  content,
}: pageProps) => {
  const onModalClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="max-w-sm bg-white/90 rounded-2xl p-5 transition-all duration-300 hover:scale-105 hover:bg-blue-200 cursor-pointer">
        <div className="flex flex-col items-center">
          <img
            alt="Insourcextech"
            height="70"
            src={image}
            width="70"
            className="mb-3 rounded-xl"
          />
          <h5 className="text-md font-extrabold text-blue-900 text-center">
            {title}
          </h5>
          <p className="text-md font-medium text-black text-center my-3">
            {content}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={onModalClose}
            className="px-5 py-1 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-4xl hover:from-blue-600 hover:to-blue-400 transition-all duration-300 font-medium shadow-md transform hover:scale-105 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
