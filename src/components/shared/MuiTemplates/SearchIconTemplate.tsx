import { Search } from '@mui/icons-material';
import Stack from '@mui/material/Stack';

export function SearchIconTemplate(props: { color?: string }) {
  const { color = '#EE1F4' } = props;
  return (
    <Stack direction="row" spacing={2}>
      <Search sx={{ color }} />
    </Stack>
  );
}
