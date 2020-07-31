import React from "react";
import { h } from "preact";
import { Link } from "preact-router/match";
import "./style.css";

const Header = () => (
  <header className="header">
    <h1>Covid Dashboard</h1>
    <nav>
      <Link activeClassName="active" href="/">
        Home
      </Link>
      <Link activeClassName="active" href="/compare">
        Compare Countries
      </Link>
    </nav>
  </header>
);

export default Header;
