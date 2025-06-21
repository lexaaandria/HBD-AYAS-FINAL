let isWishFinished = false;
let tl;

// Play music and trigger animation on load
window.addEventListener("load", () => {
  const song = document.querySelector(".song");
  song.play().catch(() => {});
  animationTimeline();
});

const animationTimeline = () => {
  const textBoxChars = document.querySelector(".hbd-chatbox");
  const hbd = document.querySelector(".wish-hbd");

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
  hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  tl = new TimelineMax();

  tl.to(".container", 0.6, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.5")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=3")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
.call(() => {
  const btn = document.getElementById("acceptBtn");
  if (btn) btn.style.display = "inline-block"; // tampilkan tombol SEGERA
})
.staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.01)
.to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" }, "+=1") // bisa percepat dari 4 ke 1 detik
.add(() => {
  const btn = document.getElementById("acceptBtn");
  if (btn) {
    btn.style.display = "inline-block";
  }
  isWishFinished = true; // ✅ flag true lebih awal
  tl.pause(); // ✅ tetap pause timeline
})




    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-5", 0.7, {
      rotationX: 15,
      rotationZ: -10,
      skewY: "-5deg",
      y: 50,
      z: 10,
      opacity: 0
    }, "+=1.5")
    .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=1.4")
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
    .staggerFrom(".idea-6 span", 0.8, {
      scale: 3,
      opacity: 0,
      rotation: 15,
      ease: Expo.easeOut
    }, 0.2)
    .staggerTo(".idea-6 span", 0.8, {
      scale: 3,
      opacity: 0,
      rotation: -15,
      ease: Expo.easeOut
    }, 0.2, "+=1.5")
    .staggerFromTo(".baloons img", 2.5, {
      opacity: 0.9,
      y: 1400
    }, {
      opacity: 1,
      y: -1000
    }, 0.2)
    .from(".profile-picture", 0.5, {
      scale: 3.5,
      opacity: 0,
      x: 25,
      y: -25,
      rotationZ: -45
    }, "-=2")
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0
    })
    .staggerFrom(".wish-hbd span", 0.7, {
      opacity: 0,
      y: -50,
      rotation: 150,
      skewX: "30deg",
      ease: Elastic.easeOut.config(1, 0.5)
    }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, {
      scale: 1.4,
      rotationY: 150
    }, {
      scale: 1,
      rotationY: 0,
      color: "#ff69b4",
      ease: Expo.easeOut
    }, 0.1, "party")
    .from(".wish h5", 0.5, {
      opacity: 0,
      y: 10,
      skewX: "-15deg"
    }, "party")
    .staggerTo(".eight svg", 1.5, {
      visibility: "visible",
      opacity: 0,
      scale: 80,
      repeat: 3,
      repeatDelay: 1.4
    }, 0.3)
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1")
    .to(".nine", 0.8, {
      opacity: 0,
      onComplete: () => {
        document.querySelector(".nine").classList.add("hidden");
        document.querySelector(".custom-message").classList.add("show");
      }
    }, "+=2");
};

document.addEventListener("DOMContentLoaded", function () {
  const acceptBtn = document.getElementById("acceptBtn");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      const song = document.querySelector(".song");

      if (!isWishFinished) {
        Swal.fire({
          icon: "warning",
          title: "Eits 😢",
          text: "Baca dulu sampai habis!",
          confirmButtonText: "Maaf, iyaaa 😞"
        });
      } else {
        Swal.fire({
          title: "Thank you!",
          text: "You accepted the wish ❤️",
          icon: "success",
          confirmButtonText: "Next"
        }).then(() => {
          song.play().catch(() => {});
          tl.play();
        });
      }
    }); // ✅ <<< INI YANG KURANG
  }
});
