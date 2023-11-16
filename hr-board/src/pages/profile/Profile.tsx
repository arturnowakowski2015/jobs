import { useCurrentUser } from 'hooks/useCurrentUser';

import { ChangePasswordForm } from './components/ChangePasswordForm';
import { ChangeNameForm } from './components/ChangeNameForm';

export const Profile = () => {
  const { currentUser } = useCurrentUser();

  return (
    <div className="w-full">
      <div className="mb-8">
        <p className="border-b-2 bg-blue-100 py-2">PROFILE</p>
        <p>
          <b>Your name: </b> {currentUser.firstName}
        </p>
        <p>
          <b>Your last name: </b> {currentUser.lastName}
        </p>
        <p>
          <b>Your email: </b> {currentUser.email}
        </p>
      </div>
      <div>
        <p className="border-b-2 bg-blue-100 py-2">EDIT PROFILE</p>
        <div className="flex  space-x-12 p-4">
          <div className="basis-1/2">
            <ChangeNameForm />
          </div>
          <div className="basis-1/2">
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};
