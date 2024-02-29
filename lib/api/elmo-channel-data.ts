/*
  IChannelData defines the interface for the objects stored in the bucket 'sesame-channels' in Cachearoo.
  Each object in this bucket describes the state of a "channel" in Sesame/Elmo.

  The channel contains 0-n graphics items, and can be routed to different parts of the system with the GraphicsType property.
  This routing can for example be a scene in Elmo (elmo/gfx) and/or a mixer scene in Sesame (sesame/mixer).
*/

import { IAudioTakeTrackCommand, IVideoTakeTrackCommand } from "./mixer-controller-api";

export interface IElmoEnvironment {
  preload_projects: string[];
}

export interface IChannelEnvironment {
  elmo?: IElmoEnvironment;
}

export interface IGraphicsItemElmo {
  project: string;
  scene: string;
  data: any;
}

export interface ISesameMixerItem {
  videoTracks: IVideoTakeTrackCommand[],
  audioTracks: IAudioTakeTrackCommand[]
}

export type GraphicsType = 'elmo/gfx' | 'elmo/video' | 'sesame/mixer';

export interface IGraphicsItem {
  id: string;
  user: string;
  type: GraphicsType;
  elmo?: IGraphicsItemElmo;
  sesame?: ISesameMixerItem;
}

export interface IChannelGraphics {
  active: IGraphicsItem[];
}

export interface IChannelData {
  env: IChannelEnvironment;
  gfx: IChannelGraphics;
}
