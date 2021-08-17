/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import ReactAudioPlayer from "react-audio-player";

type EventState = {
  isAnimationEnabled: boolean;
  animationInstance: any;
  nextTickAnimation: any;
  isPlaying: boolean;
};

export default class SchoolPride extends React.Component<any, EventState> {
  state: EventState = {
    isAnimationEnabled: false,
    animationInstance: null,
    nextTickAnimation: {},
    isPlaying: false,
  };
  constructor(props: any) {
    super(props);
    this.state.isAnimationEnabled = false;
    this.state.animationInstance = null;
    this.nextTickAnimation = this.nextTickAnimation.bind(this);
  }

  makeShot = (angle: number, originX: number) => {
    this.state.animationInstance &&
      this.state.animationInstance({
        particleCount: 3,
        angle,
        spread: 100,
        origin: { x: originX },
        colors: ["#bb0000", "#ffffff"],
      });
  };

  nextTickAnimation = () => {
    this.makeShot(60, 0);
    this.makeShot(120, 1);
    if (this.state.isAnimationEnabled)
      requestAnimationFrame(this.nextTickAnimation);
  };

  startAnimation = () => {
    if (!this.state.isAnimationEnabled) {
      this.state.isAnimationEnabled = true;
      this.nextTickAnimation();
    }
  };

  pauseAnimation = () => {
    this.state.isAnimationEnabled = false;
  };

  stopAnimation = () => {
    this.state.isAnimationEnabled = false;
    this.state.animationInstance && this.state.animationInstance.reset();
  };

  handlerClickStart = () => {
    this.startAnimation();
  };

  handlerClickPause = () => {
    this.pauseAnimation();
  };

  handlerClickStop = () => {
    this.stopAnimation();
  };

  getInstance = (instance: any) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.animationInstance = instance;
  };

  componentWillUnmount() {
    this.state.isAnimationEnabled = false;
  }
  async componentDidMount() {
    this.startAnimation();

    setTimeout(() => {
      this.stopAnimation();
    }, 10000);

    alert("Selamat Hari Kemerdekaan Indonesia Semua!");
    console.log("HAPPY INDONESIAN INDEPENDENCE DAY!");
  }

  render() {
    return (
      <>
        <ReactCanvasConfetti
          refConfetti={this.getInstance}
          style={{
            position: "fixed",
            pointerEvents: "none",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 99999,
          }}
        />
        <ReactAudioPlayer
          src="https://res.cloudinary.com/dsg8ufk2s/video/upload/v1629170256/Hari_Merdeka_-_Lirik_Lagu_Nasional_Indonesia_imiddg.mp3"
          autoPlay
          controls
        />
      </>
    );
  }
}
