import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-4 text-center">
      <h1 className="font-display text-7xl font-semibold tracking-widest text-red-700 dark:text-red-600 md:text-9xl">
        YOU DIED
      </h1>
      <p className="max-w-md text-muted-foreground">
        The page thou seekest hath been lost to the Lands Between. Not even
        grace can guide thee to a route that does not exist. (404)
      </p>
      <Link
        href="/"
        className="underline decoration-accent-brand underline-offset-4 transition-colors hover:text-accent-brand"
      >
        Return to Roundtable Hold
      </Link>
    </div>
  );
}
