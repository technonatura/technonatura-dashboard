/* eslint-disable react/no-direct-mutation-state */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactCanvasConfetti from "react-canvas-confetti";
import Store, { RootStore } from "@/global/index";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const mapStateToProps = ({ user }: RootStore) => {
  return user;
};
type ReduxType = ReturnType<typeof mapStateToProps>;

type EventState = {
  isAnimationEnabled: boolean;
  animationInstance: any;
  nextTickAnimation: any;
  isPlaying: boolean;
  openDiolog: boolean;
};

class SchoolPride extends React.Component<ReduxType, EventState> {
  state: EventState = {
    isAnimationEnabled: false,
    animationInstance: null,
    nextTickAnimation: {},
    isPlaying: false,
    openDiolog: false,
  };
  constructor(props: any) {
    super(props);
    this.state.isAnimationEnabled = false;
    this.state.animationInstance = null;
    this.nextTickAnimation = this.nextTickAnimation.bind(this);

    Store.subscribe(async () => {
      console.log(this.props);
      if (this.props && this.props.me) {
        const {
          me: { birthDate },
        } = this.props;
        // const birthDate = 1221136012000;
        console.log(birthDate);
        if (
          new Date(birthDate).getDate() === new Date().getDate() &&
          new Date(birthDate).getMonth() === new Date().getMonth()
        ) {
          console.log("asdd");
          setTimeout(() => {
            this.stopAnimation();
            this.setState({ openDiolog: false });
          }, 40000);
          const eventSong = await new Audio(
            "https://res.cloudinary.com/dsg8ufk2s/video/upload/v1631308802/y2mate.com_-_Happy_Birthday_Patty_Hill_Mildred_J_Hill_rqdtvz.mp3"
          );
          eventSong.volume = 0.1;
          document.body.addEventListener("mousemove", () => {
            if (!this.state.isPlaying) {
              this.startAnimation();
              console.log(this.props);

              eventSong.play();
              this.setState({ isPlaying: true });
              this.setState({ openDiolog: true });
            }
          });
        }
      }
    });
  }

  makeShot = (angle: number, originX: number) => {
    this.state.animationInstance &&
      this.state.animationInstance({
        particleCount: 3,
        angle,
        spread: 100,
        origin: { x: originX },
        colors: ["#80ED99", "#57CC99", "#38A3A5"],
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
    // this.startAnimation();
    // setTimeout(() => {
    //   this.stopAnimation();
    // }, 10000);
    // const eventSong = await new Audio(
    //   "https://res.cloudinary.com/dsg8ufk2s/video/upload/v1629170256/Hari_Merdeka_-_Lirik_Lagu_Nasional_Indonesia_imiddg.mp3"
    // );
    // eventSong.volume = 0.1;
    // document.body.addEventListener("mousemove", () => {
    //   if (!this.state.isPlaying) {
    //     eventSong.play();
    //     this.setState({ isPlaying: true });
    //   }
    // });
    // alert("Selamat Hari Kemerdekaan Indonesia Semua!");
  }

  handleClose = () => {
    this.setState({ openDiolog: false });
  };

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
        <Dialog
          open={this.state.openDiolog}
          onClose={this.handleClose}
          fullWidth
        >
          <DialogTitle>
            Happy Birth Day {this.props.me && this.props.me.fullName} !
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Selamat ulang tahun yg ke{" "}
              {this.props.me &&
                Math.floor(
                  (Date.now() - this.props.me.birthDate) /
                    1000 /
                    60 /
                    60 /
                    24 /
                    365
                )}{" "}
              {this.props.me && this.props.me.fullName} !
            </DialogContentText>
            <DialogContentText>بَارَكَ اللَّهُ فِي عُمْرِك</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default connect(mapStateToProps)(SchoolPride);
