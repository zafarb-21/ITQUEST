import { LogOut, ShieldCheck } from "lucide-react";
import { signOut } from "@/auth";

type AdminSessionBarProps = {
  admin: {
    name: string;
    email: string;
  };
};

export function AdminSessionBar({ admin }: AdminSessionBarProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Authenticated Admin</p>
          <p className="mt-1 text-sm text-slate-700">
            {admin.name} <span className="text-slate-400">/</span> {admin.email}
          </p>
        </div>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/admin/sign-in" });
        }}
      >
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </form>
    </div>
  );
}
