import { motion } from "framer-motion";
import Slider from "./Slider";
import { useState, useEffect } from "react";

const textAnimation = {
  initial: { opacity: 0, y: -80 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
};

const decorationAnimation = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.8, delay: 0.3 },
};

const arrowAnimation = {
  animate: {
    y: [0, 5, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const ImagesSlider = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const imageModules = await Promise.all([
        import("../../assets/background-images/background-one.jpg"),
        import("../../assets/background-images/background-two.jpg"),
        import("../../assets/background-images/background-three.jpg"),
        import("../../assets/background-images/background-five.jpg"),
        import("../../assets/background-images/background-six.jpg"),
      ]);
      setImages(imageModules.map((module) => module.default));
    };

    loadImages();
  }, []);

  return (
    <div className="relative h-dvh flex flex-col bg-cream-100 overflow-hidden">
      <Slider className="flex-grow" images={images}>
        <motion.div
          {...textAnimation}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p
            className="font-script font-normal text-5xl md:text-8xl text-center text-olive-600 py-4 tracking-wider leading-tight"
            style={{
              textShadow: "0 0 10px rgba(92, 83, 64, 0.3), 0 0 20px rgba(92, 83, 64, 0.2), 0 0 30px rgba(92, 83, 64, 0.1)",
            }}
          >
            Jovan i Jovana
          </motion.p>
          <motion.div
            {...decorationAnimation}
            className="flex items-center justify-center space-x-4 mb-6"
          >
            <div className="w-20 h-0.5 bg-gradient-to-r from-olive-500 via-olive-600 to-olive-500 opacity-70" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-olive-600"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <div className="w-20 h-0.5 bg-gradient-to-r from-olive-500 via-olive-600 to-olive-500 opacity-70" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-sans text-lg md:text-xl text-center text-olive-600 mt-6 drop-shadow-md"
          >
            05.10.2024.
          </motion.p>
        </motion.div>
      </Slider>
      <div className="absolute inset-x-0 bottom-0 flex justify-center items-center h-24 pointer-events-none">
        <motion.div
          animate={arrowAnimation.animate}
          className="z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6B7B4C" />
                <stop offset="100%" stopColor="#4A5A3A" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
              stroke="url(#arrow-gradient)"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default ImagesSlider;
