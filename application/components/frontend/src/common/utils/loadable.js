import Loadable from 'react-loadable';
import ProgressIndicatorCircular from 'common/components/ProgressIndicatorCircular';

const makeLoadable = loader =>
  Loadable({
    loader,
    loading: ProgressIndicatorCircular,
  });

export default makeLoadable;
