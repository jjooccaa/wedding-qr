import { motion } from "framer-motion";

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const GuestMessage = () => {
  return (
    <div className="bg-gradient-to-b from-neutral-900 to-neutral-800 py-20 px-4 md:px-0">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        <motion.h2
          className="font-script text-4xl md:text-5xl text-purple-300 mb-8"
          variants={itemAnimation}
        >
          Dragi gosti
        </motion.h2>
        <motion.div
          className="w-24 h-0.5 bg-purple-400 mx-auto mb-8"
          variants={itemAnimation}
        />
        <motion.p
          className="font-sans text-lg md:text-xl text-neutral-300 mb-6 leading-relaxed"
          variants={itemAnimation}
        >
          Dobrodošli na naš sajt posvećen proslavi našeg venčanja! Srećni smo i radujemo se što ćemo ovu specijalnu proslavu deliti sa svim dragim ljudima.        </motion.p>
        <motion.p
          className="font-sans text-lg md:text-xl text-neutral-300 mb-6 leading-relaxed"
          variants={itemAnimation}
        >
          P.S. Za one koji vole dobru rakijicu, obavezno probajte domaću rakiju staru koliko i mlada. Nema boljeg načina da podignete čašu za našu sreću – živeli! 🥂        </motion.p>
        <motion.p
          className="font-script text-2xl md:text-3xl text-purple-300 mt-10"
          variants={itemAnimation}
        >
          Sa ljubavlju,<br />Jovan i Jovana
        </motion.p>
      </motion.div>
    </div>
  );
};

export default GuestMessage;
