/**
 * Source text for the in-app legal documents (Privacy Policy & Terms of Use).
 * Kept as structured data — not hard-coded JSX — so the same `LegalScreen`
 * renderer can present either document and copy edits stay in one place.
 *
 * The text mirrors the JubileePraise.com website (`/privacy` and `/terms`); keep the
 * two in sync when either is revised.
 */

/** A single rendered block within a section: a paragraph, sub-heading, or list. */
export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'bullets'; items: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  title: string;
  /** Human-readable effective date shown under the title. */
  effectiveDate: string;
  /** Lead paragraph(s) shown before the numbered sections. */
  intro: string[];
  sections: LegalSection[];
  /** Address used in the closing "Contact us" section. */
  contactEmail: string;
}

const EFFECTIVE_DATE = 'June 17, 2026';
/** The Privacy Policy was revised on its own to cover the mobile app. */
const PRIVACY_EFFECTIVE_DATE = 'September 25, 2026';

export const PRIVACY_POLICY: LegalDocument = {
  title: 'Privacy Policy',
  effectiveDate: PRIVACY_EFFECTIVE_DATE,
  contactEmail: 'privacy@jubileepraise.com',
  intro: [
    `Jubilee Praise ("Jubilee Praise," "we," "us," or "our"), operated by Jubilee Software, Inc., provides a faith-centered music streaming and discovery experience. This Privacy Policy applies to the JubileePraise.com website and the Jubilee Praise mobile app for iOS and Android (together, the "Service"). You can listen without an account; if you create one or sign in, you agree to the practices described below.`,
  ],
  sections: [
    {
      heading: '1. Information We Collect',
      blocks: [
        { type: 'subheading', text: 'Information you provide' },
        {
          type: 'bullets',
          items: [
            'Account details. When you sign up we collect your first and last name, date of birth, and email address. We ask for your date of birth only to confirm you meet the minimum age to create an account (see "Children\'s Privacy"). Your password is stored only in a securely hashed form — we never keep it in plain text.',
            'Your activity. The star ratings you give, the songs and albums you like, and the playlists you build are stored and associated with your account. On the website you can also write reviews and take part in features such as comments and award nominations; the mobile app does not offer these.',
            'Communications. If you contact us for support, we keep the messages and contact details you send so we can respond.',
          ],
        },
        { type: 'subheading', text: 'Information collected automatically' },
        {
          type: 'bullets',
          items: [
            'Listening activity. When you play music, we record which song was played, how long you listened, whether you finished or skipped it, and a random session identifier that resets each time the app is restarted. If you are signed in, this is linked to your account. We use it to show what is being played and to improve the catalog and the Service.',
            `Security & verification. To confirm your email and protect your account we generate one-time, 6-digit verification codes (used at sign-up and, when enabled, for two-step sign-in), and we record your "keep me signed in" preference.`,
            'Technical data. Our servers automatically log information such as your IP address, device or browser type (from the user-agent), the requests made, and the date and time of each request. This helps us operate, secure, and improve the Service.',
          ],
        },
        { type: 'subheading', text: 'What the mobile app does not collect' },
        {
          type: 'paragraph',
          text: "The app does not access your location, contacts, photos, camera, or microphone, does not use your device's advertising identifier, and does not track you across other companies' apps or websites.",
        },
        { type: 'subheading', text: 'Jubilee family accounts' },
        {
          type: 'paragraph',
          text: "Jubilee Praise accounts are part of the Jubilee family of services. When you sign in, our servers verify your credentials with JubileeInspire, the Jubilee family's account service, and may keep your basic profile (name and email address) in sync with it. If you choose to continue with JubileeInspire on the website, we receive the same basic profile information from your JubileeInspire account.",
        },
      ],
    },
    {
      heading: '2. How We Use Your Information',
      blocks: [
        {
          type: 'bullets',
          items: [
            'Create and manage your account, authenticate you, and keep your session secure.',
            'Provide the core experience — streaming the catalog and saving your playlists, likes, and ratings.',
            'Send you service-related (transactional) email, such as verification codes, password-reset links, and important account or security notices.',
            'Understand how the catalog is used (for example, which songs are played and finished) so we can improve it.',
            'Detect, prevent, and respond to fraud, abuse, and security incidents.',
            'Comply with legal obligations and enforce our terms.',
          ],
        },
        {
          type: 'paragraph',
          text: "We do not use your personal information to serve third-party advertising, we do not track you across other companies' apps or websites, and we do not sell your personal information.",
        },
      ],
    },
    {
      heading: '3. Email Communications',
      blocks: [
        {
          type: 'paragraph',
          text: 'The emails we send (verification codes, password resets, and security notices) are necessary to operate your account and are delivered on our behalf by a third-party email provider (currently SendGrid). These transactional messages are part of the Service and are not marketing email. If we ever introduce optional newsletters or promotional email, you will be able to opt out at any time.',
        },
      ],
    },
    {
      heading: '4. Cookies, Device Storage, and Similar Technologies',
      blocks: [
        { type: 'subheading', text: 'On the website' },
        {
          type: 'paragraph',
          text: 'We use a small number of strictly necessary cookies; we do not use advertising or cross-site tracking cookies.',
        },
        {
          type: 'bullets',
          items: [
            'Session cookie. A secure, HTTP-only cookie that keeps you signed in as you move between pages.',
            'Bot protection. Our sign-in page may use Cloudflare Turnstile to tell humans from automated abuse; Cloudflare may set its own cookie for this purpose.',
          ],
        },
        {
          type: 'paragraph',
          text: 'You can block or delete cookies in your browser settings, but disabling the essential cookies above will prevent you from signing in or using account features.',
        },
        { type: 'subheading', text: 'In the mobile app' },
        {
          type: 'bullets',
          items: [
            "The app does not use cookies. It keeps you signed in with sign-in tokens stored in your device's secure storage (the iOS Keychain or Android Keystore). Signing out removes them.",
            'The app stores a few preferences on your device — your language, shuffle and repeat settings, recent searches, and a copy of your likes — so it works quickly. This information stays on your device, and deleting the app removes it.',
            'Signing in may show a Cloudflare Turnstile check to tell humans from automated abuse. Cloudflare processes technical information about your device for this purpose.',
          ],
        },
      ],
    },
    {
      heading: '5. How We Share Information',
      blocks: [
        { type: 'paragraph', text: 'We share personal information only in these limited situations:' },
        {
          type: 'bullets',
          items: [
            'Service providers. Vendors who process data on our behalf and under our instructions — our email delivery provider (SendGrid), security, bot protection and content delivery (Cloudflare), and our hosting infrastructure.',
            'The Jubilee family of services. Account information is shared with JubileeInspire to verify your sign-in and keep your Jubilee family account in sync (see Section 1).',
            'Legal and safety. When we reasonably believe disclosure is required by law, legal process, or to protect the rights, property, or safety of our users, the public, or Jubilee Praise.',
            'Business transfers. In connection with a merger, acquisition, or sale of assets, in which case we will continue to protect your information consistent with this policy.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Star ratings are shown to other users only as an anonymous average and count. Reviews and comments you write on the website may be visible to other users there, with your name.',
        },
      ],
    },
    {
      heading: '6. Data Retention',
      blocks: [
        {
          type: 'paragraph',
          text: 'We keep your personal information for as long as your account is active or as needed to provide the Service, comply with our legal obligations, resolve disputes, and enforce our agreements. When you delete your account, we remove your account and its associated data as described in Section 7, except where we are required or permitted by law to retain certain records.',
        },
      ],
    },
    {
      heading: '7. Your Choices and Rights',
      blocks: [
        {
          type: 'bullets',
          items: [
            'Use without an account. You can browse and listen without creating an account.',
            'Access and update. You can view your account details and change your password from your profile in the app or your account page on the website.',
            'Remove a rating. You can remove any star rating you have given, at any time, from the album or song where you gave it.',
            `Delete your account. You can permanently delete your account and its associated data at any time in the app under Profile → Delete Account, or from the "Danger zone" on your account page on the website. This action cannot be undone.`,
            'Email. Transactional email is required to operate your account; any optional email will include an unsubscribe link.',
            'Regional rights. Depending on where you live (for example under the GDPR or CCPA/CPRA), you may have rights to access, correct, delete, port, or restrict the processing of your personal information, and to object to certain uses. To exercise these rights, contact us using the details below.',
          ],
        },
      ],
    },
    {
      heading: '8. Data Security',
      blocks: [
        {
          type: 'paragraph',
          text: "We use technical and organizational safeguards designed to protect your information, including encryption of data in transit (HTTPS/TLS), hashed password storage, sign-in tokens kept in your device's secure storage, bot protection at sign-in, and optional two-step verification. No method of transmission or storage is completely secure, however, so we cannot guarantee absolute security.",
        },
      ],
    },
    {
      heading: "9. Children's Privacy",
      blocks: [
        {
          type: 'paragraph',
          text: "While our catalog includes music made for children and families, accounts are intended for users who are old enough to maintain their own account. We do not knowingly collect personal information from children under the age of 13 (or the minimum age required in your jurisdiction), and the sign-up form checks your date of birth for this reason. If you believe a child has provided us personal information, please contact us and we will take steps to delete it. Parents and guardians are encouraged to supervise children's use of the Service.",
        },
      ],
    },
    {
      heading: '10. International Users',
      blocks: [
        {
          type: 'paragraph',
          text: 'Jubilee Praise is operated from the United States. If you use the Service from outside the United States, you understand that your information may be transferred to, stored, and processed in the United States and other countries where our service providers operate, which may have data protection laws different from those in your country.',
        },
      ],
    },
    {
      heading: '11. Changes to This Policy',
      blocks: [
        {
          type: 'paragraph',
          text: `We may update this Privacy Policy from time to time. When we make material changes, we will revise the "Effective" date above and, where appropriate, provide additional notice. Your continued use of the Service after an update takes effect means you accept the revised policy.`,
        },
      ],
    },
    {
      heading: '12. Contact Us',
      blocks: [
        {
          type: 'paragraph',
          text: 'If you have questions or requests regarding this Privacy Policy or your personal information, contact us:',
        },
        { type: 'paragraph', text: 'Jubilee Software, Inc.' },
        { type: 'paragraph', text: 'Privacy inquiries: privacy@jubileepraise.com' },
      ],
    },
  ],
};

export const TERMS_OF_USE: LegalDocument = {
  title: 'Terms of Use',
  effectiveDate: EFFECTIVE_DATE,
  contactEmail: 'legal@jubileepraise.com',
  intro: [
    `Welcome to JubileePraise.com. These Terms of Use ("Terms") are a legal agreement between you and Jubilee Software, Inc. ("Jubilee Praise," "we," "us," or "our") governing your access to and use of the JubileePraise.com website and the faith-centered music streaming and discovery services offered through it (the "Service"). Please also review our Privacy Policy, which explains how we handle your information and is incorporated into these Terms by reference.`,
  ],
  sections: [
    {
      heading: '1. Acceptance of These Terms',
      blocks: [
        {
          type: 'paragraph',
          text: 'By creating an account, accessing, or using the Service, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, please do not use the Service. If you are using the Service on behalf of an organization, you represent that you are authorized to accept these Terms on its behalf.',
        },
      ],
    },
    {
      heading: '2. Eligibility',
      blocks: [
        {
          type: 'paragraph',
          text: 'You must be at least 13 years old (or the minimum age required in your country) to create an account and use the Service. If you are a minor in your jurisdiction, you may use the Service only with the involvement and consent of a parent or legal guardian. By using the Service, you represent that you meet these requirements.',
        },
      ],
    },
    {
      heading: '3. Your Account',
      blocks: [
        {
          type: 'bullets',
          items: [
            'You agree to provide accurate, current, and complete information when you register and to keep it up to date.',
            'You are responsible for safeguarding your password and for all activity that occurs under your account. We recommend enabling two-step verification where available.',
            "You may sign in using JubileeInspire Single Sign-On (SSO); your use of that option is also subject to JubileeInspire's own terms.",
            'Notify us promptly of any unauthorized use of your account or any other breach of security.',
            'You may manage your password and permanently delete your account at any time from your account page.',
          ],
        },
      ],
    },
    {
      heading: '4. License to Use the Service',
      blocks: [
        {
          type: 'paragraph',
          text: 'Subject to your compliance with these Terms, we grant you a limited, personal, non-exclusive, non-transferable, revocable license to access and stream the content made available through the Service for your own personal, non-commercial enjoyment. This license does not transfer any ownership to you.',
        },
      ],
    },
    {
      heading: '5. Content and Intellectual Property',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Service and all of its content — including music, recordings, lyrics, artwork, album titles, artist and persona names, text, graphics, logos, and software — are owned by Jubilee Software, Inc., its affiliates, artists, or licensors and are protected by copyright, trademark, and other laws. Except as expressly permitted by these Terms, you may not copy, download, reproduce, distribute, publicly perform, broadcast, sell, rent, modify, create derivative works from, or otherwise exploit any part of the Service or its content without our prior written permission.',
        },
      ],
    },
    {
      heading: '6. Your Content',
      blocks: [
        {
          type: 'paragraph',
          text: `The Service lets you contribute content such as comments, star ratings, award nominations, and playlists ("User Content"). You retain ownership of your User Content, but by submitting it you grant Jubilee Praise a worldwide, royalty-free, non-exclusive license to host, store, display, reproduce, and use that content as needed to operate and improve the Service.`,
        },
        { type: 'paragraph', text: 'You are solely responsible for your User Content, and you represent that:' },
        {
          type: 'bullets',
          items: [
            'you own it or have the rights necessary to submit it; and',
            "it does not infringe anyone's rights or violate any law or these Terms.",
          ],
        },
        {
          type: 'paragraph',
          text: 'We may, but are not obligated to, review, moderate, or remove User Content that we believe violates these Terms or is otherwise objectionable.',
        },
      ],
    },
    {
      heading: '7. Acceptable Use',
      blocks: [
        { type: 'paragraph', text: 'When using the Service, you agree that you will not:' },
        {
          type: 'bullets',
          items: [
            'use the Service for any unlawful purpose or in violation of these Terms;',
            'copy, record, download, scrape, or redistribute the music or other content except where a feature expressly allows it;',
            'circumvent, disable, or interfere with security, authentication, or access-control features (including bot-protection);',
            'attempt to gain unauthorized access to any account, system, or network related to the Service;',
            "upload or transmit viruses, malicious code, or content that is hateful, harassing, obscene, defamatory, or that infringes others' rights;",
            'use bots, scrapers, or automated means to access the Service in a way that burdens our infrastructure; or',
            'impersonate any person or misrepresent your affiliation with anyone.',
          ],
        },
      ],
    },
    {
      heading: '8. Third-Party Services',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Service relies on, or may link to, third-party services (for example JubileeInspire SSO, Cloudflare for security, and our email provider). Your use of those services may be governed by their own terms and privacy policies, and we are not responsible for their content or practices.',
        },
      ],
    },
    {
      heading: '9. Suspension and Termination',
      blocks: [
        {
          type: 'paragraph',
          text: 'You may stop using the Service and delete your account at any time. We may suspend or terminate your access to the Service, with or without notice, if we believe you have violated these Terms or to protect the Service or other users. Upon termination, the license granted to you ends, but any provisions that by their nature should survive (such as intellectual-property, disclaimer, liability, and governing-law sections) will continue to apply.',
        },
      ],
    },
    {
      heading: '10. Disclaimers',
      blocks: [
        {
          type: 'paragraph',
          text: `The Service is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted, secure, or error-free, or that any content will always be available.`,
        },
      ],
    },
    {
      heading: '11. Limitation of Liability',
      blocks: [
        {
          type: 'paragraph',
          text: 'To the fullest extent permitted by law, Jubilee Praise and its affiliates, officers, employees, artists, and licensors will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, use, goodwill, or profits, arising out of or relating to your use of (or inability to use) the Service. Our total liability for any claim relating to the Service will not exceed one hundred U.S. dollars (US $100) or the amount you paid us, if any, in the twelve months before the claim, whichever is greater.',
        },
      ],
    },
    {
      heading: '12. Indemnification',
      blocks: [
        {
          type: 'paragraph',
          text: 'You agree to indemnify and hold harmless Jubilee Praise and its affiliates from any claims, damages, losses, and expenses (including reasonable legal fees) arising out of your use of the Service, your User Content, or your violation of these Terms or applicable law.',
        },
      ],
    },
    {
      heading: '13. Changes to the Service and These Terms',
      blocks: [
        {
          type: 'paragraph',
          text: `We may modify, suspend, or discontinue all or part of the Service at any time. We may also update these Terms from time to time; when we make material changes we will revise the "Effective" date above and, where appropriate, provide additional notice. Your continued use of the Service after an update takes effect means you accept the revised Terms.`,
        },
      ],
    },
    {
      heading: '14. Governing Law',
      blocks: [
        {
          type: 'paragraph',
          text: 'These Terms are governed by the laws of the United States and the State in which Jubilee Software, Inc. is established, without regard to conflict-of-laws principles. You agree to the exclusive jurisdiction of the courts located there for any dispute not subject to arbitration or small-claims resolution, to the extent permitted by applicable law.',
        },
      ],
    },
    {
      heading: '15. Contact Us',
      blocks: [
        { type: 'paragraph', text: 'If you have any questions about these Terms, please contact us:' },
        { type: 'paragraph', text: 'Jubilee Software, Inc.' },
        { type: 'paragraph', text: 'Legal inquiries: legal@jubileepraise.com' },
      ],
    },
  ],
};
