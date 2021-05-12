import {
  useEffect,
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes,
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';

import { IconBase, IconBaseProps } from 'react-icons/lib';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export function Input(props: InputProps){
  
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  
  const { fieldName, defaultValue, registerField } = useField(props.name);


  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return(
    <Container isFilled={isFilled} isFocused={isFocused}>
      {props.icon && <IconBase size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...props}
      />
    </Container>

  );

}
