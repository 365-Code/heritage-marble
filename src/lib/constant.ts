export const testimonials = [
  {
    name: "Mr. Kishan Bajaj",
    enterprise: "Aditya Enterprises, Yavatmal",
    quote:
      "Heritage Marble Arts has truly redefined elegance. Their craftsmanship is unparalleled, and the finished work is just breathtaking.",
  },
  {
    name: "Mr. Ashok",
    enterprise: "Globe Real State, Dombivali",
    quote:
      "I was blown away by the precision and quality of their marble work. It's clear that Heritage Marble Arts is a leader in their field!",
  },
  {
    name: "Shree Prakash Natha Choudhry",
    enterprise:
      "Swami Samarth Guru Panchayatan Sansthan Smarthwadi, Vangini Badlapur",
    quote:
      "From start to finish, their attention to detail and dedication to perfection was evident. I couldn’t be happier with the results.",
  },
  {
    name: "Aniket ji",
    enterprise: "Dan Infrastructure Boiser, Palghar",
    quote:
      "Working with Heritage Marble Arts was a fantastic experience. The final product exceeded all expectations, adding a touch of luxury to our project.",
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
