/*
  Mixer Controller API
  Sent via Cachearoo Request/Reply API to control a mixer.
  Channel: sesame-mixer-controllers.${mixer-id}
*/

export interface FileNameParam {
  layerId: string;
  key: 'filename';
  value: string;
}

export interface LoopParam {
  layerId: string;
  key: 'loop';
  value: boolean;
}

export interface AudioRoutingParam {
  layerId: string;
  key: 'audio-routing';
  value: number[];
}

export interface AudioLevelParam {
  layerId: string;
  key: 'audio-level';
  value: number;
}

export interface InterlacingParam {
  layerId: string;
  key: 'interlacing';
  value: 'progressive' | 'interlaced';
}

export type VideoTakeParams = (FileNameParam | LoopParam | AudioRoutingParam | AudioLevelParam | InterlacingParam)[];

export interface IVideoTakeTrackCommand {
  trackName: string;
  composition: string;
  transition?: string;
  params?: VideoTakeParams;
}

export interface IAudioTakeTrackCommand {
  trackName: string;
  mix: string;
  transition: string;
}

export interface IMixerControllerTakeCommand {
  cmd: 'take';
  videoTracks: IVideoTakeTrackCommand[],
  audioTracks: IAudioTakeTrackCommand[]
}