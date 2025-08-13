export interface IService {
    _id: string;
    title: string;
    image: string;
    subservices: ISubService[]
    content: string;
}

export interface ISubService {
  title: string;
  description: string;
  image: string;
}

export interface IServiceResponse {
  success: boolean;
  solutions: IService
  length: number;
}

export interface IServiceFormData {
    _id?: string;
    title: string;
    image: File | null
    content?: string;
}

export interface IChangePass {
  currentPass : string;
  newPass : string;
  confirmPass: string;
}

export interface IAboutFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  timing: string;
  about: string;
  vision: string;
  mission: string;
}

export interface IAboutResponse {
  success?: boolean;
  aboutCompany: IAboutFormData
}