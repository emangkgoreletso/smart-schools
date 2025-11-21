import React from "react";
import HomePage from "./Pages/HomePage";

console.log("✅ HomePage import:", HomePage);

const App: React.FC = () => {
  return (
    <div style={{ padding: 40 }}>
      <h1>Testing HomePage import</h1>
      <HomePage />
    </div>
  );
};

export default App;
