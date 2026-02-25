// Main entry point for sesame-interop package
// Re-exports all TypeScript interfaces and generated Zod schemas

// Export TypeScript interfaces with namespaces to avoid conflicts
export * as ElmoChannelData from './lib/api/elmo-channel-data';
export * as MixerControllerApi from './lib/api/mixer-controller-api';
export * as MixerConfig from './lib/config/mixer-config';
export * as SesameConfig from './lib/config/sesame-config';
export * as SesameStreams from './lib/status/sesame-streams';

// Export namespaced Zod schemas
export * from './lib/zod-schemas';
