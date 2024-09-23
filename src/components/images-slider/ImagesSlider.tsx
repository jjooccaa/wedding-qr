import { motion } from "framer-motion";
import Slider from "./Slider";
import image1 from "../../assets/background-images/background-one.jpg";
import image3 from "../../assets/background-images/background-three.jpg";

const images = [image1, image3];

const textAnimation = {
  initial: { opacity: 0, y: -80 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
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
  return (
    <div className="relative h-[40rem] flex flex-col">
      <Slider className="flex-grow" images={images}>
        <motion.div
          {...textAnimation}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            Jovan i Jovana
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
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default ImagesSlider;
