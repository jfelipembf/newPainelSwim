import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link} from "react-router-dom"
import withRouter from "components/Common/withRouter"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const Navbar = props => {
  const [ui, setui] = useState(false)
  const [gerencial, setGerencial] = useState(false)
  const [email, setemail] = useState(false)
  const [financial, setFinancial] = useState(false)
  const [form, setform] = useState(false)
  const [table, settable] = useState(false)
  const [chart, setchart] = useState(false)
  const [icon, seticon] = useState(false)
  const [map, setmap] = useState(false)
  const [extra, setextra] = useState(false)
  const [moreItem, setMoreItem] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const pathName = process.env.PUBLIC_URL + props.router.location.pathname;

    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    removeActivation(items);
    for (var i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [props.router.location.pathname]);

  const closeDropdowns = () => {
    setAdmin(false)
    setGerencial(false)
    setemail(false)
    setFinancial(false)
    setform(false)
    settable(false)
    setchart(false)
    seticon(false)
    setmap(false)
    setextra(false)
    setMoreItem(false)
  }

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  };

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="topnav">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    <i className="ti-dashboard">
                    </i>{props.t("Dashboard")} {props.menuOpen}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/members">
                    <i className="fas fa-users"></i> Clientes
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/management/schedule">
                    <i className="fas fa-calendar-check"></i> Grade
                  </Link>
                </li>

                <li
                  className="nav-item dropdown"
                  onMouseEnter={() => {
                    closeDropdowns()
                    setAdmin(true)
                  }}
                  onMouseLeave={() => setAdmin(false)}
                >
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setAdmin(!admin)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="fas fa-briefcase"></i> Administrativo
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: admin }
                    )}
                  >
                    <Link to="/admin/employees" className="dropdown-item">
                      <i className="fas fa-user-tie"></i> Funcionários
                    </Link>
                    <Link to="/admin/memberships" className="dropdown-item">
                      <i className="fas fa-file-contract"></i> Planos
                    </Link>
                    <Link to="/admin/areas" className="dropdown-item">
                      <i className="fas fa-vector-square"></i> Áreas
                    </Link>
                    <Link to="/admin/products" className="dropdown-item">
                      <i className="fas fa-box"></i> Produtos
                    </Link>
                    <Link to="/admin/services" className="dropdown-item">
                      <i className="fas fa-concierge-bell"></i> Serviços
                    </Link>
                    <Link to="/management/classes" className="dropdown-item">
                      <i className="fas fa-people-carry"></i> Turmas
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      closeDropdowns()
                      setGerencial(prev => !prev)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="fas fa-chart-line"></i> Gerencial
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: gerencial }
                    )}
                  >
                    <Link to="/admin/activities" className="dropdown-item">
                      <i className="fas fa-running"></i> Atividades
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      closeDropdowns()
                      setFinancial(prev => !prev)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="fas fa-cash-register"></i> Financeiro
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: financial }
                    )}
                  >
                    <Link to="/financial/cash-register" className="dropdown-item">
                      <i className="fas fa-store"></i> Caixa
                    </Link>
                    <Link to="/financial/cash-flow" className="dropdown-item">
                      <i className="fas fa-stream"></i> Fluxo de Caixa
                    </Link>
                    <Link to="/financial/accounts-payable" className="dropdown-item">
                      <i className="fas fa-file-invoice-dollar"></i> Contas a Pagar
                    </Link>
                    <Link to="/financial/fees" className="dropdown-item">
                      <i className="fas fa-percentage"></i> Taxas
                    </Link>
                  </div>
                </li>

                <li className="nav-item">
                  <Link to="/evaluation" className="nav-link">
                    <i className="fas fa-clipboard-check"></i> Metodologia
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      closeDropdowns()
                      setemail(prev => !prev)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-email"></i>{props.t("Email")}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", 
                    { show: email }
                    )}
                  >
                    <Link to="/email-inbox" className="dropdown-item">
                      {props.t("Inbox")}
                    </Link>
                    <Link to="/email-read" className="dropdown-item">
                      {props.t("Read Email")}
                    </Link>
                    <Link to="/email-compose" className="dropdown-item">
                      {props.t("Email Compose")}
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      closeDropdowns()
                      setui(prev => !prev)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-support"></i>
                    {props.t("UI Elements")}
                  </Link>
                  <div
                    className={classname(
                      "dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-xl",
                      { show: ui }
                    )}
                  >
                    <Row>
                      <Col lg={4}>
                        <div>
                          <Link to="/ui-alerts" className="dropdown-item">
                            {props.t("Alerts")}
                          </Link>
                          <Link to="/ui-buttons" className="dropdown-item">
                            {props.t("Buttons")}
                          </Link>
                          <Link to="/ui-badge" className="dropdown-item">
                            {props.t("Badge")}
                          </Link>
                          <Link to="/ui-cards" className="dropdown-item">
                            {props.t("Cards")}
                          </Link>
                          <Link to="/ui-carousel" className="dropdown-item">
                            {props.t("Carousel")}
                          </Link>
                          <Link to="/ui-dropdowns" className="dropdown-item">
                            {props.t("Dropdowns")}
                          </Link>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Link to="/ui-grid" className="dropdown-item">
                            {props.t("Grid")}
                          </Link>
                          <Link to="/ui-images" className="dropdown-item">
                            {props.t("Images")}
                          </Link>
                          <Link to="/ui-lightbox" className="dropdown-item">
                            {props.t("Lightbox")}
                          </Link>
                          <Link to="/ui-modals" className="dropdown-item">
                            {props.t("Modals")}
                          </Link>
                          <Link to="/ui-pagination" className="dropdown-item">
                            {props.t("Pagination")}
                          </Link>
                          <Link to="/ui-popover-tooltip" className="dropdown-item">
                            {props.t("Popover & Tooltips")}
                          </Link>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div>
                          <Link to="/ui-progressbars" className="dropdown-item">
                            {props.t("Progress Bars")}
                          </Link>
                          <Link
                            to="/ui-tabs-accordions"
                            className="dropdown-item"
                          >
                            {props.t("Tabs & Accordions")}
                          </Link>
                          <Link to="/ui-typography" className="dropdown-item">
                            {props.t("Typography")}
                          </Link>
                          <Link to="/ui-video" className="dropdown-item">
                            {props.t("Video")}
                          </Link>
                          <Link to="/ui-utilities" className="dropdown-item">
                            {props.t("Utilities")}
                          </Link>
                          <Link to="/ui-colors" className="dropdown-item">
                            {props.t("Colors")}
                          </Link>
                          <Link to="/ui-offcanvas" className="dropdown-item">
                            {props.t("Offcanvas")}
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      closeDropdowns()
                      setform(prev => !prev)
                    }}
                  >
                    <i className="ti-receipt"></i> {props.t("Forms")}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", { show: form })}
                  >
                    <Link to="/form-elements" className="dropdown-item">
                      {props.t("Form Elements")}
                    </Link>
                    <Link to="/form-validation" className="dropdown-item">
                      {props.t("Form Validation")}
                    </Link>
                    <Link to="/form-advanced" className="dropdown-item">
                      {props.t("Form Advanced")}
                    </Link>
                    <Link to="/form-editors" className="dropdown-item">
                      {props.t("Form Editors")}
                    </Link>
                    <Link to="/form-uploads" className="dropdown-item">
                      {props.t("Form File Upload")}{" "}
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      closeDropdowns()
                      setMoreItem(prev => !prev)
                    }}
                  >
                    <i className="ti-menu-alt"></i>More
                  </Link>
                  <div className={classname("dropdown-menu dropdown-menu-left", { show: moreItem })}>
                    <Link to="/calendar" className="dropdown-item">{props.t("Calendar")}</Link>
                    <Link to="/chat" className="dropdown-item">{props.t("Chat")}</Link>
                    <Link to="/kanbanboard" className="dropdown-item">{props.t("Kanban")}</Link>
                    <div className="dropdown">
                        <Link
                          to="/#"
                          className="dropdown-item dropdown-toggle arrow-none"
                          onClick={e => {
                            e.preventDefault()
                            closeDropdowns()
                            seticon(prev => !prev)
                          }}
                        >
                        {props.t("Icons")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: icon })}
                      >

                        <Link to="/icons-materialdesign" className="dropdown-item">
                          {props.t("Material Design")}
                        </Link>

                        <Link to="/icons-ion" className="dropdown-item">{props.t("Ion Icons")}</Link>

                        <Link to="/icons-fontawesome" className="dropdown-item">{props.t("Font Awesome")}</Link>

                        <Link to="/icons-themify" className="dropdown-item">{props.t("Themify Icons")}</Link>

                        <Link to="/icons-dripicons" className="dropdown-item">{props.t("Dripicons")}</Link>

                        <Link to="/icons-typicons" className="dropdown-item">{props.t("Typicons Icons")}</Link>

                      </div>
                    </div>
                    <div className="dropdown">
                        <Link
                          to="/#"
                          className="dropdown-item dropdown-toggle arrow-none"
                          onClick={e => {
                            e.preventDefault()
                            closeDropdowns()
                            settable(prev => !prev)
                          }}
                        >
                        {props.t("Tables")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: table })}
                      >
                        <Link to="/tables-basic" className="dropdown-item">
                          {props.t("Basic Tables")}
                        </Link>
                        <Link to="/tables-datatable" className="dropdown-item">
                          {props.t("Data Tables")}
                        </Link>
                        <Link to="/tables-responsive" className="dropdown-item">
                          {props.t("Responsive Table")}
                        </Link>
                      </div>
                    </div>
                    <div className="dropdown">
                        <Link
                          to="/#"
                          className="dropdown-item dropdown-toggle arrow-none"
                          onClick={e => {
                            e.preventDefault()
                            closeDropdowns()
                            setmap(prev => !prev)
                          }}
                        >
                        {props.t("Maps")} <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: map })}
                      >
                        <Link to="/maps-google" className="dropdown-item">
                          {props.t("Google Maps")}{" "}
                        </Link>
                        <Link to="/maps-vector" className="dropdown-item">
                          {props.t("Vector Maps")}{" "}
                        </Link>
                       
                      </div>
                    </div>
                    <Link to="/ui-rangeslider" className="dropdown-item">{props.t("Range Slider")}</Link>
                    <Link to="/ui-session-timeout" className="dropdown-item">{props.t("Session Timeout")}</Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      closeDropdowns()
                      setchart(prev => !prev)
                    }}
                  >
                    <i className="ti-pie-chart"></i> {props.t("Charts")}
                  </Link>
                  <div
                    className={classname("dropdown-menu", { show: chart })}
                  >

                    <Link to="/apex-charts" className="dropdown-item">
                      {props.t("Apex charts")}
                    </Link>

                    
                    <Link to="/charts-chartjs" className="dropdown-item">
                      {props.t("Chartjs Chart")}
                    </Link>

                    <Link to="/sparkline-charts" className="dropdown-item">
                      {props.t("Sparkline Chart")}
                    </Link>

                    <Link to="/charts-knob" className="dropdown-item">
                      {props.t("Jquery Knob Chart")}
                    </Link>

                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle arrow-none" to="#" id="topnav-pages"
                    onClick={e => {
                      e.preventDefault()
                      closeDropdowns()
                      setextra(prev => !prev)
                    }}
                  >
                    <i className="ti-support"></i>Pages
                  </Link>
                  <div className={classname("dropdown-menu mega-dropdown-menu px-2 dropdown-mega-menu-lg dropdown-menu-right", { show: extra })}>
                    <Row>
                      <Col lg={6}>
                        <div>
                          <Link to="/pages-timeline" className="dropdown-item">Timeline</Link>
                          <Link to="/pages-invoice" className="dropdown-item">Invoice</Link>
                          <Link to="/pages-directory" className="dropdown-item">Directory</Link>
                          <Link to="/pages-login" className="dropdown-item">Login</Link>
                          <Link to="/pages-register" className="dropdown-item">Register</Link>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div>
                          <Link to="/page-recoverpw" className="dropdown-item">Recover Password</Link>
                          <Link to="/auth-lock-screen" className="dropdown-item">Lock Screen</Link>
                          <Link to="/pages-blank" className="dropdown-item">Blank Page</Link>
                          <Link to="/pages-404" className="dropdown-item">Error 404</Link>
                          <Link to="/pages-500" className="dropdown-item">Error 500</Link>

                        </div>
                      </Col>
                    </Row>
                  </div>
                </li></ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)
