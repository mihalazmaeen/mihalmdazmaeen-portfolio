import React from "react";

function Loader() {
  return (
    <div className="h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]">
      <div className="flex gap-5 text-6xl font-semibold sm:text-3xl">
        <h1 className="m" style={{ color: "#48a1d4" }}>
          M
        </h1>
        <h1 className="d" style={{ color: "#118bd1" }}>
          M
        </h1>
        <h1 className="a" style={{ color: "#48a1d4" }}>
          A
        </h1>
      </div>
    </div>
  );
}

export default Loader;
