export interface ErrorResponse {
    message: string;
    error?: string;
  }
  
  export interface EmailData {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }
  
  export interface AboutCompanyData {
    title: string;
    description: string;
    vision?: string;
    mission?: string;
  }
  
  export interface ServiceData {
    title: string;
    description: string;
    icon?: string;
    order?: number;
  }
  
  export interface SolutionData {
    title: string;
    description: string;
    image?: string;
    order?: number;
  }
  
  export interface WhyUsPointData {
    title: string;
    description: string;
  }
  
  export interface WhyUsData {
    title: string;
    description: string;
    points: WhyUsPointData[];
  }