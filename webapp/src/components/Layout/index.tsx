import { Link, Outlet } from "react-router-dom";
import {
  getAllMemoriesRoute,
  getNewMemoryRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from "../../lib/routes";
import { trpc } from "../../lib/trpc";
import css from "./index.module.scss";

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery();

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
          {isLoading || isFetching || isError ? null : data?.me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getNewMemoryRoute()}>
                  Add memory
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignOutRoute()}>
                  Log out ({data.me.nick})
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
