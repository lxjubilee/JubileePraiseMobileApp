import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfirmDialog } from '@/components/common';
import { dismissSignInPrompt, useAppDispatch, useAppSelector } from '@/redux';
import { navigationRef } from '@/navigation/navigationRef';

/**
 * Wait for a sheet the action came from (track options, playlist picker) to
 * finish dismissing — presenting two RN modals in the same frame can swallow the
 * second on iOS. The same delay lets this dialog fade out before the door opens.
 */
const MODAL_HANDOFF_MS = 260;

/**
 * Asks a guest to sign in when they try an account-only action (like, rate, add
 * to a playlist). Driven by `auth.signInPrompt`, set via `useRequireAuth` or the
 * like thunks. "Sign In" opens the Jubilee Door, which returns here on success.
 */
export const SignInPromptGate: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const reason = useAppSelector((s) => s.auth.signInPrompt);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!reason) {
      setVisible(false);
      return;
    }
    const id = setTimeout(() => setVisible(true), MODAL_HANDOFF_MS);
    return () => clearTimeout(id);
  }, [reason]);

  if (!reason || !visible) return null;

  const signIn = () => {
    dispatch(dismissSignInPrompt());
    setTimeout(() => {
      if (navigationRef.isReady()) navigationRef.navigate('JubileeDoor');
    }, MODAL_HANDOFF_MS);
  };

  return (
    <ConfirmDialog
      visible
      title={t('auth.prompt.title')}
      message={t(`auth.prompt.${reason}`)}
      confirmLabel={t('auth.prompt.signIn')}
      cancelLabel={t('auth.prompt.notNow')}
      onConfirm={signIn}
      onCancel={() => dispatch(dismissSignInPrompt())}
    />
  );
};
