/** @format */

import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";
import React, { useState, useRef } from "react";
import Joyride, { CallBackProps } from "react-joyride";

const steps = [
  {
    target: ".step1",
    content: "Essa é o texto do card",
    disableBeacon: true,
  },
  {
    target: ".step2",
    content: "Clique para ouvir o texto do card.",
    disableBeacon: true,
  },
  {
    target: ".step3",
    content: "Clique para voltar ao card anterior.",
    disableBeacon: true,
  },
  {
    target: ".step4",
    content: "Clique para ver a resposta do card.",
    disableBeacon: true,
  },
  {
    target: ".step5",
    content: "Clique para ir ao próximo do card.",
    disableBeacon: true,
  },
  {
    target: ".step6",
    content: "Quantidade de cards pendentes para memorizar.",
    disableBeacon: true,
  },
  {
    target: ".step7",
    content: "Quantidade de cards novos não memorizados.",
    disableBeacon: true,
  },
];

const DecksReviewTourButton = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const joyrideRef = useRef<any>(null);

  const handleClick = () => {
    if (!isTourOpen) {
      setIsTourOpen(true);
    }
  };

  const handleTourEnd = (data: CallBackProps) => {
    if (data.status === "finished" || data.status === "skipped") {
      setIsTourOpen(false);
    }
  };

  return (
    <>
      <Button onClick={handleClick} className="rounded-3xl">
        <CircleHelp className="h-4 w-4" />
      </Button>
      {isTourOpen && (
        <div hidden>
          <Joyride
            ref={joyrideRef}
            steps={steps}
            continuous
            showSkipButton
            scrollToFirstStep
            callback={handleTourEnd}
          />
        </div>
      )}
    </>
  );
};

export default DecksReviewTourButton;
