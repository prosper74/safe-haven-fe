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
  title: string;
  description: string;
  price: number;
  category: Category;
  state: string;
  city: string;
  per: string;
  period: string;
  createdAt: number;
  bedrooms: number;
  bedroom: number;
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

export interface featuresProps {
  length: number;
  map: any;
  split: any;
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
  properties: singleProperties;
  username: string;
  createdAt: string;
  verified: boolean;
  email: string;
  phone: string;
  image: {
    url: string;
  };
}

export interface IImageUpload {
  files: File[];
  onDrop: (acceptedFiles: File[]) => void;
  public_id: string;
  acceptedFile: File[];
}

export interface ISearchWidget {
  properties: singleProperties;
  width: string;
  height: string;
  fill: string;
  placeholder: string;
}
