import React, { useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppText, BrandLogo } from '@/components/common';
import { PosterCollage } from './components/PosterCollage';
import { MUSIC_HERO } from './musicImages';

interface WelcomeProps {
  /** Leave the slides and open the app. */
  onGetStarted: () => void;
  /** Open the Privacy Policy from the top nav. */
  onPrivacy: () => void;
}

type SlideVisual = { type: 'collage' } | { type: 'poster'; image: string };

interface Slide {
  key: string;
  visual: SlideVisual;
  headline: string;
  subtitle: string;
}

const SLIDES: Slide[] = [
  {
    key: 'only',
    visual: { type: 'collage' },
    headline: 'Only on Jubilee Praise',
    subtitle: 'Thousands of songs, albums and artists — all in one place.',
  },
  {
    key: 'new',
    visual: { type: 'poster', image: MUSIC_HERO.new },
    headline: 'New arrivals weekly',
    subtitle: 'Fresh albums, singles and playlists added every week.',
  },
  {
    key: 'watchlist',
    visual: { type: 'poster', image: MUSIC_HERO.library },
    headline: 'A library you’ll actually love',
    subtitle: 'Smart recommendations tuned to your taste.',
  },
  {
    key: 'playback',
    visual: { type: 'poster', image: MUSIC_HERO.playback },
    headline: 'Play it your way',
    subtitle: 'Shuffle, repeat and seamless playback — full control of every track.',
  },
];

const ACCENT = '#007FFF'; // Azure blue accent

/** Diameter of the circular brand logo in the top nav (BrandLogo's default). */
const BRAND_LOGO = 28;
/** Width "PRIVACY" occupies — 13px uppercase label with 1px letter-spacing. */
const NAV_LINK_WIDTH = 64;
/** Smallest allowed space between the wordmark and PRIVACY. */
const BRAND_CLEARANCE = 14;

// Same model as the Home header: Orbitron is a wide geometric face whose glyphs
// advance roughly 0.72em, so the wordmark needs about `length * 0.72 * fontSize`.
// "JubileePraise.com" is four glyphs longer than the name it replaced, and at a
// fixed 22px it lost its ".com" to an ellipsis on 360dp phones. Deriving the size
// from the room the row actually has keeps the whole wordmark on screen.
const WORDMARK_WIDTH_EM = 'JubileePraise.com'.length * 0.72;
const BRAND_FONT_MAX = 22;
const BRAND_FONT_MIN = 15;

/** Wordmark size that fits the space left beside the logo and PRIVACY. */
const brandFontSize = (screenWidth: number): number => {
  const free =
    screenWidth -
    36 - // `topNav` horizontal padding
    (BRAND_LOGO + 8) - // logo plus its trailing margin
    NAV_LINK_WIDTH -
    BRAND_CLEARANCE;
  return Math.max(BRAND_FONT_MIN, Math.min(BRAND_FONT_MAX, Math.floor(free / WORDMARK_WIDTH_EM)));
};

/**
 * First-launch welcome: a horizontal pager of slides, each with its own visual
 * (a featured poster, or the tilted poster collage) above its headline/subtitle.
 * Top nav, animated pagination dots, and the Get Started button stay fixed.
 */
export const Welcome: React.FC<WelcomeProps> = ({ onGetStarted, onPrivacy }) => {
  const { width: SCREEN_W } = useWindowDimensions();
  const brandSize = brandFontSize(SCREEN_W);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [pagerH, setPagerH] = useState(0);
  const onPagerLayout = (e: LayoutChangeEvent) => setPagerH(e.nativeEvent.layout.height);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.topNav}>
          {/* BrandLogo strips `color`/`fontWeight` — the wordmark spans set their
              own colors and Orbitron encodes the weight. Size comes from the row. */}
          <BrandLogo textStyle={[styles.logo, { fontSize: brandSize }]} />
          <View style={styles.navLinks}>
            <Pressable hitSlop={8} onPress={onPrivacy}>
              <AppText variant="label" style={styles.navLink}>
                PRIVACY
              </AppText>
            </Pressable>
          </View>
        </View>

        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={styles.pager}
          onLayout={onPagerLayout}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
        >
          {SLIDES.map((slide) => (
            <View
              key={slide.key}
              style={[styles.slide, { width: SCREEN_W, height: pagerH || undefined }]}
            >
              <View style={styles.card}>
                {slide.visual.type === 'collage' ? (
                  <PosterCollage />
                ) : (
                  <Image
                    source={{ uri: slide.visual.image }}
                    style={StyleSheet.absoluteFill}
                    contentFit="cover"
                    transition={300}
                  />
                )}
                <LinearGradient
                  colors={['transparent', 'rgba(11,11,15,0.5)', '#0B0B0F']}
                  locations={[0.55, 0.85, 1]}
                  style={styles.overlay}
                  pointerEvents="none"
                />
              </View>

              <AppText variant="displayLg" style={styles.headline}>
                {slide.headline}
              </AppText>
              <AppText variant="body" color="textSecondary" style={styles.subtitle}>
                {slide.subtitle}
              </AppText>
            </View>
          ))}
        </Animated.ScrollView>

        <View style={styles.dots}>
          {SLIDES.map((slide, i) => {
            const width = scrollX.interpolate({
              inputRange: [(i - 1) * SCREEN_W, i * SCREEN_W, (i + 1) * SCREEN_W],
              outputRange: [7, 20, 7],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange: [(i - 1) * SCREEN_W, i * SCREEN_W, (i + 1) * SCREEN_W],
              outputRange: [0.35, 1, 0.35],
              extrapolate: 'clamp',
            });
            return <Animated.View key={slide.key} style={[styles.dot, { width, opacity }]} />;
          })}
        </View>

        <Pressable
          onPress={onGetStarted}
          style={({ pressed }) => [styles.cta, { opacity: pressed ? 0.85 : 1 }]}
        >
          <AppText variant="h3" style={styles.ctaLabel}>
            Get Started
          </AppText>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0B0B0F' },
  safe: { flex: 1 },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 8,
  },
  // fontSize comes from `brandFontSize` at render — see the top nav.
  logo: { letterSpacing: 1 },
  navLinks: { flexDirection: 'row', alignItems: 'center', gap: 22 },
  navLink: { letterSpacing: 1 },
  pager: { flex: 1 },
  slide: { paddingHorizontal: 20, paddingTop: 6, justifyContent: 'flex-end' },
  card: {
    width: '100%',
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: '#14141c',
    overflow: 'hidden',
  },
  // Overshoot every edge so the card's rounded `overflow: hidden` clips the
  // overlay to the exact card shape — no bright seam of the background collage
  // peeking through on the left/right/bottom (or under the 1px border).
  overlay: { position: 'absolute', top: -2, left: -2, right: -2, bottom: -2 },
  headline: { fontSize: 30, lineHeight: 36, textAlign: 'center', marginTop: 20 },
  subtitle: { textAlign: 'center', marginTop: 10, paddingHorizontal: 8, marginBottom: 4 },
  dots: { flexDirection: 'row', alignSelf: 'center', gap: 7, marginTop: 14, marginBottom: 16 },
  dot: { height: 7, borderRadius: 4, backgroundColor: '#FFFFFF' },
  cta: {
    backgroundColor: ACCENT,
    marginHorizontal: 18,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: { color: '#FFFFFF', fontWeight: '700' },
});

export default Welcome;
