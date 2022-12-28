import React, { useRef, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../../components/RichTextField"), {
  ssr: false,
});

export default function index() {
  const editor = useRef<any>(null);
  const [values, setValues] = useState<any>("");
  const [title, setTitle] = useState<any>();
  const [author, setAuthor] = useState<any>();
  // const [data, setData] = useState<any>({
  //   title: { title },
  //   author: author,
  //   id: "",
  // });

  // function handle(e: any) {
  //   const newdata = { ...data };
  //   //newdata[e.target.id] = e.target.value;
  //   setData(newdata);
  //   console.log(newdata);
  // }

  function onsubmit(e: any) {
    e.preventDefault();
      axios.post(
            "http://localhost:3002/blog/",
            { title: title, author: author,content:values}
        )
        .then((res) => console.log("success, dictionary sent,", res))
        .catch((err) => {
            console.log(err.response);
        });
  }

  return (
    <div className="bg-slate-200 w-[100%] h-screen flex justify-center items-center">
      <div className=" w-[90%]  h-[90%]  bg-slate-100 ">
        <form className="m-5 justify-center">
          <div className="mt-[5%]">
            <TextField
              required
              id="title"
              label="Title"
              className="w-[100%]"
              onChange={(e: any) => {
                setTitle(e.target.value);
                //setData({ title: e.target.value });
               // handle(e.target.value);
              }}
              value={title}
              //value={data.title}
            />
          </div>
          <div className="mt-3">
            <TextField
              required
              id="author"
              label="Author"
              className="w-[100%]"
              onChange={(e: any) => {
                setAuthor(e.target.value);
                //setData({ author: e.target.value });
                //handle(e.target.value);
              }}
              value={author}
              //value={data.author}
            />
          </div>
          <div className="mt-3 w-[100%]">
            <Editor setValues={setValues} />
          </div>
          <div className="pt-16 pl-5">
            <Button variant="outlined" size="medium"  onClick={(e: any) => onsubmit(e)}>
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
