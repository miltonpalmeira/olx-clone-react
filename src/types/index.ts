export interface ILogin {
  name?: string;
  email: string;
  password: string;
  state?: string;
  token?: string;
}

export interface StateListItem {
  id: number;
  name: string;
}
export interface CategoryList {
  id: number;
  name: string;
  img: string;
  slug: string;
}
export interface OptionsQueryAds {
  sort?: string;
  offset?: number;
  limit?: number;
  q?: string;
  category?: string;
  token?: string;
}

export interface AdInfoList {
  id?: number;
  title?: string;
  price?: number;
  priceNegotiable?: boolean;
  description?: string;
  dateCreated?: string;
  views?: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  userInfo?: {
    name: string;
    email: string;
  };
}
