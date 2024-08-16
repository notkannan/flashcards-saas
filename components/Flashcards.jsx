import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const FlashcardsList = ({className, flashcards, handleCardClick, flipped, ...props}) => {
  return (
    <>
      <div className={className} {...props}>
        {flashcards.length > 0 && flashcards.map((flashcard, index) => (
          <Card key={index} onClick={() => handleCardClick(index)} className="h-[200px]">
            <CardContent className="h-full p-0" style={{perspective: '1000px'}}>
                <div 
                  className="relative w-full h-full rounded-lg bg-white" 
                  style={{
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  <div 
                    className="absolute w-full h-full flex justify-center items-center p-4 box-border" 
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <p>{flashcard.front}</p>
                  </div>
                  <div 
                    className="absolute w-full h-full flex justify-center items-center p-4 box-border"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <p>{flashcard.back}</p>
                  </div>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default FlashcardsList;