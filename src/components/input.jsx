function Input({className, placeholder, type, ...props}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border-white border-2 px-3 py-2 outline-none rounded-[10px] ${className}`}
      {...props}
    />
  )
}

export default Input