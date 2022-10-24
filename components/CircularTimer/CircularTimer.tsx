import React, { FC } from "react";
import MiddleCircularTimer from "../../public/icons/MiddleCircularTimer";
import styles from "./CircularTimer.module.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularTimerProps {
  percentage: number;
  isPlaying?: boolean;
}
const CircularTimer: FC<CircularTimerProps> = (props) => {
  const { percentage, isPlaying } = props;
  const progressBarStyles = buildStyles({
    rotation: 0.25,
    strokeLinecap: "round",
    pathTransitionDuration: 0.5,
    pathColor: `rgba(192,187,227, 1)`,
    trailColor: "#7f7e9a",
  });
  return (
    <div className={styles.container}>
      <CircularProgressbar
        value={percentage}
        styles={progressBarStyles}
        strokeWidth={2}
      />
      <div className={styles.secondCercle}>
        <div className={styles.thirdCercle}>
          <MiddleCircularTimer active={isPlaying} />
        </div>
      </div>
    </div>
  );
};

export default CircularTimer;
