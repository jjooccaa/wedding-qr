import Carousel from "../components/carousel/Carousel";
import { FileUpload } from "../components/file-upload/FileUpload";
import Footer from "../components/footer/Footer";
import GuestMessage from "../components/guest-message/GuestMessage";
import ImagesSlider from "../components/images-slider/ImagesSlider";
import ReceivePhotos from "../components/receive-photos/ReceivePhotos";
import Timeline from "../components/timeline/Timeline";

const Home = () => {
  return (
    <>
      <ImagesSlider />
      <GuestMessage />
      <FileUpload />
      <Carousel />
      <Timeline />
      <ReceivePhotos />
      <Footer />
    </>
  );
}

export default Home;
