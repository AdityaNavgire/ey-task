import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type Character = {
  id: number;
  name: string;
  image: string;
  // Add other fields you need from the API response
};

interface UserState {
  name: string;
  email: string;
  characters: Character[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  name: '',
  email: '',
  characters: [],
  loading: false,
  error: null,
}

export const fetchCharacters = createAsyncThunk<Character[], number | void>(
  'user/fetchCharacters',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ results: Character[] }>(`https://rickandmortyapi.com/api/character?page=${page}`);
      return response.data.results;
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.name = action.payload.name
      state.email = action.payload.email
    },
    clearUser: (state) => {
      state.name = ''
      state.email = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<Character[]>) => {
        state.loading = false;
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer 