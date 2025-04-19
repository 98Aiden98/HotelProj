import { Link, Outlet } from "react-router-dom";
import { useMe } from "../../lib/ctx";
import {
  getAllMemoriesRoute,
  getEditProfileRoute,
  getNewMemoryRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from "../../lib/routes";
import css from "./index.module.scss";

export const Layout = () => {
  const me = useMe();

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
          {me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getNewMemoryRoute()}>
                  Add memory
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getEditProfileRoute()}>
                  Edit profile
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignOutRoute()}>
                  Log out ({me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
};
