import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer
          className="page-footer font-small blue pt-4"
          style={{
            backgroundColor: "#5680E9",
            paddingTop: "40px",
            paddingBottom: "20px",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          <div
            className="container-fluid text-center text-md-left container"
            style={{ paddingTop: "40px" }}
          >
            <div className="row" style={{ display: "align-space-evenly" }}>
              <div className="col-md-6 mt-md-0 mt-3">
                <h5>About the TimeTracker Application</h5>
                <p>
                  TimeTracker is a very intuitive tool to collect data of the
                  time dedicated to tasks related to the provision of services
                  that your organization performs. <br />
                  <br />
                  For more information about the application or if you want to
                  get involved email us at: grpecunia[at]gmail.com
                </p>
              </div>

              <hr
                className="clearfix w-100 d-md-none pb-3"
                style={{ paddingLeft: "10px" }}
              />

              <div
                className="col-md-3 mb-md-0 mb-3"
                style={{ textAlign: "center" }}
              >
                <h5 className="text-uppercase">Sponsored by</h5>
                <br />
                <a
                  href="https://pecuniagroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://i1.wp.com/pecuniagroup.com/wp-content/uploads/2018/07/PecuniaGroupSq.png"
                    alt="Pecunia Group Inc"
                    width="150vw"
                    height="150vh"
                  />
                </a>
                <br />
                <br />
              </div>

              <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase" style={{ textAlign: "center" }}>
                  Useful Links
                </h5>

                <ul className="list-unstyled" style={{ textAlign: "center" }}>
                  <li>
                    <a
                      href="https://riverapecunia.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Developer
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pecuniagroup.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Pecunia Group, Inc.
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/grpecunia/Tracker"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.npmjs.com/package/axios"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      NPM
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <br />
          <br />
        </footer>
        <div className="footer-copyright text-center py-3">
          Developed by:{" "}
          <a
            style={{ color: "#fff" }}
            href="https://riverapecunia.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gustavo Rivera Pecunia
          </a>{" "}
          |{" "}
          <Link style={{ color: "#fff" }} to="/">
            TimeTracker
          </Link>{" "}
          | All rights reserved © {new Date().getFullYear()}
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
