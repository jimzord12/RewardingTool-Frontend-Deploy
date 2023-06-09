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

// reactstrap components
import { Container } from "reactstrap";

export function MyPageHeader() {
  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4">
        <a href="#available-rewards-section">
          <i className="icon tim-icons icon-tap-02 magic-icon" />
        </a>
      </div>
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <h1 className="h1-seo">
            Explore our{" "}
            <span className="text-primary animated-text">Rewards</span>
          </h1>
          <h3 className="d-none d-sm-block">
            redeem your <span className="text-success">MGS tokens</span> for
            fascinating products and services
          </h3>
        </div>
      </Container>
    </div>
  );
}
