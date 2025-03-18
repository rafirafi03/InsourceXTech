export interface IService {
    _id: string;
    title: string;
    image: string | undefined;
}

export interface IServiceFormData {
    title: string;
    image: File | null
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