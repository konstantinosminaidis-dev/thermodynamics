import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-paper px-6 text-center text-ink">
      <p className="font-serif text-4xl text-copper">404</p>
      <h1 className="font-serif text-2xl">Η σελίδα δεν βρέθηκε</h1>
      <p className="max-w-sm text-muted">
        Αυτό το κεφάλαιο δεν υπάρχει στις σημειώσεις.
      </p>
      <a
        href="/"
        className="mt-2 rounded-full bg-copper px-5 py-2.5 text-sm font-medium text-cream transition-transform duration-150 ease-out active:scale-[0.96]"
      >
        Επιστροφή στο εξώφυλλο
      </a>
    </main>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFound,
  });
}
