
function HandleValueChange(
    {
        e, 
        maxLength,
        setValue,
        setRotate,
        setErrors,
        rotate,
        error
    }
) {
    e.preventDefault();
    if (e.target.value.length === maxLength) {
      setValue(e.target.value.slice(0, maxLength - 1));//The second parameter of the slice method is simply maxLength - 1
      setRotate(!rotate);//Indication to the user. They have reached the inputs max length
    } else {
      setValue(e.target.value);
    }
    // Clear error value when user starts typing.
    setErrors(prev => ({...prev, [error]: ""}))
}

export default HandleValueChange;