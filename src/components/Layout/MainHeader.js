import { Fragment } from "react";
import classes from "./MainHeader.module.css";
import { NavLink } from "react-router-dom";
import UserNavInfo from "components/Users/NavInfo";
const MainHeader = (props) => {
  console.log("MainHeader");
  return (
    <Fragment>
      <header className={`${classes.header} w3-container`}>
        <nav>
          <ul className={classes.nav_item_list}>
            <li>
              <NavLink activeClassName={classes.active} to="/">
                Home
              </NavLink>
            </li>
            <li className={classes.user_nav_info}>
              <UserNavInfo />
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default MainHeader;
