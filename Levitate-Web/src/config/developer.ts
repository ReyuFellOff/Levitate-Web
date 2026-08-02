/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DEVELOPER — About Page Config
 *  Everything shown on the "About" page (who built this, links, other bots,
 *  and the tech stack badges) lives here so it can be edited independently
 *  of the bot's own landing-page config in `bot.ts`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const developerConfig = {
  /* ── Identity ─────────────────────────────────────────── */
  name:             'Reyansh',
  discordUsername:  'reyansh.is.stupid',
  githubUrl:        'https://github.com/ReyuFellOff',
  avatar:           'https://i.ibb.co/vxFXVzhk/square-crop.jpg', // leave '' for the default fallback

  /* ── Short bio — freely customisable ─────────────────────
     Shown directly under the developer's name on the About page. */
  description: 'Designed, built, and maintains Levitate entirely solo, from architecture to every pixel of the UI.',

  /* ── Other bots by this developer (names only) ──────────── */
  bots: [
    'Levitate', 'Nomadic',
  ],

  /* ── Languages / stack badges ─────────────────────────────
     `id` selects the icon rendered on the About page. */
  languages: [
    { id: 'javascript', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
  ] as const,
};

export type DeveloperLanguage = (typeof developerConfig.languages)[number];
