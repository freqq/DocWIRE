export const LOCK_SCREEN = 'LOCK_SCREEN';
export const UNLOCK_SCREEN = 'UNLOCK_SCREEN';

export const lockScreen = () => ({
  type: LOCK_SCREEN,
});

export const unlockScreen = () => ({
  type: UNLOCK_SCREEN,
});
