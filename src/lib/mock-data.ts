export interface IPO {
  id: string;
  companyName: string;
  description: string;
  status: 'Upcoming' | 'Trading';
  expectedDate: string;
  priceRange: string;
  sharesOffered: string;
  exchange: string;
  sector: string;
}

export const mockIpos: IPO[] = [
  {
    id: '1',
    companyName: 'TechVision AI',
    description:
      'Leading artificial intelligence and machine learning solutions provider.',
    status: 'Upcoming',
    expectedDate: 'March 15, 2024',
    priceRange: '$18 - $20',
    sharesOffered: '10M',
    exchange: 'NASDAQ',
    sector: 'Technology',
  },
  {
    id: '2',
    companyName: 'GreenEnergy Solutions',
    description: 'Renewable energy and sustainable technology company.',
    status: 'Upcoming',
    expectedDate: 'April 1, 2024',
    priceRange: '$22 - $25',
    sharesOffered: '15M',
    exchange: 'NYSE',
    sector: 'Energy',
  },
  {
    id: '3',
    companyName: 'HealthTech Innovations',
    description: 'Digital healthcare platform and telemedicine solutions.',
    status: 'Trading',
    expectedDate: 'February 28, 2024',
    priceRange: '$30 - $35',
    sharesOffered: '8M',
    exchange: 'NASDAQ',
    sector: 'Healthcare',
  },
  {
    id: '4',
    companyName: 'FoodTech Delivery',
    description: 'AI-powered food delivery and restaurant management platform.',
    status: 'Upcoming',
    expectedDate: 'March 30, 2024',
    priceRange: '$15 - $18',
    sharesOffered: '12M',
    exchange: 'NYSE',
    sector: 'Technology',
  },
  {
    id: '5',
    companyName: 'SpaceX Technologies',
    description: 'Space exploration and satellite communications company.',
    status: 'Upcoming',
    expectedDate: 'May 1, 2024',
    priceRange: '$45 - $50',
    sharesOffered: '20M',
    exchange: 'NYSE',
    sector: 'Aerospace',
  },
  {
    id: '6',
    companyName: 'Quantum Computing Corp',
    description: 'Quantum computing hardware and software solutions.',
    status: 'Trading',
    expectedDate: 'February 15, 2024',
    priceRange: '$28 - $32',
    sharesOffered: '7M',
    exchange: 'NASDAQ',
    sector: 'Technology',
  },
];
