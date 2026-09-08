import React, { useMemo, useState } from "react";

/* =========================================
TYPES
========================================= */

type MaterialType = "PDF" | "Video" | "Link" | "Document";

interface ClassRef {
  id: string;
  name: string;
}

interface Material {
  id: string;
  title: string;
  description?: string;
  type: MaterialType;
  url: string;
  uploadedAt: string;

  /* subject-wide but class-visible control */
  visibleToClasses: string[];
}

/* =========================================
PROPS
========================================= */

interface Props {
  subjectId: string;
  classes: ClassRef[];
}

/* =========================================
MOCK DATA
========================================= */

const initialMaterials: Material[] = [
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
    description: "YouTube lesson on solving equations",
    type: "Video",
    url: "#",
    uploadedAt: "2026-04-12",
    visibleToClasses: ["Form 3A"],
  },
];

/* =========================================
COMPONENT
========================================= */

const TeacherMaterials: React.FC<Props> = ({
  subjectId,
  classes,
}) => {
  const [materials, setMaterials] =
    useState<Material[]>(initialMaterials);

  const [search, setSearch] = useState("");

  const [filterType, setFilterType] =
    useState<MaterialType | "All">("All");

  /* =========================================
  CREATE MATERIAL
  ========================================= */

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<MaterialType>("PDF");
  const [url, setUrl] = useState("");

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const toggleClass = (className: string) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((c) => c !== className)
        : [...prev, className]
    );
  };

  const createMaterial = () => {
    if (!title || !url) return;

    const newMaterial: Material = {
      id: Date.now().toString(),
      title,
      description,
      type,
      url,
      uploadedAt: new Date().toISOString().split("T")[0],
      visibleToClasses: selectedClasses.length
        ? selectedClasses
        : classes.map((c) => c.name), // default: all classes
    };

    setMaterials((prev) => [newMaterial, ...prev]);

    setTitle("");
    setDescription("");
    setUrl("");
    setSelectedClasses([]);
  };

  /* =========================================
  FILTERED MATERIALS
  ========================================= */

  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        filterType === "All" || m.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [materials, search, filterType]);

  /* =========================================
  UI
  ========================================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-maroon-700">
          Subject Materials
        </h2>

        <p className="text-sm text-gray-600">
          Manage learning resources shared across all classes
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

      {/* CREATE MATERIAL */}
      <div className="border rounded-lg p-4 space-y-3">

        <h3 className="font-semibold text-maroon-700">
          Upload New Material
        </h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        <input
          placeholder="URL (file or link)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        <div className="flex gap-2 flex-wrap">
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as MaterialType)
            }
            className="border px-3 py-2 rounded"
          >
            <option>PDF</option>
            <option>Video</option>
            <option>Link</option>
            <option>Document</option>
          </select>

          <button
            onClick={createMaterial}
            className="bg-maroon-700 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>

        {/* CLASS VISIBILITY */}
        <div>
          <p className="text-sm font-medium mb-2">
            Visible to classes:
          </p>

          <div className="flex flex-wrap gap-2">
            {classes.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleClass(c.name)}
                className={`px-3 py-1 rounded-full border text-sm ${
                  selectedClasses.includes(c.name)
                    ? "bg-maroon-700 text-white"
                    : "border-maroon-700 text-maroon-700"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MATERIAL LIST */}
      <div className="space-y-3">

        {filteredMaterials.map((m) => (
          <div
            key={m.id}
            className="border rounded-lg p-4 flex justify-between items-start"
          >
            <div>
              <h4 className="font-semibold text-maroon-700">
                {m.title}
              </h4>

              <p className="text-sm text-gray-600">
                {m.description}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Type: {m.type} | Uploaded: {m.uploadedAt}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Visible: {m.visibleToClasses.join(", ")}
              </p>
            </div>

            <a
              href={m.url}
              className="text-sm text-maroon-700 hover:underline"
            >
              Open
            </a>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TeacherMaterials;