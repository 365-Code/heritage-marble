export const testimonials = [
  {
    name: "Mr. Kishan Bajaj",
    enterprise: "Aditya Enterprises, Yavatmal",
    quote:
      "Heritage Marble Arts transformed our space with their exquisite craftsmanship. The quality is unmatched!",
  },
  {
    name: "Mr. Ashok",
    enterprise: "Globe Real State, Dombivali",
    quote:
      "The attention to detail in their marble work is phenomenal. Truly a masterpiece!",
  },
  {
    name: "Shree Prakash Natha Choudhry",
    enterprise:
      "Swami Samarth Guru Panchayatan Sansthan Smarthwadi, Vangini Badlapur",
    quote:
      "Absolutely stunning craftsmanship! Highly recommend for anyone looking for premium marble art.",
  },
  {
    name: "Aniket ji",
    enterprise: "Dan Infrastructure Boiser, Palghar",
    quote:
      "Absolutely stunning craftsmanship! Highly recommend for anyone looking for premium marble art.",
  },
];

export const apiDefaults = {
  limit: 10,
  sortMapping: {
    date_added: "createdAt",
    updated: "updatedAt",
    name: "name",
  } as { [index: string]: string },
  orderMapping: {
    asc: 1,
    desc: -1,
    ascending: 1,
    descending: -1,
  } as { [index: string]: number },
};
