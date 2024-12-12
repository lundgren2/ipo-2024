import { mockIpos } from '@/lib/mock-data';

export default function TimelinePage() {
  // Sort IPOs by date
  const sortedIpos = [...mockIpos].sort(
    (a, b) =>
      new Date(a.expectedDate).getTime() - new Date(b.expectedDate).getTime()
  );

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">IPO Timeline</h1>
          <p className="mt-2 text-sm text-gray-700">
            Chronological view of upcoming and recent IPO events
          </p>
        </div>

        <div className="mt-12 relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200" />

          <div className="space-y-12">
            {sortedIpos.map((ipo, index) => (
              <div
                key={ipo.id}
                className={`relative ${index % 2 === 0 ? 'pr-1/2' : 'pl-1/2'}`}
              >
                <div
                  className={`flex items-center ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`w-full max-w-md ${
                      index % 2 === 0 ? 'pr-8' : 'pl-8'
                    }`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {ipo.companyName}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {ipo.description}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            ipo.status === 'Upcoming'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {ipo.status}
                        </span>
                      </div>
                      <div className="mt-4">
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              Date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {ipo.expectedDate}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              Exchange
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {ipo.exchange}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              Price Range
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {ipo.priceRange}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              Shares
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {ipo.sharesOffered}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Timeline dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 rounded-full bg-blue-600 border-4 border-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
