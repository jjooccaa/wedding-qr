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
      className="w-full bg-cream-50 font-sans md:px-10 py-20"
      ref={containerRef}
    >
      <div className="max-w-7xl text-center mx-auto px-4 md:px-8 lg:px-10">
        <h2 className="text-3xl md:text-5xl mb-4 text-olive-600 font-script">
          Naša priča
        </h2>
        <p className="text-olive-800 text-sm md:text-base mb-12">
          Naši najvažniji trenuci
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
              <div className="h-12 absolute left-0 md:left-0 w-12 rounded-full bg-olive-200 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-olive-500 border border-olive-300 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-script text-olive-600">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-script text-olive-600">
                {item.title}
              </h3>
              <div className="text-olive-800 prose prose-olive">{item.content}</div>
            </div>
          </motion.div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-6 md:left-6 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-olive-500/30 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-olive-500/30 to-olive-500/30 to-[100%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_100%)]" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(to_top,var(--tw-gradient-stops))] from-transparent from-[0%] via-olive-500/30 to-olive-500/30 to-[100%] [mask-image:linear-gradient(to_top,transparent_0%,black_10%,black_100%)]" />
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-t from-olive-500 via-olive-300 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
