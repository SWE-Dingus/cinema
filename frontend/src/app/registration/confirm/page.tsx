"use client"

const RegistrationConfirmation = () => (
  <div className="h-full w-full text-4xl m-4">
    We sent you a confirmation email, please enter the code here:
    <form>
      <label>
        <input type="test" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  </div>
);

export default RegistrationConfirmation;
