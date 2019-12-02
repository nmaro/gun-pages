import { Page } from "./Page";
import React, { useState, useEffect } from "react";
import { useGun, getPub, getId } from "nicks-gun-utils";

const Gun = require("gun/gun");
require("gun/sea");

export const GunPage = ({ id, priv, epriv }) => {
  const [gun, setGun] = useState(null);
  const pub = getPub(id);
  const pair = pub && priv && { pub, priv, epriv };
  const [data, onData] = useGun(Gun, useState, pair);

  useEffect(() => {
    const gun = Gun({
      peers: ["https://gunjs.herokuapp.com/gun"]
    });
    gun.get(id).on(onData);
    setGun(gun);
  }, []);

  if (!gun) {
    return <div>Loading...</div>;
  }

  const page = { ...data[id] };

  return <Page getId={getId} page={page} />;
};
