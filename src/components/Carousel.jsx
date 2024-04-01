import Carousel from "react-bootstrap/Carousel";
import head2 from "../assets/head2.jpg";
import laptop from "../assets/laptop.jpg";
import phone from "../assets/phone.webp";

function HomeCarousel() {
  return (
    <Carousel style={{ marginBlock: "40px", borderRadius: "10px" }}>
      <Carousel.Item>
        <img
          style={{ borderRadius: "10px" }}
          className="d-block w-100"
          src={phone}
          height="500px"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ borderRadius: "10px" }}
          className="d-block w-100"
          src={laptop}
          height="500px"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ borderRadius: "10px" }}
          className="d-block w-100"
          src={head2}
          height="500px"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
