import { CloudArrowUpIcon, CpuChipIcon, CheckIcon, PlusIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Topics of your choice',
    description:
      'Our flashcard generator can handle any types of topics you desire.',
    icon: CheckIcon,
  },
  {
    name: 'Generated within seconds',
    description:
      'Send in your topic and wait for the flashcards to be generated in moments.',
    icon: CpuChipIcon,
  },
  {
    name: 'Save your cards',
    description:
      'Save the flashcards that works for you or even for fun!',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Even more...',
    description:
      "You'd soon be able to share these flashcards and challenge your friends.",
    icon: PlusIcon,
  },
]

export default function About() {
  return (
    <div className="bg-background py-32 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">We are Card Flix</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What we offer
          </p>
          <p className="mt-4 text-lg leading-8 text-text">
          Whether you&apos;re preparing for exams or mastering new skills, Card Flix simplifies the process, making studying both enjoyable and effective.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-text">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
