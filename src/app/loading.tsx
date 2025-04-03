"use client";

import { Box, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function Loading() {
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    const header = document.getElementById("header");
    if (header) {
      setTopOffset(header.offsetHeight);
    }
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        position: "fixed",
        top: `${topOffset}px`,
        left: 0,
        zIndex: 0,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
}
