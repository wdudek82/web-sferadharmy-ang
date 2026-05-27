/** Valid theme identifiers used across the application. */
export type ThemeId =
  | 'sunset'
  | 'redwood'
  | 'forest'
  | 'classic-neutral'
  | 'dreamy-pastel'
  | 'midori';

/** Shape of the environment configuration object. */
export interface Environment {
  production: boolean;
  themeSelectorEnabled: boolean;
  /** Fallback theme when localStorage has no entry. Must be a valid ThemeId. */
  defaultTheme: ThemeId;
}
