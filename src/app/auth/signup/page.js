"use client";
import React, { useState } from "react";
import { buttonVariants } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { toast } = useToast();

  const router = useRouter();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordError(true);
      toast({
        title: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    setPasswordError(false);
    setFormSubmitted(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      toast({
        title: "Cuenta creada correctamente.",
      });
      router.push("/auth/login");
    } else {
      setFormSubmitted(false);
      toast({
        title: "Erorr al crear cuenta",
      });
    }
  });

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-8  border-gray-300 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Crea tu cuenta</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("name", {
              required: "El nombre es requerido",
            })}
          />
          {errors.name && (
            <span className="text-red-500 font-bold text-xs">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("email", {
              required: "El email es requerido",
            })}
          />
          {errors.email && (
            <span className="text-red-500 font-bold text-xs">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={
              passwordError
                ? "mt-1 p-2 w-full border rounded-md border-red-500"
                : "mt-1 p-2 w-full border rounded-md"
            }
            {...register("password", {
              required: "La contraseña es requerida",
            })}
          />
          {errors.password && (
            <span className="text-red-500 font-bold text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Repetir Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={
              passwordError
                ? "mt-1 p-2 w-full border rounded-md border-red-500"
                : "mt-1 p-2 w-full border rounded-md"
            }
            {...register("confirmPassword", {
              required: "La contraseña es requerida",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 font-bold text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={formSubmitted}
          className={buttonVariants({
            size: "sm",
            className: "w-full h-5",
          })}
        >
          Crear Cuenta
        </button>
      </form>
    </div>
  );
};

export default Signup;
