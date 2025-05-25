import { Container, Box, Typography, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Question from "./Question";
import api from "../../api";

function QandAs({ qAndAData }) {
  const [questionInputOpen, setQuestionInputOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState(qAndAData)

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
    let request = { "question_text": questionText}
    mutation.mutate(request);
  };

  const mutation = useMutation({
    mutationFn: async (questionText) => {
      return api.post(`api/v1/events/${eventId}/qa/`, questionText);
    },
    onSuccess: (response) => {
      setQuestions((prevQuestions) =>
        [...prevQuestions, response.data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
      );
      handleCancelQuestion();
    },
    onError: (error) => {
      console.error(error);
    }
  })

  return (
    <Container
    sx={{
      backgroundColor: "#F7FDFF",
      margin: "8px",
      width: "auto",
      padding: "5px",
    }}>
      <Typography>Q&A</Typography>
      <Typography>Anyone can ask, anyone can answer.</Typography>
      <Button onClick={handleAskQuestion}>ask a question</Button>
      {questionInputOpen && (
          <Box>
            <TextField label="Your question" variant="outlined" value={questionText} onChange={handleQuestionChange} />
            <Button onClick={handleCancelQuestion}>Cancel</Button>
            <Button onClick={handleSubmitQuestion}>Post</Button>
          </Box>
        )}
      {questions.length === 0 ? (
        <Box>
          <Typography>No questions yet.</Typography>
        </Box>
      ) : (
        <>

        <Box>{questions.map((question, index) => (
          <Question key={index} question={question}/>
        ))}</Box>
        </>
      )}


    </Container>
  );
}

export default QandAs;
