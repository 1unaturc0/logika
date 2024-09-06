import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaSignOutAlt } from "react-icons/fa";
import { useActions } from "#/hooks/useActions";
import ModalWindow from "#/components/modal_window/ModalWindow";
import styles from "./ReturnButton.module.css";

const ReturnButton = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const { t } = useTranslation();
  const currentTab = useSelector((state) => state.tab.currentTab);
  const { changeTab } = useActions();

  const onClick = () => {
    if (currentTab === "game") setIsModalShown(true);
    else changeTab("main");
  };

  const onConfirmButtonClick = () => {
    setIsModalShown(false);
    changeTab("main");
  };

  const onDeclineButtonClick = () => setIsModalShown(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClick();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <button onClick={onClick} className={styles.returnBtn}>
      <FaSignOutAlt />
      {isModalShown && (
        <ModalWindow
          text={t("modalWindow.confirmReturn")}
          onConfirmButtonClick={onConfirmButtonClick}
          onDeclineButtonClick={onDeclineButtonClick}
        />
      )}
    </button>
  );
};

export default ReturnButton;
