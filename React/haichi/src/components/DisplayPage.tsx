import { Box, Container } from '@mui/system'

interface DisplayPageProps {
    displayJoinCode?: string;
}

const DisplayPage = ({ displayJoinCode }: DisplayPageProps) => {

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
            Display Page
        </Container>
    )
}

export default DisplayPage;