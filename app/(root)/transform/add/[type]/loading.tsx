import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center mt-10">
      <CircularProgress />
    </div>
  );
}

export default Loading;
