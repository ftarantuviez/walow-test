import { ClockCircleOutlined, LeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Button from "../components/Button/Button";
import CircularTimer from "../components/CircularTimer/CircularTimer";
import PlayButton from "../components/PlayButton";
import styles from "../styles/Home.module.css";

const BUTTONS_DATA = [
  {
    timeAmount: 60,
    id: "1",
  },
  {
    timeAmount: 120,
    id: "2",
  },
  {
    timeAmount: 180,
    id: "3",
  },
];

const todayDate = Date.now(); // selectedTime.timeAmount * 1000;
export default function Home() {
  const [selectedTime, setSelectedTime] = useState(BUTTONS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathingStatus, setBreathingStatus] = useState({
    inhaling: false,
    exhaling: false,
  });
  const [percentage, setPercentage] = useState(100);
  const [date, setDate] = useState(todayDate);
  let countdownApi = null;

  const onChangeTimeAmount = (id) => () => {
    setSelectedTime(BUTTONS_DATA.find((button) => button.id === id));
    setDate(Date.now());
    handlePlay("change-time");
    setPercentage(100);
  };

  const handlePlay = (type) => {
    let inhaling = true;
    const updatePlaying = !isPlaying;
    if (type === "change-time") {
      inhaling = false;
      updatePlaying = false;
    }

    if (!breathingStatus.exhaling) {
      setBreathingStatus({
        inhaling: inhaling,
        exhaling: false,
      });
    }

    if (type === "change-time" || isPlaying) {
      countdownApi.pause();
    } else {
      countdownApi.start();
    }
    setIsPlaying(updatePlaying);
  };

  const getText = () => {
    if (!isPlaying) return "";

    if (breathingStatus.inhaling) return "Inhaling";
    if (breathingStatus.exhaling) return "Exhaling";
  };
  const setRef = (countdown) => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  const onTickTimer = (timeControll) => {
    const { seconds } = timeControll;
    const secondsModuleOfTen = seconds % 10;
    setPercentage(secondsModuleOfTen * 10);
    if (seconds % 5 === 0) {
      setBreathingStatus({
        inhaling: !breathingStatus.inhaling,
        exhaling: !breathingStatus.exhaling,
      });
    }
  };

  const onCompleteCountdown = () => {
    setDate(Date.now());
    setPercentage(100);
    handlePlay("change-time");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <h2 className={styles.title}>Breath & Relax</h2>
          <h4 className={styles.subtitle}>{getText()}</h4>
        </div>
        <CircularTimer isPlaying={isPlaying} percentage={percentage} />
        <div className={styles.actionsContainer}>
          <Countdown
            key={date}
            ref={setRef}
            date={date + selectedTime.timeAmount * 1000}
            onTick={onTickTimer}
            autoStart={false}
            onComplete={onCompleteCountdown}
            className={styles.countdown}
          />
          <PlayButton onClick={handlePlay} started={isPlaying} />
          <div className={styles.timeSelectContainer}>
            {BUTTONS_DATA.map((button) => (
              <Button
                key={button.id}
                active={selectedTime.id === button.id}
                className={[styles.buttonTimeSelect]}
                onClick={onChangeTimeAmount(button.id)}
              >
                <ClockCircleOutlined className={styles.clockIcon} />
                {button.timeAmount / 60} min
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
