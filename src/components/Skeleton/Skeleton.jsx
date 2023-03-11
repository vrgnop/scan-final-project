import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={600}
    height={835}
    viewBox="0 0 600 860"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="57" rx="10" ry="10" width="570" height="380" />
    <rect x="5" y="25" rx="0" ry="0" width="569" height="14" />
    <rect x="5" y="4" rx="0" ry="0" width="71" height="12" />
    <rect x="100" y="5" rx="0" ry="0" width="77" height="12" />
    <rect x="5" y="460" rx="0" ry="0" width="570" height="12" />
    <rect x="5" y="490" rx="0" ry="0" width="490" height="12" />
    <rect x="5" y="520" rx="0" ry="0" width="470" height="12" />
    <rect x="5" y="550" rx="0" ry="0" width="570" height="12" />
    <rect x="5" y="580" rx="0" ry="0" width="300" height="12" />
    <rect x="5" y="610" rx="0" ry="0" width="570" height="12" />
    <rect x="5" y="640" rx="0" ry="0" width="570" height="12" />
    <rect x="5" y="670" rx="0" ry="0" width="390" height="12" />
    <rect x="5" y="700" rx="0" ry="0" width="495" height="12" />
    <rect x="5" y="750" rx="0" ry="0" width="280" height="55" />
    <rect x="470" y="770" rx="0" ry="0" width="100" height="12" />
  </ContentLoader>
);

export default Skeleton;
