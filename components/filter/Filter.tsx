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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
  selectedRatingType,
  onRatingTypeChange,
  minRating,
  maxRating,
  onRatingChange,
  minYear,
  maxYear,
  onYearChange,
  onApplyFilters,
  onClearFilters,
}: {
  selectedGenres: string[];
  onFilterChange: (genres: string[]) => void;
  selectedRatingType: string;
  onRatingTypeChange: (ratingType: string) => void;
  minRating: string;
  maxRating: string;
  onRatingChange: (min: string, max: string) => void;
  minYear: string;
  maxYear: string;
  onYearChange: (min: string, max: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}) {
  const theme = useTheme();
  const [genres, setGenres] = useState<GenreType[]>([]);

  const handleGenreChange = (event: SelectChangeEvent<typeof selectedGenres>) => {
    const {
      target: { value },
    } = event;
    onFilterChange(typeof value === 'string' ? value.split(',') : value);
  };

  const handleRatingTypeChange = (event: SelectChangeEvent<string>) => {
    onRatingTypeChange(event.target.value);
  };

  const handleMinRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRatingChange(event.target.value, maxRating);
  };

  const handleMaxRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRatingChange(minRating, event.target.value);
  };

  const handleMinYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onYearChange(event.target.value, maxYear);
  };

  const handleMaxYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onYearChange(minYear, event.target.value);
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
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id='demo-multiple-chip-label'>Genres</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={selectedGenres}
          onChange={handleGenreChange}
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
          {genres &&
            genres?.map(genre => (
              <MenuItem key={genre.name} value={genre.name} style={getStyles(genre.name, selectedGenres, theme)}>
                {genre.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id='rating-type-label'>Rating Type</InputLabel>
        <Select
          labelId='rating-type-label'
          id='rating-type-select'
          value={selectedRatingType}
          onChange={handleRatingTypeChange}
          input={<OutlinedInput label='Rating Type' />}
          MenuProps={MenuProps}
        >
          <MenuItem value='kp'>KP</MenuItem>
          <MenuItem value='imdb'>IMDB</MenuItem>
          <MenuItem value='tmdb'>TMDB</MenuItem>
          <MenuItem value='filmCritics'>Film Critics</MenuItem>
          <MenuItem value='russianFilmCritics'>Russian Film Critics</MenuItem>
          <MenuItem value='await'>Await</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id='min-rating'
        label='Min Rating'
        variant='outlined'
        value={minRating}
        onChange={handleMinRatingChange}
        sx={{ m: 1, width: 140 }}
      />
      <TextField
        id='max-rating'
        label='Max Rating'
        variant='outlined'
        value={maxRating}
        onChange={handleMaxRatingChange}
        sx={{ m: 1, width: 140 }}
      />
      <TextField
        id='min-year'
        label='Min Year'
        variant='outlined'
        value={minYear}
        onChange={handleMinYearChange}
        sx={{ m: 1, width: 140 }}
      />
      <TextField
        id='max-year'
        label='Max Year'
        variant='outlined'
        value={maxYear}
        onChange={handleMaxYearChange}
        sx={{ m: 1, width: 140 }}
      />
      <Button variant='contained' color='primary' onClick={onApplyFilters} sx={{ m: 1 }}>
        Применить фильтры
      </Button>
      <Button variant='contained' color='secondary' onClick={onClearFilters} sx={{ m: 1 }}>
        Очистить фильтры
      </Button>
    </div>
  );
}
