import React, { useRef } from "react";
import { hot } from "react-hot-loader/root";
import { GunPage } from "./components/GunPage";

require("gun/lib/open");

const App = () => {
  const newId = useRef(null);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("page");

  if (!id) {
    return (
      <div className="new-page">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (newId.current.value) {
              window.location.href = `${window.location.origin}?page=${newId.current.value}`;
            }
          }}
        >
          <input ref={newId} placeholder="Page ID e.g. helloworld" />
        </form>
      </div>
    );
  }

  return <GunPage id={id} />;
};

export default hot(App);
