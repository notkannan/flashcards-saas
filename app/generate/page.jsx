'use client'

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { db } from "@/firebase"
import TextInput from "../../components/TextInput"
import Navbar from "../../components/Navbar"
import { doc, getDoc, setDoc, writeBatch } from 'firebase/firestore'
import { collection } from "firebase/firestore"
import { CardStack } from "../../components/ui/CardStack"
import { cn } from "@/lib/utils"
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material'
import FlashcardsList from "../../components/Flashcards"
import Link from "next/link"

export default function Generate() {

    const {isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [generationCount, setGenerationCount] = useState(0)
    const router = useRouter()

    const style = {
        "& label.Mui-focused": {
          color: "red"
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "red"
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
              "font-bold bg-red-100 text-primary dark:bg-orange-700/[0.2] dark:text-primary px-1 py-0.5",
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
    useEffect(() => {
      const createOrFetchUser = async () => {
          if (user) {
              const userDocRef = doc(db, 'users', user.id)
              const userDocSnap = await getDoc(userDocRef)

              if (!userDocSnap.exists()) {
                  // User doesn't exist in Firebase, create a new document
                  await setDoc(userDocRef, {
                      generationCount: 0,
                      subscribed: 'No'
                  })
                  setGenerationCount(0)
                  setIsSubscribed(false)
              } else {
                  // User exists, fetch their data
                  const userData = userDocSnap.data()
                  setGenerationCount(userData.generationCount || 0)
                  setIsSubscribed(userData.subscribed === 'Yes')
              }
          }
      }
      createOrFetchUser()
  }, [user])

    const handleSubmit = async () => {
      if (generationCount >= 3 && !isSubscribed){
        alert("Please subscribe to Card Flix pro to generate more flashcards")
        return
      }
      try {
        
        // Fetch the user's document
        const userDocRef = doc(collection(db, 'users'), user.id);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            console.error('User document not found');
            return;
        }

        // Get the current generation count and increment it
        const userData = userDocSnap.data();
        const currentCount = userData.generationCount || 0;
        const newCount = currentCount + 1;

        // Update the generationCount in the user's document
        const batch = writeBatch(db);
        batch.update(userDocRef, { generationCount: newCount });

        fetch('/api/generate', {
            method: 'POST',
            body: text,
        })
        .then((res) => res.json())
        .then((data) => {
            setFlashcards(data);
        })  
        await batch.commit()
        setGenerationCount(prevCount => prevCount + 1)

    }catch(err){
      alert("Please log in to generate flashcards")
    }
  }

    const getUserGenerationCount = async (userId) => {
        // Reference to the user's document
        const userDocRef = doc(db, 'users', userId);

        // Fetch the document
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // Get the document data
          const userData = userDocSnap.data();

          // Retrieve the generationCount field
          const generationCount = userData.generationCount || 0; // Default to 0 if not set
          return generationCount;
      }
      return
    }

    const getUserSubscriptionStatus = async(userId) => {
    try{  
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const isSubscribed = userData.subscribed === 'Yes';
        return isSubscribed;
      } else {
      console.log("Doucument not found!");
      return false;
      }
    } catch (error) {
      console.error("Error fetching user subscription status:", error);
      throw error; // or handle the error as appropriate for your application
    }
      
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
      {isSubscribed || generationCount <= 3 ?
        <div>
        <Typography
          variant='h1' 
          sx={{ 
            textAlign: 'center',
            pt: 2,
            fontSize: '2.5rem',
            color: '#333333',
            fontWeight: 'bold'
          }}
        >Send in a&nbsp;<span className="bg-red-100 text-primary">&nbsp;prompt&nbsp;</span>&nbsp;to get started.</Typography>
        {
        flashcards.length == 0 && 
        <div className="h-[400px] flex justify-center items-center">
          <CardStack items={CARDS} />
        </div>           
        }
        </div>
        :
        <div className="flex flex-col gap-5 justify-center items-center">
        <Typography
            variant='h1' 
            sx={{ 
                textAlign: 'center',
                pt: 20, // Margin-bottom to add space below the heading
                fontSize: '2.5rem', // Adjust font size as needed
                color: '#333333', // Dark gray for readability
                fontWeight: 'bold',
            }}
        >Subscribe to Card Flix Pro to generate more flashcards</Typography>
        <Typography
            variant='h6' 
            sx={{ 
                textAlign: 'center',
                color: '#333333', // Dark gray for readability
                fontWeight: 'light',
            }}
        >It&apos;s cheap, it&apos;s useful. Never worry about memorizing stuff again. <br />Card Flix has your back</Typography>
          <div className="flex items-center gap-7">
            <Link
              href="/#pricing"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Subscribe
            </Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-text">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      }
        <FlashcardsList
          flashcards={flashcards}
          flipped={flipped}
          handleCardClick={handleCardClick}
          className="p-4 pt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-max" 
        />
        
        {flashcards.length > 0 && <Box sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" sx={{bgcolor:'#D7263D', borderRadius: '12px', '&:hover': {bgcolor: '#9D1D30'}}} onClick={handleOpen}>
            Save
          </Button>
        </Box>}

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Save Flashcards</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please name your flashcards collection
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
                <Button sx={{color:'#D7263D', borderRadius: '12px', '&:hover': {bgcolor: '#f2f7f2'}}} onClick={handleClose}>Cancel</Button>
                <Button sx={{color:'#D7263D', borderRadius: '12px', '&:hover': {bgcolor: '#f2f7f2'}}} onClick={saveFlashcards}>Save</Button>
            </DialogActions>
        </Dialog>
        
        <div className="w-[80vw] fixed bottom-[3%] left-[10%]">
            
            <TextInput 
                content={text}
                handleChange={handleTextChange}
                submitContent={handleSubmit}
                generationCount={getUserGenerationCount}
                userSubscription={getUserSubscriptionStatus}
            />
        </div>
    </div>

  )
}