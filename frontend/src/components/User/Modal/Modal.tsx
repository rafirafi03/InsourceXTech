import { ISubService } from "../../../types";

interface pageProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  content: string;
  subservices?: ISubService[];
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  image,
  content,
  subservices = [],
}: pageProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-lg mx-4 sm:mx-0 overflow-y-auto max-h-[90vh]">
        {/* Service Details */}
        <div className="flex flex-col items-center">
          <img
            alt={title}
            src={image}
            className="w-full h-50 mb-3 rounded-xl object-fill"
          />
          <h5 className="text-lg font-extrabold text-blue-900 text-center">
            {title}
          </h5>
          <p className="text-sm sm:text-base text-black text-center my-3">
            {content}
          </p>
        </div>

        {/* ✅ Show Subservices if available */}
        {subservices.length > 0 && (
          <div className="mt-6">
            <h6 className="text-blue-800 font-bold text-center mb-4 text-lg">
              Subservices
            </h6>
            <div className="flex flex-col gap-4">
              {subservices.map((sub, idx) => (
                <div
                  key={idx}
                  className="bg-blue-50 shadow-md rounded-xl p-4 flex flex-col items-center text-center hover:scale-[1.02] transition-all duration-300"
                >
                  <img
                    src={sub.image}
                    alt={sub.title}
                    className="w-full h-full rounded-lg object-fill mb-3"
                  />
                  <div>
                    <h6 className="text-md font-bold text-blue-900">
                      {sub.title}
                    </h6>
                    <p className="text-sm text-gray-700 mt-1">
                      {sub.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full hover:from-blue-600 hover:to-blue-400 transition-all duration-300 font-medium shadow-md transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
