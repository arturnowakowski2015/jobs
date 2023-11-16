export const formatInitials = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  return `${firstName.charAt(0).toLowerCase()}${lastName
    .charAt(0)
    .toLowerCase()}`;
};
