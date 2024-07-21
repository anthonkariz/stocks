const Input = ({
  name,
  label,
  register,
  errors,
  required,
  type,
  validationSchema,
}) => (
  <div className="w-full  border-gray-600 flex flex-col mt-3">
    <label htmlFor={name}>
      {label}
      {required && "*"}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      {...register(name, validationSchema)}
      className="border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
    />
    {errors && errors[name]?.type === "required" && (
      <span className="text-sm text-red-500">{errors[name]?.message}</span>
    )}
    {errors && errors[name]?.type === "minLength" && (
      <span className="text-sm text-red-500">{errors[name]?.message}</span>
    )}
  </div>
);
export default Input;
