import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const translations = {
  login: { en: 'Login', tr: 'Giriş Yap' },
  logout: { en: 'Log Out', tr: 'Çıkış Yap' },
  password: { en: 'Password', tr: 'Şifre' },
  username: { en: 'Username', tr: 'Kullanıcı adı' },
};

interface LanguageState {
  languageCode: 'en' | 'tr';
  translations: typeof translations;
}

const initialState: LanguageState = {
  languageCode: 'en',
  translations: translations,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguageCode: (state, action: PayloadAction<'en' | 'tr'>) => {
      state.languageCode = action.payload;
    },
  },
});

export const { setLanguageCode } = languageSlice.actions;

export const selectTranslations = (state: RootState) => {
  return state.language.translations;
};

export const selectLanguageCode = (state: RootState) => {
  return state.language.languageCode;
};

export default languageSlice.reducer;
