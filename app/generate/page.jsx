'use client'

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { db } from "@/firebase"
import TextInput from "../../components/TextInput"
import Navbar from "../../components/Navbar"
import Flashcards from "../../components/Flashcards"
import { doc, setDoc, getDoc, writeBatch } from 'firebase/firestore'
import { collection } from "firebase/firestore"
import { CardStack } from "../../components/ui/CardStack"
import { cn } from "@/lib/utils"
import { Grid, Box, Card, CardActionArea, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material'

export default function Generate() {

    const {isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

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
        console.log('clicked')
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
    <div className="w-screen h-screen bg-slate-100">
        <Navbar />
        <Typography
            variant='h1' 
            sx={{ 
                textAlign: 'center',
                pt: 15, // Margin-bottom to add space below the heading
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
        {flashcards.length > 0 && (
            <Box sx={{mt:4, height:'100vh', bgcolor: '#F1F5F9'}}>
                <Typography variant='h5'>Flashcards Preview</Typography>
                <Grid container spacing={3}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent>
                                        <Box
                                        sx={{
                                            perspective: '1000px',
                                            '& > div': {
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                width: '100%',
                                                height: '200px',
                                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                transform: flipped[index]
                                                ? 'rotateY(180deg)'
                                                : 'rotateY(0deg)',
                                            },
                                            '& > div > div': {
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                backfaceVisibility: 'hidden',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 2,
                                                boxSizing: 'border-box',
                                            },
                                            '& > div > div:nth-of-type(2)': {
                                                transform: 'rotateY(180deg)'
                                            },
                                        }}
                                        >
                                            <div>
                                                <div>
                                                    <Typography variant='h5' component='div'>{flashcard.front}</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='h5' component='div'>{flashcard.back}</Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{mt: 4, display: 'flex', justifyContent: 'center'}}>
                    <Button variant="contained" colors="secondary" onClick={handleOpen}>
                        Save
                    </Button>
                </Box>
            </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Save Flashcards</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter a name for your flashcards collection
                </DialogContentText>
                <TextField 
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveFlashcards}>Save</Button>
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


