export interface Image {
  url: string;
  id?: string;
  length: number;
}

export interface Category {
  name: string;
}

export interface IProperty {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: Category;
  createdAt: number;
  state?: string;
  city?: string;
  per?: string;
  bedrooms?: number;
  bathroom?: number;
  type: string;
  size?: number;
  images: {
    url: string;
  };
  length: number;
  url: string;
  users_permissions_user: {
    username: string;
  };
}

export interface IProps {
  properties: IProperty;
}
