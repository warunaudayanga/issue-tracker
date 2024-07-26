"use client";

import { JSX, ReactNode } from "react";
import { AlertDialog as RadixAlertDialog, Button, Flex } from "@radix-ui/themes";
import { RadixColor } from "@/app/types";
import * as React from "react";

interface Props {
    title?: string;
    message: string;
    closeButton?: string;
    actionButton?: string;
    open?: boolean;
    color?: RadixColor;
    onClose?: () => void;
    onAction?: () => void;
    type?: "alert" | "confirm";
    children?: ReactNode;
}

function AlertDialog({
    title = "Alert",
    message,
    closeButton = "Close",
    actionButton = "Close",
    open,
    color,
    onClose,
    onAction,
    type = "alert",
    children,
}: Props): JSX.Element {
    return (
        <>
            <RadixAlertDialog.Root open={open}>
                {children && <RadixAlertDialog.Trigger>{children}</RadixAlertDialog.Trigger>}
                <RadixAlertDialog.Content>
                    <RadixAlertDialog.Title>{title}</RadixAlertDialog.Title>
                    <RadixAlertDialog.Description>{message}</RadixAlertDialog.Description>
                    <Flex mt="2" justify="end" gap="3">
                        <RadixAlertDialog.Cancel>
                            <Button color="gray" variant="soft" onClick={() => onClose?.()}>
                                {closeButton}
                            </Button>
                        </RadixAlertDialog.Cancel>
                        {type === "confirm" && (
                            <RadixAlertDialog.Action>
                                <Button color={color} onClick={() => onAction?.()}>
                                    {actionButton}
                                </Button>
                            </RadixAlertDialog.Action>
                        )}
                    </Flex>
                </RadixAlertDialog.Content>
            </RadixAlertDialog.Root>
        </>
    );
}

export default AlertDialog;
