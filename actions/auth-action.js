"use server";

import { registerSchema } from "@/schemas/auth-schema";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export const registerUser = async (values) => {
  try {
    const { data, success } = registerSchema.safeParse(values);
    if (!success) {
      return { error: "Datos invalidos" };
    }

    // Verificar si el usuario ya existe
    const user = await db.user.findUnique({ where: { email: data.email } });

    if (user) {
      return { error: "El usuario ya existe" };
    }

    // Hashear la contraseña

    const passwordHash = await bcrypt.hash(data.password, 10);

    await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: passwordHash,
      },
    });

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    console.log(error);

    return { error: "error 500" };
  }
};

export const loginAction = async (values) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    console.log(error);
    return { error: "error 500" };
  }
};
