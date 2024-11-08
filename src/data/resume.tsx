import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Amey Ambade",
  firstname: "Amey",
  initials: "AA",
  url: "https://heyamey.com",
  location: "Houston, TX",
  locationLink: "https://www.google.com/maps/place/houston",
  description:
    "Senior Data Scientist and Machine Learning Engineer. I love building software, lifting, yapping and giving to the community.",
  summary:
    "I've been coding since I was 12 years old. I have masters and bachelors degrees in computer science, have lived in 3 different countries, and worked at multiple Fortune 500 companies. I work on ML/AI research in the energy sector, AI ethics, open source development and volunteering.",
  avatarUrl: "/me.png",
  skills: [
    "Python",
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Scikit-learn",
    "Pandas",
    "R",
    "Node.js",
    "SQL",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Dataiku",
    "Azure",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "ameyambade@gmail.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://git.new/amey-github",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://dub.sh/amey-linkedin",
        icon: Icons.linkedin,

        navbar: true,
      },
      Bluesky: {
        name: "BlueSky",
        url: "https://dub.sh/amey-bluesky",
        icon: Icons.bsky,

        navbar: true,
      },
      Spotify: {
        name: "Spotify",
        url: "https://dub.sh/amey-spotify",
        icon: Icons.spotify,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:ameyambade@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "SLB",
      href: "https://slb.com",
      badges: ["AI", "ML", "Computer Vision"],
      location: "Houston, TX",
      title: "Senior Data Scientist",
      logoUrl: "/slb.jpg",
      start: "May 2023",
      end: "current",
      description:" Led technical teams in next-gen applied ML for asset performance management and system optimization offerings under the Digital Twin framework. Delivered client-facing SaaS solutions for integrating research-based LLM (Large Language Model) applications with internal data science orchestration platforms and external data lakes, generating $3M in revenue (Q1 2024). Built the SLB Vision Analytics suite, including fire and smoke detection, people counters, personal protective equipment (PPE) detection, pose estimation and tracking systems using transfer learning and computer vision models like YOLOv5 for real-time video camera feeds. Generated $4.5M in revenue from ongoing client contracts, improved field safety by 45%, reduced risk associated with improper PPE by 35%, and reduced the client engineering safety team surveillance time by 30%. Led technical data science and management efforts for a 3-person team, to build an end-to-end machine learning service with real-time control optimization for dynacard image classification models to identify failure signatures in 100+ wells for a large American firm. Resulted in $10M+ in operational savings, 60 % faster detection time while reducing downtimes by 19%. Designed, built and productionized Smart Surveillance, an ML solution for hydrate detection for an international firm generating $2M+ in revenue, boosting production by 15%, reducing labor by 12%. Developed systems to detect emulsions for South American fields using multivariate time series ensemble tree models, reducing non-productive time by 25% and saving $1M+ in maintenance costs.",
    },
    {
      company: "Schlumberger",
      href: "https://slb.com/",
      badges: [],
      location: "Houston, TX",
      title: "Data Scientist",
      logoUrl: "/schlumberger.jpg",
      start: "Feb 2019",
      end: "May 2023",
      description:
        "Developed failure and anomaly prediction models for Prognostic Health Management, implemented ML backend infrastructure and drove collaboration by partnering with field, client, and product teams to build apps to visualize wells based on their production rates using machine learning. Built a deep learning-based CNN model to classify erosion levels in mechanical tools and deployed a scalable cloud-based API, increasing precision by 8% and reducing detection time by 10%. Built a health analyzer application using unsupervised learning to predict tool failures to aid scientists and engineers.",
    },
    {
      company: "Schlumberger",
      href: "https://slb.com/",
      badges: [],
      location: "Houston, TX",
      title: "Data Science Intern",
      logoUrl: "/schlumberger.jpg",
      start: "May 2018",
      end: "Aug 2018",
      description:
        "Improved inventory control by developing LSTM models to predict cracking from time series data of drill sensors. Designed a health analyzer application in Python to predict tool sensor failures for aiding experts in field.",
    },
    {
      company: "Columbia University | Columbia Law School",
      href: "https://law.columbia.edu/",
      badges: [],
      location: "New York, NY",
      title: "Graduate Researcher",
      logoUrl: "/culaw.png",
      start: "Dec 2017",
      end: "Oct 2018",
      description:
        "Built a session-based recommendation system using a deep learning-based encoder-decoder architecture incorporating contextual information from users and an attention mechanism, improving displayed recommendations in e-commerce scenarios by 3% over present baselines on the YouChoose dataset (CNARM). Developed NLP and ML software to predict outcome of contractual damage lawsuits to benefit academics in debates, parties in drafting contracts, counsels in pre-trial exchanges and judges in rulings, now part of Optimalex, an AI-based legal predictive analytics solution for insurance claims.",
    },
    {
      company: "CY Tech | Ecole Internationale des Sciences du Traitement de l'Information (EISTI)",
      href: "https://www.cytech.cyu.fr/",
      badges: [],
      location: "Paris, France",
      title: "Software Engineer Intern",
      logoUrl: "/cytech.svg",
      start: "May 2016",
      end: "Aug 2016",
      description:
        "Built automatic data extraction and analysis models using NLP and machine learning for AREL, an e-learning platform used by 1500+ French students and alumni. Developed software to restructure the web app, enhancing app usability.",
    },
  ],
  education: [
    {
      school: "Columbia University",
      href: "https://columbia.edu",
      degree: "Master's Degree in Computer Science (MSCS)",
      location: "New York, NY",
      specialization: "Machine Learning and Artificial Intelligence",
      logoUrl: "/columbia.png",
      start: "2017",
      end: "2019",
    },
    {
      school: "Indian Institute of Technology (IIT)",
      href: "https://iiti.ac.in",
      degree: "Bachelor's Degree of Computer Science and Engineering (B.Tech)",
      location: "Indore, MP",
      specialization: "Algorithms and Data Structures",
      logoUrl: "/iiti.png",
      start: "2013",
      end: "2017",
    },
    {
      school: "Indian Institute of Technology (IIT)",
      href: "https://iiti.ac.in",
      degree: "Minor in Humanities and Social Sciences",
      location: "Indore, MP",
      specialization: "Psychology, Philosophy, and Economics",
      logoUrl: "/iiti.png",
      start: "2013",
      end: "2017",
    },
  ],
  projects: [ // TODO: Add projects
    {
      title: "ABC",
      href: "https://abc.com",
      dates: "Jan 2020 - Feb 2024",
      active: true,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://abc.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://temp.mp4",
    },
    {
      title: "DEF",
      href: "https://DEF.com",
      dates: "May 2024 - Present",
      active: true,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://def.com",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/ameyxd",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://temp.mp4",
    }
  ],
  hackathons: [
    { // TODO: Add more hackathons
      title: "Competition",
      dates: "March 2024",
      location: "Chicago, IL",
      description: "Competition",
      image:
        "/temp.png",
      win: "Winner",
      links: [
        {
          title: "Substack Article",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://substack.com/temp",
        },
        {
          title: "Poster Link",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://lorempixel.com/640/480",
        },
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ameyxd",
        },
      ],
    },
  ],
  patents: [
    {
      title: " Machine Learning Model Operationalization Management Framework for Continuous Updates on IIoT Devices",
      number: "US-63/389,627",
      issuedDate: "2024",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9aWxxbIAAAAJ&citation_for_view=9aWxxbIAAAAJ:UeHWp8X0CEIC",
    },
    {
      title: " Failure Prediction for Run-Life Estimation of ESPs for PHM",
      number: "US-63/358,189 | US20240003242A1",
      issuedDate: "2024",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9aWxxbIAAAAJ&citation_for_view=9aWxxbIAAAAJ:qjMakFHDy7sC",
    },
    {
      title: "Real-Time ESP Smart Alarms Suite Enabled Through Data Analytics and Edge-Based Multiphase Flow Simulator",
      number: "US-63/300,121",
      issuedDate: "2023",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9aWxxbIAAAAJ&citation_for_view=9aWxxbIAAAAJ:W7OEmFMy1HYC",
    },
    {
      title: "Artificial Intelligence-Driven Real-Time Dynamometer Classification for Diagnosis of SRPs",
      number: "US-63/272,999",
      issuedDate: "2023",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9aWxxbIAAAAJ&citation_for_view=9aWxxbIAAAAJ:Y0pCki6q_DkC",
    },
    {
      title: "Wellsite Operations Machine Vision Framework",
      number: "IS23.1285",
      issuedDate: "PP",
      link: "Patent Pending",
    },
    {
      title: "SRP Operations Diagnosis Solutions",
      number: "IS23.1230",
      issuedDate: "PP",
      link: "Patent Pending",
    },
  ],

  publications: [
    {
      title: "Enhancing Edge-Based SRP Production Optimization Algorithm with Fast Loop Mitigation",
      authors: "Ambade, A., et al.",
      journal: "ADIPEC 2024",
      year: "2024",
      link: "https://scholar.google.com/citations?user=9aWxxbIAAAAJ",
    },
    {
      title: "Real-Time Well Constraint Detection Using an Intelligent Surveillance System",
      authors: "Ambade, A., et al.",
      journal: "SPE Canadian Energy Technology Conference",
      year: "2024",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9aWxxbIAAAAJ&citation_for_view=9aWxxbIAAAAJ:IjCSPb-OGe4C",
    },
    {
      title: "Real-time Smart Alarms Suite Enabled Through Data Analytics and Edge-based Virtual Flowmeter",
      authors: "Ambade, A., et al.",
      journal: "SPE ATCE",
      year: "2022",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9aWxxbIAAAAJ&citation_for_view=9aWxxbIAAAAJ:d1gkVwhDpl0C",
    },
    {
      title: "Electrical Submersible Pump Prognostics and Health Monitoring using Machine Learning and NLP",
      authors: "Ambade, A., et al.",
      journal: "SPE Intelligent Oil and Gas Symposium",
      year: "2021",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9aWxxbIAAAAJ&citation_for_view=9aWxxbIAAAAJ:u5HHmVD_uO8C",
    },
  ],

  professionalContributions: [
    {
      role: "Chief Judge",
      event: "International Student Paper Contest",
      conference: "SPE Annual Technical Conference and Exhibition",
      year: 2024,
      location: "New Orleans, LA",
    },
    {
      role: "Proceedings Chair",
      event: "Scientific Computing with Python",
      conference: "SciPy Conference",
      year: 2024,
      location: "Tacoma, WA",
    },
    {
      role: "Senior Technical Advisor",
      event: "Predictive Analytics",
      conference: "Optimalex",
      year: 2024,
      location: "New York, NY",
    },
    {
      role: "Speaker",
      event: "AI In Oil and Gas Conference",
      conference: "Energy Conference Network",
      year: 2024,
      location: "Houston, TX",
    },
    {
      role: "Reviewer",
      event: "Scientific Computing with Python",
      conference: "SciPy Conference",
      year: 2023,
      location: "Austin, TX",
    },
    {
      role: "Acknowledged Contributor",
      event: "Damage to Reputation: A Comparative Analysis of Pecuniary Compensation for Non-Pecuniary Harm",
      conference: "Loyola of Los Angeles International and Comparative Law Review (ILR), Vol. 46, No. 1, 2023",
      year: 2023,
      location: "Los Angeles, CA",
    },
    {
      role: "Acknowledged Contributor",
      event: " Predictive Damages Awards: A Comparative Law & Economics Analysis on Contract Breach Litigation in American Common Law, French Civil Law, and International Commercial Law",
      conference: "St. Thomas Journal for Complex Litigation (JCL) ",
      year: 2023,
      location: "Miami, FL",
    },
    {
      role: "Panelist",
      event: "Dell Dataiku Data Science Connect",
      conference: "",
      year: 2022,
      location: "Houston, TX",
    },
    {
      role: "Speaker",
      event: "Computer Vision through a Magnifying Glass",
      conference: "DataCan",
      year: 2022,
      location: "Online",
    },
  ],

  professionalMemberships: [
    "Member, Association for Computing Machinery (ACM)",
    "Member, Institute of Electrical and Electronics Engineers Computer Society (IEEE-CS)",
    "Member, Institute of Electrical and Electronics Engineers Computational Intelligence Society (IEEE-CIS)",
    "Member, Institute of Electrical and Electronics Engineers Industry Applications Society (IEEE-IAS)",
    "Member, Institute of Electrical and Electronics Engineers Technology and Engineering Management Society (IEEE-TEMS)",
    "Member, Institute of Electrical and Electronics Engineers Educational Activities Board STEM Outreach Committee",
    "Member, IEEE Artificial Intelligence Standards Committee - Generative AI and Foundation Model Subcommittee",
    "Member, IEEE Standard for Artificial Intelligence and Machine Learning (AI/ML) Terminology and Data Formats Working Group",
    "Member, IEEE Social Implications of Technology Standards Committee",
    "Member, IEEE Technology for a Sustainable Climate Community",
    "Member, Society of Petroleum Engineers (SPE)",
  ],

  volunteering: [
    {
      organization: "SciPy Conference",
      role: "Organizing Committee",
      period: "2023 - Present",
      description: "Teaching coding skills to underprivileged youth",
    },
    {
      organization: "OIT",
      role: "Houston Chapter Leadership Team",
      period: "2023 - 2024",
      description: "Building community and fostering professional growth",
    },
    {
      organization: "OIT-University",
      role: "Admissions Team Lead",
      period: "2023",
      description: "Matching DEI-focused students to mentorship opportunities",
    },
    {
      organization: "Columbia University",
      role: "Campus Recruitment Manager",
      period: "2022-Present",
      description: "Recruiting diverse talent for Columbia University",
    },
    {
      organization: "Columbia Alumni Association",
      role: "Houston Chapter Leadership Team",
      period: "2022-Present",
      description: "Building community and fostering professional growth",
    },
    {
      organization: "Houston Humane Society",
      role: "Adoption Coordinator",
      period: "2021 - Present",
      description: "Assisting with animal care and adoption events",
    },
    {
      organization: "YMCA of Greater Houston",
      role: "Volunteer Instructor",
      period: "2020 - Present",
      description: "Teaching coding skills to children and teens",
    },
  ],
  mentoring: [
    {
      organization: "Columbia University",
      role: "Mentor",
      period: "2022 - Present",
      description: "Mentoring undergraduates and graduates in applied ML careers through the CAMP program",
    },
    {
      organization: "OIT",
      role: "Mentor",
      period: "2023 - Present",
      description: "Helping underprivileged LGBTQ+ youth break into the tech industry",
    },
    {
      organization: "SPE",
      role: "Mentor",
      period: "2022 - Present",
      description: "Mentoring undergraduates in AI and ML research",
    },
  ],

  awards: [
    {
      title: "Performed by SLB Award",
      organization: "SLB",
      year: "2024",
    },
    {
      title: "MLOps World Championship",
      organization: "Dataiku",
      year: "2021",
    },
    {
      title: "Performed by SLB Award",
      organization: "SLB",
      year: "2022",
    },
    {
      title: "Petro.AI Hackathon Silver Medal",
      organization: "Petro.AI",
      year: "2021",
    },
    {
      title: "BeOutstanding Award",
      organization: "Schlumberger",
      year: "2020",
    },
  ],

  hobbies: [
    "Weightlifting",
    "Beating Elden Ring DLC Final Boss",
    "Building custom PCs and keyboards",
    "Playing electric guitar",
    "Boxing",
    "Cooking",
    "Digital watercolor painting",
    "Competitive programming",
    "Animal welfare",
  ],
} as const;

