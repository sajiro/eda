import { CLIENT_ID, CLIENT_SECRET } from "../constants/constant";
import { SearchData, TokenData } from "@/models/models";

export const fetchToken = async (): Promise<TokenData> => {
  const response = await fetch(
    "https://demo-venus-only-earthdaily.auth.us-east-1.amazoncognito.com/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const searchArchive = async (
  token: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: SearchData | {}
): Promise<unknown> => {
  const response = await fetch(
    "https://api.eds.earthdaily.com/archive/v1/stac/v1/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
