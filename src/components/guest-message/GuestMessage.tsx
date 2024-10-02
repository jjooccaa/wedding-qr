import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      // duration: 5,
      staggerChildren: 0.6
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: {duration: 2}},
};

const GuestMessage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="bg-gradient-to-b from-neutral-900 to-neutral-800 pt-2 pb-20 px-2 md:px-0" ref={ref}>
      <AnimatePresence>
        {isInView && (
          <motion.div
            className="max-w-3xl mx-auto text-center relative p-8 md:p-12"
            variants={containerAnimation}
            initial="hidden"
            animate="show"
          >
            <div className="absolute inset-0 p-2">
              <div className="w-full h-full border-4 border-purple-300 rounded-lg opacity-50"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pb-3">
                <svg className="w-12 h-12 text-purple-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
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
              Dobrodošli na sajt posvećen proslavi našeg venčanja! Srećni smo i radujemo se što ćemo ovu specijalnu proslavu deliti sa svim dragim ljudima.
            </motion.p>
            <motion.p
              className="font-sans text-lg md:text-xl text-neutral-300 mb-6 leading-relaxed"
              variants={itemAnimation}
            >
              P.S. Za one koji vole dobru rakijicu, obavezno probajte domaću mladu koliko i nevesta. Nema boljeg načina da nazdravimo – živeli! 🥂
            </motion.p>
            <motion.p
              className="font-script text-2xl md:text-3xl text-purple-300 mt-10"
              variants={itemAnimation}
            >
              Sa ljubavlju,<br />Jovan i Jovana
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GuestMessage;