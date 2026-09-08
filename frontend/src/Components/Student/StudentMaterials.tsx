import React, { useMemo, useState } from "react";

/* =========================================
TYPES
========================================= */

type MaterialType = "PDF" | "Video" | "Link" | "Document";

interface Material {
  id: string;
  title: string;
  description?: string;
  type: MaterialType;
  url: string;
  uploadedAt: string;
  visibleToClasses: string[];
}

interface Props {
  subjectId: string;
  studentClass: string;
}

/* =========================================
MOCK MATERIALS
(Will come from backend later)
========================================= */

const materialsFromTeacher: Material[] = [
  {
    id: "m1",
    title: "Introduction to Algebra Notes",
    description: "Basic algebra concepts and formulas",
    type: "PDF",
    url: "#",
    uploadedAt: "2026-04-10",
    visibleToClasses: ["Form 3A", "Form 3B"],
  },
  {
    id: "m2",
    title: "Linear Equations Video",
    description: "Lesson explaining equation solving",
    type: "Video",
    url: "#",
    uploadedAt: "2026-04-12",
    visibleToClasses: ["Form 3A"],
  },
];

/* =========================================
COMPONENT
========================================= */

const StudentMaterials: React.FC<Props> = ({
  subjectId,
  studentClass,
}) => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] =
    useState<MaterialType | "All">("All");

  /* =========================================
  FILTER MATERIALS
  ========================================= */

  const visibleMaterials = useMemo(() => {
    return materialsFromTeacher
      .filter((m) =>
        m.visibleToClasses.includes(studentClass)
      )
      .filter((m) => {
        const matchesSearch =
          m.title.toLowerCase().includes(search.toLowerCase());

        const matchesType =
          filterType === "All" || m.type === filterType;

        return matchesSearch && matchesType;
      });
  }, [search, filterType, studentClass]);

  /* =========================================
  HELPERS
  ========================================= */

  const getIcon = (type: MaterialType) => {
    switch (type) {
      case "PDF":
        return "📄";
      case "Video":
        return "🎥";
      case "Document":
        return "📝";
      case "Link":
        return "🔗";
      default:
        return "📁";
    }
  };

  const getActionText = (type: MaterialType) => {
    switch (type) {
      case "PDF":
      case "Document":
        return "Download";
      case "Video":
        return "Watch";
      case "Link":
        return "Open";
      default:
        return "Open";
    }
  };

  /* =========================================
  UI
  ========================================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          Learning Materials
        </h2>

        <p className="text-sm text-gray-600">
          Resources shared by your teacher
        </p>
      </div>

      {/* SEARCH + FILTER */}

      <div className="flex flex-wrap gap-3">

        <input
          placeholder="Search materials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as any)
          }
          className="border px-3 py-2 rounded"
        >
          <option value="All">All</option>
          <option value="PDF">PDF</option>
          <option value="Video">Video</option>
          <option value="Link">Link</option>
          <option value="Document">Document</option>
        </select>

      </div>

      {/* MATERIAL LIST */}

      <div className="space-y-3">

        {visibleMaterials.length === 0 && (
          <p className="text-gray-500 text-sm">
            No materials available for your class.
          </p>
        )}

        {visibleMaterials.map((m) => (
          <div
            key={m.id}
            className="border rounded-lg p-4 flex justify-between items-start"
          >
            <div>

              <h4 className="font-semibold text-maroon-700">
                {getIcon(m.type)} {m.title}
              </h4>

              <p className="text-sm text-gray-600">
                {m.description}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Type: {m.type} | Uploaded: {m.uploadedAt}
              </p>

            </div>

            {/* ACTION BUTTON */}

            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              download={m.type !== "Video" && m.type !== "Link"}
              className="text-sm text-maroon-700 hover:underline"
            >
              {getActionText(m.type)}
            </a>

          </div>
        ))}

      </div>

    </div>
  );
};

export default StudentMaterials;