import { Divider } from "@mui/material";
import React, { FC } from "react";
import { ChangePaswordForm } from "../../../features/forms/changePasswordForm/ChangePasswordForm";
import { ProfileForm } from "../../../features/forms/profileForm/ProfileForm";
import s from "./profileScreen.module.scss";
import cn from "clsx";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { selectProfile } from "@/app/store/slices/auth/auth";
import { shallowEqual } from "react-redux";
import { useAppDispatch } from "@/app/store/hooks/useAppDispatch";
import { TUpdateProfileData } from "@/api/services/profile/interface";
import {
  selectProfileStatus,
  updateProfile,
  selectProfileError,
  setError,
} from "@/app/store/slices/profile/profileSlice";
import { TChangeProfilePasswordParams } from "@/api/services/auth/interface";
import { changeProfilePassword } from "@/app/store/slices/profile/profileSlice";
import { LoadingOverlay } from "@/shared/ui/loadingOverlay/LoadingOverlay";
import { ErrorModal } from "@/shared/errorModal/ErrorModal";

export type TProfileScreen = {
  className?: string;
};

export const ProfileScreen: FC<TProfileScreen> = ({ className }) => {
  const profile = useAppSelector(selectProfile, shallowEqual);
  const status = useAppSelector(selectProfileStatus);
  const error = useAppSelector(selectProfileError);
  const dispatch = useAppDispatch();

  const onSubmitProfile = (data: TUpdateProfileData) => {
    dispatch(updateProfile(data));
  };

  const onSubmitPassword = (data: TChangeProfilePasswordParams) => {
    dispatch(changeProfilePassword(data));
  };

  const onModalClose = () => {
    dispatch(setError(""));
  };

  return (
    <section className={cn(s.root, className)} title="Профиль">
      {status === "loading" && <LoadingOverlay />}
      {error && <ErrorModal onClose={onModalClose} error={error} />}
      <div className={cn(s.wrapper)}>
        <ProfileForm
          onSubmitCb={onSubmitProfile}
          name={profile?.name || ""}
          about=""
        />
        <Divider />
        <ChangePaswordForm onSubmitCb={onSubmitPassword} />
      </div>
    </section>
  );
};
