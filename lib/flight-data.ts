export type CabinClass = "Economy" | "Premium Economy" | "Business" | "First";
export type DealType = "Recommended" | "Cheapest" | "Fastest" | "Earliest departure" | "Latest departure";

export type Airport = {
  code: string;
  name: string;
  city: string;
  country: string;
};

export type FlightOffer = {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  aircraft: string;
  origin: string;
  destination: string;
  departureAt: string;
  arrivalAt: string;
  durationMinutes: number;
  stops: number;
  cabin: CabinClass;
  baggage: string;
  refundable: boolean;
  changePolicy: string;
  price: number;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  taxes: number;
  serviceFee: number;
  agencyMarkup: number;
  finalPrice: number;
  fareConditions: string[];
};

export const airports: Airport[] = [
  { code: "LOS", name: "Murtala Muhammed International Airport", city: "Lagos", country: "Nigeria" },
  { code: "ABV", name: "Nnamdi Azikiwe International Airport", city: "Abuja", country: "Nigeria" },
  { code: "PHC", name: "Port Harcourt International Airport", city: "Port Harcourt", country: "Nigeria" },
  { code: "LHR", name: "London Heathrow Airport", city: "London", country: "United Kingdom" },
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "United Arab Emirates" },
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "United States" },
  { code: "ACC", name: "Kotoka International Airport", city: "Accra", country: "Ghana" },
  { code: "JNB", name: "O.R. Tambo International Airport", city: "Johannesburg", country: "South Africa" },
  { code: "NBO", name: "Jomo Kenyatta International Airport", city: "Nairobi", country: "Kenya" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Türkiye" },
  { code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", city: "Madrid", country: "Spain" },
];

const addDays = (baseDate: string, days: number) => {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const flightOffers: FlightOffer[] = [
  {
    id: "RT-101",
    airline: "Rhema Airways",
    airlineCode: "RH",
    flightNumber: "RH210",
    aircraft: "Boeing 787-9",
    origin: "LOS",
    destination: "LHR",
    departureAt: new Date("2026-01-15T08:15:00").toISOString(),
    arrivalAt: new Date("2026-01-15T15:45:00").toISOString(),
    durationMinutes: 450,
    stops: 0,
    cabin: "Economy",
    baggage: "23kg checked + 7kg cabin",
    refundable: true,
    changePolicy: "Free changes up to 24h before departure",
    price: 520000,
    currency: "NGN",
    taxes: 60000,
    serviceFee: 12000,
    agencyMarkup: 25000,
    finalPrice: 617000,
    fareConditions: ["Refundable fare", "Carry-on baggage included", "Changeable before departure"],
  },
  {
    id: "RT-102",
    airline: "Emirates",
    airlineCode: "EK",
    flightNumber: "EK301",
    aircraft: "Airbus A380",
    origin: "LOS",
    destination: "DXB",
    departureAt: new Date("2026-01-16T11:30:00").toISOString(),
    arrivalAt: new Date("2026-01-16T20:20:00").toISOString(),
    durationMinutes: 530,
    stops: 1,
    cabin: "Business",
    baggage: "32kg checked + 10kg cabin",
    refundable: true,
    changePolicy: "Changes allowed with fee",
    price: 760000,
    currency: "NGN",
    taxes: 84000,
    serviceFee: 18000,
    agencyMarkup: 32000,
    finalPrice: 894000,
    fareConditions: ["Flexible ticket", "Business lounge access included", "Priority boarding"],
  },
  {
    id: "RT-103",
    airline: "Qatar Airways",
    airlineCode: "QR",
    flightNumber: "QR147",
    aircraft: "Boeing 787-8",
    origin: "ABV",
    destination: "JFK",
    departureAt: new Date("2026-01-14T13:10:00").toISOString(),
    arrivalAt: new Date("2026-01-14T22:45:00").toISOString(),
    durationMinutes: 575,
    stops: 1,
    cabin: "Premium Economy",
    baggage: "25kg checked",
    refundable: false,
    changePolicy: "Non-refundable, change fee applies",
    price: 845000,
    currency: "NGN",
    taxes: 96000,
    serviceFee: 20000,
    agencyMarkup: 38000,
    finalPrice: 999000,
    fareConditions: ["No free changes", "Baggage allowance as booked", "Seat selection available"],
  },
  {
    id: "RT-104",
    airline: "British Airways",
    airlineCode: "BA",
    flightNumber: "BA208",
    aircraft: "Airbus A350",
    origin: "LOS",
    destination: "LHR",
    departureAt: new Date("2026-01-17T18:40:00").toISOString(),
    arrivalAt: new Date("2026-01-18T05:10:00").toISOString(),
    durationMinutes: 390,
    stops: 0,
    cabin: "Business",
    baggage: "32kg checked + 10kg cabin",
    refundable: true,
    changePolicy: "Unlimited changes within 24h",
    price: 910000,
    currency: "NGN",
    taxes: 101000,
    serviceFee: 22000,
    agencyMarkup: 40000,
    finalPrice: 1073000,
    fareConditions: ["Flexible and refundable", "Extra legroom seats available", "Priority baggage"],
  },
  {
    id: "RT-105",
    airline: "Ethiopian Airlines",
    airlineCode: "ET",
    flightNumber: "ET945",
    aircraft: "Boeing 737 MAX",
    origin: "LOS",
    destination: "ACC",
    departureAt: new Date("2026-01-18T07:50:00").toISOString(),
    arrivalAt: new Date("2026-01-18T09:40:00").toISOString(),
    durationMinutes: 110,
    stops: 0,
    cabin: "Economy",
    baggage: "23kg checked",
    refundable: false,
    changePolicy: "Change fee on selected fare",
    price: 185000,
    currency: "NGN",
    taxes: 24000,
    serviceFee: 7000,
    agencyMarkup: 15000,
    finalPrice: 226000,
    fareConditions: ["Light fare", "Carry-on baggage included", "Seat selection at extra cost"],
  },
  {
    id: "RT-106",
    airline: "Turkish Airlines",
    airlineCode: "TK",
    flightNumber: "TK541",
    aircraft: "Airbus A330",
    origin: "LOS",
    destination: "FRA",
    departureAt: new Date("2026-01-20T06:00:00").toISOString(),
    arrivalAt: new Date("2026-01-20T15:35:00").toISOString(),
    durationMinutes: 575,
    stops: 1,
    cabin: "Economy",
    baggage: "23kg checked",
    refundable: true,
    changePolicy: "Free change subject to fare class",
    price: 640000,
    currency: "NGN",
    taxes: 71000,
    serviceFee: 18000,
    agencyMarkup: 27000,
    finalPrice: 756000,
    fareConditions: ["Economy flex", "Meals included", "Extra baggage available"],
  },

  {
    id: "RT-107",
    airline: "Rhema Airways",
    airlineCode: "RH",
    flightNumber: "RH420",
    aircraft: "Airbus A320neo",
    origin: "LHR",
    destination: "LOS",
    departureAt: addDays("2026-01-22T15:40:00", 0),
    arrivalAt: addDays("2026-01-22T23:15:00", 0),
    durationMinutes: 455,
    stops: 0,
    cabin: "Economy",
    baggage: "23kg checked + 7kg cabin",
    refundable: true,
    changePolicy: "Free changes up to 24h before departure",
    price: 530000,
    currency: "NGN",
    taxes: 61000,
    serviceFee: 12000,
    agencyMarkup: 26000,
    finalPrice: 629000,
    fareConditions: ["Refundable fare", "Carry-on baggage included", "Changeable before departure"],
  },
  {
    id: "RT-108",
    airline: "Emirates",
    airlineCode: "EK",
    flightNumber: "EK302",
    aircraft: "Airbus A380",
    origin: "DXB",
    destination: "LOS",
    departureAt: addDays("2026-01-23T03:20:00", 0),
    arrivalAt: addDays("2026-01-23T11:15:00", 0),
    durationMinutes: 535,
    stops: 1,
    cabin: "Business",
    baggage: "32kg checked + 10kg cabin",
    refundable: true,
    changePolicy: "Changes allowed with fee",
    price: 820000,
    currency: "NGN",
    taxes: 90000,
    serviceFee: 18000,
    agencyMarkup: 35000,
    finalPrice: 963000,
    fareConditions: ["Flexible ticket", "Business lounge access included", "Priority boarding"],
  },
];

export const popularDestinations = [
  { name: "London", description: "Historic landmarks, premium shopping, and world-class culture.", image: "https://images.unsplash.com/..." },
  { name: "Dubai", description: "Luxury shopping, desert escapes, and iconic skyline views.", image: "https://images.unsplash.com/..." },
  { name: "New York", description: "A vibrant city break with world-famous attractions.", image: "https://images.unsplash.com/..." },
  { name: "Accra", description: "A lively West African hub with warm hospitality and beaches.", image: "https://images.unsplash.com/..." },
  { name: "Johannesburg", description: "A gateway to nature, culture, and international connections.", image: "https://images.unsplash.com/..." },
  { name: "Nairobi", description: "Gateway to safari adventure and East African trade routes.", image: "https://images.unsplash.com/..." },
  { name: "Paris", description: "Romantic city breaks with art, fashion, and iconic landmarks.", image: "https://images.unsplash.com/..." },
];

export const defaultSearchState = {
  tripType: "round-trip",
  from: "LOS",
  to: "LHR",
  departureDate: "2026-01-15",
  returnDate: "2026-01-22",
  adults: 1,
  children: 0,
  infants: 0,
  cabinClass: "Economy",
};

export const mockBooking = {
  bookingReference: "RRT-8F4K29",
  status: "confirmed",
  paymentStatus: "successful",
  amount: 617000,
  currency: "NGN",
  flight: flightOffers[0],
};
