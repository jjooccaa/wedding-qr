import Carousel from "../components/carousel/Carousel";
import FileUploader from "../components/file-upload/FileUploader";
import Footer from "../components/footer/Footer";
import { ImagesSliderDemo } from "../components/images-slider/ImagesSliderDemo";
import ReceivePhotos from "../components/receive-photos/ReceivePhotos";
import { TimelineDemo } from "../components/timeline/Timelinedemo";

const Home = () => {
  return (
    <>
      <ImagesSliderDemo />
      <FileUploader />
      <Carousel />
      <TimelineDemo />
      <ReceivePhotos />
      <Footer />
    </>
  );
}

export default Home;
