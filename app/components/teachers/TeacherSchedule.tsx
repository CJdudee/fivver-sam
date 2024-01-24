"use client";

import { Switch } from "@headlessui/react";
import React, { useState } from "react";

export default function TeacherSchedule() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="h-full">
      <p className="text-center">Schedule</p>
      <div className="flex justify-center">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-indigo-500" : "bg-gray-200"
          } 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 `}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? "translate-x-5" : "translate-x-0"}
                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>

      <div>
        
      </div>
    </div>
  );
}
