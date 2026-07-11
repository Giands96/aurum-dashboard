"use client";

import { useActionState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState = { error: "" };

function LoginForm() {
  const searchParams = useSearchParams();
  const expired = searchParams.get("expired");
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="bg-white rounded-[28px] shadow-[0_16px_45px_rgba(30,50,70,0.10)] p-8 sm:p-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5f0e8]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1f1f1f"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-dashboard-text-primary">
          Aurum Admin
        </h1>
        {expired ? (
          <p className="mt-2 text-sm text-dashboard-warning">
            Tu sesión expiró. Iniciá sesión nuevamente.
          </p>
        ) : (
          <p className="mt-2 text-sm text-dashboard-text-secondary">
            Ingresá tus credenciales para acceder al panel
          </p>
        )}
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <Input
          id="email"
          name="email"
          type="email"
          label="Correo electrónico"
          placeholder="admin@ejemplo.com"
          required
          autoComplete="email"
          autoFocus
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />

        {state.error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-dashboard-danger">
            {state.error}
          </div>
        )}

        <Button type="submit" loading={pending} className="w-full mt-2">
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
