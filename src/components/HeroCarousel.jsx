import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
    text: "Building the future through innovative civil engineering."
  },
  {
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    text: "Training engineers to design resilient infrastructure."
  },
  {
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41",
    text: "Bridging theory and practice in structural design."
  },
  {
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da",
    text: "Shaping sustainable cities and transportation systems."
  }
];

const slideVariants = {
  enter: {
    opacity: 0,
    scale: 1.05,
  },
  center: {
    zIndex: 1,
    opacity: 1,
    scale: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    scale: 0.95,
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden ">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === current && (
            <motion.div
              key={index}
              className="absolute inset-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 1 },
              }}
            >
              <motion.img
                src={slide.image}
                alt="Civil Engineering"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Bottom Left Text */}
              <div className="absolute bottom-10 left-10 max-w-lg">
                <motion.h2
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-white text-2xl md:text-4xl font-bold"
                >
                  {slide.text}
                </motion.h2>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all ${
              index === current ? "bg-white w-8 h-3" : "bg-white/40 w-3 h-3"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}
