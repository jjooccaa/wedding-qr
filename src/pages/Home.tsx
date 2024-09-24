import Carousel from "../components/carousel/Carousel";
import FileUploader from "../components/file-upload/FileUploader";
import Footer from "../components/footer/Footer";
import ImagesSlider from "../components/images-slider/ImagesSlider";
import ReceivePhotos from "../components/receive-photos/ReceivePhotos";
import { TimelineDemo } from "../components/timeline/Timelinedemo";

const Home = () => {
  return (
    <div className="bg-neutral-900">
      <ImagesSlider />
      <FileUploader />
      <Carousel />
      <TimelineDemo />
      <ReceivePhotos />
      <Footer />
    </div>
  );
}

export default Home;
