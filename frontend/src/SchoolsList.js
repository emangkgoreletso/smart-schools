import { useState, useEffect } from "react";

export default function SchoolList() {
  const [schools, setSchools] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetch("/api/schools")
      .then(res => res.json())
      .then(data => setSchools(data));
  }, []);

  const addSchool = async () => {
    const res = await fetch("/api/schools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, level, location })
    });
    const newSchool = await res.json();
    setSchools([...schools, newSchool]);
    setName(""); setLevel(""); setLocation("");
  };

  const deleteSchool = async (id) => {
    await fetch(`/api/schools/${id}`, { method: "DELETE" });
    setSchools(schools.filter(s => s.id !== id));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-4 text-maroon">Smart School System</h1>

      <div className="mb-6">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="border p-1 mr-2"/>
        <input placeholder="Level" value={level} onChange={e=>setLevel(e.target.value)} className="border p-1 mr-2"/>
        <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} className="border p-1 mr-2"/>
        <button onClick={addSchool} className="bg-maroon text-white px-2 py-1">Add</button>
      </div>

      <table className="w-full border-collapse">
        <thead className="bg-black text-white">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Level</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map(s => (
            <tr key={s.id} className="bg-white text-black">
              <td className="border p-2">{s.id}</td>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.level}</td>
              <td className="border p-2">{s.location}</td>
              <td className="border p-2">
                <button onClick={()=>deleteSchool(s.id)} className="bg-red-600 text-white px-2 py-1 mr-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
