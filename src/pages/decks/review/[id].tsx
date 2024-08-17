/** @format */

import UserLayout from "@/components/layout/UserLayout";
import TextToSpeechButton from "@/components/tts/TextToSpeechButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { generateCards } from "@/mock";
import { Cards } from "@/types/Cards";
import {
  BookPlus,
  BookType,
  Check,
  CircleAlert,
  CirclePlus,
  Pencil,
  Redo2,
  Undo2,
} from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DecksReviewTour from "./tour/DecksReviewTour";
import DecksReviewTourButton from "./tour/DecksReviewTour";

const DecksReview: React.FC = () => {
  const router = useRouter();
  const [cards, setCards] = useState<Cards[]>([]);
  const [cardsIndex, setCardIndex] = useState<number>(1);
  const [showCard, setShowCard] = useState<boolean>(false);

  useEffect(() => {
    const cards = generateCards(10);
    setCards(cards);
  }, []);

  const nextCard = () => {
    if (cardsIndex === cards.length) {
      alert("DONE");
      return;
    }
    setCardIndex(cardsIndex + 1);
  };

  const previousCard = () => {
    if (cardsIndex > 1) setCardIndex(cardsIndex - 1);
  };

  const toogleShowAnswerCard = () => {
    setShowCard(!showCard);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") {
        nextCard();
      } else if (e.key === "ArrowLeft") {
        previousCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cardsIndex, cards.length]);

  return (
    <UserLayout>
      <div className="flex flex-col h-full p-5">
        <div className="h-[10%] w-full flex justify-between items-center">
          <div>Deck Japonês</div>
          <div className="flex gap-5">
            <Button className="rounded-3xl border" variant={"ghost"}>
              <Pencil className="mr-2 h-4 w-4" /> Editar Deck
            </Button>
            <Button className="rounded-3xl">
              <CirclePlus className="mr-2 h-4 w-4" /> Add Card
            </Button>
            <DecksReviewTourButton />
          </div>
        </div>

        <div className="flex-grow w-full">
          <Card className="h-full w-full">
            <CardHeader className="h-[10%]">
              <div className="w-full flex justify-between">
                <Button disabled className="step6 rounded-3xl bg-yellow-600">
                  <CircleAlert className="mr-2 h-4 w-4" />
                  <span>Due:</span> <span className="font-bold">3</span>
                </Button>

                {cards.length > 0 && (
                  <TextToSpeechButton
                    className="step2"
                    text={`${cards[cardsIndex - 1].question} ${
                      showCard
                        ? `is the card and the answer is ${
                            cards[cardsIndex - 1].answer
                          }`
                        : ""
                    }`}
                    language="en"
                  />
                )}

                <Button disabled className="step7 rounded-3xl bg-green-800">
                  <BookPlus className="mr-2 h-4 w-4" />
                  <span>New:</span> <span className="font-bold">3</span>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="h-[80%] w-full text-center grid justify-center items-center">
              {cards.length > 0 && (
                <>
                  <span className="step1 text-4xl">
                    {cardsIndex > 0 ? cards[cardsIndex - 1].question : ""}
                  </span>

                  {showCard && cardsIndex > 0 && (
                    <>
                      <Separator className="w-full" />
                      <span className="text-4xl">
                        {cards[cardsIndex - 1].answer}
                      </span>
                    </>
                  )}
                </>
              )}
            </CardContent>

            <CardFooter className="relative h-[10%] w-full flex flex-col gap-2">
              <div className="grid grid-cols-[5%,90%,5%] items-center justify-center w-full">
                <Button
                  onClick={previousCard}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") {
                      previousCard();
                    }
                  }}
                  className="step3"
                  disabled={cardsIndex == 1 ? true : false}
                >
                  <Undo2 className="h-5 w-5" />
                </Button>

                <div className="flex justify-center items-center gap-2">
                  <Button
                    onClick={toogleShowAnswerCard}
                    variant={"ghost"}
                    size="icon"
                    className="step4"
                  >
                    <BookType className="h-5 w-5" />
                  </Button>
                  Card {cardsIndex}/{cards.length}
                </div>

                <Button
                  onClick={nextCard}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "Enter") {
                      nextCard();
                    }
                  }}
                  className="step5"
                >
                  {cardsIndex === cards.length ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Redo2 className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 w-full">
                <Progress
                  value={
                    cards.length > 0 ? (cardsIndex / cards.length) * 100 : 1
                  }
                  rounded
                />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </UserLayout>
  );
};

export default DecksReview;
