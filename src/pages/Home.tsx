import { BackgroundBeamsDemo } from "../components/Background";
import CarouselDemo from "../components/CarouselDemo";
import { FileUploadDemo } from "../components/FileUploadDemo";
import { ImagesSliderDemo } from "../components/ImagesSliderDemo";
import { TimelineDemo } from "../components/Timelinedemo";

const Home = () => {
  return (
    <>
      <ImagesSliderDemo />
      <FileUploadDemo />
      <CarouselDemo />
      <TimelineDemo />
      {/* <BackgroundBeamsDemo /> */}
    </>
  );
}

export default Home;
