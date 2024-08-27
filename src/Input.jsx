import { motion } from "framer-motion";

function Input({
    label,
    value,
    onChange,
    rotate,
    error,
    placeHolder
}) {

    return (
        <div className="input-container"> 
        {/* set the error styling if a specific input field is invalid */}
          <label style={{color: error && "hsl(0, 100%, 67%)"}}>{label}</label>
          <motion.input 
                /* Animation to indicate to the user that the input field cannot take any more values. */
                 transition={{ type: "spring", stiffness: 200 }}
                 whileHover={{ scale: 1.1 }}
                 animate={{ scale: rotate ? [1.1, 1, 1.1, 1] : 1 }}
                 type="text" 
                 className={error ? "invalid" : "valid"}
                 value={value} 
                 onChange={onChange}
                 style={{border: error && "1px solid hsl(0, 100%, 67%)"}}
                 autoFocus={label === "DAY"}
                 placeholder={placeHolder}
            />
          {error && <p>{error}</p>}
        </div>
    )

}

export default Input