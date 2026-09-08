export type MaterialType = "PDF" | "Video" | "Link" | "Document";

export interface Material {
  id: string;
  title: string;
  description?: string;
  type: MaterialType;
  url: string;
  uploadedAt: string;
  visibleToClasses: string[];
}