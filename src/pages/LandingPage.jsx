import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import "../styles/Landing.css";
import "../styles/globals.css";
import landing_vid2 from "../assets/landing_vid2.mp4";

function LandingPage() {
  return (
    <div className="landing-page">
      <h1 className="landing-title-left">
        <span>Level</span>
        <span>Up</span>
        <span>Your</span>
        <span>Music</span>
      </h1>

      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={landing_vid2} type="video/mp4" />
      </video>
      <div className="video-overlay" />

      <div className="content-layer">
        <Container fluid className="h-100 max-content-width">
          <Row className="min-vh-100 align-items-center">
            <Col lg={4} />
            <Col
              xs={11}
              sm={8}
              md={{ span: 5, offset: 7 }}
              lg={{ span: 4, offset: 8 }}
              className="form-column"
            >
              <div className="login-intro mb-4">
                <p className="intro-text">
                  Sign in to explore albums, buy tracks, and manage your music
                  collection.
                </p>
                <h2 className="enter-text">Enter Music Store</h2>
              </div>

              <LoginForm />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LandingPage;
