'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import Navbar from "../../components/Navbar"
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material"
import SmallFooter from "../../components/Footer"

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()){
                const collections = docSnap.data().flashcards || []
                console.log(collections)
                setFlashcards(collections)
            } else {
                await setDoc(docRef, {flashcards: []})
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn){
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <>
        <div className="bg-background h-screen">
        <Navbar />
        <Container sx={{ mt: 10 }}>
            <Typography 
                variant='h1' 
                sx={{ 
                    textAlign: 'center',
                    mb: 4, // Margin-bottom to add space below the heading
                    fontSize: '2.5rem', // Adjust font size as needed
                    color: '#333333', // Dark gray for readability
                    
                }}
            >
                Your Saved Collections
            </Typography>
            <Grid
                container
                spacing={4}
                sx={{
                    justifyContent: 'center', // Center the items horizontally
                    alignItems: 'center', // Center the items vertically
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap', // Wrap the cards to the next line on smaller screens
                    px: 2 // Add horizontal padding to ensure cards don’t stick to edges
                }}
            >
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                        <Card 
                        onClick = {() => {
                            handleCardClick(flashcard.name)
                        }}
                        sx={{ 
                            width: '300px', // Increased card width
                            height: '200px', // Set a specific height for better proportions
                            backgroundColor: '#fff', 
                            borderRadius: '24px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                            transition: 'transform 0.3s', 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': { 
                                transform: 'scale(1.05)', 
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                                cursor: 'pointer'
                            },
                        }}>
                            <CardActionArea
                                // onClick={() => {
                                //     handleCardClick(flashcard.name)
                                // }}
                            >
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography 
                                        variant='h6' 
                                        sx={{ 
                                            color: '#1E293B', // Dark gray for readability
                                            
                                        }}
                                    >
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>

        </div>
        <SmallFooter />
        </>

    )

}