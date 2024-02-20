/*
  Mixer Controller API
  Sent via Cachearoo Request/Reply API to control a mixer.
  Channel: sesame-mixer-controllers.${mixer-id}
*/

export interface FileNameParam {
  key: 'filename';
  value: string;
}

export interface LoopParam {
  key: 'loop';
  value: boolean;
}

export interface AudioRoutingParam {
  key: 'audio-routing';
  value: number[];
}

export interface AudioLevelParam {
  key: 'audio-level';
  value: number;
}

export interface InterlacingParam {
  key: 'interlacing';
  value: 'progressive' | 'interlaced';
}
export interface IMixerControllerTakeCommand {
  cmd: 'take';
  video?: {
    scene: string;
    transition?: string;
    params?: (FileNameParam | LoopParam | AudioRoutingParam | AudioLevelParam | InterlacingParam)[];
  },
  audio?: {
    scene: string;
    transition: string;
  }
}