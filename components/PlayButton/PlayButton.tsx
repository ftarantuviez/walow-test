import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import React, { FC, useState } from "react";
import styles from "./PlayButton.module.css";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

interface PlayButtonProps {
  onClick?: React.MouseEventHandler;
  started?: boolean;
}

const PlayButton: FC<PlayButtonProps> = (props) => {
  const { onClick, started } = props;
  const [mouseStatus, setMouseStatus] = useState({
    leaving: false,
    entering: false,
  });
  const handleMouseStatus = (type) => () => {
    if (type === "enter") {
      setMouseStatus({ leaving: false, entering: true });
    } else if (type === "over") {
      setMouseStatus({ leaving: false, entering: true });
    } else {
      setMouseStatus({ entering: false, leaving: true });
    }
  };
  return (
    <button
      className={cx(
        "container",
        mouseStatus.leaving && "mouse-leaving",
        mouseStatus.entering && "mouse-entering"
      )}
      onMouseLeave={handleMouseStatus("leave")}
      onMouseEnter={handleMouseStatus("enter")}
      onMouseOver={handleMouseStatus("over")}
      onClick={onClick}
    >
      {started ? <PauseOutlined /> : <CaretRightOutlined />}
    </button>
  );
};

export default PlayButton;
