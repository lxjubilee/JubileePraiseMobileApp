import React, { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useAppSelector } from '@/hooks';
import { userInitials } from '@/utils';
import { AppText } from './AppText';
import { IconButton } from './IconButton';

// Brand azure blue, shared with the Profile avatar.
const AVATAR_AZURE = '#007FFF';

interface ProfileButtonProps {
  onPress?: () => void;
  /** Diameter of the avatar circle. */
  size?: number;
}

/**
 * Header profile control: shows the signed-in user's initials in a circle
 * ("Sandeep Agarwal" -> "SA"). Falls back to the generic person icon when no
 * name is available.
 */
export const ProfileButton: React.FC<ProfileButtonProps> = ({ onPress, size = 32 }) => {
  const user = useAppSelector((s) => s.auth.user);

  const initials = useMemo(() => userInitials(user), [user]);

  if (!initials) {
    return <IconButton name="person-circle-outline" size={size - 2} onPress={onPress} />;
  }

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: AVATAR_AZURE,
        },
      ]}
    >
      {/* Two letters need to sit a little smaller to keep the same side margins. */}
      <AppText
        style={[styles.text, { fontSize: Math.round(size * (initials.length > 1 ? 0.42 : 0.47)) }]}
        allowFontScaling={false}
      >
        {initials}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  avatar: { alignItems: 'center', justifyContent: 'center' },
  // White on the azure disc: it reads cleanly where the header sits over
  // blurred artwork, which near-black did not.
  text: { color: '#FFFFFF', fontWeight: '700' },
});
