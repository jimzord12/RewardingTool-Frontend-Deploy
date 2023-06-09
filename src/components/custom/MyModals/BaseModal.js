import React from "react";

import "./BaseModal.styles.css";

import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
} from "react-aria-components";

function BaseModal() {
  return (
    <DialogTrigger>
      <Button>Testing Modal...</Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <form>
              <Heading>Sign up</Heading>
              <TextField autoFocus>
                <Label>First Name:</Label>
                <Input />
              </TextField>
              <TextField>
                <Label>Last Name:</Label>
                <Input />
              </TextField>
              <Button onPress={close}>Submit</Button>
            </form>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}

export default BaseModal;
