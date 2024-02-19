/*
  Mixer Controller API
  Sent via Cachearoo Request/Reply API to control a mixer.
  Channel: sesame-mixer-controllers.${mixer-id}
*/
export interface IMixerControllerTakeCommand {
  cmd: 'take';
  video?: {
    scene: string;
    transition?: string;
  },
  audio?: {
    scene: string;
    transition: string;
  }
}