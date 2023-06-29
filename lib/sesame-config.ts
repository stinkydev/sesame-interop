
export type SourceType = 'file' | 'browser' | 'decklink' | 'recorder' | 'rtt';
export type OutputType = 'websocket' | 'decklink' | 'stream' | 'recorder' | 'callcenter';
export type VideoFormat = '108050i' | '108050p';
export type EncoderPreset = 'low_latency' | 'high_quality' | 'low_latency_idr_only';
export type ChannelType = 'stereo' | 'mono';

export interface IAudioChannel {
  type: ChannelType;
  id: string;
  sourceId: string;
  sourceChannels: number[];
}

export interface IAudioMix {
  id: string;
  type: ChannelType;
  channels: IAudioChannel[];
  order?: number;
}

export interface IDecklinkConfig {
  deviceIndex: number;
  keyAndFill: boolean;
  useAsClock: boolean;
  videoFormat: VideoFormat;
}

export interface ISource {
  id: string;
  type: SourceType;
  url: string;
  audioChannels: number;
  audioOnly?: boolean;
  decklinkConfig?: IDecklinkConfig;
}


export interface IComposition {
  id: string;
  channel?: string;
  defaultProject?: string;
  defaultScene?: string;
  multisample?: boolean;
  width?: number;
  height?: number;
}


export interface IEncoderConfig {
  preset: EncoderPreset;
  bitrateKbs: number;
}

export interface IOutputVideo {
  width: number;
  height: number;
  fps: number;
  encoder?: IEncoderConfig;
}

export interface IOutput {
  id: string;
  url: string;
  type: OutputType;
  compositionId: string;
  audioMixIds: string[];
  video: IOutputVideo;
  decklinkConfig?: IDecklinkConfig;
  encoderConfig: IEncoderConfig;
  useAsClock: boolean;
}


export interface ISesameConfig {
  sources: ISource[];
  compositions: IComposition[];
  audioMixes: IAudioMix[];
  outputs: IOutput[];
}
