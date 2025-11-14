import { Select } from 'antd';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectLanguageCode,
  setLanguageCode,
} from '../redux/language/languageSlice';

const { Option } = Select;

export const LanguageSwitcher = () => {
  const dispatch = useAppDispatch();
  const languageCode = useAppSelector(selectLanguageCode);

  return (
    <Select
      value={languageCode}
      style={{ width: 120 }}
      onChange={(value) => dispatch(setLanguageCode(value))}
    >
      <Option value='en'>English</Option>
      <Option value='tr'>Türkçe</Option>
    </Select>
  );
};
