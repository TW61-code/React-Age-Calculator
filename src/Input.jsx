import { motion } from "framer-motion";

function Input({
    label,
    value,
    onChange,
    rotate,
    error
}) {

    return (
        <div className="input-container"> 
        {/* set the error styling if a specific input field is invalid */}
          <label style={{color: error && "hsl(0, 100%, 67%)"}}>{label}</label>
          <motion.input 
                         /* Animation to indicate to the user that the input field cannot take any more values. */
                 animate={{ rotate: rotate ? 360 : 0 }}
                 initial={{ rotate: 0 }}
                 type="text" 
                 className={error ? "invalid" : "valid"}
                 value={value} 
                 onChange={onChange}
                 style={{border: error && "1px solid hsl(0, 100%, 67%)"}}
                 autoFocus={label === "DAY"}
            />
          {error && <p>{error}</p>}
        </div>
    )

}

export default Input