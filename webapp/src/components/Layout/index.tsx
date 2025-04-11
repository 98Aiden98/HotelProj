import { Link, Outlet } from "react-router-dom";
import { getAllMemoriesRoute, getNewMemoryRoute, getSignInRoute, getSignUpRoute } from "../../lib/routes";
import css from "./index.module.scss";

export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>Memories Echo</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllMemoriesRoute()}>
              All memories
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getNewMemoryRoute()}>
              Add memory
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getSignUpRoute()}>
              Sign up
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getSignInRoute()}>
              Sign in
            </Link>
          </li>
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
};
