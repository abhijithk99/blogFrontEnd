import React, { useRef, useState } from "react";

import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";

export default function RichTextField({ setValues }: any) {
  const editor = useRef<any>(null);
  // const [values, setValues] = useState<any>("");
  const { quill, quillRef } = useQuill();

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
      
        setValues(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div className="w-[100%] h-80">
      <div ref={quillRef} />
      {/* //<div>{values}</div> */}
    </div>
  );
}
