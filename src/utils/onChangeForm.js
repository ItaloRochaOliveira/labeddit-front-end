export const onChangeForm = (event, form) => {
  const { name, value } = event.target;

  return { ...form, [name]: value };
};
