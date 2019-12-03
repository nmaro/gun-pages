import React, { useEffect, useState } from "react";
import { stringify } from "qs";

import MD from "markdown-it";
import WikiLinks from "markdown-it-wikilinks";
import { getPub } from "nicks-gun-utils";

const s = (o, p) => {
  const object = {};
  for (const key of Object.keys(o)) {
    if (o[key]) {
      object[key] = o[key];
    }
  }
  const stringified = stringify(object);
  return stringified ? `${p}${stringified}` : "";
};

export const Page = ({ id, page, priv, epriv }) => {
  const pub = getPub(id);
  const title = page.title || id;
  useEffect(() => {
    document.title = title;
  }, [title]);
  const hash = s({ priv, epriv }, "#");
  const [md, setMd] = useState();
  useEffect(() => {
    const md = MD().use(
      WikiLinks({
        baseURL: `?id=${pub ? `${pub}.` : ""}`,
        uriSuffix: hash,
        makeAllLinksAbsolute: true,
        postProcessPageName: pageName => encodeURIComponent(pageName.trim())
      })
    );
    setMd(md);
  }, [id]);

  if (!md) {
    return <div>Loading...</div>;
  }
  return (
    <div className="page">
      {(!pub || priv) && (
        <a
          className="edit"
          href={`https://gun-preview.nmaro.now.sh?id=${id}${hash}`}
          target="_blank"
        >
          edit
        </a>
      )}
      <h1>{title}</h1>
      <div
        className="markdown"
        dangerouslySetInnerHTML={{
          __html: md.render(page.content || "", {
            sanitize: true
          })
        }}
      />
    </div>
  );
};
