export { corporatePreset } from './corporate';
export { startupPreset } from './startup';
export { elegantPreset } from './elegant';

import { corporatePreset } from './corporate';
import { startupPreset } from './startup';
import { elegantPreset } from './elegant';
import type { ThemePreset } from '../tokens';

/** Registry of built-in theme presets */
export const presetRegistry: Record<string, ThemePreset> = {
  corporate: corporatePreset,
  startup: startupPreset,
  elegant: elegantPreset,
};

/** Default preset name */
export const DEFAULT_PRESET = 'corporate';
