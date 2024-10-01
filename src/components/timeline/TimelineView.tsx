import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TimelineViewProps } from "../../types/props/TimelineViewProps";

export const TimelineView = ({ data }: { data: TimelineViewProps[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-neutral-900 font-sans md:px-10 py-20"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <h2 className="text-3xl md:text-5xl mb-4 text-purple-300 font-script">
          Naša ljubavna priča
        </h2>
        <p className="text-neutral-300 text-sm md:text-base max-w-sm mb-12">
          Naši najvažniji trenuci poređani hronološki
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 absolute left-0 md:left-0 w-12 rounded-full bg-purple-900/50 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-purple-500 border border-purple-300 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-script text-purple-300">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-script text-purple-300">
                {item.title}
              </h3>
              <div className="text-neutral-300 prose prose-invert">{item.content}</div>
            </div>
          </motion.div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-6 md:left-6 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-purple-500/30 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-t from-purple-500 via-purple-300 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};