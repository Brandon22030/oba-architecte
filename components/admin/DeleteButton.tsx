"use client";

export function DeleteButton({
  action,
  confirmText,
  label = "Supprimer",
  className,
}: {
  action: () => void | Promise<void>;
  confirmText: string;
  label?: string;
  className: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <button type="submit" className={className}>
        {label}
      </button>
    </form>
  );
}
