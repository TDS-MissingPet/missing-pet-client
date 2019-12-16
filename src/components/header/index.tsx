import { Link, navigate } from "@reach/router";
import { inject, observer } from "mobx-react";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";

import { STORE_TOKEN as USER_STORE_TOKEN, UserStore } from "../../stores/user";

export interface Props {
  [USER_STORE_TOKEN]?: UserStore;
}

@inject(USER_STORE_TOKEN)
@observer
class AppHeader extends React.Component<Props> {
  logout = () => {
    this.props[USER_STORE_TOKEN]!.resetUser();
    navigate("/authorization");
  };

  renderControls = () => {
    const canNavigate = this.props[USER_STORE_TOKEN]!.isAuthorized;
    if (!canNavigate) {
      return null;
    }

    const user = this.props[USER_STORE_TOKEN]!.user;

    return (
      <>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/dashboard">
              All posts
            </Nav.Link>
            {user && user.id ? (
              <Nav.Link as={Link} to={`/dashboard/${user.id}`}>
                My posts
              </Nav.Link>
            ) : null}
            <Nav.Item onClick={this.logout} className="nav-link">
              Logout
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </>
    );
  };

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Missing Pet</Navbar.Brand>
        {this.renderControls()}
      </Navbar>
    );
  }
}

export default AppHeader;
