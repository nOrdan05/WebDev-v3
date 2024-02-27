import { animate } from "popmotion";

const ball = document.querySelector(".ball");
animate({
  from: "0px",
  to: "100px",
  repeat: Infinity,
  repeatType: "mirror",
  type: "spring",
  onUpdate(update) {
    ball.style.left = update;
  },
});

/* Old, but still working way to import modules

const popmotion = require("popmotion");
const ball = document.querySelector(".ball");

popmotion.animate({
    from: "0px",
    to: "100px",
    repeat: Infinity,
    repeatType: "mirror",
    type: "spring",
    onUpdate(update) {
        ball.style.left = update;
    }
});

*/