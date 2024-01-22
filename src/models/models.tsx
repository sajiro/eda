export type TokenData = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

type Polygon = {
  type: string;
  coordinates: number[][][];
};

export type SearchData = {
  datetime: string;
  intersects?: Polygon;
};

export type Coordinates = number[][][];
