import { TProfile } from "../../../app/store/slices/auth/interface";
import { BaseService } from "../base/base.service";
import { TUpdateProfileData } from "./interface";
import { TChangeProfilePasswordParams } from "../auth/interface";

export class ProfileService extends BaseService {
  private static instance: ProfileService;

  private constructor() {
    super();
  }

  public static getInstance() {
    return ProfileService.instance || new ProfileService();
  }

  public async updateProfile(data: TUpdateProfileData): Promise<TProfile> {
    const response = await this.axiosClient.patch("/profile", data);
    return response.data;
  }

  async changeProfilePassword(
    data: TChangeProfilePasswordParams
  ): Promise<{ success: boolean }> {
    try {
      const response = await this.axiosClient.post(
        "profile/change-password",
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const profileService = ProfileService.getInstance();
