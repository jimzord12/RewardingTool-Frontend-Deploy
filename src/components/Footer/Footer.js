/*!

=========================================================
* BLK Design System React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="3">
            <h1 className="title">GENERA•</h1>
          </Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink
                  to="https://genera-game-v3-new-graphics.vercel.app/"
                  tag={Link}
                >
                  ONLINE GAME
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="https://discord.com/channels/1237054901138489445/1237753387815145534/1237779276858654855"
                  tag={Link}
                >
                  DISCORD
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/register-page" tag={Link}>
                  Register
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="https://life-genera.eu/media/" tag={Link}>
                  YOUTUBE
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink href="https://life-genera.eu/contact/">
                  Contact Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://life-genera.eu/about/">About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://life-genera.eu/genera-digital-social-platform/">
                  TOOLS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://life-genera.eu/">PROJECT SITE</NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <h3 className="title">Follow us:</h3>
            <div className="btn-wrapper profile">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://twitter.com/GeneraProject"
                id="tooltip622135962"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip622135962">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.facebook.com/profile.php?id=100088395187662"
                id="tooltip230450801"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip230450801">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.linkedin.com/company/genera-project/"
                id="tooltip318450378"
                target="_blank"
              >
                <i className="fab fa-linkedin" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Follow us
              </UncontrolledTooltip>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
