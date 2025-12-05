/*
  Mixer Controller API
  Sent via Cachearoo Request/Reply API to control a mixer.
  Channel: sesame-mixer-controllers.${mixer-id}
*/

import { IAudioMix, IAudioTransition, ITransition, IVideoComposition } from "../config/mixer-config";

export interface ITransactionInfo {
  transactionId?: number;
  dependencies?: number[];
}

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

export interface MetadataParam {
  layerId: string;
  key: 'metadata',
  value: string
}

export type VideoTakeParams = (FileNameParam | LoopParam | AudioRoutingParam | AudioLevelParam | InterlacingParam | MetadataParam)[];

export interface IVideoTakeTrackCommand {
  trackName: string;
  composition: string | IVideoComposition;
  transition?: string | ITransition;
  delay?: number;
  params?: VideoTakeParams;
}

export interface IAudioTakeTrackCommand {
  trackName: string;
  mix: string | IAudioMix;
  delay?: number;
  transition?: string | IAudioTransition;
}

export interface IMixerControllerTakeCommand {
  cmd: 'take';
  videoTracks: IVideoTakeTrackCommand[],
  audioTracks: IAudioTakeTrackCommand[],
  transaction?: ITransactionInfo
}
