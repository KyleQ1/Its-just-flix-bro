import React from "react";
import "./Ratings.css";
import Star from "./Star";

function Ratings(props) {
  const [clicked1, setClicked1] = React.useState(false);
  const [clicked2, setClicked2] = React.useState(false);
  const [clicked3, setClicked3] = React.useState(false);
  const [clicked4, setClicked4] = React.useState(false);
  const [clicked5, setClicked5] = React.useState(false);

  let setClickeds = [
    [clicked1, (bool) => setClicked1(bool)],
    [clicked2, (bool) => setClicked2(bool)],
    [clicked3, (bool) => setClicked3(bool)],
    [clicked4, (bool) => setClicked4(bool)],
    [clicked5, (bool) => setClicked5(bool)],
  ];

  const resetRating = (num) => {
    // What the opposite of the clicked star's state is
    let newVal = !setClickeds[num - 1][0];

    if (!newVal) {
      // Iterates through ALL stars
      for (let i = 0; i < setClickeds.length; i++) {
        setClickeds[i][1](false);
      }

      // At this point
      // The user clicked on a yellow star
      // And now, everything is back to transparent
      // So, if stars 1-4 were clicked,
      //  the stars upto the clicked one should be yellow again
      // If star 5 was clicked,
      //  everything should remain transparent
      if (num !== setClickeds.length) {
        for (let i = 0; i < num; i++) {
          setClickeds[i][1](true);
        }
      }
    } else {
      for (let i = 0; i < num; i++) {
        setClickeds[i][1](newVal);
      }
    }
    props.setRating(num);
  };

  return (
    <div id="rating">
      <button onClick={() => resetRating(1)}>
        <Star clicked={clicked1} />
      </button>
      <button onClick={() => resetRating(2)}>
        <Star clicked={clicked2} />
      </button>
      <button onClick={() => resetRating(3)}>
        <Star clicked={clicked3} />
      </button>
      <button onClick={() => resetRating(4)}>
        <Star clicked={clicked4} />
      </button>
      <button onClick={() => resetRating(5)}>
        <Star clicked={clicked5} />
      </button>
    </div>
  );
}

export default Ratings;
