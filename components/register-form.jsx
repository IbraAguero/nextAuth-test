"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { registerSchema } from "../schemas/auth-schema";
import { registerUser } from "@/actions/auth-action";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", name: "", password: "" },
  });

  const onSubmit = async (values) => {
    setError(null);
    startTransaction(async () => {
      const response = await registerUser(values);
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/dashboard");
      }
    });
  };

  return (
    <div className="w-96 border border-neutral-700 rounded-xl p-10">
      <Form {...form}>
        <h2 className="text-center">Register</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su correo" {...field} />
                </FormControl>
                <FormMessage className="min-h-[2rem]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su nombre" {...field} />
                </FormControl>
                <FormMessage className="min-h-[2rem]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="h-24">
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese su contraseña"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormMessage>{error}</FormMessage>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full mt-5 bg-neutral-700 hover:bg-neutral-800"
          >
            Registrar
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default RegisterForm;
