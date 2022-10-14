export interface ApiInfo_I {
  count: number;
  pages: number;
  next: string;
  prev: number;
}

export interface ApiData_I {
  info: ApiInfo_I;
  results: ApiResult_I[];
}

export interface Location_I {
  name: string;
  url: string;
}

export interface ApiResult_I {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location_I;
  location: Location_I;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
