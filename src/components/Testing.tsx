import React from "react";

const Testing: React.FC = () => {
  return (
    <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'red', borderRadius: '10px'}}>
      <div style={{ position: 'relative', top: "100px", left: "100px" }}>Hello world</div>
    </div>
  );
};

export default Testing;
