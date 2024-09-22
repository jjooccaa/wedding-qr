import { motion } from "framer-motion";
import { ImagesSlider } from "./ImagesSlider";
import image1 from "../../assets/background-images/background-one.jpg";
import image3 from "../../assets/background-images/background-three.jpg";

const images = [image1, image3];

const textAnimation = {
  initial: { opacity: 0, y: -80 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const ImagesSliderDemo = () => {
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        {...textAnimation}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Jovan i Jovana
        </motion.p>
      </motion.div>
    </ImagesSlider>
  );
};
