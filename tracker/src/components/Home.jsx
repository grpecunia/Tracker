import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import World from "../images/world.png";
import Time from "../images/time.jpeg"
import Footer from "./Footer";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div
            className="row featurette"
            style={{ paddingBottom: "50px", paddingTop: "40px" }}
            id="howTo"
          >
            <div
              className="col-md-7"
              style={{ paddingTop: "40px", paddingBottom: "40px" }}
            >
              <br />
              <h2 className="featurette-heading">
                What is <span className="text-muted">TimeTracker?</span>
              </h2>
              <p className="lead">
                TimeTracker is a very intuitive tool to collect data of the time
                dedicated to tasks related to the provision of services that
                your organization performs.
              </p>
              <a href="/#more">
                <button className="btn btn-success center">Learn More</button>
              </a>
              <br />
            </div>
            <div
              className="col-md-5"
              style={{ paddingTop: "40px", paddingBottom: "40px" }}
            >
              <img
                className="featurette-image img-fluid mx-auto"
                src={World}
                alt="World"
              />
            </div>
          </div>
        </div>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={Time} alt="Time" height="650" />
            <Carousel.Caption>
              <h2>Time and Effort Tracking</h2>
              <p>
                Keep track of your time with accuracy and precision on your
                desktop, tablet or phone.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/1600x800?facebook"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h2>Employees</h2>
              <p>
                Employees will adapt quickly to this modern and easy to use web
                application.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/1600x800?facebook"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h2>Reports</h2>
              <p>
                View dashboards and analyze FTE reports by service fund with
                customized data visualizations!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="container">
          <div
            className="row featurette"
            style={{ paddingBottom: "20px", paddingTop: "20px" }}
            id="howTo"
          >
          </div>
          <hr
            className="featurette-divider"
            style={{ paddingTop: "40px", paddingBottom: "40px" }}
          />
          <div className="container">
            <img
              className="featurette-image img-fluid mx-auto"
              src="https://source.unsplash.com/random/1600x800?modern"
              alt=""
            />
          </div>
          <br></br>
          <br></br>
          <hr
            id="more"
            className="featurette-divider"
            style={{ paddingTop: "40px", paddingBottom: "40px" }}
          />
          <div className="row props" style={{ paddingBottom: "60px" }}>
            <div
              className="col-lg-4"
              style={{
                paddingBottom: "40px",
                paddingTop: "40px",
                backgroundColor: "#004ECD",
                textAlign: "center",
                alignItems: "center",
                marginBottom: "3em",
                color: "white",
              }}
            >
              <img
                className="rounded-circle"
                src="https://source.unsplash.com/random/900x900?woman"
                alt=""
                width="140"
                height="140"
              />
              <br />
              <br />
              <h2>Effort Tracking</h2>
              <br />
              <p>
                Keep track of your time with accuracy and precision on your
                desktop, tablet or phone.
              </p>
            </div>
            <br />
            <br />
            <div
              className="col-lg-4"
              style={{
                paddingBottom: "40px",
                paddingTop: "40px",
                backgroundColor: "#004E98",
                textAlign: "center",
                alignItems: "center",
                marginBottom: "3em",
                color: "white",
              }}
            >
              <img
                className="rounded-circle"
                src="https://source.unsplash.com/random/800x800?man"
                alt=""
                width="140"
                height="140"
              />
              <br />
              <br />
              <h2>Employees</h2>
              <br />
              <p>
                Your employees will adapt quickly to this modern and easy to use
                web application.
              </p>
            </div>
            <br />
            <br />
            <div
              className="col-lg-4"
              style={{
                paddingBottom: "40px",
                paddingTop: "40px",
                backgroundColor: "#004E75",
                textAlign: "center",
                alignItems: "center",
                marginBottom: "3em",
                color: "white",
              }}
            >
              <img
                className="rounded-circle"
                src="https://source.unsplash.com/random/800x800?woman"
                alt=""
                width="140"
                height="140"
              />
              <br />
              <br />
              <h2>Reports</h2>
              <br />
              <p>
                Analyze productivity reports by service or clients with
                customized data visualizations!
              </p>
            </div>
          </div>
          <hr
            className="featurette-divider"
            style={{ paddingTop: "40px", paddingBottom: "40px" }}
          />

          <div
            className="container"
            style={{ paddingTop: "40px", paddingBottom: "40px" }}
          ></div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
