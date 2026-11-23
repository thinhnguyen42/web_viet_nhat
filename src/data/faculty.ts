import facultyJson from "@/content/faculty.json";

export interface FacultyMember {
  name: string;
  nameEn: string;
  nameJa?: string;
  title: string;
  titleEn: string;
  titleJa?: string;
  bio: string;
  bioEn: string;
  bioJa?: string;
  image: string;
  specialization: string;
  specializationEn?: string;
  unit?: string;
  unitEn?: string;
}

export const facultyMembers: FacultyMember[] = facultyJson as FacultyMember[];
