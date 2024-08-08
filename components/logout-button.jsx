"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  const handleClick = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return <Button onClick={handleClick}>Cerrar sesion</Button>;
};
export default LogoutButton;
