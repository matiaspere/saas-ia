"use client"
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import AddTransactionCard from "./AddTransactionCard";

const UploadButton = ({coins}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        if (!e) {
          setIsOpen(e);
        }
      }}
    >
      <DialogTrigger
        asChild
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Button>Agregar transacción</Button>
      </DialogTrigger>

      <DialogContent>
        <AddTransactionCard coins={coins} setIsOpen={setIsOpen}/>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
