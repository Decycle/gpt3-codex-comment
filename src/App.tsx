import { useState } from 'react'

import {
  CssBaseline,
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Input,
} from '@mui/material'
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles'
import axios from 'axios'

import TextArea from './components/TextArea'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#856d65',
    },
    secondary: {
      main: '#c2afa5',
    },
    background: {
      default: '#e8e1db',
      paper: '#ffffff',
    },
  },
})

const App = () => {
  const storedInput = localStorage.getItem('input') ?? ''

  const storedOutput = localStorage.getItem('output') ?? ''

  const [input, setInput] = useState(storedInput)
  const [output, setOutput] = useState(storedOutput)
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(1000)
  const [key, setKey] = useState('')

  const requestData = () => {
    setLoading(true)
    axios({
      url: 'https://api.openai.com/v1/engines/davinci-codex/completions',
      method: 'POST',
      headers: {
        'Content-Type': ' application/json',
        Authorization: `Bearer ${key}`,
      },

      data: {
        prompt: input,
        temperature: 0,
        max_tokens: token,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['#'],
      },
    }).then((res) => {
      console.log(res)
      setOutput(res.data.choices[0].text)
      setLoading(false)
    })
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline>
        <Container
          maxWidth='xl'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '15px',
            mt: '30px',
            padding: '20px',
          }}>
          <Typography variant='h3' component='h1'>
            INPUT
          </Typography>
          <TextArea
            type='input'
            value={input}
            setValue={setInput}
          />
          <Typography variant='h3' component='h1'>
            OUTPUT
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
            }}>
            <Typography variant='h6'>API Key:</Typography>
            <Input
              type='password'
              onChange={(event) =>
                setKey(event.target.value)
              }
              value={key}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
            }}>
            <Typography variant='h6'>
              Max Tokens:
            </Typography>
            <Input
              type='number'
              onChange={(event) =>
                setToken(parseInt(event.target.value))
              }
              value={token}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: '15px' }}>
            <Button
              onClick={requestData}
              color='primary'
              variant='contained'>
              Get Output
            </Button>
            {loading && <CircularProgress />}
          </Box>
          <TextArea
            type='output'
            value={output}
            setValue={setOutput}
          />
        </Container>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
