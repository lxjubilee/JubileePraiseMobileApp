import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { useFonts, Orbitron_600SemiBold } from '@expo-google-fonts/orbitron';

interface SplashScreenProps {
  /** Called once the intro animation completes and the app should be revealed. */
  onFinish: () => void;
}

/** Wordmark span colors — "Jubilee" + ".com" white, "Praise" azure blue (matches header). */
const WHITE = '#FFFFFF';
const AZURE = '#007FFF'; // Azure blue — brand highlight in the wordmark

/** Breathing room kept either side of the wordmark. */
const SIDE_PADDING = 24;
// Same model as the Home and welcome headers: Orbitron glyphs advance roughly
// 0.72em, so the wordmark needs about `length * 0.72 * fontSize`. Unlike those,
// this one is centred with no room to shrink into, so a fixed 30px put
// "JubileePraise.com" within a few points of the screen edge at 360dp and wrapped
// ".com" onto a second line below that.
const WORDMARK_WIDTH_EM = 'JubileePraise.com'.length * 0.72;
const WORDMARK_MAX = 30;
const WORDMARK_MIN = 18;

/** Wordmark size that keeps the whole name on one line at this width. */
const wordmarkFontSize = (screenWidth: number): number =>
  Math.max(
    WORDMARK_MIN,
    Math.min(WORDMARK_MAX, Math.floor((screenWidth - SIDE_PADDING * 2) / WORDMARK_WIDTH_EM)),
  );

/**
 * Netflix-style intro splash: the JubileePraise logo and "JubileePraise.com" wordmark
 * (Orbitron brand font) settle in (scale + fade), hold, then zoom toward the
 * viewer while the black overlay fades out, revealing the app. Uses RN Animated
 * (native driver) so it runs in Expo Go.
 */
export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const { width } = useWindowDimensions();
  const wordmarkSize = wordmarkFontSize(width);
  const scale = useRef(new Animated.Value(1.25)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;

  // Gate the intro on the Orbitron brand font: the wordmark stays hidden (group
  // opacity starts at 0) until the font is ready, so it never flashes in the
  // system fallback font. A short safety timeout starts the intro anyway if the
  // (bundled, normally-instant) font ever fails to report — the splash must
  // always reveal the app. `useFonts` dedupes with App's own font load.
  const [fontLoaded, fontError] = useFonts({ Orbitron_600SemiBold });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (fontLoaded || fontError) {
      setReady(true);
      return undefined;
    }
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, [fontLoaded, fontError]);

  useEffect(() => {
    if (!ready) return undefined; // hold the intro until the brand font is ready
    const animation = Animated.sequence([
      // 1. Logo + wordmark settle in.
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 7,
          tension: 45,
          useNativeDriver: true,
        }),
      ]),
      // 2. Hold.
      Animated.delay(550),
      // 3. Zoom into the wordmark while the overlay fades to reveal the app.
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 14,
          duration: 650,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 650,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ]);

    animation.start(({ finished }) => {
      if (finished) onFinish();
    });

    return () => animation.stop();
  }, [ready, scale, opacity, overlayOpacity, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: overlayOpacity }]} pointerEvents="none">
      <Animated.View style={[styles.group, { opacity, transform: [{ scale }] }]}>
        <Image
          source={require('../../assets/JubileePraise-app-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {ready ? (
          <Text
            style={[styles.wordmark, { fontSize: wordmarkSize }]}
            allowFontScaling={false}
            numberOfLines={1}
          >
            <Text style={styles.white}>Jubilee</Text>
            <Text style={styles.azure}>Praise</Text>
            <Text style={styles.white}>.com</Text>
          </Text>
        ) : null}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  group: { alignItems: 'center' },
  logo: { width: 132, height: 132, marginBottom: 18 },
  // Orbitron_600SemiBold already encodes weight 600 — no fontWeight (it makes
  // Android drop the custom font and fall back to the system sans-serif).
  wordmark: {
    fontFamily: 'Orbitron_600SemiBold',
    // fontSize comes from `wordmarkFontSize` at render — see the group above.
    letterSpacing: 1,
    textShadowColor: 'rgba(0,127,255,0.35)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  white: { color: WHITE },
  azure: { color: AZURE },
});
