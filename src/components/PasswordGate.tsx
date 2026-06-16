import { useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";

const STORAGE_KEY = "ks-site-unlocked";
const PASSWORD = "biocomplex2026";

export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && !unlocked) inputRef.current?.focus();
  }, [ready, unlocked]);

  if (!ready) return null;
  if (unlocked) return <>{children}</>;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setUnlocked(true);
    } else {
      setError(true);
      setValue("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-background px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm text-center"
        aria-labelledby="gate-title"
      >
        <h1
          id="gate-title"
          className="font-serif text-4xl tracking-tight text-foreground md:text-5xl"
        >
          Kim Sneppen
        </h1>
        <span className="mx-auto mt-5 block h-px w-12 bg-accent/60" aria-hidden="true" />
        <p className="mt-6 text-[15px] text-muted-foreground">
          Please enter the password to continue.
        </p>

        <div className="mt-10 text-left">
          <label
            htmlFor="site-password"
            className="block text-[12px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            Password
          </label>
          <input
            ref={inputRef}
            id="site-password"
            type="password"
            autoComplete="current-password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(false);
            }}
            className="mt-2 w-full border-b border-border bg-transparent px-1 py-2 text-[15px] text-foreground outline-none transition-colors focus:border-accent"
            aria-invalid={error}
            aria-describedby={error ? "gate-error" : undefined}
          />
          {error && (
            <p id="gate-error" className="mt-3 text-[13px] text-muted-foreground">
              Incorrect password
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-8 inline-block rounded-md border border-accent/70 px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
