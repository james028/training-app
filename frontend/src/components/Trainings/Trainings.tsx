// import React, { useEffect } from "react";
// import Calendar from "../Calendar/Calendar";
// import Charts from "../Charts/Charts";
// import PlankSection from "../PlankSection/PlankSection";
// import TrainingsType from "../TrainingsType/TrainingsType";
// import { useAppContext } from "../../appContext/appContext";
// import { useLoaderData } from "react-router-dom";
//
// const Trainings = () => {
//   //const { setLinkUrl } = useAppContext();
//   const link = useLoaderData() as string; // link z loadera
//   console.log(link, "link");
//
//   const { linkUrl, setLinkUrl } = useAppContext();
//
//   useEffect(() => {
//     if (linkUrl !== link) {
//       setLinkUrl(link);
//     }
//   }, [link, linkUrl, setLinkUrl]);
//
//   console.log("Trainings Component loaded");
//
//   return (
//     <React.Fragment>
//       <div className="antialiased sans-serif bg-gray-100">
//         {/*<Calendar />*/}
//       </div>
//       {/*<div className="container mx-auto px-4 py-2 md:py-12">*/}
//       {/*  <Charts />*/}
//       {/*</div>*/}
//       <div className="container mx-auto px-4 py-2 md:py-12">
//         {/*<TrainingsType />*/}
//       </div>
//       <div className="container mx-auto px-4 py-2 md:py-12">
//         <PlankSection />
//       </div>
//     </React.Fragment>
//   );
// };
//
// export default Trainings;

import { useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAppContext } from "../../appContext/appContext";
import PlankSection from "../PlankSection/PlankSection";
import Calendar from "../Calendar/Calendar";

const Trainings = () => {
  const { linkUrl, setLinkUrl } = useAppContext();
  //const { link } = useLoaderData() as { link: string };

  const didMount = useRef(false);

  useEffect(() => {
    //if (!didMount.current) {
    //setLinkUrl("aa");
    //didMount.current = true;
    //}
  }, [linkUrl, setLinkUrl]);

  console.log("mounted");

  return (
    <div>
      Trainings with API:
      <PlankSection />
    </div>
  );
};

export default Trainings;
