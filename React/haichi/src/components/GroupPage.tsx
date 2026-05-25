import { Box, Container } from '@mui/system'

interface GroupPageProps {
    newGroup: boolean;
    groupCode?: string;
}

const GroupPage = ({ groupCode, newGroup }: GroupPageProps) => {
    const makeNewGroup = newGroup;

    return (
        <Container sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gridTemplateRows: '1fr 11fr',
            width: '100%',
            height: '100%',
            m: 0,
            p: 0
        }}>
            
            <Box className="Create__Header" sx={{
                gridColumn: '1 / -1',
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gap: 1
            }}>
                <Box sx={{gridColumn: 'span 5', backgroundColor: 'red'}}> {groupCode} </Box>
                <Box sx={{gridColumn: '8 / 11', backgroundColor: 'red'}}> DO </Box>
            </Box>

            <Box sx={{display: 'flex', flexDirection: 'column', gridColumn: '1 / -1', mt: '20px', gap: '16px'}}>

                <Box sx={{
                        width: '90%', height: '5vh', mr: '10%', ml: '0%', backgroundColor: 'orange',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(10, 1fr)',
                        gridTemplateRows: '1fr',
                        gap: 1
                    }}>
                        <Box sx={{ gridColumn: '1 / 3', gridRow: ' 1 / 2', backgroundColor: 'blue', m: '5px'}}> MDF </Box>
                        <Box sx={{ gridColumn: '3 / span 8', gridRow: ' 1 / 2', backgroundColor: 'blue', m: '5px'}}> CODE </Box>
                </Box>

                <Box sx={{
                        width: '90%', height: '5vh', mr: '10%', ml: '0%', backgroundColor: 'orange',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(10, 1fr)',
                        gridTemplateRows: '1fr',
                        gap: 1
                    }}>
                        <Box sx={{ gridColumn: '1 / 3', gridRow: ' 1 / 2', backgroundColor: 'blue', m: '5px'}}> MDF </Box>
                        <Box sx={{ gridColumn: '3 / span 8', gridRow: ' 1 / 2', backgroundColor: 'blue', m: '5px'}}> CODE </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default GroupPage;