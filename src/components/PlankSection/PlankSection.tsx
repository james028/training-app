import React from "react";
import { DateTime } from "luxon";

const PlankSection = () => {
  function foo(values: string[], index: number) {
    return values
      .map((e: string) =>
        e.split(":").reverse()[index]
          ? Number(e.split(":").reverse()[index])
          : 0,
      )
      .reduce((a: any, b: any) => a + b);
  }

  const validate = (time: number) => {
    if (time > 59 || time < 0) {
      throw new Error(
        "Hours, minutes and seconds values have to be between 0 and 59.",
      );
    }
    return time;
  };

  function sumMinutes(values: string[]) {
    const seconds = foo(values, 0);
    let minutes = foo(values, 1);
    let hours = foo(values, 2);

    minutes *= 60;
    hours *= 3600;

    //tu ogarnąć
    console.log(new Date((hours + minutes + seconds) * 1000), "1");
    console.log(
      new Date((hours + minutes + seconds) * 1000).toISOString(),
      "2",
    );
    console.log(
      DateTime.fromISO(String(new Date((hours + minutes + seconds) * 1000))),
      "3",
    );
    console.log(String(new Date((hours + minutes + seconds) * 1000)), "4");
    return new Date((hours + minutes + seconds) * 1000)
      .toISOString()
      .substr(11, 8);
    //return result.split(":").reverse()[2] === "00" ? result.slice(3) : result;
  }

  /* examples */
  const seconds = ["00:03", "00:9"];
  const mins = ["01:20", "1:23"];
  const hours = ["00:03:59", "02:05:02"];
  const mix = ["00:04:58", "10:00"];

  // console.log(sumMinutes(seconds)); //'00:12'
  // console.log(sumMinutes(mins)); //'02:43'
  // console.log(sumMinutes(hours)); //'02:09:00'
  //console.log(sumMinutes(mix)); //'14:58'

  sumMinutes(mix);
  return <div>Plank Section</div>;
};

export default PlankSection;
