function Button({children, className, type="submit", ...props}) {
  return (
    <button {...props} type={type} className={`${className} p-4 text-[15px] font-bold leading-[100%] rounded-[10px]`}>
        {children}
    </button>
  )
}

export default Button