// Main entry point for sesame-interop package
// Re-exports all TypeScript interfaces and generated Zod schemas

// Export TypeScript interfaces with namespaces to avoid conflicts
import * as ElmoChannelData from './lib/api/elmo-channel-data';
import * as MixerControllerApi from './lib/api/mixer-controller-api';
import * as MixerConfig from './lib/config/mixer-config';
import * as SesameConfig from './lib/config/sesame-config';
import * as SesameStreams from './lib/status/sesame-streams';

export { ElmoChannelData, MixerControllerApi, MixerConfig, SesameConfig, SesameStreams };

// Export namespaced Zod schemas
export * from './lib/zod-schemas';
