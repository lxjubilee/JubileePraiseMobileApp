import { useCallback } from 'react';
import { promptSignIn, useAppDispatch, useAppSelector, type SignInReason } from '@/redux';

/**
 * Guards an account-only action. Returns a check that is true for a signed-in
 * user; for a guest it opens the sign-in prompt instead and returns false:
 *
 *   const requireAuth = useRequireAuth();
 *   onPress={() => requireAuth('rate') && setComposerOpen(true)}
 */
export function useRequireAuth(): (reason: SignInReason) => boolean {
  const dispatch = useAppDispatch();
  const authed = useAppSelector((s) => s.auth.user != null);
  return useCallback(
    (reason: SignInReason) => {
      if (authed) return true;
      dispatch(promptSignIn(reason));
      return false;
    },
    [authed, dispatch],
  );
}
