'use client'

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { db } from "@/firebase"
import TextInput from "../../components/TextInput"
import Navbar from "../../components/Navbar"
import { doc, getDoc, writeBatch } from 'firebase/firestore'
import { collection } from "firebase/firestore"
import { CardStack } from "../../components/ui/CardStack"
import { cn } from "@/lib/utils"
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material'
import FlashcardsList from "../../components/Flashcards"

export default function Generate() {

    const {isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const style = {
        "& label.Mui-focused": {
          color: "orange"
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "orange"
          }
        }
      }

    const Highlight = ({
        children,
        className,
      }) => {
        return (
          <span
            className={cn(
              "font-bold bg-orange-100 text-orange-700 dark:bg-orange-700/[0.2] dark:text-orange-500 px-1 py-0.5",
              className
            )}
          >
            {children}
          </span>
        );
      };
       
      const CARDS = [
        {
          id: 0,
          name: "Flix Bot 🧠",
          designation: "Your AI Assistant",
          content: (
            <p>
              Let&apos;s get started! Enter the <Highlight>prompt below</Highlight> and get your flashcards in a moment ⚡️
            </p>
          ),
        },
        {
          id: 1,
          name: "Kaushik Manivannan",
          designation: "Former Software Developer @ TCS",
          content: (
            <p>
              I use these cards all the time, they are a lifesaver! <Highlight>Flashcards</Highlight> are the real deal man.
            </p>
          ),
        },
        {
          id: 2,
          name: "Kannan Karthikeyan",
          designation: "Developer of Card Flix",
          content: (
            <p>
              Enjoy creating flashcards using <Highlight>Card Flix</Highlight>! Ace your studies people 😇
            </p>
          ),
        },
    ]

    const handleSubmit = async () => {
        fetch('/api/generate', {
            method: 'POST',
            body: text,
        })
        .then((res) => res.json())
        .then((data) => {
            setFlashcards(data);
            console.log(flashcards);
        }) // Possible Syntax Error     
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
        console.log(text)
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

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

    const saveFlashcards = async () => {
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
            batch.set(cardDocRef, flashcards)
        })
        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }   

  return (
    <div className="w-screen h-screen bg-background">
        <Navbar />
        <Typography
            variant='h1' 
            sx={{ 
                textAlign: 'center',
                pt: 2, // Margin-bottom to add space below the heading
                fontSize: '2.5rem', // Adjust font size as needed
                color: '#333333', // Dark gray for readability
                fontWeight: 'bold'
            }}
        >Send in a prompt to get started.</Typography>
        {/* <input type="text" id="textInput" placeholder="Enter your text here" value={text} onChange={(e)=> setText(e.target.value)} />
        <button type="button" onClick={handleSubmit}>Submit</button> */}
        {flashcards.length == 0 && 
            <div className="h-[400px] flex justify-center items-center">
                <CardStack items={CARDS} />
            </div>           
        }
        <FlashcardsList
          flashcards={flashcards}
          flipped={flipped}
          handleCardClick={handleCardClick}
          className="p-4 pt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-max" 
        />
        
        {flashcards.length > 0 && <Box sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" sx={{bgcolor:'#F97316', borderRadius: '12px', '&:hover': {bgcolor: '#EA580C'}}} onClick={handleOpen}>
            Save
          </Button>
        </Box>}

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Save Flashcards</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter a name for your flashcards collection
                </DialogContentText>
                <TextField
                    sx={style}            
                    autofocus 
                    margin='dense' 
                    label='Collection Name' 
                    type='text'
                    fullWidth
                    value={name}
                    onChange={handleNameChange} 
                    variant='outlined' />
            </DialogContent>
            <DialogActions>
                <Button sx={{color:'#F97316', borderRadius: '12px', '&:hover': {bgcolor: '#FFEDD5'}}} onClick={handleClose}>Cancel</Button>
                <Button sx={{color:'#F97316', borderRadius: '12px', '&:hover': {bgcolor: '#FFEDD5'}}} onClick={saveFlashcards}>Save</Button>
            </DialogActions>
        </Dialog>
        <div className="w-[80vw] fixed bottom-[3%] left-[10%]">
            {/* <Flashcards
                flashcards={flashcards}
                flipped={flipped}
                name={name}
                handleCardClick={handleCardClick}
                handleNameChange={handleNameChange}
                handleOpen={handleOpen}
                handleClose={handleClose}
                saveFlashCards={saveFlashCards}
            /> */}
            
            <TextInput 
                content={text}
                handleChange={handleTextChange}
                submitContent={handleSubmit}
            />
        </div>
    </div>

  )
}


