// components/EnrollModal.tsx
"use client";
import { useState, useEffect } from "react";

export default function EnrollModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const buttons = document.querySelectorAll(".enroll-btn");
    const openModal = (e: any) => {
      const id = e.currentTarget.getAttribute("data-id");
      const input = document.getElementById("courseId") as HTMLInputElement | null;
      if (input) input.value = id;
      setOpen(true);
    };
    buttons.forEach((b) => b.addEventListener("click", openModal));
    return () => buttons.forEach((b) => b.removeEventListener("click", openModal));
  }, []);

  if (!open) return null;
  return (
    <div className="modal" id="enrollModal" style={{ display: "block" }}>
      <div className="modal-content">
        <button onClick={() => setOpen(false)}>Close</button>
        {/* form etc. — you can reuse original HTML */}
      </div>
    </div>
  );
}
