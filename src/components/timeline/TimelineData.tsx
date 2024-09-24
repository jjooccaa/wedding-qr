import { motion } from "framer-motion";
import { TimelineView } from "./TimelineView";

const MotionImage = motion.img;

const Timeline = () => {
  const data = [
    {
      title: "28.07.2017",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base font-normal mb-4">
            Upoznali se prvi put
          </p>
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-neutral-800 p-4 rounded-lg shadow-inner"
          >
            <p className="text-neutral-300 text-sm italic">
              ""
            </p>
            <p className="text-neutral-400 text-xs mt-2">
              
            </p>
          </motion.div>
        </div>
      ),
    },
    {
      title: "10.08.2017",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base font-normal mb-4">
            Počeli da se zabavljamo
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MotionImage
              whileHover={{ scale: 1.05 }}
              src="/path-to-first-date-image.jpg"
              alt="Our first date"
              width={500}
              height={300}
              className="rounded-lg object-cover h-60 w-full shadow-lg mb-4"
            />
            <p className="text-neutral-400 text-sm">
              Our first official date at the local café. Little did we know where this journey would take us!
            </p>
          </motion.div>
        </div>
      ),
    },
    {
      title: "11.11.2019",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base font-normal mb-4">
            Početak našeg zajedničkog života!
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-3 gap-2"
          >
            <MotionImage
              whileHover={{ rotate: -5 }}
              src="/path-to-trip-image-1.jpg"
              alt="Trip to Paris"
              width={200}
              height={200}
              className="rounded-lg object-cover h-32 w-full shadow-md"
            />
            <MotionImage
              whileHover={{ rotate: 5 }}
              src="/path-to-trip-image-2.jpg"
              alt="Trip to Rome"
              width={200}
              height={200}
              className="rounded-lg object-cover h-32 w-full shadow-md"
            />
            <MotionImage
              whileHover={{ rotate: -5 }}
              src="/path-to-trip-image-3.jpg"
              alt="Trip to Tokyo"
              width={200}
              height={200}
              className="rounded-lg object-cover h-32 w-full shadow-md"
            />
          </motion.div>
        </div>
      ),
    },
    {
      title: "24.09.2023",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base font-normal mb-4">
            Prosidba
          </p>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MotionImage
              whileHover={{ scale: 1.05 }}
              src="/path-to-proposal-image.jpg"
              alt="Proposal moment"
              width={500}
              height={300}
              className="rounded-lg object-cover h-60 w-full shadow-lg mb-4"
            />
            <p className="text-neutral-400 text-sm italic">
              "Da li želiš da se udaš za mene?" - Trenutak koji je promenio sve.
            </p>
          </motion.div>
        </div>
      ),
    },
    {
      title: "05.10.2024",
      content: (
        <div>
          <p className="text-neutral-300 text-sm md:text-base font-normal mb-4">
            Naše venčanje
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            <MotionImage
              whileHover={{ scale: 1.05 }}
              src="/path-to-wedding-image-1.jpg"
              alt="Wedding venue"
              width={500}
              height={500}
              className="rounded-lg object-cover h-44 w-full shadow-lg"
            />
            <MotionImage
              whileHover={{ scale: 1.05 }}
              src="/path-to-wedding-image-2.jpg"
              alt="Wedding dress"
              width={500}
              height={500}
              className="rounded-lg object-cover h-44 w-full shadow-lg"
            />
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <TimelineView data={data} />
    </div>
  );
}

export default Timeline;
