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

export type GraphicsType = 'elmo/gfx' | 'elmo/video';

export interface IGraphicsItem {
  id: string;
  user: string;
  type: GraphicsType;
  elmo?: IGraphicsItemElmo;
}

export interface IChannelGraphics {
  active: IGraphicsItem[];
}

export interface IChannelData {
  env: IChannelEnvironment;
  gfx: IChannelGraphics;
}
