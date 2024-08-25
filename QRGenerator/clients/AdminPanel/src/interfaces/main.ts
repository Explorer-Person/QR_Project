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
    img: FileInfo | Blob | File | null;
    targetUrl: string;
    shortUrl: string;
    qrPath: string;
  };
}

export type InfoProp = UserInfo;
export interface FileInfo {
  fileName: string;
  filePath: string;
  fileData: Blob | MediaSource | File | null | string;
}
export type DataProp = {
  info: InfoProp;
  file: Blob | File | FileInfo | null;
};
export interface RequestApiProps {
  endpoint: string;
  method: string;
  data: DataProp | null;
  headers?: Record<string, string>;
}


export interface StateResponse {
    data: ResponseDataProps;
    process: string;
    status: boolean;
    loading: boolean | null;
    error: string[];
    statusCode: number | null;
 }
 export type ResponseDataProps = MediaSource | Blob | null | string | FileInfo | UserInfo[] | UserInfo;
 export interface RegularResponse {
    statusCode: number;
    process: string;
    status: boolean;
    data: ResponseDataProps;
}


export interface StyleProps {
  backgroundColor: string;
  fontSize: string;
  color: string;
  width: string;
  height: string;
  padding: string;
}

export interface ButtonInfo {
  method: string;
  process: string;
  buttonType: string;
  param: string;
}

export interface FileInfo {
  fileName: string;
  filePath: string;
  fileData: Blob | MediaSource | File | null | string;
}