export interface StatsType {
    cryCount: number;
    laughCount: number;
    likeCount: number;
    dislikeCount: number;
    heartCount: number;
    commentCount: number;
    tipCount: number;
  }
  
  interface Resource {
    hash: string;
    name: string;
    type: string;
  }
  
  interface Meta {
    ENSD: string;
    Size: string;
    seed: number;
    Model: string;
    steps: number;
    prompt: string;
    sampler: string;
    cfgScale: number;
    "Clip skip": string;
    resources: Resource[];
    "Model hash": string;
    "Hires upscale": string;
    "Hires upscaler": string;
    negativePrompt: string;
    "ControlNet Model": string;
    "ControlNet Module": string;
    "ControlNet Weight": string;
    "ControlNet Enabled": string;
    "Denoising strength": string;
    "ControlNet Guidance Strength": string;
  }
  
  export interface ImageData {
    id: number;
    url: string;
    hash: string;
    width: number;
    height: number;
    nsfwLevel: string;
    nsfw: boolean;
    browsingLevel: number;
    createdAt: string;
    postId: number;
    stats: StatsType;
    meta: Meta;
    username: string;
  }
  
  type ImageApiResponse = ImageData;
  