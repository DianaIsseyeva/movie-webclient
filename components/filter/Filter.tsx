'use client';

import React, { useState, useEffect } from 'react';
import { GenreType } from '@/common/types';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import { MovieController } from '@/api/controllers/movies';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, selectedGenres: readonly string[], theme: Theme) {
  return {
    fontWeight:
      selectedGenres.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function Filter({
  selectedGenres,
  onFilterChange,
}: {
  selectedGenres: string[];
  onFilterChange: (genres: string[]) => void;
}) {
  const theme = useTheme();
  const [genres, setGenres] = useState<GenreType[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedGenres>) => {
    const {
      target: { value },
    } = event;
    onFilterChange(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    const getGenres = async () => {
      try {
        const responseGenres = await MovieController.getGenres();
        if (responseGenres) {
          setGenres(responseGenres);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    getGenres();
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='demo-multiple-chip-label'>Genres</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={selectedGenres}
          onChange={handleChange}
          input={<OutlinedInput id='select-multiple-chip' label='Genres' />}
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {genres.map(genre => (
            <MenuItem key={genre.name} value={genre.name} style={getStyles(genre.name, selectedGenres, theme)}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
