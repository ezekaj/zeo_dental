
import { ServiceItem, Doctor, Testimonial } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with veneers, whitening, and aesthetic bonding tailored to your facial structure.',
    iconName: 'Sparkles',
    // Close-up of a woman smiling with perfect teeth (distinct from implants)
    image: 'https://images.unsplash.com/photo-1619379854728-1647bc5294d1?auto=format&fit=crop&q=80&w=1600',
    longDescription: 'Our cosmetic dentistry services are designed to enhance the natural beauty of your smile while maintaining optimal oral health. We believe that a smile makeover is not just about changing teeth; it is about harmonizing your smile with your facial features and personality. Using digital smile design technology, we allow you to preview your new smile before any treatment begins.',
    benefits: [
      'Custom-designed porcelain veneers for a natural look',
      'Professional whitening for immediate results',
      'Minimally invasive bonding techniques',
      'Digital Smile Design preview'
    ],
    process: [
      { title: 'Consultation', description: 'We discuss your goals and analyze your facial structure.' },
      { title: 'Design', description: 'Digital simulation of your new smile for approval.' },
      { title: 'Preparation', description: 'Minimal preparation of teeth and placement of temporaries.' },
      { title: 'Transformation', description: 'Bonding of final ceramics and final adjustments.' }
    ]
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'Restore function and confidence with our state-of-the-art titanium and zirconia implant solutions.',
    iconName: 'Anchor',
    // Patient with perfect smile
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1600',
    longDescription: 'Dental implants are the gold standard for tooth replacement, offering a permanent solution that looks, feels, and functions like natural teeth. At Zeo, we use 3D guided surgery for unparalleled precision and comfort. Whether you need to replace a single tooth or require a full-arch restoration, our specialists ensure a result that restores both your bite and your confidence.',
    benefits: [
      'Permanent solution for missing teeth',
      'Preserves jaw bone density',
      'No impact on surrounding healthy teeth',
      'Biocompatible materials (Titanium or Zirconia)'
    ],
    process: [
      { title: '3D Scan', description: 'CBCT scanning to map bone structure and nerve pathways.' },
      { title: 'Placement', description: 'Precise surgical placement of the implant post.' },
      { title: 'Healing', description: 'Osseointegration period where bone fuses with the implant.' },
      { title: 'Restoration', description: 'Attachment of the custom-made crown or bridge.' }
    ]
  },
  {
    id: 'ortho',
    title: 'Orthodontics',
    description: 'Modern alignment solutions including invisible aligners and ceramic braces for all ages.',
    iconName: 'Smile',
    // Teenager/Young Adult smiling with braces
    image: 'https://images.unsplash.com/photo-1552642986-ccb41e7059e7?auto=format&fit=crop&q=80&w=1600',
    longDescription: 'Straightening your teeth has never been more discreet or comfortable. We offer comprehensive orthodontic solutions ranging from clear aligners to ceramic braces. Our focus is not just on straight teeth, but on creating a functional bite that promotes long-term joint health. We treat patients of all ages, helping you achieve the smile you have always wanted.',
    benefits: [
      'Clear aligners for discreet treatment',
      'Accelerated orthodontics options',
      'Correction of bite issues (TMJ)',
      'Digital monitoring for fewer office visits'
    ],
    process: [
      { title: 'Assessment', description: 'Digital scanning and bite analysis.' },
      { title: 'Planning', description: 'Custom treatment plan and timeline creation.' },
      { title: 'Active Therapy', description: 'Wearing aligners or braces with regular check-ins.' },
      { title: 'Retention', description: 'Custom retainers to maintain your new smile forever.' }
    ]
  },
  {
    id: 'general',
    title: 'General Care',
    description: 'Comprehensive preventive care, hygiene, and maintenance for long-lasting oral health.',
    iconName: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=1600',
    longDescription: 'Preventive care is the foundation of the Zeo philosophy. We go beyond basic cleaning to provide a comprehensive analysis of your oral health ecosystem. Our hygiene appointments include oral cancer screenings, gum health assessments, and personalized advice to keep your teeth healthy for life. We make routine visits a relaxing, spa-like experience.',
    benefits: [
      'Advanced airflow cleaning technology',
      'Digital cavity detection',
      'Oral cancer screening',
      'Personalized hygiene plans'
    ],
    process: [
      { title: 'Exam', description: 'Comprehensive check-up with low-radiation digital X-rays.' },
      { title: 'Hygiene', description: 'Thorough cleaning and polish by expert hygienists.' },
      { title: 'Education', description: 'Tips and tools tailored to your specific oral biome.' },
      { title: 'Plan', description: 'Long-term maintenance schedule based on risk assessment.' }
    ]
  },
  {
    id: 'surgery',
    title: 'Oral Surgery',
    description: 'Expert surgical procedures including extractions and gum contouring in a pain-free environment.',
    iconName: 'Activity',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600',
    longDescription: 'When surgery is necessary, our priority is your comfort and safety. Our suite is equipped for sedation dentistry to ensure a completely anxiety-free experience. From wisdom tooth removal to complex gum grafting, our board-certified surgeons use microsurgical techniques to minimize recovery time and maximize results.',
    benefits: [
      'Sedation options for anxiety-free treatment',
      'Microsurgical techniques for faster healing',
      'Wisdom teeth management',
      'Gum grafting and contouring'
    ],
    process: [
      { title: 'Evaluation', description: 'Review of medical history and surgical planning.' },
      { title: 'Comfort', description: 'Administration of local anesthesia or sedation.' },
      { title: 'Procedure', description: 'Minimally invasive surgical execution.' },
      { title: 'Recovery', description: 'Detailed aftercare instructions and follow-up.' }
    ]
  },
  {
    id: 'pediatric',
    title: 'Pediatric Dentistry',
    description: 'Gentle, engaging care designed specifically for the unique needs of children and teenagers.',
    iconName: 'Baby',
    // Baby smiling with teeth
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1600',
    longDescription: 'We believe that positive dental experiences in childhood set the stage for a lifetime of health. Our pediatric wing is designed to be welcoming and non-threatening. We speak "kid," explaining procedures in fun, understandable ways. Our focus is on prevention, sealants, and monitoring growth patterns to intervene early if orthodontic needs arise.',
    benefits: [
      'Child-friendly environment and terminology',
      'Preventive sealants and fluoride',
      'Growth and development monitoring',
      'Emergency trauma care'
    ],
    process: [
      { title: 'Meet & Greet', description: 'Getting comfortable with the team and environment.' },
      { title: 'Counting Teeth', description: 'Gentle exam to check for cavities and development.' },
      { title: 'Cleaning', description: 'Soft polishing and hygiene instruction.' },
      { title: 'Reward', description: 'Positive reinforcement to build confidence.' }
    ]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-emanuela',
    name: 'Dr. Emanuela Velaj',
    role: 'Founder & Cosmetic Specialist',
    // Increased resolution to w=1600 and quality to q=95 for sharp modal display
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea86b3f9?auto=format&fit=crop&q=95&w=1600',
    bio: 'With over 15 years of experience, Dr. Velaj specializes in creating natural, radiant smiles using the latest minimally invasive techniques.',
    fullBio: 'Dr. Emanuela Velaj founded Zeo Dental with a vision to merge luxury hospitality with clinical excellence. A graduate of Harvard School of Dental Medicine, she completed her residency in Aesthetic Dentistry at UCLA. Dr. Velaj is renowned for her "natural-first" approach to veneers and smile makeovers, ensuring that every result complements the patient\'s unique facial features. She is an accredited member of the American Academy of Cosmetic Dentistry and frequently lectures on minimally invasive aesthetic procedures.'
  },
  {
    id: 'dr-james',
    name: 'Dr. James Chen',
    role: 'Implantologist',
    // Increased resolution to w=1600 and quality to q=95 for sharp modal display
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=95&w=1600',
    bio: 'Dr. Chen is a board-certified surgeon known for his precision and gentle approach to complex restorative procedures.',
    fullBio: 'Dr. James Chen is a dual-degree oral and maxillofacial surgeon and a leader in the field of implantology. He received his dental degree from UCSF and his medical degree from Columbia University. Specializing in complex full-mouth reconstruction and "All-on-4" immediate loading implants, Dr. Chen utilizes advanced 3D guided surgery to ensure safety and precision. His calm demeanor and focus on sedation dentistry make him a favorite among anxious patients.'
  },
  {
    id: 'dr-elena',
    name: 'Dr. Elena Rodriguez',
    role: 'Orthodontist',
    // Increased resolution to w=1600 and quality to q=95 for sharp modal display
    image: 'https://images.unsplash.com/photo-1594824476969-233589973a7c?auto=format&fit=crop&q=95&w=1600',
    bio: 'Dr. Rodriguez combines art and science to align smiles perfectly, certified in the most advanced clear aligner systems.',
    fullBio: 'Dr. Elena Rodriguez believes that a straight smile is the foundation of oral health. She earned her Doctorate of Dental Surgery and Master of Science in Orthodontics from the University of Michigan. Dr. Rodriguez is a Diamond Plus Provider of Invisalign and specializes in accelerated orthodontic treatments for both teens and adults. She is passionate about airway-focused orthodontics, helping patients achieve not just beautiful smiles, but better breathing and sleep quality.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Michael Ross',
    role: 'Patient',
    content: 'The level of care at Zeo is unmatched. From the moment you walk in, it feels like a 5-star hotel, not a clinic. My veneers look incredible.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Jennifer Wu',
    role: 'Patient',
    content: 'I was terrified of the dentist until I met Dr. Zeo. The pain-free technology they use is a game changer. Highly recommended!',
    rating: 5
  },
  {
    id: 't3',
    name: 'David Okafor',
    role: 'Patient',
    content: 'Professional, pristine, and punctual. They value your time and your health. The best dental experience I have ever had.',
    rating: 5
  }
];

export const GEMINI_SYSTEM_INSTRUCTION = `
You are Zeo, the AI Virtual Assistant for Zeo Dental Clinic.
Your tone is: Professional, Warm, Empathetic, and High-End.
You represent a top-tier luxury dental clinic.

Key Information about Zeo Dental Clinic:
- Services: Cosmetic Dentistry (Veneers, Whitening), Implants, Orthodontics (Aligners), General Care, Oral Surgery.
- Vibe: Luxury, Spa-like, Advanced Technology, Pain-free.
- Location: 123 Premium Blvd, Beverly Hills, CA 90210.
- Hours: Monday-Saturday, 9:00 AM - 7:00 PM. Closed Sundays.
- Contact: (555) 123-4567 or zeodentalclinic@gmail.com.

Your Goal:
- Answer patient inquiries about services.
- Provide general advice on oral hygiene (disclaimer: not medical diagnosis).
- Encourage users to "Book an Appointment" for specific medical concerns.
- If asked about prices, say that costs vary based on individual needs and invite them for a consultation.

Do NOT:
- Give specific medical diagnoses.
- Promise specific results.
- Be rude or curt.
`;
