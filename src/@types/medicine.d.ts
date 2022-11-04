declare module MedicineInfo {
  export interface Category {
    id: string;
    name: string;
    desc: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    medicineCategoryId?: any;
  }

  export interface Medicine {
    id: string;
    name: string;
    desc: string;
    tags: string;
    image: string;
    content: string;
    isStanding: boolean;
    createdAt: Date;
    updatedAt: Date;
    medicineCategoryId: string;
    price: number;
    amount: number;
    category: Category;
    illnessMedicine: any[];
  }

  export interface PageData {
    list: Medicine[];
    current: number;
    pageSize: number;
    total: number;
  }

  export interface Info {
    data: Data;
    success: boolean;
    errorMessage: string;
  }
}
