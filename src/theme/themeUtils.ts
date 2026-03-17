import type { ThemeTokens, ThemeConfig } from './tokens';
import { presetRegistry, DEFAULT_PRESET } from './presets';

export function generateCSSVariables(tokens: ThemeTokens): string {
  const lines: string[] = [];

  lines.push(':root {');
  for (const [key, value] of Object.entries(tokens.colors.light)) {
    lines.push(`  --${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(tokens.typography)) {
    lines.push(`  --${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(tokens.spacing)) {
    lines.push(`  --${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(tokens.radius)) {
    lines.push(`  --${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(tokens.shadows)) {
    lines.push(`  --${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(tokens.durations)) {
    lines.push(`  --${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(tokens.containers)) {
    lines.push(`  --${key}: ${value};`);
  }
  lines.push('}');

  lines.push('.dark {');
  for (const [key, value] of Object.entries(tokens.colors.dark)) {
    lines.push(`  --${key}: ${value};`);
  }
  lines.push('}');

  return lines.join('\n');
}

export function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sourceVal = source[key];
    const targetVal = target[key];
    if (
      sourceVal &&
      typeof sourceVal === 'object' &&
      !Array.isArray(sourceVal) &&
      targetVal &&
      typeof targetVal === 'object' &&
      !Array.isArray(targetVal)
    ) {
      result[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>
      );
    } else if (sourceVal !== undefined) {
      result[key] = sourceVal;
    }
  }
  return result;
}

export function resolveTokens(config: ThemeConfig): ThemeTokens {
  let baseTokens: ThemeTokens;

  if (typeof config.preset === 'string') {
    const preset = presetRegistry[config.preset];
    if (!preset) {
      console.warn(
        `[tempo-ui] Unknown preset "${config.preset}", falling back to "${DEFAULT_PRESET}".`
      );
      baseTokens = presetRegistry[DEFAULT_PRESET]!.tokens;
    } else {
      baseTokens = preset.tokens;
    }
  } else if (config.preset && typeof config.preset === 'object') {
    baseTokens = config.preset;
  } else {
    baseTokens = presetRegistry[DEFAULT_PRESET]!.tokens;
  }

  if (config.overrides) {
    return deepMerge(
      baseTokens as unknown as Record<string, unknown>,
      config.overrides as unknown as Record<string, unknown>
    ) as unknown as ThemeTokens;
  }
  return baseTokens;
}
