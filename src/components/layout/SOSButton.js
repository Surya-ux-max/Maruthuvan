"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../ui/Modal";

export default function SOSButton() {
  const [open, setOpen] = useState(false);

  const triggerSOS = () => {
    setOpen(false);
    console.log("🚨 SOS Triggered!");
    alert("Emergency alert sent!");
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 bg-red-600 text-white px-5 py-3 rounded-full shadow-lg font-bold z-50"
      >
        SOS
      </motion.button>

      <AnimatePresence>
        {open && (
          <Modal onClose={() => setOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center p-4"
            >
              <h2 className="text-xl font-bold mb-4 text-red-600">Confirm SOS</h2>
              <p className="text-gray-700 mb-6">
                Are you sure you want to trigger an emergency alert?
              </p>
              <div className="flex justify-around">
                <button
                  onClick={triggerSOS}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700"
                >
                  Yes, SOS
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
