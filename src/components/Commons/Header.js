import React from "react";
import { Link } from "react-router-dom";
import { Container, Image, Menu, Icon } from "semantic-ui-react";
class Header extends React.Component {
  render() {
    return (
      <Menu fixed="top" borderless inverted color="blue">
        <Container>
          <Menu.Item as="a" header>
            <Image
              size="mini"
              src="/assets/img/logo.png"
              style={{ marginRight: "1.5em" }}
            />
            CRA+GraphQL+Semantic-UI
          </Menu.Item>
          <Menu.Item>
            <Link to="/exchange">Exchange</Link>
          </Menu.Item>
          <Menu.Item position="right">
            <Icon disabled name="user" />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default Header;
