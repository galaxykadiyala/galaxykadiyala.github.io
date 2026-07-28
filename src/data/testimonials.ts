export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  group: 'professional' | 'community';
}

export const testimonials: Testimonial[] = [
  {
    quote: "Galaxy is a great engineer, calm and composed. Can handle aggressive tasks and guide the team. Exceptional attention to detail, great debugging skills — rich experience across virtualization and data storage.",
    name: 'Tony Joseph',
    role: 'Azure Storage, Microsoft · worked together at Nutanix',
    group: 'professional',
  },
  {
    quote: "Galaxy's strategic thinking and problem-solving have been instrumental in overcoming challenges. He's the go-to person for product-related queries for the entire team, and incredibly patient and clear in his explanations.",
    name: 'Shreya Shetty',
    role: 'MTS, Nutanix · reported to Galaxy directly',
    group: 'professional',
  },
  {
    quote: "A well-grounded and down to earth person with a unique style of understanding and doing things. A calculated risk taker, pragmatic leader and realist who grasps ideas holistically while still noting the acute details.",
    name: 'Srushtika Neelakantam',
    role: 'Senior Product Manager, Confluent · worked together at Mozilla',
    group: 'community',
  },
  {
    quote: 'Awesome at organizing events, managing logistics and connecting/networking. Galaxy currently leads the Mozilla India Events Task Force, a special interest group of thousands of volunteers.',
    name: 'Soumya Deb',
    role: 'worked together on Mozilla events',
    group: 'community',
  },
  {
    quote: 'One of the leaders of the Mozilla community in India. Co-organized several very successful Mozilla events. Very engaged, trustworthy and reliable.',
    name: 'Tobias Leingruber',
    role: 'Manager, Marketing & Technology · worked together at Mozilla',
    group: 'community',
  },
];
