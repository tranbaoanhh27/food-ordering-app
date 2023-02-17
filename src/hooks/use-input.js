import { useEffect, useState } from "react";

const useInput = (validateInput = (input) => true) => {
    const [value, setValue] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const changeHandler = (event) => setValue(event.target.value);
    const blurHandler = () => setIsTouched(true);

    const touch = () => {
        setIsTouched(true);
    };

    useEffect(() => {
        setHasError(isTouched && !validateInput(value));
    }, [value, isTouched, validateInput]);

    return [value, changeHandler, blurHandler, hasError, touch];
};

export default useInput;
