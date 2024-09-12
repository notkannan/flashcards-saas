import { CheckIcon } from '@heroicons/react/20/solid'

const includedFeatures = [
  'Unlimited flashcards generation',
  'Many more to come',
]

export default function Pricing({buySubscription}) {
  return (
    <div id='pricing' className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Easier learning with affordable prices</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get all the pro features of Cardflix for a very minimal cost. Learning could not get any easier!
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Affordable pricing, great value!</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              With our affordable pricing, learning got easier and much more fun! We&apos;ll refund a month&apos;s price if you find Cardflix pro less useful
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-primary">What&apos;s included</h4>
              <div className="h-px flex-auto bg-primary" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-[#0b3954] py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-slate-100">Charged monthly</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-slate-100">$2</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-slate-100">USD / month</span>
                </p>
                <button
                  onClick={buySubscription}
                  className="mt-10 block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get access
                </button>
                <p className="mt-6 text-xs leading-5 text-slate-300">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
