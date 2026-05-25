import { Box, Container } from '@mui/system'

interface EditDisplayPageProps {
    displayJoinCode?: string;
}

const EditDisplayPage = ({ displayJoinCode }: EditDisplayPageProps) => {

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
            Edit Display Page
        </Container>
    )
}

export default EditDisplayPage;