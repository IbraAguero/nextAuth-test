import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./schemas/auth-schema";
import bcrypt from "bcryptjs";
import db from "./lib/db";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("credenciales invalidas");
        }
        // Verificar si el usuario existe en la base de datos
        const user = await db.user.findUnique({ where: { email: data.email } });

        if (!user || !user.password) {
          throw new Error("credenciales invalidas");
        }

        // Verificar si la contraseña es valida
        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
          throw new Error("credenciales invalidas");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
