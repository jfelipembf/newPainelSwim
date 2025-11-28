import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

// Import tabs
import LevelsTab from "./Tabs/Level";
import ObjectivesTab from "./Tabs/Objectives";
import TopicsTab from "./Tabs/Topics";

const EvaluationPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card className="mt-4">
            <CardBody>
              <h4 className="card-title mb-4">Avaliações</h4>

              <Nav tabs className="nav-tabs-custom">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => toggleTab("1")}
                  >
                    <span className="d-block d-sm-none">
                      <i className="fas fa-star" />
                    </span>
                    <span className="d-none d-sm-block">Níveis</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => toggleTab("2")}
                  >
                    <span className="d-block d-sm-none">
                      <i className="fas fa-bullseye" />
                    </span>
                    <span className="d-none d-sm-block">Objetivos</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => toggleTab("3")}
                  >
                    <span className="d-block d-sm-none">
                      <i className="fas fa-list" />
                    </span>
                    <span className="d-none d-sm-block">Tópicos</span>
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab} className="p-3">
                <TabPane tabId="1">
                  <LevelsTab />
                </TabPane>
                <TabPane tabId="2">
                  <ObjectivesTab />
                </TabPane>
                <TabPane tabId="3">
                  <TopicsTab />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EvaluationPage;
