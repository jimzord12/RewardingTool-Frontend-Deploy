import { useState } from "react";

import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";

export function useFormValidation() {
  const [hasErrors, setHasErrors] = useState([]);

  const { hasProvider, wallet } = useMetaMask();

  const validateForm = (...fields) => {
    // console.log("useValidation: aargs: ", fields);
    let errors = [];

    // REGEXs
    const userNamePattern = /^[a-zA-Z0-9_-]{1,20}$/;
    const walletPattern = /^0x[a-fA-F0-9]{40}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

      // Validating: Wallet Address
      if (field.type === "Wallet Address") {
        // console.log("Running Wallet Address...");
        if (!field.value || !walletPattern.test(field.value)) {
          const error = { name: field.type };

          error.message =
            "Must be a 40 characters long and a valid Ethereum address";

          if (field.length === "") error.message = field.type + " is required";
          errors.push(error);
        }
      }

      // Validating: Email
      if (field.type === "Email") {
        if (!field.value || !emailPattern.test(field.value)) {
          //   console.log("Running Email...");

          const error = { name: field.type };

          error.message = "Must be a valid email. (example@example.com)";

          if (field.value.length === "")
            error.message = field.type + " is required";
          errors.push(error);
        }
      }

      // Validating: Password
      if (field.type === "Password" && field.value.length < 8) {
        console.log("passwrod: ", field);
        // console.log("Running Password...");

        // if (!field || !field.type.length <8) {
        const error = { name: field.type };

        error.message = "Must be at least 8 characters";

        if (field.value.length === "")
          error.message = field.type + " is required";
        errors.push(error);
        // }
      }

      // *** Backend Errors ***
    });

    // Check if wallet installed
    if (!hasProvider) {
      const error = { name: "Wallet" };
      error.message = "Metamask must be installed";
      errors.push(error);
    }
    // Check if connected with site
    if (!Boolean(wallet.chainId)) {
      const error = { name: "Wallet Connection" };
      error.message = "Metamask must be connected with the Site";
      errors.push(error);
    }
    // Check if on correct network
    if (wallet.chainId !== 20231) {
      // if (wallet.chainId !== 31337) {
      const error = { name: "Wallet Network" };
      error.message = "Metamask must be on the GENERA Network";
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
