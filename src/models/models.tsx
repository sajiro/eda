export type TokenData = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export type Coordinates = number[][][];

type Polygon = {
  type: string;
  coordinates: Coordinates;
};

export type SearchData = {
  datetime: string;
  intersects?: Polygon;
};
