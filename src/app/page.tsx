export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Intact POC
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A Next.js application following bulletproof-react patterns
          </p>
          <div className="space-x-4">
            <a
              href="/awesome"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View Awesome Feature
            </a>
            <a
              href="/storybook"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              View Storybook
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
