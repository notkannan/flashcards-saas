import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'

export default function Flashcards({flashcards, flipped, handleCardClick}) {
  return (
    <div>
        {flashcards.length > 0 && (
            <Box sx={{mt:4}}>
                <Typography variant='h5'>Flashcards Preview</Typography>
                <Grid container spacing={3}>
                    {flashcards.map((flashcard, index) => {
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
                                                    <Typography variant='h5' component='div'>{data.front}</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='h5' component='div'>{data.back}</Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    })}
                </Grid>
            </Box>
        )}
    </div>
  )
}
