'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { useState } from "react"
import Navbar from "../../components/Navbar"

import { useSearchParams } from "next/navigation"
import FlashcardsList from "../../components/Flashcards"
import SmallFooter from "@/components/Footer"
import Redirect from "@/components/Redirect"

export default function Flashcard() {
    const {isLoaded, isSignedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([])

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if(!search || !user) return

            const colRef = collection(doc(collection(db,'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []

            docs.forEach((doc) => {
                flashcards.push({id: doc.id, ...doc.data()})
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    if (!isLoaded || !isSignedIn){
        return <>
        <Redirect />
        </>
    }
    return (
        <><div className="h-screen bg-background">
            <Navbar />
            <FlashcardsList
                flashcards={flashcards}
                flipped={flipped}
                handleCardClick={handleCardClick}
                className="p-4 pt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-max" />
        </div><SmallFooter /></>
    )
}