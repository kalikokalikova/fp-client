import { Container, Box, Typography, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";

function QandAs({ qAndAData }) {
  const [questionInputOpen, setQuestionInputOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [answerInputOpen, setAnswerInputOpen] = useState(false);
  const [answerText, setAnswerText] = useState("");
  console.log(qAndAData);
  const { eventId } = useParams();

  const handleAskQuestion = () => {
    setQuestionInputOpen(true);
  };

  const handleCancelQuestion = () => {
    setQuestionInputOpen(false);
    setQuestionText("");
  };

  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value)
  }

  const handleSubmitQuestion = () => {
    console.log(questionText)
    let request = { "question_text": questionText}
    mutation.mutate(request);
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

  const mutation = useMutation({
    mutationFn: async (questionText) => {
      return api.post(`api/v1/events/${eventId}/qa/`, questionText);
    },
    onSuccess: (response) => {
      console.log("success response: ", response)
    },
    onError: (error) => {
      console.error(error);
    }
  })

  return (
    <Container>
      <Typography>Q&A</Typography>
      <Typography>Anyone can ask, anyone can answer.</Typography>
      <Button onClick={handleAskQuestion}>ask a question</Button>
      {qAndAData.length === 0 ? (
        <Box>
          <Typography>No questions yet.</Typography>

        </Box>
      ) : (
        <Box>Yes Q</Box> // Question components go here
      )}
      {questionInputOpen && (
        <Box>
          <TextField label="Your question" variant="outlined" value={questionText} onChange={handleQuestionChange} />
          <Button onClick={handleCancelQuestion}>Cancel</Button>
          <Button onClick={handleSubmitQuestion}>Post</Button>
        </Box>
      )}
    </Container>
  );
}

export default QandAs;
