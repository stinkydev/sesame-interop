
export type TransitionType = 'cut' | 'mix' | 'wipe';

export interface ITransition {
  name: string;
  type: TransitionType;
  duration?: number;
  wipe?: {
    overlayClip: string;
    matteClip: string;
    transitionPoint: number;
    transitionDuration: number;
  }
}

export type LayerType = 'source' | 'clip-player';

export interface ILayerTransform {
  position?: [number, number, number];
  scale?: [number, number];
  rotation?: [number, number, number];
}

export interface ILayer {
  type: LayerType;
  transform?: ILayerTransform;
}

export interface ISourceLayer extends ILayer {
  type: 'source';
  sourceId: string;
}

export interface IClipAudioConfig {
  routing: number[];
  channelId: string;
  mixerId: string;
}

export interface IClipPlayerLayer extends ILayer {
  type: 'clip-player';
  filename?: string;
  loop?: boolean;
  audio?: IClipAudioConfig;
}

export type AudioMode = 'mute' | 'delta';
export interface IAudioChannelConfig {
  channelId: string;
  level?: number;
  pan?: number;
}

export interface IVideoScene {
  name: string;
  layers: (ISourceLayer | IClipPlayerLayer)[];
  defaultAudioMode: AudioMode;
  audioChannels: IAudioChannelConfig[];
}

export interface IAudioScene {
  name: string;
  channels: IAudioChannelConfig[];
}

export interface IVideoConfig {
  scenes: IVideoScene[];
  transitions: ITransition[];
}

export interface IAudioConfig {
  scenes: IAudioScene[];
}

export interface IMixerConfig {
  video: IVideoConfig;
  audio: IAudioConfig;
}