import { FaWhatsapp } from 'react-icons/fa'; // You'll need to install react-icons


const WhatsAppButton = () => {
  // Replace with your actual WhatsApp number with country code
  const phoneNumber = "971581053524";
  // Optional pre-filled message
  const message = 'Hello! I would like to know more about your services.';
  
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 cursor-pointer hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={24} />
    </button>
  );
};

export default WhatsAppButton;