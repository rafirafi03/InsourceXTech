import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "../Modal/Modal";
import { ISubService } from "../../../types";

interface PageProps {
  title: string;
  image: string;
  content: string;
  subservices?: ISubService[];
  index?: number; // Optional index for staggered animations
}

export default function Card({ title, image, content, subservices = [], index = 0 }: PageProps) {
  const [isModal, setModal] = useState(false);

  const onModalClose = () => {
    setModal(false);
  };

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 70, // Start from further below for more dramatic entrance
      scale: 0.7,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100, // Lower stiffness for smoother motion
        damping: 15, // Adjusted damping for more natural bounce
        mass: 0.8, // Slightly lighter mass for more responsive animation
        delay: index * 0.15, // Increased delay for more pronounced staggering
        duration: 0.7, // Longer duration for smoother effect
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(191, 219, 254, 0.8)",
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.4,
      },
    },
  };

  return (
    <>
      {/* Card Component with Animation */}
      <motion.div
        onClick={() => setModal(true)}
        className=" bg-white/30 rounded-2xl p-5 cursor-pointer"
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-100px", amount: 0.3 }}
        variants={cardVariants}
        transition={{
          layout: { type: "spring", stiffness: 100, damping: 15 },
        }}
      >
        <motion.div
          className="flex flex-col items-center"
          whileTap={{
            scale: 0.95,
            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
        >
          <motion.img
            alt={`${title} image`}
            height="70"
            src={image}
            width="70"
            className="mb-3 rounded-xl"
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            whileHover={{
              rotate: [0, -3, 3, -3, 0],
              scale: 1.1,
              transition: { duration: 0.7, ease: "easeInOut" },
            }}
          />
          <motion.h5
            className="text-md font-extrabold text-blue-900 text-center uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              textShadow: [
                "0px 0px 0px rgba(0,0,0,0)",
                "0px 0px 2px rgba(0,0,0,0.2)",
                "0px 0px 0px rgba(0,0,0,0)",
              ],
            }}
            transition={{
              opacity: { duration: 0.5, delay: index * 0.15 + 0.5 },
              y: { duration: 0.5, delay: index * 0.15 + 0.5 },
              textShadow: {
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
            }}
          >
            {title}
          </motion.h5>
        </motion.div>
      </motion.div>

      {/* Show Modal if isModal is true */}
      {isModal && (
        <Modal
          isOpen={isModal}
          onClose={onModalClose}
          title={title}
          image={image}
          content={content}
          subservices={subservices}
        />
      )}
    </>
  );
}
