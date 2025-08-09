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
    overlayClip?: string;
    matteClip?: string;
    transitionPoint?: number;
    transitionDuration?: number;
    transitionAngle?: number;
    transitionFeather?: number;
    audioConfig?: IClipAudioConfig;
  }
}

export type LayerType = 'source' | 'clip-player' | 'image';

export interface ILayerTransform {
  position?: [number, number, number];
  scale?: [number, number];
  rotation?: [number, number, number];
  crop?: { left?: number, right?: number, top?: number, bottom?: number }
}

export interface ILayer {
  id?: string;
  type: LayerType;
  transform?: ILayerTransform;
  premultipliedAlpha?: boolean;
}

export interface ISourceLayer extends ILayer {
  type: 'source';
  sourceId: string;
}

export interface IImageLayer extends ILayer {
  type: 'image';
  filename?: string;
}

export interface IClipAudioConfig {
  channels: { mixerId: string, routing?: number[] }[];
  level?: number;
}

export interface IClipPlayerLayer extends ILayer {
  type: 'clip-player';
  filename?: string;
  loop?: boolean;
  metadata?: string;
  audio?: IClipAudioConfig;
  textureSize?: 'hd' | '4k';
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

export interface IVideoComposition {
  name: string;
  transparent?: boolean;
  layers: (ISourceLayer | IClipPlayerLayer | IImageLayer)[];
}

export interface IAudioMix {
  name: string;
  channels: IAudioChannelConfig[];
}

export interface IVideoTrack {
  name: string;
  includeRawSources: boolean;
  compositions: IVideoComposition[];
  transitions: ITransition[];
  defaultComposition?: string;
}

export interface IAudioTrack {
  name: string;
  mixes: IAudioMix[];
  transitions?: IAudioTransition[];
  defaultTransitionDuration?: number;
  defaultMix?: string;
}

export interface IVideoConfig {
  tracks: IVideoTrack[];
}

export interface IAudioConfig {
  tracks: IAudioTrack[];
}

export interface IMixerConfig {
  video: IVideoConfig;
  audio: IAudioConfig;
}
