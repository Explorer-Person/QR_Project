export interface UserInfo {
    id: string;
    info: {
      name: string;
      surname: string;
      phone: string;
      role: string;
      email: string;
      tcNumber: string; 
      bornDate: string;
      img: string;
    };
  }
  
  export interface FileInfo {
    fileName: string;
    filePath: string;
    fileData: Blob | MediaSource | File | null | string;
  }