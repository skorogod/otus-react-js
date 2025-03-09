import { Divider } from "@mui/material";
import React, { FC } from "react";
import { ChangePaswordForm } from "src/features/forms/changePasswordForm/ChangePasswordForm";
import { ProfileForm } from "src/features/forms/profileForm/ProfileForm";
import s from "./profileScreen.module.scss";
import cn from "clsx";
import { Page } from "src/shared/ui/page";

export type TProfileScreen = {
  className?: string;
};

export const ProfileScreen: FC<TProfileScreen> = ({ className }) => (
  <Page className={cn(s.root, className)} title="Профиль">
    <div className={cn(s.wrapper)}>
      <ProfileForm />
      <Divider />
      <ChangePaswordForm />
    </div>
  </Page>
);
