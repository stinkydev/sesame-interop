/*
  IStreamDefinition defines the configuration of a stream that is available within Sesame.
  These definitions reside in 'sesame-streams' in Cachearoo with key being the id of the stream.

  Config object contains info on video and audio streams (codecs etc), and the connection info.
*/

export interface ICodecDefinition {
  type: 'h264' | 'hevc' | 'av1' | 'vp8' | 'vp9' | 'opus' | 'pcm';
}

export interface ICodecDefinitionH264 extends ICodecDefinition {
  bitrate: number;
  profile: 'baseline' | 'main' | 'high';
  level: '1' | '1.1' | '1.2' | '1.3' | '2' | '2.1' | '2.2' | '3' | '3.1' | '3.2' | '4' | '4.1' | '4.2' | '5' | '5.1';
}

export interface ICodecDefinitionHEVC extends ICodecDefinition {
  type: 'hevc',
  bitrate: number;
  profile: 'main';
  level: '1' | '1.1' | '1.2' | '1.3' | '2' | '2.1' | '2.2' | '3' | '3.1' | '3.2' | '4' | '4.1' | '4.2' | '5' | '5.1';
}

export interface ICodecDefinitionAV1 extends ICodecDefinition {
  type: 'av1'
}

export interface ICodecDefinitionVP8 extends ICodecDefinition {
  type: 'vp8';
}

export interface ICodecDefinitionVP9 extends ICodecDefinition {
  type: 'vp9';
}

export interface ICodecDefinitionOpus extends ICodecDefinition {
  type: 'opus';
}

export interface ICodecDefinitionPCM extends ICodecDefinition {
  type: 'pcm';
}

export interface IConnectionDefinition {
  type: 'websocket' | 'rtp';
}

export interface IWebSocketConnectionDefinition extends IConnectionDefinition {
  type: 'websocket';
  url: string;
}

export interface IRTPConnectionDefinition extends IConnectionDefinition {
  type: 'rtp';
  host: string;
  videoPortDest: number;
  audioPortDest: number;
  videoPortSrc: number;
  audioPortSrc: number;
  videoPortDestRtcp: number;
  audioPortDestRtcp: number;
}

export interface IVideoStreamDefinition {
  id: string;
  payloadType?: string;
  width: number;
  height: number;
  codec: ICodecDefinitionH264 | ICodecDefinitionVP8 | ICodecDefinitionVP9 | ICodecDefinitionHEVC | ICodecDefinitionAV1;
  fps: number;
}

export interface IAudioStreamDefinition {
  id: string;
  payloadType?: string;
  channels: number;
  codec: ICodecDefinitionOpus | ICodecDefinitionPCM;
}

export interface IStreamDefinition {
  id: string;
  source: 'sesame' | 'callcenter';
  connection: IWebSocketConnectionDefinition | IRTPConnectionDefinition;
  video: IVideoStreamDefinition;
  audio: IAudioStreamDefinition;
}