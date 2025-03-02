import { Container, Box, Typography, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import api from "../../api";

function QandAs({ qAndAData }) {
  const [questionInputOpen, setQuestionInputOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  console.log(qAndAData);

  const handleAskQuestion = () => {
    // open question input box
  };

  const handleCancelQuestion = () => {
    setQuestionInputOpen(false);
    setQuestionText("");
  };

  const handleSubmitQuestion = () => {
    // make api call
  };

  const handleAnswerQuestion = () => {
    // do something
  };

  const handleCancelAnswer = () => {
    // close Answer input
    // set answer input text to empty string\
  };

  const submitAnswer = () => {
    // make api call
  };

  return (
    <Container>
      <Typography>Q&A</Typography>
      <Typography>Anyone can ask, anyone can answer.</Typography>
      {qAndAData.length === 0 ? (
        <Box>
          <Typography>No questions yet.</Typography>

          <Button onClick={handleAskQuestion()}>ask a question</Button>
        </Box>
      ) : (
        <Box>Yes Q</Box> // Question components go here
      )}
      <Box>
        <Typography>Your question</Typography>
        <TextField />
        <Button onClick={handleCancelQuestion}>Cancel</Button>
        <Button onClick={handleSubmitQuestion}>Post</Button>
      </Box>
    </Container>
  );
}

export default QandAs;
