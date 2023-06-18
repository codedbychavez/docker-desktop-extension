// ui/src/App.tsx
import React, { useEffect } from 'react';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { createDockerDesktopClient } from "@docker/extension-api-client";

import { useFeatureFlag } from 'configcat-react';

//obtain docker desktop extension client
const ddClient = createDockerDesktopClient();

export function App() {
  const [containers, setContainers] = React.useState<any[]>([]);
  const { value: isFilterSwitchEnabled } = useFeatureFlag('filterswitch', false);

  const fetchAllContainers = async () => {
    ddClient.docker.cli.exec('ps', ['--all', '--format', '"{{json .}}"']).then((result) => {
      // result.parseJsonLines() parses the output of the command into an array of objects
      setContainers(result.parseJsonLines());
    });
  }

  const fetchRunningContainers = async () => {
    ddClient.docker.cli.exec('ps', ['--format', '"{{json .}}"']).then((result) => {
      // result.parseJsonLines() parses the output of the command into an array of objects
      setContainers(result.parseJsonLines());
    });
  }

  const handleFetchContainers = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      fetchRunningContainers();
    } else {
      fetchAllContainers();
    }
  }

  useEffect(() => {
    // Get all containers
    fetchAllContainers();
  }, []);

  return (
      <Stack>
        <Typography data-testid="heading" variant="h3" role="title">
          Container list
        </Typography>
        <Typography
          data-testid="subheading"
          variant="body1"
          color="text.secondary"
          sx={{ mt: 2 }}
        >
        Simple list of containers using Docker Extensions SDK.
        </Typography>
        
        {
          isFilterSwitchEnabled && 
          <FormGroup sx={{ mt: 1 }}>
            <FormControlLabel control={<Switch onChange={(event) => handleFetchContainers(event)} />} label="Show only running containers" />
          </FormGroup>
        }

        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Container id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Command</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {containers.map((container) => (
                <TableRow
                  key={container.ID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{container.ID}</TableCell>
                  <TableCell>{container.Image}</TableCell>
                  <TableCell>{container.Command}</TableCell>
                  <TableCell>{container.CreatedAt}</TableCell>
                  <TableCell>{container.Status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
  );
}