// src/App.tsx
import React from "react";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const handleToast = () => {
    toast.success("Success! 🎉");
    toast.error("Error! ❌");
    toast("Default toast message");
    toast.loading("Loading...");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">
        Tailwind + DaisyUI + Hot Toast
      </h1>

      {/* DaisyUI Button */}
      <button className="btn btn-primary mb-4" onClick={handleToast}>
        Show Toasts
      </button>

      {/* DaisyUI Card */}
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>
            This card shows Tailwind + DaisyUI styling. Click the button above
            to show React Hot Toast notifications!
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-secondary" onClick={handleToast}>
              Action Toast
            </button>
          </div>
        </div>
      </div>

      {/* React Hot Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
