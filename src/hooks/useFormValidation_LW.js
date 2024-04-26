import { useState } from "react";
import useLocalWallet from "./useLocalWallet";

export function useFormValidation_LW() {
  const [hasErrors, setHasErrors] = useState([]);
  const { getPrivKey } = useLocalWallet();

  const validateForm = (...fields) => {
    // console.log("useValidation: aargs: ", fields);
    let errors = [];
    const privateKey = getPrivKey();

    // REGEXs
    const userNamePattern = /^[a-zA-Z0-9_-]{1,20}$/;

    fields.forEach((field, index, arr) => {
      // *** Frontend Errors ***
      // Validating: Username
      //   console.log("The Element: ", field);
      //   console.log("The Index: ", index);
      //   console.log("The Array: ", arr);
      if (field.type === "Username") {
        if (!field.value || !userNamePattern.test(field.value)) {
          //   console.log("Running Username...");
          const error = { name: field.type };
          if (field.value.length === 0)
            error.message = field.type + " is required";
          if (field.value.length > 20) error.message = field.type + " too long";
          if (field.value.length !== 0 && field.value.length <= 20)
            error.message = "The only allowed symbols are: `_` and `-`";
          errors.push(error);
        }
      }

      // *** Backend Errors ***
    });

    // Check if wallet installed
    if (!privateKey) {
      const error = { name: "Local Wallet" };
      error.message = "Local Wallet does not exist";
      errors.push(error);
    }

    // If no errors, return true, else return array of errors
    if (errors.length > 0) {
      setHasErrors(errors);
      return false;
    }

    return true;
  };

  const handleServerErrors = (errorString, errorMsg) => {
    console.log("gggggggggggggggggggg: ", errorString);
    if (errorString === "contract") {
      setHasErrors([
        {
          name: "Blockchain",
          message: errorMsg,
        },
      ]);
    }

    if (errorString === "ERR_NETWORK") {
      console.log("In here (1)");
      setHasErrors([
        {
          name: "Server",
          message: "At capacity or down. Please try again later",
        },
      ]);
    }

    if (errorString === "ER_DUP_ENTRY") {
      console.log("In here (2)");
      setHasErrors([
        {
          name: "Database",
          message: "This name, email or wallet already exists",
        },
      ]);
    }
    if (errorString === undefined) {
      console.log("In here (3)");
      setHasErrors([
        {
          name: "Unknown",
          message: "Something went terribly wrong!",
        },
      ]);
    }
  };

  const clearFormErrors = () => setHasErrors([]);

  return {
    validateForm,
    hasErrors,
    handleServerErrors,
    clearFormErrors,
    setHasErrors,
  };
}
