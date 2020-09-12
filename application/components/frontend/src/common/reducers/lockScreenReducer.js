import { LOCK_SCREEN, UNLOCK_SCREEN } from 'common/actions/lockScreenActions';

export const INITIAL_STATE = { locked: false };

const toggleLockScreen = (state, isLocked) => ({
  ...state,
  locked: isLocked,
});

export default (state, action) => {
  const stateDefinition = typeof state === 'undefined' ? INITIAL_STATE : state;
  switch (action.type) {
    case LOCK_SCREEN:
      return toggleLockScreen(stateDefinition, true);
    case UNLOCK_SCREEN:
      return toggleLockScreen(stateDefinition, false);
    default:
      return stateDefinition;
  }
};
