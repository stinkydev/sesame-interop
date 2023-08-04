
export type SourceType = 'file' | 'browser' | 'decklink' | 'recorder' | 'rtt';
export type OutputType = 'websocket' | 'decklink' | 'stream' | 'recorder' | 'callcenter';
export type VideoFormat = '108050i' | '108050p';
export type EncoderPreset = 'low_latency' | 'high_quality' | 'low_latency_idr_only';
export type ChannelType = 'stereo' | 'mono';

export interface ISource {
  id: string;
  type: SourceType;
  audioChannels: number;
  audioOnly?: boolean;
}

export interface IFileSoure extends ISource {
  type: 'file';
  url: string;
}

export interface IDecklinkSource extends ISource {
  type: 'decklink';
  decklinkConfig: IDecklinkConfig;
}

export interface IBrowserSource extends ISource {
  type: 'browser';
  url: string;
}

export interface IRecorderSource extends ISource {
  type: 'recorder';
  url: string;
}

export interface IRTTSource extends ISource {
  type: 'rtt';
  url: string;
}

export type Source = IFileSoure | IDecklinkSource | IBrowserSource | IRecorderSource | IRTTSource;

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
  useAsClock?: boolean;
  videoFormat: VideoFormat;
}

export interface IComposition {
  id: string;
  channel?: string;
  multisample?: boolean;
  width?: number;
  height?: number;
}

export interface IEncoderConfig {
  preset: EncoderPreset;
  bitrateKbs: number;
}

export interface IOutputVideo {
  width?: number;
  height?: number;
  fps?: number;
  encoder?: IEncoderConfig;
}

export interface IOutput {
  id: string;
  type: OutputType;
  compositionId: string;
  audioMixIds: string[];
}

export interface IWebsocketOutput extends IOutput {
  type: 'websocket';
  url: string;
  video: IOutputVideo;
}

export interface IDecklinkOutput extends IOutput {
  type: 'decklink';
  decklinkConfig: IDecklinkConfig;
}

export interface IStreamOutput extends IOutput {
  type: 'stream';
  url: string;
  video: IOutputVideo;
}

export interface IRecorderOutput extends IOutput {
  type: 'recorder';
  url: string;
  video: IOutputVideo;
}

export interface ICallcenterOutput extends IOutput {
  type: 'callcenter';
  url: string;
  video: IOutputVideo;
}

export type Output = IWebsocketOutput | IDecklinkOutput | IStreamOutput | IRecorderOutput | ICallcenterOutput;

export interface ISesameConfig {
  sources: Source[];
  compositions: IComposition[];
  audioMixes: IAudioMix[];
  outputs: Output[];
}
