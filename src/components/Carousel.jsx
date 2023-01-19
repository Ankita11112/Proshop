import Carousel from "react-bootstrap/Carousel";
import head from "../assets/head.webp";
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
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ borderRadius: "10px" }}
          className="d-block w-100"
          src={laptop}
          height="500px"
          alt="Second slide"
        />

        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ borderRadius: "10px" }}
          className="d-block w-100"
          src={head}
          height="500px"
          alt="Third slide"
        />

        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;
