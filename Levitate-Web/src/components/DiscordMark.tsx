interface DiscordMarkProps {
  className?: string;
}

/**
 * Theme-safe Discord mark.
 *
 * The old remote raster asset was effectively white-on-transparent, which
 * disappeared against light themes. Using currentColor keeps the mark legible
 * while letting each surface decide its own accent colour.
 */
export default function DiscordMark({ className = '' }: DiscordMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19.54 4.44A16.7 16.7 0 0 0 15.42 3l-.5 1.02a15.3 15.3 0 0 0-5.84 0L8.58 3a16.8 16.8 0 0 0-4.13 1.45C1.84 8.72 1.13 12.9 1.48 17.02a16.7 16.7 0 0 0 5.08 2.57l1.23-1.68a10.9 10.9 0 0 1-1.94-.94l.48-.37c3.74 1.75 7.8 1.75 11.5 0l.49.37c-.62.37-1.27.69-1.95.94l1.23 1.68a16.7 16.7 0 0 0 5.08-2.57c.41-4.78-.7-8.92-3.14-12.58ZM8.6 14.68c-1.12 0-2.04-1.03-2.04-2.3s.9-2.3 2.04-2.3c1.14 0 2.06 1.03 2.04 2.3 0 1.27-.9 2.3-2.04 2.3Zm6.8 0c-1.12 0-2.04-1.03-2.04-2.3s.9-2.3 2.04-2.3c1.14 0 2.06 1.03 2.04 2.3 0 1.27-.9 2.3-2.04 2.3Z" />
    </svg>
  );
}