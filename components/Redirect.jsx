export default function Redirect() {
    return (
      <>
        <main className="grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-primary">...</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-5xl">Oopsies :/</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Please login or create an account to access your collection.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/login"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In / Sign Up
              </a>
              <a href="mailto:pokerface1348@gmail.com" className="text-sm font-semibold text-text">
                Report the issue<span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }
  