import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const initialData = {
  organizations: [
    {
      id: "org-1",
      name: "Rajashree (MD)",
      description: "Managing Director",
      location: "India",
      established: "2020",
      employees: 150,
      imageUrl: "https://th.bing.com/th/id/OIP.MUVTf7Rn2k0E0W4yO__A6wHaHa?r=0&rs=1&pid=ImgDetMain",
    },
  ],
  teams: [
    {
      id: "team-1",
      name: "US-FS-INS-TRVLR-01",
      description: "Frontend development and user experience",
      lead: "",
      focus: "User Interface",
      organizationId: "org-1",
    },
    {
      id: "team-2",
      name: "US-FS-INS-TRVLR-02",
      description: "Backend infrastructure and APIs",
      lead: "",
      focus: "Backend Systems",
      organizationId: "org-1",
    },
    {
      id: "team-3",
      name: "US-FS-INS-TRVLR-03",
      description: "Data analytics and machine learning",
      lead: "",
      focus: "Data Science",
      organizationId: "org-1",
    },
    {
      id: "team-4",
      name: "US-FS-INS-TRVLR-04",
      description: "Data analytics and machine learning",
      lead: "",
      focus: "Data Science",
      organizationId: "org-1",
    },
    {
      id: "team-5",
      name: "US-FS-INS-TRVLR-05",
      description: "Data analytics and machine learning",
      lead: "",
      focus: "Data Science",
      organizationId: "org-1",
    },
    {
      id: "team-6",
      name: "Project Management Office",
      description: "Data analytics and machine learning",
      lead: "",
      focus: "Data Science",
      organizationId: "org-1",
    },
  ],
  circles: [
    {
      id: "circle-1",
      name: "Jitender Kapoor (AD)",
      purpose:
        "Supporting client's complete end-to-end application development and maintenance activities",
      responsibilities: ["Frontend Development", "User Experience Design", "Accessibility Compliance"],
      teamId: "team-1",
      imageUrl: "https://th.bing.com/th/id/OIP.2S1xLtta6ORdxtlYpiACIgAAAA?rs=1&pid=ImgDetMain",
    },
    {
      id: "circle-2",
      name: "Rajesh Karanmsetty (SM)",
      purpose:
        "Trusted partner in handling and managing Guidewire business activites",
      responsibilities: ["Guidewire Integration", "API Management", "Data Migration"],
      teamId: "team-2",
       imageUrl: "https://th.bing.com/th/id/OIP.2S1xLtta6ORdxtlYpiACIgAAAA?rs=1&pid=ImgDetMain",
    },
    {
      id: "circle-3",
      name: "Ranjit (MD)",
      purpose:
        "Trusted partner in handling and managing Guidewire business activites",
      responsibilities: ["Guidewire Integration", "API Management", "Data Migration"],
      teamId: "team-3",
       imageUrl: "https://th.bing.com/th/id/OIP.2S1xLtta6ORdxtlYpiACIgAAAA?rs=1&pid=ImgDetMain",
    },
    {
      id: "circle-4",
      name: "Sridhar Murugrajan(AD)",
      purpose:
        "Trusted partner in handling and managing Guidewire business activites",
      responsibilities: ["Guidewire Integration", "API Management", "Data Migration"],
      teamId: "team-4",
       imageUrl: "https://th.bing.com/th/id/OIP.2S1xLtta6ORdxtlYpiACIgAAAA?rs=1&pid=ImgDetMain",
    },
    {
      id: "circle-5",
      name: "Girish Kulkarni (AD)",
      purpose: "Backend API development and maintenance",
      responsibilities: ["REST APIs", "GraphQL", "Database Design"],
      teamId: "team-5",
       imageUrl: "https://th.bing.com/th/id/OIP.2S1xLtta6ORdxtlYpiACIgAAAA?rs=1&pid=ImgDetMain",
    },
    {
      id: "circle-6",
      name: "Sumit Bose",
      purpose: "Project management and coordination",
      responsibilities: ["Project Planning", "Resource Allocation", "Risk Management"],
      teamId: "team-6",
       imageUrl: "https://th.bing.com/th/id/OIP.2S1xLtta6ORdxtlYpiACIgAAAA?rs=1&pid=ImgDetMain",
    },
  ],
  people: [
    {
      id: "person-1",
      name: "Alex Thompson",
      role: "Senior UX Designer",
      email: "alex.thompson@company.com",
      department: "Design",
      circleId: "circle-1",
      imageUrl: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
    },
    {
      id: "person-2",
      name: "Jordan Kim",
      role: "Frontend Developer",
      email: "jordan.kim@company.com",
      department: "Engineering",
      circleId: "circle-2",
      imageUrl: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
    },
    {
      id: "person-3",
      name: "Sam Wilson",
      role: "Backend Engineer",
      email: "sam.wilson@company.com",
      department: "Engineering",
      circleId: "circle-3",
      imageUrl: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
    },
    {
      id: "person-4",
      name: "Casey Davis",
      role: "Product Designer",
      email: "casey.davis@company.com",
      department: "Design",
      circleId: "circle-1",
      imageUrl: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
    },
  ],
};