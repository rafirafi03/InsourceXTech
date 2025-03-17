interface pageProps {
    isOpen: boolean;
    onClose: ()=> void;
    onConfirm: ()=> void;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: pageProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
