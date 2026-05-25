import { useState } from 'react'
import './App.css'
import { Container, Box } from '@mui/system'
import { TextField } from '@mui/material'
import GroupPage from './components/GroupPage'
import DisplayPage from './components/DisplayPage'

const PageMode = {
  Home: 'home',
  JoinDisplay: 'join_display',
  CreateGroup: 'create_group',
  ManageGroup: 'manage_group'
} as const;

type PageMode = typeof PageMode[keyof typeof PageMode];

function App() {
  const [pageMode, setPageMode] = useState<PageMode>(PageMode.Home);
  const [createGroupActive, setCreateGroupActive] = useState<boolean>(true);
  const [groupCode, setGroupCode] = useState<string>('');
  const [displayJoinCode, setDisplayJoinCode] = useState<string>('');

  return (
    <>
      <Container fixed
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows: '1fr 12fr',
          width: '100vw',
          height: '96vh',
          mt: '4vw'
        }}>
        <Box className="body__banner" sx={{display: 'contents'}}>
          <Box sx={{ gridColumn: 'span 3', gridRow: '1 / 2', backgroundColor: 'red' }} onClick={(e) => setPageMode(PageMode.Home)}>
            Logo
          </Box>

          <Box sx={{ gridColumn: 'span 1', gridRow: '1 / 2', backgroundColor: 'red' }}>
            IMG
          </Box>

          <Box sx={{ gridColumn: '9 / 11', gridRow: '1 / 2', backgroundColor: 'red' }}>
            STN
          </Box>
        </Box>

        <Box className="body__content" sx={{ gridRow: '2 / 3', gridColumn: '1 / -1' }}>
        { /* --- Home Page --- */}
          { pageMode == PageMode.Home &&
            <Box sx={{
              width: '100%',
              height: '100%',
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              px: 4,
            }}>
              {/* -- Display Join --- */}
              <TextField 
                sx={{ height: '10%', backgroundColor: 'red', mt: "40%"}} 
                value={displayJoinCode}
                onChange={(e) => setDisplayJoinCode(e.target.value)} >
                Display Code
              </TextField>

              <Box sx={{ height: '10%', backgroundColor: 'red' }} component={'button'}
                onClick={(e) => setPageMode(PageMode.JoinDisplay)}>
                Join as Display
              </Box>

              <hr style={{ width: '100%' }} />
              {/* -- Group Join / Create --- */}
              <TextField 
                sx={{ height: '10%', backgroundColor: 'red' }} 
                value={groupCode}
                onChange={(e) => {
                    setCreateGroupActive(e.target.value.length == 0)
                    setGroupCode(e.target.value)}
                  }>
                Group Code
              </TextField>

              <Box sx={{ height: '10%', backgroundColor: 'red' }} component={'button'} 
                onClick={(e) => setPageMode( createGroupActive ? PageMode.CreateGroup : PageMode.ManageGroup) }>
                {createGroupActive ? <p>Create Group</p> : <p>Manage Group</p>}
              </Box>
            </Box>
          }

          { /* --- Group Page --- */}
          { (pageMode == PageMode.ManageGroup || pageMode == PageMode.CreateGroup) &&
            <GroupPage newGroup={pageMode == PageMode.CreateGroup} groupCode={groupCode}></GroupPage>
          }

          { /* --- Display Page --- */}
          { (pageMode == PageMode.JoinDisplay) &&
            <DisplayPage displayJoinCode={displayJoinCode}></DisplayPage>
          }
        </Box>

        <Box className="body__footer">

        </Box>
      </Container>
    </>
  )
}

export default App
