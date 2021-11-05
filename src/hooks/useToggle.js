import { useState } from 'react';

export default function useToggle(init) {
  const [value, setValue] = useState(init);

  function toggleValue(value) {
    setValue(currValue =>  typeof value === 'boolean' ? value : !currValue);
  }

  return { value, toggleValue };
}