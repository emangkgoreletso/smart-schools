import React, { useMemo, useState } from "react";
import TeacherOverview from "./TeacherOverview";
import TeacherMaterials from "./TeacherMaterials";
import TeacherDiscussions from "./TeacherDiscussions";
import TeacherAnnouncements from "./TeacherAnnouncements";
import TeacherClassShell from "./TeacherClassShell";
import TeachersAssessment from "./Assessment/TeachersAssessment";

/* =========================
PROPS
========================= */

interface Props {
  subjectId: string;
  subjectName: string;
  classes: {
    id: string;
    name: string;
  }[];
  onBack: () => void;
}

/* =========================
TABS
========================= */

type Tab =
  | "Overview"
  | "Classes"
  | "Materials"
  | "Assessments"
  | "Discussions"
  | "Announcements";

/* =========================
COMPONENT
========================= */

const SubjectShell: React.FC<Props> = ({
  subjectId,
  subjectName,
  classes,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const [selectedClass, setSelectedClass] = useState<{
    id: string;
    name: string;
  } | null>(null);

  /* =========================
  DERIVED DATA
  ========================= */

  const classNames = useMemo(
    () => classes.map((c) => c.name).join(", "),
    [classes]
  );

  const stats = useMemo(
    () => ({
      totalClasses: classes.length,
      totalStudents: classes.length * 35,
      materialsCount: 12,
      discussionsCount: 6,
    }),
    [classes]
  );

  /* =========================
  LEVEL 3: CLASS SHELL
  ========================= */

  if (selectedClass) {
    return (
      <TeacherClassShell
        subjectId={subjectId}
        classId={selectedClass.id}
        className={selectedClass.name}
        onBack={() => setSelectedClass(null)}
      />
    );
  }

  /* =========================
  UI
  ========================= */

  return (
    <div className="space-y-6">

      {/* BACK */}
      <button
        onClick={onBack}
        className="text-sm text-maroon-700 hover:underline"
      >
        ← Back to Subjects
      </button>

      {/* HEADER */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-maroon-700">
          {subjectName}
        </h2>

        <p className="text-sm text-gray-600">
          Subject ID: {subjectId}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Classes: {classNames}
        </p>
      </div>

      {/* NAVIGATION */}
      <div className="flex flex-wrap gap-3">
        {(
          [
            "Overview",
            "Classes",
            "Materials",
            "Assessments",
            "Discussions",
            "Announcements",
          ] as Tab[]
        ).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full border text-sm transition
              ${
                activeTab === tab
                  ? "bg-maroon-700 text-white border-maroon-700"
                  : "border-maroon-700 text-maroon-700 hover:bg-maroon-50"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="bg-white p-6 rounded-lg shadow">

        {/* =========================
            OVERVIEW
        ========================= */}
        {activeTab === "Overview" && (
          <TeacherOverview
            subjectId={subjectId}
            classes={classes}
            stats={stats}
          />
        )}

        {/* =========================
            CLASSES
        ========================= */}
        {activeTab === "Classes" && (
          <div className="space-y-4">

            <h3 className="font-semibold text-maroon-700">
              Classes studying this subject
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              {classes.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <p className="font-medium text-lg">{c.name}</p>

                  <p className="text-xs text-gray-500">
                    👩‍🎓 ~35 Students
                  </p>

                  <button
                    onClick={() => setSelectedClass(c)}
                    className="mt-3 text-sm bg-maroon-700 text-white px-3 py-1 rounded"
                  >
                    View Class
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================
            MATERIALS
        ========================= */}
        {activeTab === "Materials" && (
          <TeacherMaterials
            subjectId={subjectId}
            classes={classes}
          />
        )}

        {/* =========================
            ASSESSMENTS (FIXED)
        ========================= */}
        {activeTab === "Assessments" && (
          <TeachersAssessment
            subjectId={subjectId}
            classes={classes}
          />
        )}

        {/* =========================
            DISCUSSIONS
        ========================= */}
        {activeTab === "Discussions" && (
          <TeacherDiscussions
            subjectId={subjectId}
            classes={classes}
          />
        )}

        {/* =========================
            ANNOUNCEMENTS
        ========================= */}
        {activeTab === "Announcements" && (
          <TeacherAnnouncements
            subjectId={subjectId}
            classes={classes}
          />
        )}

      </div>
    </div>
  );
};

export default SubjectShell;