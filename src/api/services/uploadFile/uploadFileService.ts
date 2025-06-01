import { BaseService } from "../base/base.service";
import { TUploadFileResponse } from "./interfaces";

export class UploadFileService extends BaseService {
  private static instance: UploadFileService;

  private constructor() {
    super();
  }

  public static getInstance() {
    return UploadFileService.instance || new UploadFileService();
  }

  public async upload(data: FormData): Promise<TUploadFileResponse> {
    try {
      const resposnse = await this.axiosClient.post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return resposnse.data;
    } catch (error) {
      throw error;
    }
  }
}

export const uploadFileService = UploadFileService.getInstance();
