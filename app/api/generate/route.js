import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flashcard creator. Your task is to generate concise and effective flashcards based on a given topic or content. Follow these guidelines

1. Give clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single content or piece of information.
4. Use simple language to make flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mneumonics or memory aids to help reinforce the learning.
8. Tailor the difficulty level of the flashcards to user's specific preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim is to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards

Return in the following JSON formats
{
    "flashcards":[
        {
            "front": str,
            "back": str
        }
    ]
}
`
export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages:[
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data},
        ],
        model: 'gpt-4o-mini',
        response_format: {type: 'json_object'},
    })

    const flashcard = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcard.flashcards)
}

