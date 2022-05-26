export interface Image {
  indexOf: any;
  map(arg0: (image: any) => JSX.Element): import('react').ReactNode;
  url: string;
  id?: string;
  length: number;
  0: {
    url: string;
  };
}

export interface Category {
  name: string;
}

export interface singleProperties {
  slice(arg0: number, arg1: number): import('react').SetStateAction<never[]>;
  sort: any;
  length: number | undefined;
  filter: any;
  map: any;
  features: any;
  type: string[];
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
  users_permissions_user: {
    id: string;
    username: string;
    phone: number;
    verified: boolean;
    image: Image;
  };
  0: {
    users_permissions_user: {
      id: string;
      username: string;
      phone: number;
      verified: boolean;
      image: Image;
    };
  };
}

export interface agentProps {
  username: string;
  phone: number;
  verified: boolean;
  createdAt: number;
  image: {
    url: string;
  };
}

export interface featuresProps {
  length: number;
  map: any;
  id: string;
  name: string;
}

export interface sortOptionProps {
  label: string;
  active: boolean;
  function: any;
}

export interface userProps {
  id: string;
  properties: singleProperties[];
  username: string;
  createdAt: string;
  email: string;
  phone: string;
  image: {
    url: string;
  };
}
