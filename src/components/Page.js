import React, { useEffect } from "react";

import marked from "marked";

export const Page = ({ page }) => {
  useEffect(() => {
    document.title = page.title;
  }, [page.title]);
  return (
    <div className="page">
      <h1>{page.title}</h1>
      <div
        className="markdown"
        dangerouslySetInnerHTML={{
          __html: marked(page.content || "", {
            sanitize: true
          })
        }}
      />
    </div>
  );
};
