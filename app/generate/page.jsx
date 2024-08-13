'use client'

import { useUser } from "@clerk/nextjs"
import { collection } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import TextInput from "../components/TextInput"
import Navbar from "../components/Navbar"

export default function Generate() {

    const {isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        fetch('/api/generate', {
            method: 'POST',
            body: 'text',
        })
        .then((res) => res.json())
        .then(data => setFlashcards(data)) // Possible Syntax Error
        
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashCards = async () => {
        if (!name) {
            alert ('Please enter a name')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            if (collections.find((f) => f.name === name)) {
                alert("Flashcard with the same name already exists")
                return
            }
            else {
                collections.push({name})
                batch.set(userDocRef, {flashcards: collections}, {merge: true})
            }
        }
        else {
            batch.set(userDocRef, {flashcards: [{name}]})
        }
        const colRef = collection (userDocRef, name)
        flashcards.forEach((flashcards) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })
        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }   

  return (
    <div className="w-screen h-screen bg-pink-200">
        <Navbar />
        <div className="w-[80vw] fixed bottom-[3%] left-[10%]">
            <TextInput 
                handleChange={(e) => setText(e.target.value)}
                SubmitContent={handleSubmit}
            />
        </div>
    </div>

  )
}
