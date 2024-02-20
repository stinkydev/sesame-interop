/*
  Mixer configurations are stored in the bucket sesame-mixer-controllers in Cachearoo with the key being the id of the mixer.
  IMixerConfig is the type of these objects.
*/

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
  id?: string;
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

export interface IAudioChannelConfig {
  channelId: string;
  level?: number;
  pan?: number;
  transitionInDuration?: number;
  transitionOutDuration?: number;
  transitionInOffset?: number;
  transitionOutOffset?: number;
}

export interface IAudioTransition {
  fromScene: string;
  toScene: string;
  channels: {
    channelId: string;
    duration?: number;
    offset?: number;
  }[];
}

export interface IVideoScene {
  name: string;
  layers: (ISourceLayer | IClipPlayerLayer)[];
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
  defaultTransitionDuration?: number;
  scenes: IAudioScene[];
  transitions: IAudioTransition[];
}

export interface IMixerConfig {
  video: IVideoConfig;
  audio: IAudioConfig;
}