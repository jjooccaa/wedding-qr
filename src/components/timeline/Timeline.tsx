import { motion } from "framer-motion";
import { TimelineView } from "./TimelineView";
import sahara1 from "../../assets/timeline/sahara_1.jpg";
import sahara2 from "../../assets/timeline/sahara_2.jpg";
import sahara3 from "../../assets/timeline/sahara_3.jpg";
import sahara4 from "../../assets/timeline/sahara_4.jpg";
import sahara5 from "../../assets/timeline/sahara_5.jpg";
import beginning2 from "../../assets/timeline/beginning_2.jpeg";
import beginning3 from "../../assets/timeline/beginning_3.jpeg";
import beginning5 from "../../assets/timeline/beginning_5.jpeg";

const MotionImage = motion.img;

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Timeline = () => {
  const data = [
    {
      title: "28.07.2017",
      content: (
        <div>
          <p className="text-olive-700 text-sm md:text-base font-normal mb-4">
            Prvi susret
          </p>
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-cream-100 p-4 rounded-lg shadow-inner"
          >
            <p className="text-olive-600 text-sm italic">
              "Ponekad sudbina odluči da se umeša, i to na najneočekivaniji način..."
            </p>
            <p className="text-olive-500 text-xs mt-2">
              Tog dana smo se prvi put sreli, ne znajući da će to biti početak nečeg predivnog.
            </p>
          </motion.div>
        </div>
      ),
    },
    {
      title: "10.08.2017",
      content: (
        <div>
          <p className="text-olive-700 text-sm md:text-base font-normal mb-4">
            Početak naše veze
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.3 }}
            className="grid grid-cols-2 gap-4 mb-4"
          >
            <MotionImage
              variants={imageVariants}
              src={beginning2}
              alt="Naše prve fotografije 1"
              className="rounded-lg object-cover w-full h-48 shadow-lg col-span-2"
            />
            <MotionImage
              variants={imageVariants}
              src={beginning3}
              alt="Naše prve fotografije 2"
              className="rounded-lg object-cover w-full h-48 shadow-lg"
            />
            <MotionImage
              variants={imageVariants}
              src={beginning5}
              alt="Naše prve fotografije 4"
              className="rounded-lg object-cover w-full h-48 shadow-lg"
            />
          </motion.div>
          <p className="text-olive-600 text-sm">
            Naše prve zajedničke fotografije. Mladi i naivni.
          </p>
        </div>
      ),
    },
    {
      title: "11.11.2019",
      content: (
        <div>
          <p className="text-olive-700 text-sm md:text-base font-normal mb-4">
            Početak zajedničkog života
          </p>
          <p className="text-olive-600 text-sm mt-2">
            Odlučili smo da spojimo naše živote pod istim krovom. Svaki dan je postao nova avantura.
          </p>
        </div>
      ),
    },
    {
      title: "24.09.2023",
      content: (
        <div>
          <p className="text-olive-700 text-sm md:text-base font-normal mb-4">
            Prosidba na obodima Sahare
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="grid grid-cols-6 gap-2 mb-4"
          >
            <MotionImage
              variants={imageVariants}
              src={sahara2}
              alt="Izlazak sunca u Sahari"
              className="rounded-lg object-cover w-full h-40 shadow-md col-span-3"
            />
            <MotionImage
              variants={imageVariants}
              src={sahara3}
              alt="Pustinjski pejzaž"
              className="rounded-lg object-cover w-full h-40 shadow-md col-span-3"
            />
            <MotionImage
              variants={imageVariants}
              src={sahara4}
              alt="Verenički prsten"
              className="rounded-lg object-cover w-full h-32 shadow-md col-span-2"
            />
            <MotionImage
              variants={imageVariants}
              src={sahara1}
              alt="Sahara"
              className="rounded-lg object-cover w-full h-32 shadow-md col-span-2"
            />
            <MotionImage
              variants={imageVariants}
              src={sahara5}
              alt="Sahara 2"
              className="rounded-lg object-cover w-full h-32 shadow-md col-span-2"
            />
          </motion.div>
          <p className="text-olive-600 text-sm italic mt-2">
            "Hoćeš li da se udaš za mene?" - pitanje postavljeno uz izlazak sunca nad jezerom Šot el Džerid.
          </p>
        </div>
      ),
    },
    {
      title: "05.10.2024",
      content: (
        <div>
          <p className="text-olive-700 text-sm md:text-base font-normal mb-4">
            Naše venčanje
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-cream-100 p-4 rounded-lg shadow-inner"
          >
            <p className="text-olive-600 text-sm italic">
              "Dan kada ćemo reći 'Da' pred našim najmilijima."
            </p>
            <p className="text-olive-500 text-xs mt-2">
              Radujemo se što ćemo ovaj poseban trenutak podeliti sa vama.
            </p>
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-cream-50">
      <TimelineView data={data} />
    </div>
  );
}

export default Timeline;
