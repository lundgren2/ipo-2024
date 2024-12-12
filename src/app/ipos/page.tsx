import { mockIpos } from '@/lib/mock-data';

export default function IposPage() {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-semibold text-gray-900">
              IPO Listings
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A comprehensive list of upcoming and recent Initial Public
              Offerings.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {/* Add filter controls here */}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {mockIpos.map((ipo) => (
            <div
              key={ipo.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {ipo.companyName}
                  </h3>
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
                  <p className="text-sm text-gray-500">{ipo.description}</p>
                </div>
                <div className="mt-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Expected Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {ipo.expectedDate}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Price Range
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {ipo.priceRange}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Shares Offered
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {ipo.sharesOffered}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Exchange
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {ipo.exchange}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    View full details →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
