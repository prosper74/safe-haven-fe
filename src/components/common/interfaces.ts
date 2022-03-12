export interface Image {
  url: string;
  id?: string;
  length: number;
}

export interface Category {
  name: string;
}

export interface homeTabs {
  filter: any;
  name: string;
  description?: string;
  price: number;
  category: Category;
  images: Image;
}

export interface singleProperties {
  sittingroom: JSX.Element;
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  state: string;
  city: string;
  per: string;
  createdAt: number;
  bedrooms: number;
  bathroom: number;
  size: number;
  images: Image;
  users_permissions_user: string;
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

export interface propertyCard {
  map: any;
  state?: string;
  city?: string;
  bedrooms?: number;
  bathroom?: number;
  size?: number;
  sittingroom?: number;
  id: string;
  per: string;
  price: number;
  name: string;
  category: {
    name: string;
  };
  images: {
    0: {
      url: string;
    };
  };
}
