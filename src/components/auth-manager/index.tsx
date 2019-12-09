import { RouteComponentProps, navigate } from '@reach/router';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useMemo } from 'react';

import { STORE_TOKEN as USER_STORE_TOKEN, User, UserStore } from '../../stores/user';

export interface Props {
  [USER_STORE_TOKEN]?: UserStore;
  check?: (user?: User) => boolean
  success: React.ReactElement,
  fallback: string,
}
 
const AuthManager: React.SFC<RouteComponentProps<Props>> = ({ UserStore, check = Boolean, success, fallback, ...routerProps }) => {
  const valid = useMemo(() => check!(UserStore!.user), [check, UserStore]);
  useEffect(() => {
    if (!valid && fallback && typeof fallback === 'string') {
      navigate(fallback);
    }
  });

  if (valid) {
    return React.cloneElement(success!, { ...routerProps });
  }

  return null;
}
 
export default inject(USER_STORE_TOKEN)(observer(AuthManager));