import React, { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthErrorPlaceholder from 'common/components/placeholders/AuthErrorPlaceholder';
import AuthLoaderPlaceholder from 'common/components/placeholders/AuthLoaderPlaceholder';
import { fetchAuthUserInfo } from 'common/actions/authUserActions';

import { INTERNAL_SERVER_ERROR_PATH } from 'common/paths';

const AuthService = ({
  location,
  children,
  isLoading,
  isError,
  fetchAuth,
  isAccountLoading,
  isAccountError,
}) => {
  useEffect(() => {
    fetchAuth(location);
  }, []);

  const shouldDisplayAuthErrorPage = () =>
    !isLoading && isError && isAccountError && !isAccountLoading;

  const shouldRenderPage = () =>
    isLoading || isAccountLoading ? <AuthLoaderPlaceholder /> : children;

  return (
    <>
      <Route
        path={INTERNAL_SERVER_ERROR_PATH}
        render={() => (shouldDisplayAuthErrorPage() ? <AuthErrorPlaceholder /> : null)}
      />
      {!isError && shouldRenderPage()}
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.common.authUser.isFetching,
  isError: state.common.authUser.isError,
  isAccountLoading: state.common.accountData.isFetching,
  isAccountError: state.common.accountData.isError,
});

const mapDispatchToProps = dispatch => ({
  fetchAuth: redirectPath => dispatch(fetchAuthUserInfo(redirectPath)),
});

AuthService.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isAccountLoading: PropTypes.bool.isRequired,
  isAccountError: PropTypes.bool.isRequired,
  fetchAuth: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthService));
