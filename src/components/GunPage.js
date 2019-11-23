import { Page } from "./Page";
import React, { useState, useEffect } from "react";

const Gun = require("gun/gun");

const getId = element => element && element["_"]["#"];

const useRerender = () => {
  const [, setRender] = useState({});
  const rerender = () => setRender({});
  return rerender;
};

export const GunPage = ({ id }) => {
  const [gun, setGun] = useState(null);
  const rerender = useRerender();

  useEffect(() => {
    const gun = Gun({
      peers: ["https://gunjs.herokuapp.com/gun"]
    });
    setGun(gun);
  }, []);

  useEffect(() => {
    if (gun) {
      gun.get(id).on(rerender);
    }
  }, [gun]);

  if (!gun) {
    return <div>Loading...</div>;
  }

  const data = gun._.graph;
  const page = { ...data[id] };

  return <Page getId={getId} page={page} />;
};
