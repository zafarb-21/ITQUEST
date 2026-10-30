"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState, useTransition } from "react";
import type { AdminCatalogProduct, CatalogCategory } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductsAdminManagerProps = {
  products: AdminCatalogProduct[];
  categories: CatalogCategory[];
};

type SubmissionState = {
  type: "success" | "error";
  message: string;
} | null;

export function ProductsAdminManager({ products, categories }: ProductsAdminManagerProps) {
  const router = useRouter();
  const [createState, setCreateState] = useState<SubmissionState>(null);
  const [updateStateById, setUpdateStateById] = useState<Record<string, SubmissionState>>({});
  const [createErrors, setCreateErrors] = useState<Record<string, string>>({});
  const [updateErrorsById, setUpdateErrorsById] = useState<Record<string, Record<string, string>>>({});
  const [createFormKey, setCreateFormKey] = useState(0);
  const [isPending, startTransition] = useTransition();

  async function submitCreate(formData: FormData) {
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataToPayload(formData)),
    });

    const result = (await response.json()) as {
      ok: boolean;
      message: string;
      errors?: Record<string, string>;
    };

    if (!response.ok || !result.ok) {
      setCreateErrors(result.errors ?? {});
      setCreateState({
        type: "error",
        message: result.message || "Could not create the product.",
      });
      return;
    }

    setCreateErrors({});
    setCreateState({ type: "success", message: result.message });
    setCreateFormKey((current) => current + 1);
    router.refresh();
  }

  async function submitUpdate(productId: string, formData: FormData) {
    const response = await fetch(`/api/admin/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataToPayload(formData)),
    });

    const result = (await response.json()) as {
      ok: boolean;
      message: string;
      errors?: Record<string, string>;
    };

    if (!response.ok || !result.ok) {
      setUpdateErrorsById((current) => ({
        ...current,
        [productId]: result.errors ?? {},
      }));
      setUpdateStateById((current) => ({
        ...current,
        [productId]: {
          type: "error",
          message: result.message || "Could not update the product.",
        },
      }));
      return;
    }

    setUpdateErrorsById((current) => ({
      ...current,
      [productId]: {},
    }));
    setUpdateStateById((current) => ({
      ...current,
      [productId]: {
        type: "success",
        message: result.message,
      },
    }));
    router.refresh();
  }

  return (
    <div className="space-y-10">
      <section className="surface-card-light p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Create Product</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-950">Add a new catalog item</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          This internal workspace is limited to approved company identities. Product changes are written directly to the live catalog database.
        </p>

        <form
          key={createFormKey}
          className="mt-8 space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            setCreateState(null);
            setCreateErrors({});
            const formData = new FormData(event.currentTarget);
            startTransition(async () => {
              await submitCreate(formData);
            });
          }}
        >
          <ProductFormFields categories={categories} errors={createErrors} />
          <SubmissionNotice state={createState} />
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Saving..." : "Create Product"}
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Existing Products</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">Edit catalog entries</h2>
        </div>

        {products.map((product) => (
          <details key={product.id} className="rounded-[1.75rem] border border-slate-200 bg-white shadow-card" open={false}>
            <summary className="cursor-pointer list-none px-7 py-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">{product.sku}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950">{product.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{product.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{product.category?.name ?? "Uncategorized"}</Badge>
                  <Badge>{product.isActive ? "Active" : "Inactive"}</Badge>
                  <Badge>{product.stockStatus.replaceAll("_", " ")}</Badge>
                </div>
              </div>
            </summary>

            <div className="border-t border-slate-200 px-7 py-7">
              <form
                className="space-y-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  setUpdateStateById((current) => ({ ...current, [product.id]: null }));
                  setUpdateErrorsById((current) => ({ ...current, [product.id]: {} }));
                  startTransition(async () => {
                    await submitUpdate(product.id, formData);
                  });
                }}
              >
                <ProductFormFields categories={categories} product={product} errors={updateErrorsById[product.id] ?? {}} />
                <SubmissionNotice state={updateStateById[product.id] ?? null} />
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          </details>
        ))}
      </section>
    </div>
  );
}

function ProductFormFields({
  categories,
  product,
  errors,
}: {
  categories: CatalogCategory[];
  product?: AdminCatalogProduct;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AdminField label="Product name" error={errors.name}>
          <input className="input-field" name="name" defaultValue={product?.name} />
        </AdminField>
        <AdminField label="Slug" error={errors.slug}>
          <input className="input-field" name="slug" defaultValue={product?.slug} />
        </AdminField>
        <AdminField label="SKU" error={errors.sku}>
          <input className="input-field" name="sku" defaultValue={product?.sku} />
        </AdminField>
      </div>

      <AdminField label="Summary" error={errors.summary}>
        <textarea className="input-field min-h-28 resize-none" name="summary" defaultValue={product?.summary} />
      </AdminField>

      <AdminField label="Description" error={errors.description}>
        <textarea className="input-field min-h-32 resize-none" name="description" defaultValue={product?.description ?? ""} />
      </AdminField>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminField label="Pricing mode" error={errors.pricingMode}>
          <select className="input-field appearance-none" name="pricingMode" defaultValue={product?.pricingMode ?? "REQUEST_QUOTE"}>
            <option value="REQUEST_QUOTE">Request quote</option>
            <option value="STARTING_AT">Starting at</option>
            <option value="PUBLIC_PRICE">Public price</option>
          </select>
        </AdminField>
        <AdminField label="Price amount" error={errors.priceAmount}>
          <input className="input-field" name="priceAmount" defaultValue={product?.currentPrice ?? ""} />
        </AdminField>
        <AdminField label="Price label" error={errors.priceLabel}>
          <input className="input-field" name="priceLabel" defaultValue={product?.priceLabel ?? ""} />
        </AdminField>
        <AdminField label="Currency" error={errors.currency}>
          <input className="input-field" name="currency" defaultValue={product?.currency ?? "USD"} />
        </AdminField>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminField label="Stock status" error={errors.stockStatus}>
          <select className="input-field appearance-none" name="stockStatus" defaultValue={product?.stockStatus ?? "ON_REQUEST"}>
            <option value="IN_STOCK">In stock</option>
            <option value="LOW_STOCK">Low stock</option>
            <option value="OUT_OF_STOCK">Out of stock</option>
            <option value="ON_REQUEST">On request</option>
          </select>
        </AdminField>
        <AdminField label="Quantity available" error={errors.quantityAvailable}>
          <input className="input-field" type="number" min={0} name="quantityAvailable" defaultValue={product?.quantityAvailable ?? 0} />
        </AdminField>
        <AdminField label="Reorder level" error={errors.reorderLevel}>
          <input className="input-field" type="number" min={0} name="reorderLevel" defaultValue={product?.reorderLevel ?? ""} />
        </AdminField>
        <AdminField label="Lead time (days)" error={errors.leadTimeDays}>
          <input className="input-field" type="number" min={0} name="leadTimeDays" defaultValue={product?.leadTimeDays ?? ""} />
        </AdminField>
      </div>

      <AdminField label="Inventory notes" error={errors.inventoryNotes}>
        <textarea className="input-field min-h-28 resize-none" name="inventoryNotes" defaultValue={product?.inventoryNotes ?? ""} />
      </AdminField>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AdminField label="Existing category" error={errors.categorySlug}>
          <select className="input-field appearance-none" name="categorySlug" defaultValue={product?.category?.slug ?? ""}>
            <option value="">No category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </AdminField>
        <AdminField label="New category name" error={errors.newCategoryName}>
          <input className="input-field" name="newCategoryName" />
        </AdminField>
        <AdminField label="New category slug" error={errors.newCategorySlug}>
          <input className="input-field" name="newCategorySlug" />
        </AdminField>
      </div>

      <AdminField label="New category description" error={errors.newCategoryDescription}>
        <input className="input-field" name="newCategoryDescription" />
      </AdminField>

      <div className="flex flex-wrap gap-6">
        <CheckboxField name="isFeatured" label="Featured product" defaultChecked={product?.isFeatured ?? false} />
        <CheckboxField name="isActive" label="Visible on site" defaultChecked={product?.isActive ?? true} />
      </div>
    </div>
  );
}

function formDataToPayload(formData: FormData) {
  return {
    name: String(formData.get("name") || ""),
    slug: String(formData.get("slug") || ""),
    sku: String(formData.get("sku") || ""),
    summary: String(formData.get("summary") || ""),
    description: String(formData.get("description") || ""),
    pricingMode: String(formData.get("pricingMode") || ""),
    priceAmount: String(formData.get("priceAmount") || ""),
    priceLabel: String(formData.get("priceLabel") || ""),
    currency: String(formData.get("currency") || ""),
    stockStatus: String(formData.get("stockStatus") || ""),
    quantityAvailable: String(formData.get("quantityAvailable") || ""),
    reorderLevel: String(formData.get("reorderLevel") || ""),
    leadTimeDays: String(formData.get("leadTimeDays") || ""),
    inventoryNotes: String(formData.get("inventoryNotes") || ""),
    categorySlug: String(formData.get("categorySlug") || ""),
    newCategoryName: String(formData.get("newCategoryName") || ""),
    newCategorySlug: String(formData.get("newCategorySlug") || ""),
    newCategoryDescription: String(formData.get("newCategoryDescription") || ""),
    isFeatured: formData.has("isFeatured"),
    isActive: formData.has("isActive"),
  };
}

function AdminField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs font-medium text-rose-500">{error}</span> : null}
    </label>
  );
}

function CheckboxField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-3 text-sm text-slate-700">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 rounded border-slate-300" />
      <span>{label}</span>
    </label>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">{children}</span>;
}

function SubmissionNotice({ state }: { state: SubmissionState }) {
  if (!state) return null;

  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm",
        state.type === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-rose-200 bg-rose-50 text-rose-700",
      )}
    >
      {state.message}
    </div>
  );
}
